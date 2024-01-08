import React, { CSSProperties, useState } from "react";
import {
	UserOutlined,
	ArrowLeftOutlined,
	LoadingOutlined,
} from "@ant-design/icons";
import { toBinary } from "@cosmjs/cosmwasm-stargate";
import { useChain } from "@cosmos-kit/react";
import { toast } from "react-toastify";

import DaoBasicInfo from "./DaoBasicInfo";
import ReviewVotingConfig from "./ReviewVotingConfig";
import { network } from "@/config";
import { truncate } from "@/utils/truncate";
import {
	getCreateDaoInfo,
	getExistToken,
	getNewToken,
	getProposalCreateInfo,
	getVotingConfig,
	getVotingCreateInfo,
	setDao,
} from "@/utils/localStorageCreateDao";
import { maxVotingPeriod } from "@/utils/maxVotingPeriod";
import { votingConfigReview } from "@/utils/votingConfigReview";
import { votingInitMsg } from "@/utils/votingInitMsg";
import { codeId } from "@/config";
import { DaoDaoCoreClient } from "@/codegen/DaoDaoCore.client";
import { DaoVotingCw20StakedClient } from "@/codegen/DaoVotingCw20Staked.client";
import { addNewDao } from "@/reducers/dao";
import { useAppDispatch } from "@/config/redux";
import { useRouter } from "next/router";

interface ICreateDaoReview {
	setPagination: React.Dispatch<React.SetStateAction<number>>;
}

const CreateDaoReview = ({ setPagination }: ICreateDaoReview) => {
	const { address, getSigningCosmWasmClient } = useChain(network.chainName);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const daoInfo = getCreateDaoInfo();
	const proposalInfo = getProposalCreateInfo();
	const votingInfo = getVotingCreateInfo();
	const newToken = getNewToken();
	const existToken = getExistToken();
	const votingConfig = getVotingConfig();

	const [loading, setLoading] = useState<boolean>(false);

	const handleCreateDao = async () => {
		setLoading(true);
		try {
			if (
				daoInfo &&
				votingInfo &&
				proposalInfo &&
				votingConfig &&
				newToken &&
				existToken &&
				address
			) {
				const max_voting_period = maxVotingPeriod(votingConfig);
				const proposalThreadhole = {
					threshold_quorum: {
						quorum: votingConfig.quorum.majority
							? { majority: {} }
							: { percent: (votingConfig.quorum.value / 100).toString() },
						threshold: votingConfig.passing_threadhole.majority
							? { majority: {} }
							: {
									percent: (
										votingConfig.passing_threadhole.value / 100
									).toString(),
							  },
					},
				};
				const proposalInitMessage = {
					...proposalInfo,
					max_voting_period: { time: max_voting_period },
					threshold: proposalThreadhole,
				};
				const votingInitMessage = votingInitMsg(
					votingInfo,
					votingConfig,
					newToken,
					existToken
				);

				const daoInitMessage = {
					...daoInfo,
					proposal_modules_instantiate_info: [
						{
							code_id: codeId.proposal,
							msg: toBinary(proposalInitMessage),
							admin: { core_module: {} },
							label: "governance module",
						},
					],
					voting_module_instantiate_info: {
						code_id: codeId.voting,
						msg: toBinary(votingInitMessage),
						admin: { core_module: {} },
						label: "voting module",
					},
				};

				const client = await getSigningCosmWasmClient();
				const daoAddress = await client.instantiate(
					address,
					codeId.dao,
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					daoInitMessage,
					"Oraichain Dao",
					"auto"
				);

				const daoContract = new DaoDaoCoreClient(
					client,
					address,
					daoAddress.contractAddress
				);
				const votingAddr = await daoContract.votingModule();
				const proposalAddr = await daoContract.proposalModules({});
				const votingContract = new DaoVotingCw20StakedClient(
					client,
					address,
					votingAddr
				);
				const tokenAddr = await votingContract.tokenContract();
				const stakingAddr = await votingContract.stakingContract();

				const newDao = {
					dao_addr: daoAddress.contractAddress,
					voting_addr: votingAddr,
					proposal_addr: proposalAddr.at(0)!.address,
					token_addr: tokenAddr,
					staking_addr: stakingAddr,
				};

				localStorage.removeItem("createDaoInfo");
				localStorage.removeItem("createVotingInfo");
				localStorage.removeItem("existToken");
				localStorage.removeItem("newToken");
				localStorage.removeItem("createProposalInfo");
				localStorage.removeItem("votingConfig");
				setDao(newDao);
				dispatch(addNewDao(newDao));
				toast.success("Create DAO successful!", {
					position: toast.POSITION.TOP_RIGHT,
				});
				router.push("/");
			}
		} catch (err: any) {
			console.log({ err });
			const msg = err.message;
			toast.error(msg, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
		setLoading(false);
	};

	return (
		<div id="create-dao-review">
			<DaoBasicInfo />

			<div className="w-full flex flex-col pt-4 pb-16 gap-10 border-b border-secondary-grey-bg ">
				<div className="flex flex-col gap-6">
					<h1 className="text-[17px] text-secondary-grey font-medium">
						Governance configuration
					</h1>
					<div className="grid grid-cols-4 bg-secondary-grey-bg rounded-lg ">
						<div className="col-span-1 flex flex-col px-6 pt-4 pb-6 gap-8 border-r border-secondary-grey-bg">
							<h1 className="text-base text-third-grey font-medium">
								Voting power
							</h1>
							<div id="pie-example-1">
								<table className="charts-css pie hide-data">
									<caption> Pie Example #1 </caption>
									<tbody>
										<tr>
											<td
												style={
													{ "--start": 0.0, "--end": 1.0 } as CSSProperties
												}
											>
												<span className="data"> $ 10K </span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div className="col-span-3 flex flex-col gap-8 px-6 py-4">
							<h1 className="text-base text-third-grey font-medium">
								$Token Distribution
							</h1>
							{/* <div className="flex flex-col gap-4 px-16">
								<div className="flex items-center justify-between">
									<h1 className="text-[15px] text-third-grey font-medium">
										Treasury
									</h1>
									<p className="text-[15px] text-third-grey font-medium">50%</p>
								</div>
							</div> */}
							<div className="flex flex-col gap-4 px-16">
								<div className="flex items-center justify-between">
									<div className="text-[15px] text-third-grey font-medium flex items-center gap-2">
										<UserOutlined />
										<p>{address ? truncate(address, 8, 38) : ""}</p>
									</div>
									<p className="text-[15px] text-third-grey font-medium">
										100%
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-6">
					<h1 className="text-[17px] text-secondary-grey font-medium">
						Voting configuration
					</h1>
					<div className="grid grid-cols-2 gap-4">
						{votingConfig &&
							votingConfigReview(votingConfig).map((votingChoice, index) => (
								<ReviewVotingConfig
									key={index}
									icon={votingChoice.icon}
									title={votingChoice.title}
									description={votingChoice.description}
								/>
							))}
					</div>
				</div>
			</div>

			<div className="flex justify-between items-center pt-2">
				<button
					className="px-4 py-[6px] bg-primary-grey-bg text-black rounded-md flex items-center gap-2 hover:opacity-90"
					onClick={() => setPagination((prevPagination) => prevPagination - 1)}
				>
					<ArrowLeftOutlined />
					<p>Go back</p>
				</button>
				<button
					className="flex items-center gap-2 px-6 py-[6px] bg-secondary-grey text-white rounded-md"
					onClick={handleCreateDao}
					disabled={loading}
				>
					<p>Create Dao</p>
					{loading && <LoadingOutlined />}
				</button>
			</div>
		</div>
	);
};

export default CreateDaoReview;
