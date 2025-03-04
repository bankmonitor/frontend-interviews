import type { PropsWithChildren } from "react";
import type { PaginationParams, PaginationResult } from "./types";

interface PaginationState {
	page: number;
	size: number;
	total: number;
}

interface ListingCalculatorContextProps<CalculatorParameters, CalculatorResult> {
	isCalculated: boolean;
	isLoaded: boolean;
	calculationParameters: CalculatorParameters | undefined;
	results: CalculatorResult[];
	onCalculate: (parameters: CalculatorParameters, paging?: PaginationParams) => Promise<void>;

	// Pagination
	pagination: PaginationState;
	onPagination: (page: number) => void;
}

export const createListingCalculatorContext = <CalculatorParameters, CalculatorResult>(
	_onCalculate: (
		parameters: CalculatorParameters,
		paging: PaginationParams,
	) => Promise<PaginationResult<CalculatorResult>>,
) => ({
	Provider: (props: PropsWithChildren) => <div {...props} />,
	useContext: useListingCalculatorContext,
});

export const useListingCalculatorContext = () => {
	// TODO: Not implemented yet
	return {
		isCalculated: true,
		isLoaded: true,
		calculationParameters: undefined,
		results: [],
		onCalculate: async () => {},

		// Pagination
		pagination: { page: 1, size: 10, total: 10 },
		onPagination: () => {},
	} as ListingCalculatorContextProps<any, any>;
};
