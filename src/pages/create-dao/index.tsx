import React, { useEffect, useState } from "react";
import { useChain } from "@cosmos-kit/react";
import Image from "next/image";
import { LoadingOutlined } from "@ant-design/icons";

import PickDaoType from "@/components/PickDaoType";
import GovernanceConfig from "@/components/GovernanceConfig";
import VotingConfig from "@/components/VotingConfig";
import CreateDaoReview from "@/components/CreateDaoReview";
import {
	getCreateDaoInfo,
	setCreateDaoInfo,
	getNewToken,
	setNewToken,
	getExistToken,
	setExistToken,
	getVotingCreateInfo,
	setCreateVotingInfo,
	getProposalCreateInfo,
	setProposalCreateInfo,
	getVotingConfig,
	setVotingConfig,
} from "@/utils/localStorageCreateDao";
import { network, codeId } from "@/config";
import ConnectWallet from "@/assets/image/connect-wallet.png";
import { startMoralisServer } from "@/services/moralis";

const CreateDao = () => {
	const { status, address } = useChain(network.chainName);

	const [pagination, setPagination] = useState<number>(1);

	const daoInfo = getCreateDaoInfo();
	const votingInfo = getVotingCreateInfo();
	const proposalInfo = getProposalCreateInfo();
	const newToken = getNewToken();
	const existToken = getExistToken();
	const votingConfig = getVotingConfig();

	if (!daoInfo) {
		const newDaoInfo = {
			admin: null,
			automatically_add_cw20s: true,
			automatically_add_cw721s: true,
		} as any;
		setCreateDaoInfo(newDaoInfo);
	}
	if (!votingInfo) {
		const newVotingInfo = {
			active_threshold: null,
		} as any;
		setCreateVotingInfo(newVotingInfo);
	}
	if (!proposalInfo) {
		const newProposalInfo = {
			allow_revoting: false,
			close_proposal_on_execution_failure: true,
			only_members_execute: true,
			pre_propose_info: {
				anyone_may_propose: {},
			},
			threshold: {
				threshold_quorum: {
					quorum: {
						majority: {},
					},
					threshold: {
						majority: {},
					},
				},
			},
		} as any;
		setProposalCreateInfo(newProposalInfo);
	}

	if (!newToken && address) {
		const newInfo = {
			code_id: codeId.cw20_base,
			decimals: 6,
			initial_balances: [{ address: address, amount: "1000000000000" }],
			staking_code_id: codeId.staking,
		} as any;
		setNewToken(newInfo);
	}
	if (!existToken) {
		const newInfo = {
			staking_contract: {
				new: {
					staking_code_id: codeId.staking,
				},
			},
		} as any;
		setExistToken(newInfo);
	}
	if (!votingConfig) {
		const newInfo = {
			unstake_period: {
				type: "week",
				value: 1,
			},
			voting_duration: {
				type: "week",
				value: 1,
			},
			active_threadhole: {
				disabled: true,
				type: "count",
				value: 1,
			},
			passing_threadhole: {
				majority: true,
				type: "%",
				value: 1,
			},
			quorum: {
				majority: true,
				type: "%",
				value: 1,
			},
		};
		setVotingConfig(newInfo);
	}

	const CreateDaoPage = ({ pagination }: { pagination: number }) => {
		switch (pagination) {
			case 1:
				return <PickDaoType setPagination={setPagination} />;
			case 2:
				return <GovernanceConfig setPagination={setPagination} />;
			case 3:
				return <VotingConfig setPagination={setPagination} />;
			case 4:
				return <CreateDaoReview setPagination={setPagination} />;
			default:
				return <PickDaoType setPagination={setPagination} />;
		}
	};

	useEffect(() => {
		(async () => {
			startMoralisServer();
		})();
	}, []);

	return (
		<div id="create-dao" className="flex justify-center items-center">
			{status === "Connected" ? (
				<CreateDaoPage pagination={pagination} />
			) : status === "Connecting" ? (
				<div className="flex flex-col gap-10 justify-center items-center mt-28">
					<LoadingOutlined className="text-[26px] text-third-grey" />
				</div>
			) : (
				<div className="flex flex-col gap-10 justify-center items-center mt-28">
					<Image
						src={ConnectWallet}
						alt="connect wallet"
						className="w-[30%] h-[30%]"
					/>
					<h1 className="text-xl text-third-grey font-medium">
						Please connect wallet to create your Dao!
					</h1>
				</div>
			)}
		</div>
	);
};

export default CreateDao;
