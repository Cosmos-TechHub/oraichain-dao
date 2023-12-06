import Image from "next/image";
import { Inter } from "next/font/google";

// import { network, daoInfo } from "@/config";
import DaoCard from "@/components/DaoCard";
import { daoInfo, network, voterAddress } from "@/config";
import { useChain } from "@cosmos-kit/react";
import { Cw20BaseClient } from "@oraichain/common-contracts-sdk";
import { toBinary } from "@cosmjs/cosmwasm-stargate";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const {
  //   connect,
  //   openView,
  //   getSigningCosmWasmClient,
  //   status,
  //   username,
  //   address,
  //   message,
  //   wallet,
  //   chain: chainInfo,
  // } = useChain(network.chainName);
  // console.log(status);

  // const [stakingBalance, setStakingBalance] = useState<number>(0);
  // const [proposal, setProposal] = useState<ProposalResponse | null>(null);

  // const handleConnect = () => {
  //   openView();
  // };

  // const handleStakeToken = async () => {
  //   const client = await getSigningCosmWasmClient();

  //   if (address !== undefined) {
  //     const cw20Client = new Cw20BaseClient(
  //       client,
  //       address,
  //       daoInfo.tokenAddress
  //     );
  //     await cw20Client.send({
  //       contract: daoInfo.stakingAddress,
  //       amount: "100",
  //       msg: toBinary({
  //         stake: {},
  //       }),
  //     });

  //     const { balance } = await cw20Client.balance({
  //       address: daoInfo.stakingAddress,
  //     });
  //     setStakingBalance(Number(balance));
  //   }
  // };

  // const handleMakeProposal = async () => {
  //   const client = await getSigningCosmWasmClient();

  //   if (address !== undefined) {
  //     const proposalClient = new DaoProposalSingleClient(
  //       client,
  //       address,
  //       daoInfo.proposalAddress
  //     );
  //     await proposalClient.propose({
  //       title: "Test proposal",
  //       description: "Test propose",
  //       msgs: [],
  //     });
  //     const proposalId = Number(await proposalClient.nextProposalId()) - 1;
  //     const proposal = await proposalClient.proposal({ proposalId });
  //     setProposal(proposal);
  //   }
  // };

  // const handleVoting = async () => {
  //   const client = await getSigningCosmWasmClient();

  //   if (address !== undefined) {
  //     const proposalClient = new DaoProposalSingleClient(
  //       client,
  //       address,
  //       daoInfo.proposalAddress
  //     );
  //     const proposalId = Number(await proposalClient.nextProposalId()) - 1;
  //     await proposalClient.vote({
  //       proposalId,
  //       vote: "yes",
  //     });
  //     const proposal = await proposalClient.proposal({ proposalId });
  //     setProposal(proposal);
  //   }
  // };

  const { getSigningCosmWasmClient, address } = useChain(network.chainName);

  const handleStakeToken = async () => {
    const client = await getSigningCosmWasmClient();
    if (address) {
      const cw20Client = new Cw20BaseClient(
        client,
        address,
        daoInfo.token_addr
      );
      await cw20Client.send({
        contract: daoInfo.staking_addr,
        amount: "100",
        msg: toBinary({
          stake: {},
        }),
      });

      const { balance } = await cw20Client.balance({
        address: daoInfo.staking_addr,
      });
      console.log(balance);
      
    }
  };

  const handleSendToAlice = async () => {
    const client = await getSigningCosmWasmClient();
    if (address) {
      const cw20Client = new Cw20BaseClient(
        client,
        address,
        daoInfo.token_addr
      );
      await cw20Client.transfer({
        amount: '10000',
        recipient: voterAddress.alice //alice
      });

      const { balance } = await cw20Client.balance({
        address: voterAddress.alice,
      });
      console.log(balance);
      
    }
  }

  const handleSendToBob = async () => {
    const client = await getSigningCosmWasmClient();
    if (address) {
      const cw20Client = new Cw20BaseClient(
        client,
        address,
        daoInfo.token_addr
      );
      await cw20Client.transfer({
        amount: '10000',
        recipient: voterAddress.bob //bob
      });

      const { balance } = await cw20Client.balance({
        address: voterAddress.bob, // bob
      });
      console.log(balance);
      
    }
  }

  return (
    <div id="home" className="flex flex-col">
      <h1 className="text-[20px] font-semibold mb-8">Featured DAOs</h1>
      <div className="w-full">
        <DaoCard daoInfo={daoInfo} />
      </div>
      {/* <div className="mt-6 flex gap-6">
        <button onClick={handleStakeToken}>stake token</button>
        <button onClick={handleSendToAlice}>send token to alice</button>
        <button onClick={handleSendToBob}>send token to bob</button>
      </div> */}
    </div>
  );
}
