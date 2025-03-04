import { ResultList } from "../listing-calculator/ResultList";
import { HomeSavingsResultItem } from "./HomeSavingsResultItem";
import type { HomeSavingsResult } from "./types";

export const HomeSavingsResultList: React.FC = () => (
	<ResultList<HomeSavingsResult>
		title="Lakástakarék ajánlataink"
		renderResult={({ result, index }) => (
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
		)}
	/>
);
