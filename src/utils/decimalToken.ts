import { Decimal } from "@cosmjs/math";

type DecimalToken = (text: string) => string;
export const presentDecimal: DecimalToken = (text: string) => {
	console.log("input decimal", text);
	
	return Decimal.fromAtomics(text, 6).toFloatApproximation().toString();
};
