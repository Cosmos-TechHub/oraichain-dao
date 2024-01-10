import type {
	VotingConfig,
	NewToken,
	ExistToken,
} from "./localStorageCreateDao";
import { InstantiateMsg } from "@/codegen/DaoVotingCw20Staked.types";
import { ActiveThreshold, Duration, TokenInfo } from "@/codegen/types";
import { unstakePeriod } from "./maxVotingPeriod";

type VotingInitMsg = (
	votingInfo: InstantiateMsg,
	votingConfig: VotingConfig,
	newToken: NewToken,
	existToken: ExistToken
) => InstantiateMsg;

export const votingInitMsg: VotingInitMsg = (
	votingInfo: InstantiateMsg,
	votingConfig: VotingConfig,
	newToken: NewToken,
	existToken: ExistToken
) => {
	let activeThreadhole: ActiveThreshold | null = {} as any;
	let tokenInfo: TokenInfo;

	if (votingConfig.active_threadhole.disabled) {
		activeThreadhole = null;
	} else {
		switch (votingConfig.active_threadhole.type) {
			case "count":
				activeThreadhole = {
					absolute_count: {
						count: votingConfig.active_threadhole.value.toString(),
					},
				};
				break;
			case "%":
				activeThreadhole = {
					percentage: {
						percent: (votingConfig.active_threadhole.value / 100).toString(),
					},
				};
				break;
			default:
				break;
		}
	}

	if (existToken.address) {
		const staking = existToken.staking_contract as {
			new: {
				staking_code_id: number;
				unstaking_duration?: Duration | null;
			};
		};
		tokenInfo = {
			existing: {
				...existToken,
				staking_contract: {
					new: {
						...staking.new,
						unstaking_duration: { time: unstakePeriod(votingConfig) },
					},
				},
			},
		};
	} else {
		tokenInfo = {
			new: {
				...newToken,
				unstaking_duration: { time: unstakePeriod(votingConfig) },
			},
		};
	}

	const initMsg = {
		...votingInfo,
		active_threshold: activeThreadhole,
		token_info: tokenInfo,
	};

	return initMsg;
};
