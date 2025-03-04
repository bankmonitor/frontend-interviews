import type {
	HomeSavingsCalculatorParameters,
	HomeSavingsCalculatorResult,
} from "@/services/home-savings/calculation.type";
import type { HomeSavingsParameters, HomeSavingsResult } from "./types";

/**
 * Maps the given HomeSavingsParameters to HomeSavingsCalculatorParameters.
 *
 * @param parameters - The parameters for home savings.
 * @returns The mapped parameters for the home savings calculator.
 */
export const mapParameters = (parameters: HomeSavingsParameters): HomeSavingsCalculatorParameters => ({
	comparator: "AER",
	monthlyDeposit: parameters.monthlySavings,
	interestedInMortgage: parameters.withMortgage,
	notMakeUseOfConnectedProduct: parameters.noAdditionalProducts,
	makeUseOfConnectedProduct: !parameters.noAdditionalProducts,
});

/**
 * Maps the given HomeSavingsCalculatorResult to HomeSavingsResult.
 *
 * @param result - The result of the home savings calculator.
 * @returns The mapped result of the home savings calculator.
 */
export const mapResultItem = (result: HomeSavingsCalculatorResult): HomeSavingsResult => ({
	bankName: result.bank.name,
	productName: result.name,
	productSubName: result.subType,
	totalSavings: result.fullSavingsNoLoan,
	depositYield: result.aer,
	accountOpeningFee: result.accountOpeningFee,
	savingsPeriodMonths: result.savingsPeriod,
});
