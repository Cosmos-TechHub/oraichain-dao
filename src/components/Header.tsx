import { useChain } from "@cosmos-kit/react";
import { MouseEventHandler } from "react";
import { Button } from "antd";
import { WalletStatus } from "@cosmos-kit/core";

import { network } from "@/config";

const Header = () => {
  const {
    connect,
    openView,
    status,
    username,
    address,
    message,
    wallet,
    chain: chainInfo,
  } = useChain(network.chainName);
  console.log(status);
  

  const handleConnectWallet = async () => {
    await connect();
  };

  const ConnectButton = ({
    walletStatus,
  }: {
    walletStatus: WalletStatus;
  }) => {
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

  return (
    <div
      id="header"
    >
      <h1 className="text-[26px] font-semibold">DAO SIMPLE</h1>
      <div className="mr-32">
        <ConnectButton walletStatus={status} />
      </div>
    </div>
  );
};

export default Header;
