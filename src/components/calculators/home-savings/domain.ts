import type {
	HomeSavingsCalculatorParameters,
	HomeSavingsCalculatorResult,
} from "@/services/home-savings/calculation.type";
import type { HomeSavingsParameters, HomeSavingsResult } from "./types";

export const mapParameters = (parameters: HomeSavingsParameters): HomeSavingsCalculatorParameters => ({
	comparator: "AER",
	monthlyDeposit: parameters.monthlySavings,
	interestedInMortgage: parameters.withMortgage,
	notMakeUseOfConnectedProduct: parameters.noAdditionalProducts,
	marketingNeeded: false,
	makeUseOfConnectedProduct: !parameters.noAdditionalProducts,
	roleCode: "TEST",
});

export const mapResultItem = (result: HomeSavingsCalculatorResult): HomeSavingsResult => ({
	bankName: result.bank.name,
	productName: result.name,
	productSubName: result.subType,
	totalSavings: result.fullSavingsNoLoan,
	depositYield: result.aer,
	accountOpeningFee: result.accountOpeningFee,
	savingsPeriodMonths: result.savingsPeriod,
});
