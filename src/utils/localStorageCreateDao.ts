import { InstantiateMsg as DaoInitMsg } from "@/codegen/DaoDaoCore.types";
import { InstantiateMsg as VotingInitMsg } from "@/codegen/DaoVotingCw20Staked.types";
import {
	StakingInfo,
	Cw20Coin,
	Uint128,
	InstantiateMarketingInfo,
	Duration,
} from "@/codegen/types";

type ExistToken = {
	address: string;
	staking_contract: StakingInfo;
};

type NewToken = {
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

type getCreateDaoInfo = () => DaoInitMsg | null;
type getVotingCreateInfo = () => VotingInitMsg | null;
type getExistToken = () => ExistToken | null;
type getNewToken = () => NewToken | null;

export const getCreateDaoInfo: getCreateDaoInfo = () => {
	const daoInfo = localStorage.getItem("createDaoInfo");

	if (daoInfo === "undefined" || daoInfo === null) {
		return null;
	} else {
		return JSON.parse(daoInfo);
	}
};

export const setCreateDaoInfo = (daoInfo: DaoInitMsg) => {
	localStorage.setItem("createDaoInfo", JSON.stringify(daoInfo));
};

export const getVotingCreateInfo: getVotingCreateInfo = () => {
	const votingInfo = localStorage.getItem("createVotingInfo");

	if (votingInfo === "undefined" || votingInfo === null) {
		return null;
	} else {
		return JSON.parse(votingInfo);
	}
};

export const setCreateVotingInfo = (votingInfo: VotingInitMsg) => {
	localStorage.setItem("createVotingInfo", JSON.stringify(votingInfo));
};

export const getExistToken: getExistToken = () => {
	const existToken = localStorage.getItem("existToken");

	if (existToken === "undefined" || existToken === null) {
		return null;
	} else {
		return JSON.parse(existToken);
	}
};

export const setExistToken = (existToken: ExistToken) => {
	localStorage.setItem("existToken", JSON.stringify(existToken));
};

export const getNewToken: getNewToken = () => {
	const newToken = localStorage.getItem("newToken");

	if (newToken === "undefined" || newToken === null) {
		return null;
	} else {
		return JSON.parse(newToken);
	}
};

export const setNewToken = (newToken: NewToken) => {
	localStorage.setItem("newToken", JSON.stringify(newToken));
};