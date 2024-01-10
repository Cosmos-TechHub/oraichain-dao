import React, { useEffect, useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Select, Switch } from "antd";
import {
	getVotingConfig,
	setVotingConfig,
} from "@/utils/localStorageCreateDao";

export interface IVotingAdvanceChoice {
	name: string;
	description: string;
	icon: string;
	options: Array<{ value: string; label: string }>;
	defaultOption: string;
}

const VotingAdvanceChoice = ({
	name,
	description,
	icon,
	options,
	defaultOption,
}: IVotingAdvanceChoice) => {
	const votingConfig = getVotingConfig();

	const [configValue, setConfigValue] = useState<number>(() => {
		switch (name) {
			case "Active Threshold":
				if (votingConfig && votingConfig.active_threadhole.value) {
					return votingConfig.active_threadhole.value;
				}
			case "Passing threshold":
				if (votingConfig && votingConfig.passing_threadhole.value) {
					return votingConfig.passing_threadhole.value;
				}
			case "Quorum":
				if (votingConfig && votingConfig.quorum.value) {
					return votingConfig.quorum.value;
				}
			default:
				break;
		}

		return 1;
	});
	const [isDisable, setIsDisable] = useState<boolean>(() => {
		switch (name) {
			case "Active Threshold":
				if (votingConfig && votingConfig.active_threadhole) {
					return votingConfig.active_threadhole.disabled;
				}
			case "Passing threshold":
				if (votingConfig && votingConfig.passing_threadhole) {
					return votingConfig.passing_threadhole.majority;
				}
			case "Quorum":
				if (votingConfig && votingConfig.quorum) {
					return votingConfig.quorum.majority;
				}
			default:
				break;
		}

		return false;
	});
	const [type, setType] = useState<string>(() => {
		switch (name) {
			case "Active Threshold":
				if (votingConfig && votingConfig.active_threadhole.type) {
					return votingConfig.active_threadhole.type;
				}
			case "Passing threshold":
				if (votingConfig && votingConfig.passing_threadhole.type) {
					return votingConfig.passing_threadhole.type;
				}
			case "Quorum":
				if (votingConfig && votingConfig.quorum.type) {
					return votingConfig.quorum.type;
				}
			default:
				break;
		}

		return defaultOption;
	});

	const handleChange = (value: string) => {
		setType(value);
	};

	const onChange = (checked: boolean) => {
		if (name === "Active Threshold") {
			setIsDisable(!checked);
		} else {
			setIsDisable(checked);
		}
	};

	const DisabledComponent = ({
		name,
		isDisable,
	}: {
		name: string;
		isDisable: boolean;
	}) => {
		switch (name) {
			case "Active Threshold":
				return isDisable ? (
					<p className="text-third-grey font-medium">Disabled</p>
				) : (
					<p className="text-third-grey font-medium">Enabled</p>
				);
			case "Passing threshold":
			case "Quorum":
				return (
					<p className="text-third-grey font-medium">Majority {"(>50%)"}</p>
				);
		}
	};

	useEffect(() => {
		if (votingConfig) {
			switch (name) {
				case "Active Threshold":
					const newActiveThreadholeInfo = {
						...votingConfig,
						active_threadhole: {
							disabled: isDisable,
							type: type,
							value: configValue,
						},
					};
					setVotingConfig(newActiveThreadholeInfo);
					break;
				case "Passing threshold":
					const newPassingThreadhole = {
						...votingConfig,
						passing_threadhole: {
							majority: isDisable,
							type: type,
							value: configValue,
						},
					};
					setVotingConfig(newPassingThreadhole);
					break;
				case "Quorum":
					const newQuorum = {
						...votingConfig,
						quorum: {
							majority: isDisable,
							type: type,
							value: configValue,
						},
					};
					setVotingConfig(newQuorum);
					break;
				default:
					break;
			}
		}
	}, [isDisable, configValue, type]);

	return (
		<div id="voting-choice">
			<div className="w-full py-4 text-[60px] border-b border-secondary-grey-bg flex justify-center">
				{icon}
			</div>
			<div className="flex-1 flex flex-col px-6 pt-1 pb-6 gap-4">
				<h1 className="text-base text-secondary-grey font-medium">{name}</h1>
				<p className="text-[15px] text-primary-grey">{description}</p>
			</div>

			<div className="flex items-center justify-between mx-4 px-[10px] py-2 bg-secondary-grey-bg rounded-lg my-2">
				<DisabledComponent name={name} isDisable={isDisable} />
				<Switch
					onChange={onChange}
					defaultChecked={name === "Active Threshold" ? !isDisable : isDisable}
					className="text-base"
				/>
			</div>

			{!isDisable && (
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
								onClick={() =>
									setConfigValue((old) => (old === 1 ? 1 : old - 1))
								}
							>
								<MinusOutlined />
							</button>
						</div>
						<input
							type="text"
							value={configValue.toString()}
							onChange={(e) => {
								if (e.target.value.trim() === "") {
									setConfigValue(1);
								} else {
									setConfigValue(parseInt(e.target.value));
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
			)}
		</div>
	);
};

export default VotingAdvanceChoice;
