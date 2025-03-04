import { calculation } from "@/services/home-savings/calculation";
import { createListingCalculatorContext } from "../listing-calculator/ListingCalculatorProvider";
import type { PaginationParams } from "../listing-calculator/types";
import { mapParameters, mapResultItem } from "./domain";
import type { HomeSavingsParameters, HomeSavingsResult } from "./types";

export const { Provider: HomeSavingsProvider, useContext: useHomeSavings } = createListingCalculatorContext<
	HomeSavingsParameters,
	HomeSavingsResult
>(async (parameters: HomeSavingsParameters, paging: PaginationParams) => {
	const response = await calculation(mapParameters(parameters), paging);

	return {
		results: response.results.map(mapResultItem),
		page: response.page,
		total: response.total,
	};
});
