import React, { useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Select, Switch } from "antd";

export interface IVotingChoice {
	name: string;
	description: string;
	icon: string;
	options: Array<{ value: string; label: string }>;
	defaultOption: string;
	disabled?: boolean;
}

const VotingChoice = ({
	name,
	description,
	icon,
	options,
	defaultOption,
	disabled = false,
}: IVotingChoice) => {
	const [configValue, setConfigValue] = useState<number>(1);
	const [isDisable, setIsDisable] = useState<boolean>(disabled);

	const handleChange = (value: string) => {
		switch (value) {
			case "true":
				setIsDisable(true);
				break;
			case "false":
				setIsDisable(false);
				break;
		}
	};

	const onChange = (checked: boolean) => {
		if(name === "Active Threshold") {
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

	return (
		<div id="voting-choice">
			<div className="w-full py-4 text-[60px] border-b border-secondary-grey-bg flex justify-center">
				{icon}
			</div>
			<div className="flex-1 flex flex-col px-6 pt-1 pb-6 gap-4">
				<h1 className="text-base text-secondary-grey font-medium">{name}</h1>
				<p className="text-[15px] text-primary-grey">{description}</p>
			</div>

			{disabled && (
				<div className="flex items-center justify-between mx-4 px-[10px] py-2 bg-secondary-grey-bg rounded-lg my-2">
					<DisabledComponent name={name} isDisable={isDisable} />
					<Switch
						onChange={onChange}
						defaultChecked={name === "Active Threshold" ? !disabled : disabled}
						className="text-base"
					/>
				</div>
			)}

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
							type="number"
							value={configValue}
							onChange={(e) => setConfigValue(parseInt(e.target.value))}
							className="w-[40%] py-1 text-right text-base outline-none bg-transparent"
						/>
					</div>
					<Select
						defaultValue={defaultOption}
						onChange={handleChange}
						options={options}
						className="col-span-1"
					/>
				</div>
			)}
		</div>
	);
};

export default VotingChoice;
