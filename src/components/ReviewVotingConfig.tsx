import React from "react";

interface IReviewVotingConfig {
    icon: string;
    title: string;
    description: string;
}

const ReviewVotingConfig = ({icon, title, description}: IReviewVotingConfig) => {
	return (
		<div className="w-full p-4 flex justify-between items-center bg-secondary-grey-bg rounded-xl">
			<div className="flex gap-4 items-center">
				<h1 className="text-xl">{icon}</h1>
				<p className="text-base text-third-grey font-medium">
					{title}
				</p>
			</div>
			<div className="px-[10px] py-[6px] rounded-2xl bg-primary-grey-bg text-[15px] text-secondary-grey font-medium">
				{description}
			</div>
		</div>
	);
};

export default ReviewVotingConfig;
