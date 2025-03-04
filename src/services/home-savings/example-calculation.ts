import exampleCalculationData from "./example-calculation.data.json";
import type { HomeSavingsExampleCalculationResult } from "./example-calculation.type";

export const exampleCalculation = (monthlyDeposit: number): Promise<HomeSavingsExampleCalculationResult> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const result = exampleCalculationData.find((item) => item.monthlyDeposit === monthlyDeposit);

			if (result) {
				resolve(result);
			} else {
				reject(new Error("Not found"));
			}
		}, 1_000);
	});
};
