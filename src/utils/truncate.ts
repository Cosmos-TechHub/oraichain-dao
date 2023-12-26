type Truncate = (
	text: string,
	firstNumber: number,
	lastNumber: number
) => string;
export const truncate: Truncate = (
	text: string,
	firstNumer: number,
	lastNumber: number
) => {
	if (text?.length > firstNumer) {
		return `${text.slice(0, firstNumer)}...${text.slice(lastNumber)}`;
	}
	return text;
};

export const truncateReverse: Truncate = (text: string, numer: number) => {
	if (text.length > numer) {
		return text.slice(text.length - 1 - numer, text.length - 1);
	}
	return text;
};
