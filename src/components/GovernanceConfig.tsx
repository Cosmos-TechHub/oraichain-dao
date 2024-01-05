import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { UserOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import DaoBasicInfo from "./DaoBasicInfo";
 
interface IGovernanceConfig {
	setPagination: React.Dispatch<React.SetStateAction<number>>;
}

const GovernanceConfig = ({ setPagination }: IGovernanceConfig) => {
	const CreateToken = () => {
		return (
			<div className="w-full flex flex-col gap-10">
				<div className="w-full flex flex-col bg-secondary-grey-bg px-6 py-4 gap-6 rounded-xl">
					<h1 className="text-base font-medium">Token definition</h1>
					<div className="grid grid-cols-8 px-6 border-b border-secondary-grey-bg">
						<div className="col-span-3 flex flex-col gap-3 pr-12 pb-10 pt-4 border-r border-secondary-grey-bg">
							<p className="text-third-grey font-medium">Symbol</p>
							<div className="flex items-center gap-2">
								<p className="text-third-grey text-[19px]">$</p>
								<input
									type="text"
									name="symbol"
									placeholder="An aplphanumeric symbol (e.g. DDT)"
									className="flex-1 px-4 py-[6px] rounded-lg outline-none bg-transparent border border-primary-grey-bg"
								/>
							</div>
						</div>

						<div className="col-span-5 flex flex-col gap-3 pl-12 pb-10 pt-4">
							<p className="text-third-grey font-medium">Name</p>
							<div className="flex items-center gap-2">
								<input
									type="text"
									name="symbol"
									placeholder='Longer name of your token (e.g. "Dog Dao token")'
									className="flex-1 px-4 py-[6px] rounded-lg outline-none bg-transparent border border-primary-grey-bg"
								/>
							</div>
						</div>
					</div>

					<div className="flex items-center justify-between pb-[18px] border-b border-secondary-grey-bg">
						<h1 className="text-base font-medium">Total token supply</h1>
						<div className="flex items-center gap-2">
							<input
								type="text"
								name="token"
								className="outline-none pl-4 py-[6px] text-right text-third-grey font-medium text-base bg-transparent"
							/>
							<p className="text-third-grey font-medium text-base">$TOKEN</p>
						</div>
					</div>

					<div className="flex flex-col pb-4 gap-5">
						<div className="flex items-center justify-between">
							<h1 className="text-base font-medium">Treasury percent</h1>
							<div className="flex items-center gap-2">
								<input
									type="text"
									name="token"
									className="outline-none pl-4 py-[6px] text-right text-third-grey font-medium text-base bg-transparent"
								/>
								<p className="text-third-grey font-medium text-lg">%</p>
							</div>
						</div>
						<p className="text-third-grey">
							9,000,000 tokens will be minted. 10% will be sent to members
							according to the distribution below. The remaining 90% will go to
							the DAO's treasury, where they can be distributed later via
							governance proposals.
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-6">
					<h1 className="text-lg text-secondary-grey font-medium">
						Initial Token Distribution
					</h1>
					<div className="flex flex-col gap-6">
						<div className="grid grid-cols-8 items-center gap-6 justify-around px-6">
							<div className="col-span-2 flex items-center gap-2">
								<UserOutlined className="text-xl" />
								<p className="text-base text-third-grey font-medium">
									orai123...456
								</p>
							</div>
							<div className="col-span-5 bg-red-300 h-full w-[50%]"></div>
							<p className="text-lg font-medium text-third-grey col-span-1">
								10%
							</p>
						</div>

						<div className="grid grid-cols-8 items-center gap-6 justify-around px-6">
							<h1 className="col-span-2 text-[17px] font-medium text-third-grey">
								Dao treasury
							</h1>
							<div className="col-span-5 bg-primary-grey-bg h-full w-[50%]"></div>
							<p className="col-span-1 text-lg font-medium text-third-grey">
								10%
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const ExistingToken = () => {
		return (
			<div className="px-6 pt-4 pb-8 bg-secondary-grey-bg rounded-lg flex flex-col gap-6">
				<h1 className="text-base font-medium text-secondary-grey">
					Token identifier
				</h1>
				<input
					type="text"
					name="token-address"
					placeholder="Your token address (e.g. orai1u4l...3qxm3)"
					className="px-4 py-[10px] rounded-lg outline-none bg-transparent border border-primary-grey-bg"
				/>
			</div>
		);
	};

	const onChange = (key: string) => {
		console.log(key);
	};

	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "Create a token",
			children: <CreateToken />,
		},
		{
			key: "2",
			label: "Use an existing token",
			children: <ExistingToken />,
		},
	];

	return (
		<div id="governance-config">
			<DaoBasicInfo />

			<div className="w-full py-4 flex flex-col gap-6">
				<h1 className="text-[17px] font-medium">Governance configuration</h1>
				<Tabs defaultActiveKey="1" items={items} onChange={onChange} />
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

export default GovernanceConfig;
