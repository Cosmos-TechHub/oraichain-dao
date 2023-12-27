type DecimalToken = (
	text: string,
) => string;
export const presentDecimal: DecimalToken = (
	text: string
) => {
	if (text?.length <= 6) {
        let newText = "0."
        for(let i = 0; i < 6 - text.length; i++) {
            newText += "0"
        }
		return `${newText + text}`;
	}
	return `${text.slice(0, 2)}.${text.slice(2)}`;
};