import Image from "next/image";
import { Inter } from "next/font/google";

// import { network, daoInfo } from "@/config";
import DaoCard from "@/components/DaoCard";
import {
  daoInfo,
  network,
  stakingRewardAddress,
  stakingRewardOraiX,
  voterAddress,
} from "@/config";
import { useChain } from "@cosmos-kit/react";
import { Cw20BaseClient } from "@oraichain/common-contracts-sdk";
import { toBinary } from "@cosmjs/cosmwasm-stargate";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/config/redux";
import { increment, decrement } from "@/reducers/counter";
import { Cw20StakeRewardDistributorClient } from "@/codegen/Cw20StakeRewardDistributor.client";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);
  const dao = useAppSelector((state) => state.dao);

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

  const handleShowBalance = async () => {
    const client = await getSigningCosmWasmClient();
    if (address) {
      const cw20Client = new Cw20BaseClient(
        client,
        address,
        daoInfo.token_addr
      );
      const { balance } = await cw20Client.balance({
        address: stakingRewardAddress,
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
        amount: "10000",
        recipient: voterAddress.alice, //alice
      });

      const { balance } = await cw20Client.balance({
        address: voterAddress.alice,
      });
      console.log(balance);
    }
  };

  const handleSendToBob = async () => {
    const client = await getSigningCosmWasmClient();
    if (address) {
      const cw20Client = new Cw20BaseClient(
        client,
        address,
        daoInfo.token_addr
      );
      await cw20Client.transfer({
        amount: "10000",
        recipient: voterAddress.bob, //bob
      });

      const { balance } = await cw20Client.balance({
        address: voterAddress.bob, // bob
      });
      console.log(balance);
    }
  };

  const handleDistribute = async () => {
    try {
      if (address) {
        const client = await getSigningCosmWasmClient();
        const stakingRewardClient = new Cw20StakeRewardDistributorClient(
          client,
          address,
          stakingRewardOraiX
        );

        await stakingRewardClient.distribute();
        toast.success("Distribute reward success !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const [text, setText] = useState("");

  return (
    <div id="home" className="flex flex-col">
      <h1 className="text-[20px] font-semibold mb-8">Featured DAOs</h1>
      <div className="w-full flex gap-4">
        {dao.data.map((daoInfo) => (
          <DaoCard daoInfo={daoInfo} key={daoInfo.dao_addr} />
        ))}
      </div>
      <div className="mt-6 flex gap-6">
        {/* <button onClick={handleStakeToken}>stake token</button>
        <button onClick={handleSendToAlice}>send token to alice</button>
        <button onClick={handleSendToBob}>send token to bob</button>
        <button onClick={handleShowBalance}>show balance</button> */}
        <button
          onClick={handleDistribute}
          className="px-4 py-2 bg-secondary-grey-bg rounded-xl"
        >
          distribute
        </button>
      </div>

      {/* <div>
        <input
          className="border border-black"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </div> */}

      {/* <div className="mt-6 flex items-center justify-around">
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div> */}
    </div>
  );
}
