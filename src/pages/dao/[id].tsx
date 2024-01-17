import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
	BankOutlined,
	ExclamationCircleOutlined,
	PlusOutlined,
	LoadingOutlined,
	DollarOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useChain } from "@cosmos-kit/react";

import DefaultDaoImage from "@/assets/image/default-dao-img.jpg";
import { network } from "@/config";
import { DaoDaoCoreQueryClient } from "@/codegen/DaoDaoCore.client";
import { ArrayOfProposalModule } from "@/codegen/DaoDaoCore.types";
import ProposalItem from "@/components/ProposalItem";
import { DaoProposalSingleQueryClient } from "@/codegen/DaoProposalSingle.client";
import { ProposalListResponse } from "@/codegen/DaoProposalSingle.types";
import { Cw20StakeQueryClient } from "@/codegen/Cw20Stake.client";
import StakingModal from "@/components/StakingModal";
import { DaoVotingCw20StakedQueryClient } from "@/codegen/DaoVotingCw20Staked.client";
import { presentDecimal } from "@/utils/decimalToken";
import { Cw20BaseQueryClient } from "@oraichain/common-contracts-sdk";

const DaoPage = () => {
	const router = useRouter();
	const { getCosmWasmClient, getSigningCosmWasmClient, status, address } =
		useChain(network.chainName);

	const [daoContractInfo, setDaoContractInfo] = useState<{
		name: string;
		description: string;
		imageUrl?: string | null;
		proposalModules: ArrayOfProposalModule;
		listProposal: ProposalListResponse;
		totalProposal: number;
		tokenAddr: string;
		stakingAddr: string;
		tokenDenom: string;
	} | null>(null);
	const [userStaked, setUserStaked] = useState<{
		stakedToken: string;
		rewardToken: string;
	} | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [reloadBalance, setReloadBalance] = useState<boolean>(false);

	console.log(reloadBalance);

	useEffect(() => {
		const getDaoInfo = async () => {
			if (router.isReady && typeof router.query.id === "string") {
				const client = await getCosmWasmClient();
				const daoClient = new DaoDaoCoreQueryClient(client, router.query.id);
				const config = await daoClient.config();
				const proposalModules = await daoClient.proposalModules({});
				const votingModule = await daoClient.votingModule();

				const proposalClient = new DaoProposalSingleQueryClient(
					client,
					proposalModules[0].address
				);
				const listProposal = await proposalClient.listProposals({});
				const totalProposal = await proposalClient.proposalCount();

				const votingClient = new DaoVotingCw20StakedQueryClient(
					client,
					votingModule
				);
				const tokenAddr = await votingClient.tokenContract();
				const stakingAddr = await votingClient.stakingContract();

				const cw20Token = new Cw20BaseQueryClient(client, tokenAddr);
				const tokenInfo = await cw20Token.tokenInfo();

				setDaoContractInfo({
					name: config.name,
					description: config.description,
					imageUrl: config.image_url,
					proposalModules,
					listProposal,
					totalProposal: Number(totalProposal),
					tokenAddr,
					stakingAddr,
					tokenDenom: tokenInfo.symbol,
				});
			}
		};

		getDaoInfo();
	}, [router.isReady]);

	useEffect(() => {
		const getStakingInfo = async () => {
			setLoading(true);

			if (daoContractInfo !== null && address) {
				const client = await getCosmWasmClient();
				const block = await client.getBlock();
				console.log(block.header.height);
				const stakingClient = new Cw20StakeQueryClient(
					client,
					daoContractInfo.stakingAddr
				);

				const stakedToken = await stakingClient.stakedBalanceAtHeight({
					address: address,
					height: block.header.height + 1,
				});
				const totalUserToken = await stakingClient.stakedValue({
					address: address,
				});
				const rewardToken =
					parseInt(totalUserToken.value) - parseInt(stakedToken.balance);

				console.log(stakedToken, totalUserToken);

				setUserStaked({
					stakedToken: stakedToken.balance,
					rewardToken: rewardToken.toString(),
				});
			} else {
				setUserStaked({
					stakedToken: "0",
					rewardToken: "0",
				});
			}
			setLoading(false);
		};

		getStakingInfo();
	}, [daoContractInfo, address, reloadBalance]);

	const handleChangeToCreateProposal = () => {
		if (daoContractInfo) {
			const href = {
				pathname: "/create-proposal/[id]",
				query: { id: daoContractInfo.proposalModules[0].address },
			};
			router.push(href);
		}
	};

	return (
		<div className="h-full" id="dao">
			<div className="flex flex-col">
				{daoContractInfo === null ? (
					<div className="w-full min-h-screen flex justify-center items-start text-primary-grey">
						<LoadingOutlined className="text-[40px] mt-40 " />
					</div>
				) : (
					<>
						<div className="h-full flex flex-col justify-center items-center px-10 pb-8 border-b border-primary-grey-bg">
							<div className="w-[112px] h-[112px] rounded-[999px] overflow-hidden mt-6">
								{daoContractInfo.imageUrl ? (
									<img src={daoContractInfo.imageUrl} alt="dao image" />
								) : (
									<Image
										src={DefaultDaoImage}
										alt="dao img"
										className="w-[112px] h-[112px]"
									/>
								)}
							</div>

							<h1 className="mt-4 text-[25px] font-semibold">
								{daoContractInfo.name}
							</h1>
							{/* <p className="text-[18px] text-primary-grey font-semibold">
                Est. September 8
              </p> */}
							<p className="text-[16px] font-medium mt-4 text-[#374151]">
								{daoContractInfo.description}
							</p>
							<div className="w-full flex justify-around items-center">
								{/* <div className="flex flex-col mt-10 gap-2 items-center">
                  <BankOutlined className="text-[30px] " />
                  <div className="flex gap-3 items-center">
                    <p className="text-sm text-primary-grey">DAO Treasury</p>
                    <ExclamationCircleOutlined className="text-sm" />
                  </div>
                  <p className="text-lg font-medium text-secondary-grey">
                    $102.25 M est. USD value
                  </p>
                </div> */}

								<div className="flex flex-col mt-10 gap-2 items-center">
									{loading ? (
										<LoadingOutlined className="text-xl" />
									) : (
										<>
											<DollarOutlined className="text-[24px]" />
											<div className="flex gap-3 items-center">
												<p className="text-sm text-primary-grey">
													Staked token:
												</p>
												<p className="text-sm font-medium text-secondary-grey">
													{presentDecimal(userStaked!.stakedToken) +
														" $" +
														daoContractInfo.tokenDenom}
												</p>
											</div>
											<div className="flex gap-3 items-center mt-1">
												<p className="text-sm text-primary-grey">
													Reward token:
												</p>
												<p className="text-sm font-medium text-secondary-grey">
													{presentDecimal(userStaked!.rewardToken) +
														" $" +
														daoContractInfo.tokenDenom}
												</p>
											</div>
										</>
									)}
								</div>
							</div>
						</div>

						<div className="py-6 flex items-center justify-between border-b border-primary-grey-bg">
							<h1 className="text-[17px] text-secondary-grey font-semibold">
								Manage your token
							</h1>
							<StakingModal
								token_addr={daoContractInfo.tokenAddr}
								staking_addr={daoContractInfo.stakingAddr}
								token_denom={daoContractInfo.tokenDenom}
								reloadBalance={reloadBalance}
								setReloadBalance={setReloadBalance}
							/>
						</div>

						<div className="py-6 flex items-center justify-between border-b border-primary-grey-bg">
							<h1 className="text-[17px] text-secondary-grey font-semibold">
								Create a proposal
							</h1>
							<Button
								className="flex items-center"
								onClick={handleChangeToCreateProposal}
							>
								<PlusOutlined /> <p className="inline-block">New proposal</p>
							</Button>
						</div>

						<div className="py-6 flex flex-col items-start justify-between gap-8">
							<h1 className="text-[17px] text-secondary-grey font-semibold">
								Proposals
							</h1>
							<div className="flex flex-col gap-5 w-full">
								<h1 className="text-[15px] text-third-grey ml-4 font-semibold">
									History {daoContractInfo.totalProposal} proposals
								</h1>
								<div className="w-full flex flex-col gap-2">
									{daoContractInfo.listProposal.proposals.map((proposal) => (
										<ProposalItem
											key={proposal.id}
											addr={daoContractInfo.proposalModules[0].address}
											proposalId={proposal.id}
											proposalInfo={proposal.proposal}
										/>
									))}
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default DaoPage;
