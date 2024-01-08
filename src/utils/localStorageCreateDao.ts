import { InstantiateMsg as DaoInitMsg } from "@/codegen/DaoDaoCore.types";
import { InstantiateMsg as VotingInitMsg } from "@/codegen/DaoVotingCw20Staked.types";
import { InstantiateMsg as ProposalInitMsg } from "@/codegen/DaoProposalSingle.types";
import {
	StakingInfo,
	Cw20Coin,
	Uint128,
	InstantiateMarketingInfo,
	Duration,
} from "@/codegen/types";

export type ExistToken = {
	address: string;
	staking_contract: StakingInfo;
};
export type NewToken = {
	code_id: number;
	decimals: number;
	initial_balances: Cw20Coin[];
	initial_dao_balance?: Uint128 | null;
	label: string;
	marketing?: InstantiateMarketingInfo | null;
	name: string;
	staking_code_id: number;
	symbol: string;
	unstaking_duration?: Duration | null;
};
export type VotingConfig = {
	unstake_period: {
		type: string;
		value: number;
	};
	voting_duration: {
		type: string;
		value: number;
	};
	active_threadhole: {
		disabled: boolean;
		type: string;
		value: number;
	};
	passing_threadhole: {
		majority: boolean;
		type: string;
		value: number;
	};
	quorum: {
		majority: boolean;
		type: string;
		value: number;
	};
};

type getCreateDaoInfo = () => DaoInitMsg | null;
type getVotingCreateInfo = () => VotingInitMsg | null;
type getProposalCreateInfo = () => ProposalInitMsg | null;
type getExistToken = () => ExistToken | null;
type getNewToken = () => NewToken | null;
type getVotingConfig = () => VotingConfig | null;
type getDao = () => Array<{
	dao_addr: string;
	voting_addr: string;
	proposal_addr: string;
	token_addr: string;
	staking_addr: string;
}> | null;

export const getCreateDaoInfo: getCreateDaoInfo = () => {
	if (typeof window !== "undefined") {
		const daoInfo = localStorage.getItem("createDaoInfo");
		if (daoInfo === "undefined" || daoInfo === null) {
			return null;
		} else {
			return JSON.parse(daoInfo);
		}
	}
	return null;
};

export const setCreateDaoInfo = (daoInfo: DaoInitMsg) => {
	localStorage.setItem("createDaoInfo", JSON.stringify(daoInfo));
};

export const getVotingCreateInfo: getVotingCreateInfo = () => {
	if (typeof window !== "undefined") {
		const votingInfo = localStorage.getItem("createVotingInfo");
		if (votingInfo === "undefined" || votingInfo === null) {
			return null;
		} else {
			return JSON.parse(votingInfo);
		}
	}
	return null;
};

export const setCreateVotingInfo = (votingInfo: VotingInitMsg) => {
	localStorage.setItem("createVotingInfo", JSON.stringify(votingInfo));
};

export const getExistToken: getExistToken = () => {
	if (typeof window !== "undefined") {
		const existToken = localStorage.getItem("existToken");
		if (existToken === "undefined" || existToken === null) {
			return null;
		} else {
			return JSON.parse(existToken);
		}
	}
	return null;
};

export const setExistToken = (existToken: ExistToken) => {
	localStorage.setItem("existToken", JSON.stringify(existToken));
};

export const getNewToken: getNewToken = () => {
	if (typeof window !== "undefined") {
		const newToken = localStorage.getItem("newToken");
		if (newToken === "undefined" || newToken === null) {
			return null;
		} else {
			return JSON.parse(newToken);
		}
	}
	return null;
};

export const setNewToken = (newToken: NewToken) => {
	localStorage.setItem("newToken", JSON.stringify(newToken));
};

export const getProposalCreateInfo: getProposalCreateInfo = () => {
	if (typeof window !== "undefined") {
		const proposalInfo = localStorage.getItem("createProposalInfo");
		if (proposalInfo === "undefined" || proposalInfo === null) {
			return null;
		} else {
			return JSON.parse(proposalInfo);
		}
	}
	return null;
};

export const setProposalCreateInfo = (proposalInfo: ProposalInitMsg) => {
	localStorage.setItem("createProposalInfo", JSON.stringify(proposalInfo));
};

export const getVotingConfig: getVotingConfig = () => {
	if (typeof window !== "undefined") {
		const votingConfig = localStorage.getItem("votingConfig");
		if (votingConfig === "undefined" || votingConfig === null) {
			return null;
		} else {
			return JSON.parse(votingConfig);
		}
	}
	return null;
};

export const setVotingConfig = (votingConfig: VotingConfig) => {
	localStorage.setItem("votingConfig", JSON.stringify(votingConfig));
};

export const getDao: getDao = () => {
	if (typeof window !== "undefined") {
		const daoInfo = localStorage.getItem("daoInfo");
		if (daoInfo === "undefined" || daoInfo === null) {
			return null;
		} else {
			return JSON.parse(daoInfo);
		}
	}
	return null;
}

export const setDao = (daoInfo: {
	dao_addr: string;
	voting_addr: string;
	proposal_addr: string;
	token_addr: string;
	staking_addr: string;
}) => {
	const dao = getDao();
	let newDao = []
	if(dao) {
		newDao = [...dao, daoInfo]
	} else {
		newDao = [daoInfo]
	}
	localStorage.setItem("daoInfo", JSON.stringify(newDao));
};