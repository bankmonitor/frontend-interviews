import type { PropsWithChildren } from "react";
import type { PaginationParams, PaginationResult } from "./types";

interface PaginationState {
	page: number;
	size: number;
	total: number;
}

interface ListingCalculatorContextProps<CalculatorParameters, CalculatorResult> {
	calculationParameters: CalculatorParameters | undefined;
	results: CalculatorResult[];
	isCalculated: boolean;
	isLoaded: boolean;

	// Pagination
	onPagination: (page: number) => void;
	pagination: PaginationState;

	onCalculate: (parameters: CalculatorParameters, paging: PaginationParams) => Promise<void>;
}

export const useListingCalculatorContext = () => {
	// TODO: Not implemented yet
	return {
		isLoaded: true,
		isCalculated: true,
		results: [],
		pagination: { page: 1, size: 10, total: 10 },
		onCalculate: async () => {},
		onPagination: () => {},
		calculationParameters: undefined,
	} as ListingCalculatorContextProps<any, any>;
};

export const createListingCalculatorContext = <CalculatorParameters, CalculatorResult>(
	onCalculate: (
		parameters: CalculatorParameters,
		paging?: PaginationParams,
	) => Promise<PaginationResult<CalculatorResult>>,
) => {
	return {
		Provider: (props: PropsWithChildren) => <div {...props} />,
		useContext: () => {
			return {
				isLoaded: true,
				isCalculated: true,
				results: [],
				pagination: { page: 1, size: 10, total: 10 },
				onCalculate: async () => {},
				onPagination: () => {},
				calculationParameters: undefined,
			} as ListingCalculatorContextProps<any, any>;
		},
	};
};
