import React, { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BankOutlined, FileTextOutlined } from "@ant-design/icons";
import { useChain } from "@cosmos-kit/react";

import DaoImage from "@/assets/image/dao.png";
import { network } from "@/config";
import { DaoDaoCoreQueryClient } from "@/codegen/DaoDaoCore.client";

interface IDaoCard {
  name: string;
  description: string;
  image_url?: string;
  dao_info: {
    dao_addr: string;
    voting_addr: string;
    proposal_addr: string;
    token_addr: string;
    staking_addr: string;
  };
}

const DaoCard = ({ name, description, image_url, dao_info }: IDaoCard) => {
  const [daoClient, setDaoClient] = useState<DaoDaoCoreQueryClient | null>(
    null
  );
  const [daoContractInfo, setDaoContractInfo] = useState<{
    name: string;
    description: string;
    image_url?: string | null;
  } | null>(null);

  const { getCosmWasmClient } = useChain(network.chainName);

  useEffect(() => {
    const getDaoClient = async () => {
      const client = await getCosmWasmClient();
      const newDaoClient = new DaoDaoCoreQueryClient(client, dao_info.dao_addr);
      
      setDaoClient(newDaoClient);
      console.log(await newDaoClient.config());
      

      // if (newDaoClient !== null) {
      //   const config = await newDaoClient.config();
      //   setDaoContractInfo({
      //     name: config.name,
      //     description: config.description,
      //     image_url: config.image_url,
      //   });
      // }
    };

    getDaoClient();
  }, []);


  return (
    <Link
      href="/"
      className="w-64 min-h-[328px] px-8 pt-9 pb-4 rounded-lg flex flex-col gap-5 justify-around items-center bg-custom-grey-card hover:bg-custom-grey-hover"
    >
      <div className="flex flex-col items-center">
        <Image src={DaoImage} alt="dao image" className="w-[104px] h-[104px]" />
        <h1 className="text-base text-black font-medium">{daoContractInfo !== null ? daoContractInfo.name : "Defaul"}</h1>
        <p className="text-xs text-custom-grey font-medium">November 29</p>
        <p className="text-sm text-custom-grey font-medium">{description}</p>
      </div>
      <div className="flex flex-col w-full gap-2 text-custom-grey">
        <div className="flex text-sm items-center w-full gap-2">
          <BankOutlined />
          <h1>descript</h1>
        </div>
        <div className="flex text-sm items-center w-full gap-2">
          <FileTextOutlined />
          <h1>descript</h1>
        </div>
      </div>
    </Link>
  );
};

export default DaoCard;
