import React from "react";
import Image from "next/image";
import {
  ReloadOutlined,
  DollarOutlined,
  FieldTimeOutlined,
  LoadingOutlined
} from "@ant-design/icons";

import DaoIcon from "@/assets/image/dao-icon.svg";
import OraiIcon from '@/assets/image/orai.svg'
import { SingleChoiceProposal } from "@/codegen/types";

interface IProposalInfo {
  proposal: SingleChoiceProposal | null;
}

const ProposalInfo = ({ proposal }: IProposalInfo) => {
  return (
    <div className="flex flex-col gap-4 pt-8 border-t border-secondary-grey-bg">
      {proposal ? (
        <>
          <div className="grid grid-cols-2 items-center">
            <div className="flex items-center gap-4 text-[18px] text-third-grey">
              <Image src={OraiIcon} alt="dao icon" width={25} height={25} />
              <h1>DAO</h1>
            </div>
            <p className="text-[20px] font-semibold text-secondary-grey">
              Oraichain
            </p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <div className="flex items-center gap-4 text-[18px] text-third-grey">
              <ReloadOutlined className="text-[22px]" />
              <h1>Status</h1>
            </div>
            <p className="text-[20px] font-semibold text-secondary-grey">
              {proposal.status}
            </p>
          </div>
          {/* <div className="grid grid-cols-2 items-center">
            <div className="flex items-center gap-4 text-[18px] text-third-grey">
              <DollarOutlined className="text-[22px]" />
              <h1>Deposited</h1>
            </div>
            <p className="text-[20px] font-semibold text-secondary-grey">
              1,600 $OSMO
            </p>
          </div> */}
          <div className="grid grid-cols-2 items-center">
            <div className="flex items-center gap-4 text-[18px] text-third-grey">
              <FieldTimeOutlined className="text-[22px]" />
              <h1>Time left</h1>
            </div>
            <p className="text-[20px] font-semibold text-secondary-grey">
              1 day
            </p>
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <LoadingOutlined  className="text-[46px] " />
        </div>
      )}
    </div>
  );
};

export default ProposalInfo;
