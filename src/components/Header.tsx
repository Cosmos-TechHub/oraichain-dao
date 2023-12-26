import { useChain } from "@cosmos-kit/react";
import { Button } from "antd";
import { WalletStatus } from "@cosmos-kit/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { network } from "@/config";
import { DaoDaoCoreQueryClient } from "@/codegen/DaoDaoCore.client";
import { DaoProposalSingleQueryClient } from "@/codegen/DaoProposalSingle.client";

const Header = () => {
  const { connect, openView, status, getCosmWasmClient } = useChain(
    network.chainName
  );
  const router = useRouter();

  const handleConnectWallet = async () => {
    await connect();
  };

  const [daoInfo, setdaoInfo] = useState<{
    dao_addr: string;
    dao_name: string;
  }>();
  const [headerTitle, setHeaderTitle] = useState<string>("");

  useEffect(() => {
    const getHeaderTitle = async () => {
      if (router.isReady) {
        // const client = await getCosmWasmClient();
        const header = router.pathname.split("/");
        console.log(header);

        let headerTitle: string = "";

        switch (header.at(1)) {
          case "":
            headerTitle = "Home";
            break;
          case "dao":
            // const daoAddr = router.query.id as string;
            // const daoClient = new DaoDaoCoreQueryClient(client, daoAddr);
            // const daoConfig = await daoClient.config();
            // headerTitle = daoConfig.name + " DAO";
            // headerTitle.toUpperCase();
            // setdaoInfo({ dao_addr: daoAddr, dao_name: daoConfig.name });
            headerTitle = "ORAIX Governance"
            break;
          case "proposal":
            // const proposalInfo = router.query.id as string[];
            // const proposalClient = new DaoProposalSingleQueryClient(
            //   client,
            //   proposalInfo[0]
            // );
            // const proposal = await proposalClient.proposal({
            //   proposalId: parseInt(proposalInfo[1]),
            // });

            // const proposalDao = await proposalClient.dao();

            // if (!daoInfo || daoInfo.dao_addr !== proposalDao) {
            //   const proposalDaoClient = new DaoDaoCoreQueryClient(
            //     client,
            //     proposalDao
            //   );
            //   const proposalDaoConfig = await proposalDaoClient.config();
            //   headerTitle =
            //     proposalDaoConfig.name + " > " + proposal.proposal.title;
            // } else {
            //   headerTitle = daoInfo.dao_name + " > " + proposal.proposal.title;
            // }
            headerTitle = "Proposal"
            break;
          case "create-proposal":
            // const createProposalInfo = router.query.id as string;
            // const createProposalClient = new DaoProposalSingleQueryClient(
            //   client,
            //   createProposalInfo
            // );
            // const createProposalDao = await createProposalClient.dao();

            // if (!daoInfo || daoInfo.dao_addr !== createProposalDao) {
            //   const createProposalDaoClient = new DaoDaoCoreQueryClient(
            //     client,
            //     createProposalDao
            //   );
            //   const createProposalDaoConfig =
            //     await createProposalDaoClient.config();
            //   headerTitle = createProposalDaoConfig.name + " > create proposal";
            // } else {
            //   headerTitle = daoInfo.dao_name + " > create proposal";
            // }
            headerTitle = "Create proposal"
            break;
          case "create-dao":
            headerTitle = "Create DAO"
          default:
            break;
        }

        setHeaderTitle(headerTitle);
      }
    };

    getHeaderTitle();
  }, [router]);

  const ConnectButton = ({ walletStatus }: { walletStatus: WalletStatus }) => {
    switch (walletStatus) {
      case WalletStatus.Disconnected:
        return <Button onClick={handleConnectWallet}>Connect wallet</Button>;
      case WalletStatus.Connecting:
        return <Button loading>Connecting</Button>;
      case WalletStatus.Connected:
        return <Button onClick={() => openView()}>Disconnect</Button>;
      default:
        return <Button onClick={() => openView()}>Connect wallet</Button>;
    }
  };

  const HeaderTitle = ({title} : {title: string[]}) => {

  }

  return (
    <div id="header">
      <h1 className="text-[24px] font-semibold">{headerTitle}</h1>
      <div>
        <ConnectButton walletStatus={status} />
      </div>
    </div>
  );
};

export default Header;
