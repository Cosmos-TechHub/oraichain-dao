import React, { useEffect, useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Select } from "antd";

import {
	getVotingConfig,
	setVotingConfig,
} from "@/utils/localStorageCreateDao";

export interface IVotingBasicChoice {
	name: string;
	description: string;
	icon: string;
	options: Array<{ value: string; label: string }>;
	defaultOption: string;
}

const VotingBasicChoice = ({
	name,
	description,
	icon,
	options,
	defaultOption,
}: IVotingBasicChoice) => {
	const votingConfig = getVotingConfig();

	const [configValue, setConfigValue] = useState<number>(() => {
		switch (name) {
			case "Unstaking period":
				if (votingConfig && votingConfig.unstake_period.value) {
					return votingConfig.unstake_period.value;
				}
			case "Voting duration":
				if (votingConfig && votingConfig.voting_duration.value) {
					return votingConfig.voting_duration.value;
				}
			default:
				break;
		}

		return 1;
	});
	const [type, setType] = useState<string>(() => {
		switch (name) {
			case "Unstaking period":
				if (votingConfig && votingConfig.unstake_period.type) {
					return votingConfig.unstake_period.type;
				}
			case "Voting duration":
				if (votingConfig && votingConfig.voting_duration.type) {
					return votingConfig.voting_duration.type;
				}
			default:
				break;
		}

		return defaultOption;
	});

	const handleChange = (value: string) => {
		setType(value);
	};

	useEffect(() => {
		if (votingConfig) {
			switch (name) {
				case "Unstaking period":
					const newUnstakeInfo = {
						...votingConfig,
						unstake_period: {
							type: type,
							value: configValue,
						},
					};
					setVotingConfig(newUnstakeInfo);
					break;
				case "Voting duration":
					const newVotingInfo = {
						...votingConfig,
						voting_duration: {
							type: type,
							value: configValue,
						},
					};
					setVotingConfig(newVotingInfo);
					break;
				default:
					break;
			}
		}
	}, [configValue, type]);

	return (
		<div id="voting-choice">
			<div className="w-full py-4 text-[60px] border-b border-secondary-grey-bg flex justify-center">
				{icon}
			</div>
			<div className="flex-1 flex flex-col px-6 pt-1 pb-6 gap-4">
				<h1 className="text-base text-secondary-grey font-medium">{name}</h1>
				<p className="text-[15px] text-primary-grey">{description}</p>
			</div>

			<div className="grid grid-cols-3 px-6 pb-2 gap-3">
				<div className="col-span-2 flex items-center justify-between px-4 border border-primary-grey-bg gap-4 py-1 rounded-lg">
					<div className="flex items-center gap-6">
						<button
							className="text-base"
							onClick={() => setConfigValue((old) => old + 1)}
						>
							<PlusOutlined />
						</button>
						<button
							className="text-base"
							onClick={() => setConfigValue((old) => (old === 1 ? 1 : old - 1))}
						>
							<MinusOutlined />
						</button>
					</div>
					<input
						type="text"
						value={configValue.toString()}
						onChange={(e) => {
							if(e.target.value.trim() === "") {
								setConfigValue(1)
							} else {
								setConfigValue(parseInt(e.target.value))
							}
						}}
						className="w-[40%] py-1 text-right text-base outline-none bg-transparent"
					/>
				</div>
				<Select
					defaultValue={type}
					onChange={handleChange}
					options={options}
					className="col-span-1"
				/>
			</div>
		</div>
	);
};

export default VotingBasicChoice;
