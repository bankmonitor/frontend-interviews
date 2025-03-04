import type { PaginationParams, PaginationResult } from "@/components/calculators/listing-calculator/types";
import type { HomeSavingsCalculatorParameters, HomeSavingsCalculatorResult } from "./calculation.type";

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
	if (response.ok) {
		throw new Error("Network response was not ok");
	}

	const list = (await response.json()) as HomeSavingsCalculatorResult[];

	// await new Promise((resolve) => setTimeout(resolve, 1000));

	return {
		results: list.slice((paging.page - 1) * paging.size, paging.page * paging.size),
		page: paging.page,
		total: list.length,
	};
};
