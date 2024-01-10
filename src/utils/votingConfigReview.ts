import type { VotingConfig } from "./localStorageCreateDao";

type VotingConfigReview = (votingConfig: VotingConfig) => Array<{
	icon: string;
	title: string;
	description: string;
}>;

export const votingConfigReview: VotingConfigReview = (
	votingConfig: VotingConfig
) => {
	return [
		{
			icon: "⏰",
			title: "Unstaking period",
			description: votingConfig
				? `${votingConfig.unstake_period.value} ${votingConfig.unstake_period.type}`
				: "",
		},
		{
			icon: "⏳",
			title: "Voting duration",
			description: votingConfig
				? `${votingConfig.voting_duration.value} ${votingConfig.voting_duration.type}`
				: "",
		},
		{
			icon: "🎬",
			title: "Active Threshold",
			description: votingConfig
				? votingConfig.active_threadhole.disabled
					? "Disabled"
					: votingConfig.active_threadhole.type === "percentage"
					? `${votingConfig.active_threadhole.value} %`
					: `${votingConfig.active_threadhole.value} tokens`
				: "",
		},
		{
			icon: "🗳️",
			title: "Passing threshold",
			description: votingConfig
				? votingConfig.passing_threadhole.majority
					? "Majority (>50%)"
					: `${votingConfig.passing_threadhole.value} ${votingConfig.passing_threadhole.type}`
				: "",
		},
		{
			icon: "📣",
			title: "Quorum",
			description: votingConfig
				? votingConfig.quorum.majority
					? "Majority (>50%)"
					: `${votingConfig.quorum.value} ${votingConfig.quorum.type}`
				: "",
		},
	];
};
