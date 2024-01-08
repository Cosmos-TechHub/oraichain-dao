import type { VotingConfig } from "./localStorageCreateDao";

type MaxVotingPeriod = (votingConfig: VotingConfig) => number;
type UnstakePeriod = (votingConfig: VotingConfig) => number;

export const maxVotingPeriod: MaxVotingPeriod = (
	votingConfig: VotingConfig
) => {
	if (votingConfig.voting_duration.value) {
		switch (votingConfig.voting_duration.type) {
			case "second":
				return votingConfig.voting_duration.value;

			case "minute":
				return votingConfig.voting_duration.value * 60;

			case "hour":
				return votingConfig.voting_duration.value * 60 * 60;

			case "day":
				return votingConfig.voting_duration.value * 60 * 60 * 24;

			case "week":
				return votingConfig.voting_duration.value * 60 * 60 * 24 * 7;

			case "month":
				return votingConfig.voting_duration.value * 60 * 60 * 24 * 30;

			case "year":
				return votingConfig.voting_duration.value * 60 * 60 * 24 * 365;
			default:
				return 0;
		}
	}
	return 0;
};

export const unstakePeriod: UnstakePeriod = (
	votingConfig: VotingConfig
) => {
	if (votingConfig.unstake_period.value) {
		switch (votingConfig.unstake_period.type) {
			case "second":
				return votingConfig.unstake_period.value;

			case "minute":
				return votingConfig.unstake_period.value * 60;

			case "hour":
				return votingConfig.unstake_period.value * 60 * 60;

			case "day":
				return votingConfig.unstake_period.value * 60 * 60 * 24;

			case "week":
				return votingConfig.unstake_period.value * 60 * 60 * 24 * 7;

			case "month":
				return votingConfig.unstake_period.value * 60 * 60 * 24 * 30;

			case "year":
				return votingConfig.unstake_period.value * 60 * 60 * 24 * 365;
			default:
				return 0;
		}
	}
	return 0;
};
