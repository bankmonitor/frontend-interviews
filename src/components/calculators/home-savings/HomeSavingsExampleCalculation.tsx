import { exampleCalculation } from "@/services/home-savings/example-calculation";
import { formatCurrency } from "@/utils/formatter";
import { Divider, Skeleton } from "@heroui/react";
import { type FC, useCallback, useEffect, useState } from "react";

interface Props {
	monthlySavings?: number;
}

export const HomeSavingsExampleCalculation: FC<Props> = ({ monthlySavings }) => {
	const [isLoaded, setIsLoaded] = useState<boolean>(true);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [calculationResult, setCalculationResult] = useState<any>(undefined);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const calculateExample = useCallback(async () => {
		setCalculationResult(undefined);

		if (!monthlySavings) {
			return;
		}

		setIsLoaded(false);
		setCalculationResult(exampleCalculation(monthlySavings));
		setIsLoaded(true);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		calculateExample();
	}, []);

	return (
		<dl className="mt-4 flex flex-col gap-2">
			<div className="flex justify-between">
				<dt className="text-default-500">Befizetés összesen:</dt>
				<Skeleton
					data-testid="total-payment"
					as="dd"
					className="min-w-16 rounded-md font-semibold text-default-700"
					isLoaded={isLoaded}
				>
					{formatCurrency(calculationResult?.totalPayment || 0)}
				</Skeleton>
			</div>
			<div className="flex justify-between">
				<dt className="text-default-500">Hozam és bónusz:</dt>
				<Skeleton
					data-testid="total-interest-with-bonus"
					as="dd"
					className="min-w-16 rounded-md font-semibold text-success"
					isLoaded={isLoaded}
				>
					+{formatCurrency(calculationResult?.totalInterestWithBonus || 0)}
				</Skeleton>
			</div>
			<Divider className="opacity-75" />
			<div className="flex justify-between">
				<dt className="text-default-500">Végösszeg:</dt>
				<Skeleton
					data-testid="total-savings"
					as="dd"
					className="min-w-16 rounded-md font-semibold text-default-700"
					isLoaded={isLoaded}
				>
					{formatCurrency(calculationResult?.totalSavings || 0)}
				</Skeleton>
			</div>
		</dl>
	);
};
