import { Pagination } from "@heroui/react";
import type { ReactNode } from "react";
import { useListingCalculatorContext } from "./ListingCalculatorProvider";
import { NoResult } from "./NoResult";

interface ResultListProps<Result> {
	title: ReactNode;

	renderResult: (props: { result: Result | undefined; index: number }) => ReactNode;
}

export const ResultList = <Result,>({ title, renderResult }: ResultListProps<Result>) => {
	const { isLoaded, onPagination, pagination } = useListingCalculatorContext();
	const results = Array.from<undefined>({ length: pagination.size });
	const startIndex = (pagination.page - 1) * pagination.size;

	return (
		<div className="mt-16 flex flex-col gap-6" data-testid="result-list">
			<h2 className="text-center font-bold text-4xl">{title}</h2>
			<NoResult />
			{results.map((result, index) => renderResult({ result, index: index + startIndex }))}
			<div className="mt-4 flex justify-center">
				<Pagination
					data-testid="result-list-pagination"
					onChange={onPagination}
					page={pagination.page}
					initialPage={1}
					total={pagination.total}
					isDisabled={!isLoaded}
					showControls
					isCompact
				/>
			</div>
		</div>
	);
};
