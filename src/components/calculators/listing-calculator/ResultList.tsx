import { Pagination } from "@heroui/react";
import type { ReactNode } from "react";
import { NoResult } from "./NoResult";

interface ResultListProps<Result> {
	title: ReactNode;

	renderResult: (props: { result: Result | undefined; index: number }) => ReactNode;
}

export const ResultList = <Result,>({ title, renderResult }: ResultListProps<Result>) => {
	const finalResults = Array.from<undefined>({ length: 10 });

	return (
		<div className="mt-16 flex flex-col gap-6" data-testid="result-list">
			<h2 className="text-center font-bold text-4xl">{title}</h2>
			<NoResult />
			{finalResults.map((result, index) => renderResult({ result, index }))}
			<div className="mt-4 flex justify-center">
				<Pagination data-testid="result-list-pagination" initialPage={1} total={10} showControls isCompact />
			</div>
		</div>
	);
};
