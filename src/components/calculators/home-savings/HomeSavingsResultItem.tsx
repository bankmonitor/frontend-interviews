import { formatCurrency, formatMonths, formatPercent, optionalFormat } from "@/utils/formatter";
import React from "react";
import { ResultItem } from "../listing-calculator/ResultItem";
import { ResultItemData } from "../listing-calculator/ResultItemData";

interface HomeSavingsResultItemProps {
	index: number;
	productName: string;
	productSubName?: string;
	bankName: string;
	totalSavings: number;
	depositYield: number;
	accountOpeningFee: number;
	savingsPeriod: number;
}

export const HomeSavingsResultItem: React.FC<HomeSavingsResultItemProps> = ({
	index,
	productName,
	productSubName,
	bankName,
	totalSavings,
	depositYield,
	accountOpeningFee,
	savingsPeriod,
}) => (
	<ResultItem
		index={index}
		providerName={bankName}
		title={
			<>
				<span className="font-semibold">{productName}</span>
				{productSubName && <span className="font-light text-foreground-500"> - {productSubName}</span>}
			</>
		}
	>
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<ResultItemData
				className="scale-125 text-secondary"
				title="Teljes megtakarítás"
				data-testid="total-savings"
			>
				{optionalFormat(totalSavings, formatCurrency)}
			</ResultItemData>
			<ResultItemData title="Betéti hozam" data-testid="deposit-yield">
				{optionalFormat(depositYield, formatPercent)}
			</ResultItemData>
			<ResultItemData title="Számlanyitási díj" data-testid="account-opening-fee">
				{optionalFormat(accountOpeningFee, formatCurrency)}
			</ResultItemData>
			<ResultItemData title="Megtakarítási idő" data-testid="savings-period">
				{optionalFormat(savingsPeriod, formatMonths)}
			</ResultItemData>
		</div>
	</ResultItem>
);
