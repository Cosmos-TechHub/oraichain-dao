import Moralis from "moralis";

export const startMoralisServer = async () => {
	if (!Moralis.Core.isStarted) {
		console.log("reach here")
		await Moralis.start({
			apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
		});
	}
};

export const uploadMoralisImage = async (imgUrl: string, id: number) => {
	const abiImage = [
		{
			path: `dao_image_${id + 1}.png`,
			content: imgUrl,
		},
	];
	const imgResponse = await Moralis.EvmApi.ipfs.uploadFolder({
		abi: abiImage,
	});
	return imgResponse;
};