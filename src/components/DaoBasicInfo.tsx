import React from "react";
import Image from "next/image";

import OraiDex from "@/assets/image/oraidex.webp";

const DaoBasicInfo = () => {
	return (
		<div className="h-full flex flex-col justify-center items-center px-10 py-6 border-b border-secondary-grey-bg">
			<Image src={OraiDex} alt="dao img" className="w-[112px] h-[112px]" />
			<h1 className="mt-4 text-[25px] font-semibold">OraiX Governance</h1>
			{/* <p className="text-[18px] text-primary-grey font-semibold">
                Est. September 8
              </p> */}
			<p className="text-base mt-4 text-[#374151]">Dao that manage Dao</p>
		</div>
	);
};

export default DaoBasicInfo;
