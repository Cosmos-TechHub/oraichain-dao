import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  BankOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useChain } from "@cosmos-kit/react";

import DaoImage from "@/assets/image/dao.png";
import { network } from "@/config";
import { DaoDaoCoreQueryClient } from "@/codegen/DaoDaoCore.client";
import { ArrayOfProposalModule } from "@/codegen/DaoDaoCore.types";
import ProposalItem from "@/components/ProposalItem";
import { DaoProposalSingleQueryClient } from "@/codegen/DaoProposalSingle.client";
import { ProposalListResponse } from "@/codegen/DaoProposalSingle.types";

const DaoPage = () => {
  const router = useRouter();
  const { getCosmWasmClient, getSigningCosmWasmClient, status, address } =
    useChain(network.chainName);

  const [daoContractInfo, setDaoContractInfo] = useState<{
    name: string;
    description: string;
    imageUrl?: string | null;
    proposalModules: ArrayOfProposalModule;
    listProposal: ProposalListResponse;
    totalProposal: number;
  } | null>(null);

  useEffect(() => {
    const getDaoInfo = async () => {
      if (router.isReady && typeof router.query.id === "string") {
        const client = await getCosmWasmClient();
        const daoClient = new DaoDaoCoreQueryClient(client, router.query.id);
        const config = await daoClient.config();
        const proposalModules = await daoClient.proposalModules({});

        const proposalClient = new DaoProposalSingleQueryClient(
          client,
          proposalModules[0].address
        );
        const listProposal = await proposalClient.listProposals({});
        const totalProposal = await proposalClient.proposalCount();

        setDaoContractInfo({
          name: config.name,
          description: config.description,
          imageUrl: config.image_url,
          proposalModules,
          listProposal,
          totalProposal: Number(totalProposal),
        });
      }
    };

    getDaoInfo();
  }, [router]);

  const handleChangeToCreateProposal = () => {
    if (daoContractInfo) {
      const href = {
        pathname: "/create-proposal/[id]",
        query: { id: daoContractInfo.proposalModules[0].address },
      };
      router.push(href);
    }
  };

  return (
    <div className="h-full" id="dao">
      <div className="flex flex-col">
        {daoContractInfo === null ? (
          <div className="w-full min-h-screen flex justify-center items-start text-custom-grey">
            <LoadingOutlined className="text-[60px] mt-40 " />
          </div>
        ) : (
          <>
            <div className="h-full flex flex-col justify-center items-center px-10 pb-8 border-b border-custom-grey-hover">
              <Image
                src={
                  daoContractInfo.imageUrl ? daoContractInfo.imageUrl : DaoImage
                }
                alt="dao img"
                className="w-[134px] h-[134px]"
              />
              <h1 className="mt-4 text-[32px] font-semibold">
                {daoContractInfo.name}
              </h1>
              <p className="text-[18px] text-custom-grey font-semibold">
                Est. September 8
              </p>
              <p className="text-[18px] font-medium mt-4 text-[#374151]">
                {daoContractInfo.description}
              </p>
              <div className="flex flex-col mt-10 gap-2 items-center">
                <BankOutlined className="text-[30px] " />
                <div className="flex gap-3 items-center">
                  <p className="text-sm text-custom-grey">DAO Treasury</p>
                  <ExclamationCircleOutlined className="text-sm" />
                </div>
                <p className="text-lg font-medium text-custom-black-grey">
                  $82.61M est. USD value
                </p>
              </div>
            </div>
            <div className="py-6 flex items-center justify-between border-b border-custom-grey-hover">
              <h1 className="text-[20px] text-custom-black-grey font-semibold">
                Create a proposal
              </h1>
              <Button
                className="flex items-center"
                onClick={handleChangeToCreateProposal}
              >
                <PlusOutlined /> <p className="inline-block">New proposal</p>
              </Button>
            </div>
            <div className="py-6 flex flex-col items-start justify-between gap-8">
              <h1 className="text-[20px] text-custom-black-grey font-semibold">
                Proposals
              </h1>
              <div className="flex flex-col gap-5 w-full">
                <h1 className="text-[18px] text-custom-grey-grey ml-4 font-semibold">
                  History {daoContractInfo.totalProposal} prposals
                </h1>
                <div className="w-full flex flex-col gap-2">
                  {daoContractInfo.listProposal.proposals.map((proposal) => (
                    <ProposalItem
                      key={proposal.id}
                      addr={daoContractInfo.proposalModules[0].address}
                      proposalId={proposal.id}
                      proposalInfo={proposal.proposal}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DaoPage;
