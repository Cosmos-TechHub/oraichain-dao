import React, { useEffect, useState } from "react";
import {
	PicLeftOutlined,
	CheckOutlined,
	CloseOutlined,
	BorderOuterOutlined,
} from "@ant-design/icons";
import { Button, Form, Radio } from "antd";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import ProposalInfo from "@/components/ProposalInfo";
import { useChain } from "@cosmos-kit/react";
import { network } from "@/config";
import {
	DaoProposalSingleClient,
	DaoProposalSingleQueryClient,
} from "@/codegen/DaoProposalSingle.client";
import { SingleChoiceProposal } from "@/codegen/types";
import { DaoDaoCoreQueryClient } from "@/codegen/DaoDaoCore.client";
import { Config } from "@/codegen/DaoDaoCore.types";

const Proposal = () => {
	const { getCosmWasmClient, getSigningCosmWasmClient, status, address } =
		useChain(network.chainName);
	const router = useRouter();

	const [proposalQueryClient, setProposalQueryClient] =
		useState<DaoProposalSingleQueryClient | null>(null);
	const [proposalPathInfo, setProposalPathInfo] = useState<{
		proposal_addr: string;
		proposal_id: string;
	} | null>(null);
	const [proposalInfo, setProposalInfo] = useState<SingleChoiceProposal | null>(
		null
	);
	const [daoConfig, setDaoConfig] = useState<Config>();
	const [loadingVote, setLoadingVote] = useState(false);

	const onFinish = async (values: any) => {
		console.log("Success:", values);

		try {
			if (address && proposalPathInfo) {
				setLoadingVote(true);

				const client = await getSigningCosmWasmClient();
				const proposalClient = new DaoProposalSingleClient(
					client,
					address,
					proposalPathInfo.proposal_addr
				);
				await proposalClient.vote({
					proposalId: Number(proposalPathInfo.proposal_id),
					vote: values.voting,
				});

				toast.success("Vote success !", {
					position: toast.POSITION.TOP_RIGHT,
				});
				if (proposalQueryClient) {
					const proposal = await proposalQueryClient.proposal({
						proposalId: Number(proposalPathInfo.proposal_id),
					});
					setProposalInfo(proposal.proposal);
				}
			}
		} catch (err: any) {
			// console.log(err.message);
      const message = err.message

			toast.error(JSON.stringify(message), {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
		setLoadingVote(false);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	type FieldType = {
		voting?: string;
	};

	useEffect(() => {
		const getProposalInfo = async () => {
			if (router.isReady && router.query.id) {
				const routerPath = router.query.id;

				const client = await getCosmWasmClient();
				const newProposalClient = new DaoProposalSingleQueryClient(
					client,
					routerPath[0]
				);
				const dao = await newProposalClient.dao();
				const daoClient = new DaoDaoCoreQueryClient(client, dao);
				const daoConfig = await daoClient.config();
				const proposal = await newProposalClient.proposal({
					proposalId: Number(routerPath[1]),
				});

				setProposalQueryClient(newProposalClient);
				setProposalPathInfo({
					proposal_addr: routerPath[0],
					proposal_id: routerPath[1],
				});
				setProposalInfo(proposal.proposal);
				setDaoConfig(daoConfig);
			}
		};

		getProposalInfo();
	}, [router]);

	console.log(proposalInfo);

	return (
		<div id="proposal">
			<div className="col-span-3 flex flex-col gap-8">
				<div className="flex flex-col gap-3 text-third-grey ">
					<div className="flex items-center gap-3">
						<PicLeftOutlined className="text-[20px]" />
						<h1 className="text-lg">Status</h1>
					</div>
					<p className="pr-6 text-base">
						If the current vote stands, this proposal will fail due to a lack of
						voter participation.
					</p>
				</div>

				<ProposalInfo daoName={daoConfig?.name} proposal={proposalInfo} />

				{status === "Connected" &&
					proposalInfo &&
					(proposalInfo.status === "open" ||
						proposalInfo.status === "passed") && (
						<div className="pt-8 border-t border-secondary-grey-bg">
							<Form
								name="basic"
								labelCol={{ span: 24 }}
								wrapperCol={{ span: 24 }}
								style={{ maxWidth: 600 }}
								initialValues={{ remember: true }}
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
								autoComplete="off"
							>
								<Form.Item<FieldType> label="Voting" name="voting">
									<Radio.Group>
										<Radio value="yes">
											<span>Yes</span>
											<CheckOutlined className="text-[20px]" />
										</Radio>
										<Radio value="no">
											<span>No</span>
											<CloseOutlined className="text-[20px]" />
										</Radio>
										<Radio value="abstain">
											<span>Abstain</span>
											<BorderOuterOutlined className="text-[20px]" />
										</Radio>
									</Radio.Group>
								</Form.Item>

								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										loading={loadingVote}
									>
										Cast your vote
									</Button>
								</Form.Item>
							</Form>
						</div>
					)}
			</div>

			<div className="col-span-5 flex flex-col">
				<h1 className="text-secondary-grey text-[32px] mb-12 font-bold">
					{proposalInfo?.title}
				</h1>
				<div className="flex flex-col gap-6">
					{/* <p className="text-[16px] text-third-grey font-medium">November 30</p> */}
					<p className="text-base text-secondary-grey pr-6 tracking-wider leading-6">
						{proposalInfo?.description}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Proposal;
