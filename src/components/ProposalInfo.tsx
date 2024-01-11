import React from "react";
import Image from "next/image";
import {
	ReloadOutlined,
	DollarOutlined,
	FieldTimeOutlined,
	LoadingOutlined,
	UserOutlined,
} from "@ant-design/icons";

import DefaultDaoImg from "@/assets/image/default-dao-img.jpg";
import { SingleChoiceProposal } from "@/codegen/types";
import { truncate } from "@/utils/truncate";
interface IProposalInfo {
	proposal: SingleChoiceProposal | null;
	daoName?: string;
	daoImg?: string | null;
}

const ProposalInfo = ({ proposal, daoName, daoImg }: IProposalInfo) => {
	let dayLeft: number = 0;
	if (proposal) {
		const expireTime = proposal.expiration as { at_time: string };
		const timeNow = Date.now();
		const timeInSec =
			parseInt(expireTime.at_time) / 1000000000 - timeNow / 1000;
		dayLeft = Math.ceil(timeInSec / 86400);
	}

	return (
		<div className="flex flex-col gap-4 pt-8 border-t border-secondary-grey-bg">
			{proposal ? (
				<>
					<div className="grid grid-cols-2 items-center">
						<div className="flex items-center gap-4 text-base text-third-grey">
							<div className="w-6 h-6 rounded-full overflow-hidden">
							  {daoImg ? (
  								<img src={daoImg} alt="dao image" className="w-full h-full" />
  							) : (
  								<Image
  									src={DefaultDaoImg}
  									alt="dao icon"
  									className="w-full h-full"
  								/>
  							)}
							</div>
							<h1>DAO</h1>
						</div>
						<p className="text-[17px] font-semibold text-secondary-grey">
							{daoName}
						</p>
					</div>
					<div className="grid grid-cols-2 items-center">
						<div className="flex items-center gap-4 text-base text-third-grey">
							<UserOutlined className="text-[22px]" />
							<h1>Creator</h1>
						</div>
						<p
							className="text-[17px] font-semibold text-secondary-grey"
							title={proposal.proposer}
						>
							{truncate(proposal.proposer, 5, 39)}
						</p>
					</div>
					<div className="grid grid-cols-2 items-center">
						<div className="flex items-center gap-4 text-base text-third-grey">
							<ReloadOutlined className="text-[22px]" />
							<h1>Status</h1>
						</div>
						<p className="text-[17px] font-semibold text-secondary-grey">
							{proposal.status}
						</p>
					</div>

					{/* <div className="grid grid-cols-2 items-center">
            <div className="flex items-center gap-4 text-base text-third-grey">
              <DollarOutlined className="text-[22px]" />
              <h1>Deposited</h1>
            </div>
            <p className="text-[17px] font-semibold text-secondary-grey">
              1,600 $OSMO
            </p>
          </div> */}
					<div className="grid grid-cols-2 items-center">
						<div className="flex items-center gap-4 text-base text-third-grey">
							<FieldTimeOutlined className="text-[22px]" />
							<h1>Time left</h1>
						</div>
						<p className="text-[17px] font-semibold text-secondary-grey">
							{dayLeft} day
						</p>
					</div>
				</>
			) : (
				<div className="flex justify-center">
					<LoadingOutlined className="text-[34px] " />
				</div>
			)}
		</div>
	);
};

export default ProposalInfo;
