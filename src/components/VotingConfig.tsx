import React, { useState } from "react";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { WarningFilled, ArrowLeftOutlined } from "@ant-design/icons";

import DaoBasicInfo from "./DaoBasicInfo";
import VotingAdvanceChoice from "./VotingAdvanceChoice";
import VotingBasicChoice from "./VotingBasicChoice";
import { votingChoiceConfig, votingChoiceAdvanceConfig } from "@/config";

interface IVotingConfig {
	setPagination: React.Dispatch<React.SetStateAction<number>>;
}

const VotingConfig = ({ setPagination }: IVotingConfig) => {
	const [showAdvanceConfig, setShowAdvanceConfig] = useState<boolean>(false);

	const onChange = (e: CheckboxChangeEvent) => {
		setShowAdvanceConfig(e.target.checked);
	};

	return (
		<div id="voting-config">
			<DaoBasicInfo />
			<div className="w-full flex flex-col gap-10">
				<h1 className="text-[17px] text-secondary-grey font-medium">
					Voting configuration
				</h1>
				<div className="grid grid-cols-3 gap-10">
					{votingChoiceConfig.map((choiceConfig, index) => (
						<VotingBasicChoice
							key={index}
							name={choiceConfig.name}
							description={choiceConfig.description}
							icon={choiceConfig.icon}
							options={choiceConfig.options}
							defaultOption={choiceConfig.defaultOption}
						/>
					))}
				</div>
			</div>

			<div className="w-full flex flex-col border-y border-secondary-grey-bg py-10 gap-10">
				<div className="flex items-center justify-between">
					<h1 className="text-[17px] font-medium text-secondary-grey">
						Advanced configuration
					</h1>
					<div className="flex items-center justify-between gap-6">
						<p className="text-base">Show advanced settings</p>
						<Checkbox onChange={onChange}></Checkbox>
					</div>
				</div>

				{showAdvanceConfig && (
					<>
						<div className="flex flex-col gap-2 px-6 py-4 bg-primary-yellow rounded-lg">
							<div className="flex items-center gap-4 text-secondary-yellow">
								<WarningFilled className="text-xl" />
								<h1 className="text-[17px] font-medium">Watch out!</h1>
							</div>
							<p className="text-secondary-yellow font-medium">
								These are advanced features. If you configure them without fully
								understanding how they work, you can lock your DAO, making it
								impossible for proposals to pass.
							</p>
						</div>

						<div className="grid grid-cols-3 gap-10">
							{votingChoiceAdvanceConfig.map((choiceConfig, index) => (
								<VotingAdvanceChoice
									key={index}
									name={choiceConfig.name}
									description={choiceConfig.description}
									icon={choiceConfig.icon}
									options={choiceConfig.options}
									defaultOption={choiceConfig.defaultOption}
								/>
							))}
						</div>
					</>
				)}
			</div>

			<div className="flex justify-between items-center pt-10">
				<button
					className="px-4 py-[6px] bg-primary-grey-bg text-black rounded-md flex items-center gap-2 hover:opacity-90"
					onClick={() => setPagination((prevPagination) => prevPagination - 1)}
				>
					<ArrowLeftOutlined />
					<p>Go back</p>
				</button>
				<button
					className="px-6 py-[6px] bg-secondary-grey text-white rounded-md"
					onClick={() => setPagination((prevPagination) => prevPagination + 1)}
				>
					Continue
				</button>
			</div>
		</div>
	);
};

export default VotingConfig;
