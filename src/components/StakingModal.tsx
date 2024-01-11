import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal, Button, Tabs } from "antd";
import type { TabsProps } from "antd";
import {
	PlusOutlined,
	MinusOutlined,
	ArrowRightOutlined,
} from "@ant-design/icons";
import { useChain } from "@cosmos-kit/react";
import { toBinary } from "@cosmjs/cosmwasm-stargate";
import { toast } from "react-toastify";

import { network } from "@/config";
import {
	Cw20BaseClient,
	Cw20BaseQueryClient,
} from "@oraichain/common-contracts-sdk";
import {
	Cw20StakeClient,
	Cw20StakeQueryClient,
} from "@/codegen/Cw20Stake.client";
import { Duration } from "@/codegen/types";
import { presentDecimal } from "@/utils/decimalToken";
import ContentStakingModal from "./ContentStakingModal";

export interface IStakingModal {
	token_addr: string;
	staking_addr: string;
  token_denom: string;
	reloadBalance: boolean;
	setReloadBalance: React.Dispatch<React.SetStateAction<boolean>>;
}

const StakingModal = ({
	token_addr,
	staking_addr,
  token_denom,
	reloadBalance,
	setReloadBalance,
}: IStakingModal) => {
	const { getCosmWasmClient, getSigningCosmWasmClient, address } = useChain(
		network.chainName
	);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<string>("1");
	const [token, setToken] = useState<string>("0");
	const [balance, setBalance] = useState<string>("");
	const [stakedBalance, setStakedBalance] = useState<string>("");
	const [unstakePeriod, setUnstakedPeriod] = useState<Duration | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.value === "") {
			setToken("0");
		} else {
			setToken(event.target.value);
		}
	};

	console.log(parseFloat(token) * 1000000 < 0.000001);
	console.log(1.001 - 1.0);

	const Content = () => {
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
					<div className="grid grid-cols-2 gap-4 items-center text-lg px-2">
						<input
							type="text"
							name="token"
							defaultValue={token}
							onBlur={handleChange}
							className="outline-none text-right text-base col-span-1 px-2 py-[6px] rounded-lg border border-primary-grey-bg"
						/>
						<p className="text-primary-grey text-base">${token_denom}</p>
					</div>
				</div>
				<h1 className="text-base text-primary-grey pb-6 border-b border-secondary-grey-bg">
					Your balance:{" "}
					{activeTab === "1"
						? presentDecimal(balance)
						: presentDecimal(stakedBalance)}{" "}
					${token_denom}
				</h1>
				{/* {unstakePeriod && (
					<div className="border-b border-secondary-grey-bg pb-6">
						<h1 className="text-lg text-third-grey mb-6">
							Unstaking period: 2 weeks
						</h1>
						<p className="text-[19px] text-third-grey">
							It will take 2 weeks from the time you unstake your tokens before
							they are able to be redeemed by you. During that time, you will
							not receive staking rewards. You will not be able to cancel the
							unbonding.
						</p>
					</div>
				)} */}
			</div>
		);
	};
	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "Stake",
			children: (
				// <ContentStakingModal
				// 	token={token}
				// 	activeTab={activeTab}
				// 	balance={balance}
				// 	stakedBalance={stakedBalance}
				// 	unstakePeriod={unstakePeriod}
				// 	setToken={setToken}
				// 	handleChange={handleChange}
				// />
        <Content />
			),
		},
		{
			key: "2",
			label: "Unstake",
			children: (
				// <ContentStakingModal
				// 	token={token}
				// 	activeTab={activeTab}
				// 	balance={balance}
				// 	stakedBalance={stakedBalance}
				// 	unstakePeriod={unstakePeriod}
				// 	setToken={setToken}
				// 	handleChange={handleChange}
				// />
        <Content />
			),
		},
	];

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		const tokenToHandle = parseFloat(token) * 1000000;

		setLoading(true);
		try {
			if (address) {
				const client = await getSigningCosmWasmClient();

				switch (activeTab) {
					case "1":
						if (
							tokenToHandle > parseFloat(balance) ||
							tokenToHandle <= 0.000001
						) {
							toast.error("Token is too small or bigger than balance!", {
								position: toast.POSITION.TOP_RIGHT,
							});
						} else {
							const tokenClient = new Cw20BaseClient(
								client,
								address,
								token_addr
							);
							await tokenClient.send({
								amount: tokenToHandle.toString(),
								contract: staking_addr,
								msg: toBinary({
									stake: {},
								}),
							});
							toast.success("Stake token successful !", {
								position: toast.POSITION.TOP_RIGHT,
							});
						}
						break;
					case "2":
						if (
							tokenToHandle > parseFloat(stakedBalance) ||
							tokenToHandle <= 0.000001
						) {
							toast.error("Token is too small or bigger than balance!", {
								position: toast.POSITION.TOP_RIGHT,
							});
						} else {
							const stakingClient = new Cw20StakeClient(
								client,
								address,
								staking_addr
							);
							await stakingClient.unstake({ amount: tokenToHandle.toString() });
							toast.success("Unstake token successful !", {
								position: toast.POSITION.TOP_RIGHT,
							});
						}
						break;
					default:
						break;
				}
			}
		} catch (err: any) {
			console.log(err);
			toast.error(err, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
		setLoading(false);
		setToken("0");
		setIsModalOpen(false);
		setReloadBalance((prev) => !prev);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onChange = (key: string) => {
		setActiveTab(key);
	};

	useEffect(() => {
		const getInfo = async () => {
			if (address) {
				const client = await getCosmWasmClient();
				const block = await client.getBlock();
				const tokenClient = new Cw20BaseQueryClient(client, token_addr);
				const stakingClient = new Cw20StakeQueryClient(client, staking_addr);

				const tokenBalance = await tokenClient.balance({ address: address });
				const stakedBalance = await stakingClient.stakedBalanceAtHeight({
					address: address,
					height: block.header.height + 1,
				});
				const stakingConfig = await stakingClient.getConfig();

				setBalance(tokenBalance.balance);
				setStakedBalance(stakedBalance.balance);
				if (stakingConfig.unstaking_duration) {
					setUnstakedPeriod(stakingConfig.unstaking_duration);
				}
			} else {
				setBalance("0");
				setStakedBalance("0");
			}
		};

		getInfo();
	}, [address, reloadBalance]);

	return (
		<div>
			<Button type="primary" onClick={showModal}>
				Manage Token
			</Button>
			<Modal
				title="Manage Staking"
				centered={true}
				width={600}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Button
						key="submit"
						type="primary"
						onClick={handleOk}
						disabled={address ? false : true}
						loading={loading}
					>
						{activeTab === "1" ? "Stake" : "Unstake"}
					</Button>,
				]}
			>
				<Tabs activeKey={activeTab} items={items} onChange={onChange} />
			</Modal>
		</div>
	);
};

export default StakingModal;
