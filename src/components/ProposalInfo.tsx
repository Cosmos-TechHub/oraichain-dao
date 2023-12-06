import React from "react";
import Image from "next/image";
import {
  ReloadOutlined,
  DollarOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";

import DaoIcon from "@/assets/image/dao-icon.svg";

const ProposalInfo = () => {
  return (
    <div className="flex flex-col gap-4 pt-8 border-t border-custom-grey-card">
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
  );
};

export default ProposalInfo;
