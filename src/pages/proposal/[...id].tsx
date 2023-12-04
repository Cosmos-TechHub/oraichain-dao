import React from "react";
import {
  PicLeftOutlined,
  ReloadOutlined,
  DollarOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import Image from "next/image";

import DaoIcon from "@/assets/image/dao-icon.svg";

const Proposal = () => {
  return (
    <div id="proposal">
      <div className="col-span-3 flex flex-col gap-6">
        <div className="flex flex-col gap-3 text-[18px] text-custom-grey-grey ">
          <div className="flex items-center gap-3">
            <PicLeftOutlined className="text-[22px]" />
            <h1>Status</h1>
          </div>
          <p className="pr-6">
            If the current vote stands, this proposal will fail due to a lack of
            voter participation.
          </p>
        </div>
        <div className="flex flex-col gap-4 pt-6 border-t border-custom-grey-card">
          <div className="grid grid-cols-2 items-center">
            <div className="flex items-center gap-4 text-[18px] text-custom-grey-grey">
              <Image src={DaoIcon} alt="dao icon" width={25} height={25} />
              <h1>DAO</h1>
            </div>
            <p className="text-[20px] font-semibold text-custom-black-grey">
              Osmosis
            </p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <div className="flex items-center gap-4 text-[18px] text-custom-grey-grey">
              <ReloadOutlined className="text-[22px]" />
              <h1>Status</h1>
            </div>
            <p className="text-[20px] font-semibold text-custom-black-grey">
              Voting Period
            </p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <div className="flex items-center gap-4 text-[18px] text-custom-grey-grey">
              <DollarOutlined className="text-[22px]" />
              <h1>Deposited</h1>
            </div>
            <p className="text-[20px] font-semibold text-custom-black-grey">
              1,600 $OSMO
            </p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <div className="flex items-center gap-4 text-[18px] text-custom-grey-grey">
              <FieldTimeOutlined className="text-[22px]" />
              <h1>Time left</h1>
            </div>
            <p className="text-[20px] font-semibold text-custom-black-grey">
              1 day
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-5 flex flex-col">
        <h1 className="text-custom-black-grey text-[32px] mb-12 font-bold">
          Nois - Store the Randdrop Contract
        </h1>
        <div className="flex flex-col gap-6">
          <p className="text-[16px] text-custom-grey-grey font-medium">November 30</p>
          <p className="text-[16px] text-custom-black-grey pr-6 tracking-wider leading-6">
            This proposal aims to store the Wasm code for the nois-randdrop
            contract. Once instantiated it will allow eligible stakers to
            participate in the randdrop. Ps: If this proposal passes we would
            raise another proposal to store the Nois proxy contract that acts as
            an outpost contract on osmosis to allow requesting the unpredictable
            randomness (Needed to conduct the randdrop). The snapshot that we
            would use for the randdrop has been taken at height 12542000 and you
            can check the full list of eligibility here
            https://github.com/noislabs/randdrop-snapshots/tree/v0.1.0 For more
            info check the forum post here
            https://forum.osmosis.zone/t/proposal-for-deployment-of-nois-randdrop-contract-on-osmosis/646.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
