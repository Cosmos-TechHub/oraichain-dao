import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Image from "next/image";
import {
  BankOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

import DaoImage from "@/assets/image/dao.png";

const DaoPage = () => {
  const router = useRouter();

  useEffect(() => {}, [router]);
  return (
    <div className="" id="dao">
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center px-10 pb-8 border-b border-custom-grey-hover">
          <Image src={DaoImage} alt="dao img" className="w-[134px] h-[134px]" />
          <h1 className="mt-4 text-[32px] font-semibold">Neutron DAO</h1>
          <p className="text-[18px] text-custom-grey font-semibold">
            Est. September 8
          </p>
          <p className="text-[18px] font-medium mt-4 text-[#374151]">
            Neutron DAO is the DAO DAO-based governance of Neutron chain
          </p>
          <div className="flex flex-col mt-10 gap-2 items-center">
            <BankOutlined className="text-[30px] " />
            <div className="flex gap-3 items-center">
              <p className="text-sm text-custom-grey">DAO Treasury</p>
              <ExclamationCircleOutlined className="text-sm" />
            </div>
            <p className="text-lg font-medium text-custom-black-grey">
              $82.61M est. USD value
            </p>
          </div>
        </div>
        <div className="py-6 flex items-center justify-between border-b border-custom-grey-hover">
          <h1 className="text-[20px] text-custom-black-grey font-semibold">
            Create a proposal
          </h1>
          <Button className="flex items-center">
            <PlusOutlined /> <p className="inline-block">New proposal</p>
          </Button>
        </div>
        <div className="py-6 flex items-center justify-between">
          <h1 className="text-[20px] text-custom-black-grey font-semibold">
            Proposals
          </h1>
        </div>
      </div>
    </div>
  );
};

export default DaoPage;
