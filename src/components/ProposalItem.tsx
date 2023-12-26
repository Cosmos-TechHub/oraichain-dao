import React from "react";
import Link from "next/link";
import {
  CheckCircleFilled,
  ClockCircleFilled,
  MinusCircleFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";

import { Status, SingleChoiceProposal } from "@/codegen/types";

interface IProposalItem {
  addr: string;
  proposalId: number;
  proposalInfo: SingleChoiceProposal;
}

const ProposalStatus = ({ status }: { status: Status }) => {
  switch (status) {
    case "open":
      return (
        <div className="flex items-center gap-2 text-[16px] text-secondary-grey font-semibold">
          <div>
            <ClockCircleFilled className="text-[18px]" />
          </div>
          <p>Voting</p>
        </div>
      );
    case "rejected":
      return (
        <div className="flex items-center gap-2 text-[16px] text-red-500 font-semibold">
          <div>
            <MinusCircleFilled className="text-[18px]" />
          </div>
          <p>Rejected</p>
        </div>
      );
    case "passed":
      return (
        <div className="flex items-center gap-2 text-[16px] text-green-500 font-semibold">
          <div>
            <CheckCircleFilled className="text-[18px]" />
          </div>
          <p>Passed</p>
        </div>
      );
    case "executed":
      return (
        <div className="flex items-center gap-2 text-[16px] text-primary-grey font-semibold">
          <div>
            <CheckCircleOutlined className="text-[18px]" />
          </div>
          <p>Executed</p>
        </div>
      );
    default:
      return;
  }
};

const ProposalItem = ({ addr, proposalId, proposalInfo }: IProposalItem) => {
  return (
    <Link
      href={{
        pathname: "/proposal/[...id]",
        query: { id: [addr, proposalId.toString()] },
      }}
      className="w-full min-h-[60px] bg-secondary-grey-bg hover:bg-primary-grey-bg flex items-center justify-between px-6 rounded-md"
    >
      <div className="flex flex-1 items-center gap-14">
        <div className="flex items-center gap-14 w-[28%]">
          <h1 className="text-[16px] text-primary-grey font-semibold">
            A-{proposalId}
          </h1>
          <ProposalStatus status={proposalInfo.status} />
        </div>
        <p className="text-[16px] text-secondary-grey font-semibold flex-1">
          {proposalInfo.title + " - " + proposalInfo.description}
        </p>
      </div>
      <p className="text-[16px] text-primary-grey font-semibold">November 19</p>
    </Link>
  );
};

export default ProposalItem;
