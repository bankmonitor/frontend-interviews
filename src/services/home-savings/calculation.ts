import type { PaginationParams, PaginationResult } from "@/components/calculators/shared/types";
import type { HomeSavingsCalculatorParameters, HomeSavingsCalculatorResult } from "./calculation.type";

/**
 * Calculates home savings based on the provided parameters and pagination settings.
 *
 * @param props - The parameters for the home savings calculator.
 * @param paging - The pagination parameters.
 * @returns A promise that resolves to a paginated result of home savings calculator results.
 * @throws Will throw an error if the network response is not ok.
 */
export const calculation = async (
	props: HomeSavingsCalculatorParameters,
	paging: PaginationParams,
): Promise<PaginationResult<HomeSavingsCalculatorResult>> => {
	const url = new URL("/api/public/building-society", location.href);
	Object.entries(props).forEach(([key, value]) => {
		if (value !== undefined) {
			url.searchParams.set(key, value.toString());
		}
	});

	const response = await fetch(url.toString());
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	const list = (await response.json()) as HomeSavingsCalculatorResult[];

	return {
		results: list.slice((paging.page - 1) * paging.size, paging.page * paging.size),
		page: paging.page,
		total: list.length,
	};
};
