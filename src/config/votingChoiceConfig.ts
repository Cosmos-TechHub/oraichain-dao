export const votingChoiceConfig = [
	{
		name: "Unstaking period",
		description:
			"In order to vote, members must stake their tokens with the DAO. Members who would like to leave the DAO or trade their governance tokens must first unstake them. This setting configures how long members have to wait after unstaking their tokens for those tokens to become available. The longer you set this duration, the more sure you can be sure that people who register their tokens are keen to participate in your DAO's governance.",
        icon: "⏰",
        options: [
            { value: "second", label: "second" },
            { value: "minute", label: "minute" },
            { value: "hour", label: "hour" },
            { value: "day", label: "day" },
            { value: "week", label: "week" },
            { value: "month", label: "month" },
            { value: "year", label: "year" },
        ],
        defaultOption: "week",
	},
    {
		name: "Voting duration",
		description:
			"The amount of time proposals are open for voting. A low proposal duration may increase the speed at which your DAO can pass proposals. Setting the duration too low may make it difficult for proposals to pass as voters will have limited time to vote. After this time elapses, the proposal will either pass or fail.",
        icon: "⏳",
        options: [
            { value: "second", label: "second" },
            { value: "minute", label: "minute" },
            { value: "hour", label: "hour" },
            { value: "day", label: "day" },
            { value: "week", label: "week" },
            { value: "month", label: "month" },
            { value: "year", label: "year" },
        ],
        defaultOption: "week"
	},
];

export const votingChoiceAdvanceConfig = [
	{
		name: "Active Threshold",
		description:
			"The amount of voting power that needs to be staked in order for the DAO to become active (i.e. proposal creation is allowed).",
        icon: "🎬",
        disabled: true,
        options: [
            { value: "count", label: "Count" },
            { value: "percentage", label: "%" },
        ],
        defaultOption: "count"
	},
    {
		name: "Passing threshold",
		description:
			"The proportion of those who voted on a single choice proposal who must vote 'Yes' for it to pass.",
        icon: "🗳️",
        disabled: true,
        options: [
            { value: "percentage", label: "%" },
        ],
        defaultOption: "percentage"
	},
    {
		name: "Quorum",
		description:
			"The minimum percentage of voting power that must vote on a proposal for it to be considered. For example, in the US House of Representatives, 218 members must be present for a vote. If you have a DAO with many inactive members, setting this value too high may make it difficult to pass proposals.",
        icon: "📣",
        disabled: true,
        options: [
            { value: "percentage", label: "%" },
        ],
        defaultOption: "percentage"
	},
];