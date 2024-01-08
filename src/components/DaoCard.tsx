import React, { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BankOutlined, FileTextOutlined } from "@ant-design/icons";
import { useChain } from "@cosmos-kit/react";
import { LoadingOutlined } from "@ant-design/icons";

import DaoImage from "@/assets/image/dao.png";
import OraiImage from "@/assets/image/new-orai.png";
import OraiDex from "@/assets/image/oraidex.webp";
import { network } from "@/config";
import { DaoDaoCoreQueryClient } from "@/codegen/DaoDaoCore.client";
import { DaoProposalSingleQueryClient } from "@/codegen/DaoProposalSingle.client";

interface IDaoCard {
	daoInfo: {
		dao_addr: string;
		voting_addr: string;
		proposal_addr: string;
		token_addr: string;
		staking_addr: string;
	};
}

const DaoCard = ({ daoInfo }: IDaoCard) => {
	const [daoContractInfo, setDaoContractInfo] = useState<{
		name: string;
		description: string;
		image_url?: string | null;
		proposal_count: number;
	} | null>(null);

	const { getCosmWasmClient } = useChain(network.chainName);

	useEffect(() => {
		const getDaoClient = async () => {
			const client = await getCosmWasmClient();
			const newDaoClient = new DaoDaoCoreQueryClient(client, daoInfo.dao_addr);

			if (newDaoClient !== null) {
				try {
					const config = await newDaoClient.config();
					const proposals = await newDaoClient.proposalModules({});
					const proposalClient = new DaoProposalSingleQueryClient(
						client,
						proposals[0].address
					);
					const totalProposal = await proposalClient.proposalCount();

					setDaoContractInfo({
						name: config.name,
						description: config.description,
						image_url: config.image_url,
						proposal_count: Number(totalProposal),
					});
				} catch (err: any) {
					console.log(err);
				}
			}
		};

		getDaoClient();
	}, [getCosmWasmClient]);

	return (
		<Link
			id="dao-card"
			href={
				daoContractInfo
					? { pathname: "/dao/[id]", query: { id: daoInfo.dao_addr } }
					: "/"
			}
			className="w-[268px] min-h-[286px] p-8 rounded-lg flex flex-col gap-10 justify-around items-center bg-secondary-grey-bg hover:bg-primary-grey-bg"
		>
			{daoContractInfo === null ? (
				<LoadingOutlined className="text-[48px] text-primary-grey" />
			) : (
				<>
					<div className="flex flex-col items-center">
						{daoContractInfo.image_url ? (
							<div className="w-[98px] h-[98px] mb-3 rounded-[999px] overflow-hidden">
								<img
									src={daoContractInfo.image_url}
									alt="dao image"
									className="w-full h-full mb-3"
								/>
							</div>
						) : (
							<Image
								src={OraiDex}
								alt="dao image"
								className="w-[98px] h-[98px] mb-3"
							/>
						)}

						<h1 className="text-base text-black font-medium">
							{daoContractInfo.name}
						</h1>
						{/* <p className="text-xs text-primary-grey font-medium">September 8</p> */}
						<p className="text-sm text-primary-grey font-medium mt-2">
							{daoContractInfo.description}
						</p>
					</div>
					<div className="flex flex-col w-full gap-2 text-primary-grey">
						{/* <div className="flex text-sm items-center w-full gap-2">
              <div>
                <BankOutlined />
              </div>
              <h1>$ 102.25 M est. USD</h1>
            </div> */}
						<div className="flex text-sm items-center w-full gap-2">
							<div>
								<FileTextOutlined />
							</div>
							<h1 className="font-medium">
								{daoContractInfo.proposal_count} proposals
							</h1>
						</div>
					</div>
				</>
			)}
		</Link>
	);
};

export default DaoCard;
