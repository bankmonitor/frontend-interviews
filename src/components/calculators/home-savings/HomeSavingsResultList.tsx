import { Pagination } from "@heroui/react";
import { NoResult } from "../shared/NoResult";
import { HomeSavingsResultItem } from "./HomeSavingsResultItem";

interface HomeSavingsResultListProps {
	title: string;
}

export const HomeSavingsResultList: React.FC<HomeSavingsResultListProps> = ({ title }) => {
	const finalResults = Array.from<any>({ length: 10 });

	return (
		<div className="mt-16 flex flex-col gap-6" data-testid="result-list">
			<h2 className="text-center font-bold text-4xl">{title}</h2>
			<NoResult />
			{finalResults.map((result, index) => (
				<HomeSavingsResultItem
					key={index}
					index={index + 1}
					productName={result?.productName || ""}
					productSubName={result?.productSubName}
					bankName={result?.bankName || ""}
					totalSavings={result?.totalSavings || 0}
					depositYield={result?.depositYield || 0}
					accountOpeningFee={result?.accountOpeningFee || 0}
					savingsPeriod={result?.savingsPeriodMonths || 0}
				/>
			))}
			<div className="mt-4 flex justify-center">
				<Pagination data-testid="result-list-pagination" initialPage={1} total={10} showControls isCompact />
			</div>
		</div>
	);
};
