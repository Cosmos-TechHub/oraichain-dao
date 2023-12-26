import React, { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BankOutlined, FileTextOutlined } from "@ant-design/icons";
import { useChain } from "@cosmos-kit/react";
import { LoadingOutlined } from "@ant-design/icons";

import DaoImage from "@/assets/image/dao.png";
import OraiImage from '@/assets/image/new-orai.png'
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
      className="w-64 min-h-[328px] p-8 rounded-lg flex flex-col gap-5 justify-around items-center bg-secondary-grey-bg hover:bg-primary-grey-bg"
    >
      {daoContractInfo === null ? (
        <LoadingOutlined className="text-[48px] text-primary-grey" />
      ) : (
        <>
          <div className="flex flex-col items-center">
            <Image
              src={
                daoContractInfo.image_url ? daoContractInfo.image_url : OraiImage
              }
              alt="dao image"
              className="w-[104px] h-[104px] mb-1"
            />
            <h1 className="text-base text-black font-medium">
              {daoContractInfo.name}
            </h1>
            <p className="text-xs text-primary-grey font-medium">September 8</p>
            <p className="text-sm text-primary-grey font-medium">
              {daoContractInfo.description}
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 text-primary-grey">
            <div className="flex text-sm items-center w-full gap-2">
              <div>
                <BankOutlined />
              </div>
              <h1>$ 102.25 M est. USD</h1>
            </div>
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
