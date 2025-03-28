import { Skeleton } from "@heroui/react";
import clsx from "clsx";
import type { FC, ReactNode } from "react";
import { useListingCalculatorContext } from "./ListingCalculatorProvider";

interface Props {
	className?: string;
	title: ReactNode;
	children: ReactNode;
	"data-testid"?: string;
}

export const ResultItemData: FC<Props> = ({ className, title, children, "data-testid": dataTestId }) => {
	const { isLoaded } = useListingCalculatorContext();

	return (
		<div className={clsx("sm:px-8 sm:py-4", "text-center", className)}>
			<Skeleton className="inline-block min-w-16 rounded-md" isLoaded={isLoaded} data-testid={dataTestId}>
				<span className="font-semibold text-xl">{children}</span>
			</Skeleton>
			<div className="text-foreground-500 text-sm">{title}</div>
		</div>
	);
};
