import Image from "next/image";
import { Inter } from "next/font/google";
import { useChain } from "@cosmos-kit/react";
import { toBinary } from "@cosmjs/cosmwasm-stargate";
import { Cw20BaseClient } from "@oraichain/common-contracts-sdk";

import { network, daoInfo } from "@/config";
import { useLayoutEffect, useState } from "react";

import { ProposalResponse } from "../codegen/DaoProposalSingle.types";
import { DaoProposalSingleClient } from "../codegen/DaoProposalSingle.client";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    connect,
    openView,
    getSigningCosmWasmClient,
    status,
    username,
    address,
    message,
    wallet,
    chain: chainInfo,
  } = useChain(network.chainName);
  console.log(status);

  const [stakingBalance, setStakingBalance] = useState<number>(0);
  const [proposal, setProposal] = useState<ProposalResponse | null>(null);

  const handleConnect = () => {
    openView();
  };

  const handleStakeToken = async () => {
    const client = await getSigningCosmWasmClient();

    if (address !== undefined) {
      const cw20Client = new Cw20BaseClient(
        client,
        address,
        daoInfo.tokenAddress
      );
      await cw20Client.send({
        contract: daoInfo.stakingAddress,
        amount: "100",
        msg: toBinary({
          stake: {},
        }),
      });

      const { balance } = await cw20Client.balance({
        address: daoInfo.stakingAddress,
      });
      setStakingBalance(Number(balance));
    }
  };

  const handleMakeProposal = async () => {
    const client = await getSigningCosmWasmClient();

    if (address !== undefined) {
      const proposalClient = new DaoProposalSingleClient(
        client,
        address,
        daoInfo.proposalAddress
      );
      await proposalClient.propose({
        title: "Test proposal",
        description: "Test propose",
        msgs: [],
      });
      const proposalId = Number(await proposalClient.nextProposalId()) - 1;
      const proposal = await proposalClient.proposal({ proposalId });
      setProposal(proposal);
    }
  };

  const handleVoting = async () => {
    const client = await getSigningCosmWasmClient();

    if (address !== undefined) {
      const proposalClient = new DaoProposalSingleClient(
        client,
        address,
        daoInfo.proposalAddress
      );
      const proposalId = Number(await proposalClient.nextProposalId()) - 1;
      await proposalClient.vote({
        proposalId,
        vote: "yes",
      });
      const proposal = await proposalClient.proposal({ proposalId });
      setProposal(proposal);
    }
  };

  return (
    <div>
      <div>
        <h1>Connect wallet status</h1>
        <button className="bg-slate-300" onClick={handleConnect}>
          {status !== "Connected" ? "connect" : `connected address: ${address}`}
        </button>
      </div>
      {status === "Connected" ? (
        <>
          <div className="mt-5 grid grid-flow-row gap-5">
            <div>
              <h1>
                Stake token before make proposal (dafault stake 100 token)
              </h1>
              <button className="bg-slate-300" onClick={handleStakeToken}>
                stake token
              </button>
              <h1>staked status: staked {stakingBalance} token</h1>
            </div>
            <div>
              <h1>Make default proposal</h1>
              <button className="bg-slate-300" onClick={handleMakeProposal}>
                make proposal
              </button>
              <h1>
                Proposal status: {proposal ? JSON.stringify(proposal) : "null"}
              </h1>
            </div>
            <div>
              <h1>Voting for proposal</h1>
              <button className="bg-slate-300" onClick={handleVoting}>
                Vote default yes
              </button>
            </div>
          </div>
          <div className="mt-10 text-[24px] uppercase">
            Proposal status:{" "}
            <p className="text-red-500 inline-block">
              {proposal ? proposal.proposal.status : "null"}
            </p>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}
