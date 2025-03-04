export interface HomeSavingsParameters {
	monthlySavings: number;
	withMortgage: boolean;
	noAdditionalProducts: boolean;
}

export interface HomeSavingsResult {
	bankName: string;
	productName: string;
	productSubName?: string;

	totalSavings: number;
	depositYield: number;
	accountOpeningFee: number;
	savingsPeriodMonths: number;
}
