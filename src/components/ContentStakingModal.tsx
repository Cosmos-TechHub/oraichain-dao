import React, { ChangeEvent } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

import { Duration } from "@/codegen/types";
import { presentDecimal } from "@/utils/decimalToken";

interface IContentStakingModal {
	token: string;
	activeTab: string;
	balance: string;
	stakedBalance: string;
	unstakePeriod: Duration | null;
	setToken: React.Dispatch<React.SetStateAction<string>>;
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ContentStakingModal = ({
	token,
	activeTab,
	balance,
	stakedBalance,
	unstakePeriod,
	setToken,
	handleChange,
}: IContentStakingModal) => {
	return (
		<div className="flex flex-col mt-3 gap-6">
			<h1 className="text-[19px] font-semibold">Choose token amount</h1>
			<div className="grid grid-cols-2">
				<div className="w-full flex items-center justify-center gap-6 text-primary-grey">
					<button
						className="text-lg p-2"
						onClick={() =>
							setToken((prev) =>
								parseFloat((parseFloat(prev) + 1).toString())
									.toFixed(6)
									.toString()
							)
						}
					>
						<PlusOutlined />
					</button>
					<button
						className="text-lg p-2"
						onClick={() =>
							setToken((prev) => {
								if (parseFloat(prev) - 1 < 0.000001) {
									return prev;
								} else {
									return parseFloat((parseFloat(prev) - 1).toString())
										.toFixed(6)
										.toString();
								}
							})
						}
					>
						<MinusOutlined />
					</button>
				</div>
				<div className="grid grid-cols-2 gap-2 items-center text-lg px-2">
					<input
						type="text"
						name="token"
						defaultValue={token}
						onBlur={handleChange}
						className="outline-none text-right text-base col-span-1"
					/>
					<p className="text-primary-grey text-base">$ORAIX</p>
				</div>
			</div>
			<h1 className="text-base text-primary-grey pb-6 border-b border-secondary-grey-bg">
				Your balance:{" "}
				{activeTab === "1"
					? presentDecimal(balance)
					: presentDecimal(stakedBalance)}{" "}
				$ORAIX
			</h1>
			{unstakePeriod && (
				<div className="border-b border-secondary-grey-bg pb-6">
					<h1 className="text-lg text-third-grey mb-6">
						Unstaking period: 2 weeks
					</h1>
					<p className="text-[19px] text-third-grey">
						It will take 2 weeks from the time you unstake your tokens before
						they are able to be redeemed by you. During that time, you will not
						receive staking rewards. You will not be able to cancel the
						unbonding.
					</p>
				</div>
			)}
		</div>
	);
};

export default ContentStakingModal;
