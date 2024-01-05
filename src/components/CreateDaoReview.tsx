import React, { CSSProperties } from "react";
import { UserOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import DaoBasicInfo from "./DaoBasicInfo";
import ReviewVotingConfig from "./ReviewVotingConfig";

interface ICreateDaoReview {
	setPagination: React.Dispatch<React.SetStateAction<number>>;
}

const CreateDaoReview = ({ setPagination }: ICreateDaoReview) => {
	const handleCreateDao = () => {};

	return (
		<div id="create-dao-review">
			<DaoBasicInfo />

			<div className="w-full flex flex-col pt-4 pb-16 gap-10 border-b border-secondary-grey-bg ">
				<div className="flex flex-col gap-6">
					<h1 className="text-[17px] text-secondary-grey font-medium">
						Governance configuration
					</h1>
					<div className="grid grid-cols-4 bg-secondary-grey-bg rounded-lg ">
						<div className="col-span-1 flex flex-col px-6 pt-4 pb-6 gap-8 border-r border-secondary-grey-bg">
							<h1 className="text-base text-third-grey font-medium">
								Voting power
							</h1>
							<div id="pie-example-1">
								<table className="charts-css pie hide-data">
									<caption> Pie Example #1 </caption>
									<tbody>
										<tr>
											<td
												style={
													{ "--start": 0.0, "--end": 0.5 } as CSSProperties
												}
											>
												<span className="data"> $ 10K </span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div className="col-span-3 flex flex-col gap-8 px-6 py-4">
							<h1 className="text-base text-third-grey font-medium">
								$Token Distribution
							</h1>
							<div className="flex flex-col gap-4 px-16">
								<div className="flex items-center justify-between">
									<h1 className="text-[15px] text-third-grey font-medium">
										Treasury
									</h1>
									<p className="text-[15px] text-third-grey font-medium">50%</p>
								</div>
							</div>
							<div className="flex flex-col gap-4 px-16">
								<div className="flex items-center justify-between">
									<div className="text-[15px] text-third-grey font-medium flex items-center gap-2">
										<UserOutlined />
										<p>orai1sd...456</p>
									</div>
									<p className="text-[15px] text-third-grey font-medium">50%</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-6">
					<h1 className="text-[17px] text-secondary-grey font-medium">
						Voting configuration
					</h1>
					<div className="grid grid-cols-2 gap-4">
						<ReviewVotingConfig
							icon="⏰"
							title="Unstaking period"
							description="1 week"
						/>
						<ReviewVotingConfig
							icon="⏰"
							title="Unstaking period"
							description="1 week"
						/>
						<ReviewVotingConfig
							icon="⏰"
							title="Unstaking period"
							description="1 week"
						/>
					</div>
				</div>
			</div>

			<div className="flex justify-between items-center pt-2">
				<button
					className="px-4 py-[6px] bg-primary-grey-bg text-black rounded-md flex items-center gap-2 hover:opacity-90"
					onClick={() => setPagination((prevPagination) => prevPagination - 1)}
				>
					<ArrowLeftOutlined />
					<p>Go back</p>
				</button>
				<button
					className="px-6 py-[6px] bg-secondary-grey text-white rounded-md"
					onClick={handleCreateDao}
				>
					Create Dao
				</button>
			</div>
		</div>
	);
};

export default CreateDaoReview;
