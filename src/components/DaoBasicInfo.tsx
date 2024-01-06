import React from "react";
import Image from "next/image";

import DefaultImg from "@/assets/image/default-dao-img.jpg";
import { getCreateDaoInfo } from "@/utils/localStorageCreateDao";

const DaoBasicInfo = () => {
	const daoInfo = getCreateDaoInfo();

	return (
		<div className="h-full flex flex-col justify-center items-center px-10 py-6 border-b border-secondary-grey-bg">
			<div className="w-[112px] h-[112px] rounded-[999px] overflow-hidden">
				{daoInfo && daoInfo.image_url ? (
					<img src={daoInfo.image_url} alt="dao img" />
				) : (
					<Image src={DefaultImg} alt="dao img" className="w-full h-full" />
				)}
			</div>
			<h1 className="mt-4 text-[25px] font-semibold">
				{daoInfo ? daoInfo.name : ""}
			</h1>
			{/* <p className="text-[18px] text-primary-grey font-semibold">
                Est. September 8
              </p> */}
			<p className="text-base mt-4 text-[#374151]">
				{daoInfo ? daoInfo.description : ""}
			</p>
		</div>
	);
};

export default DaoBasicInfo;
