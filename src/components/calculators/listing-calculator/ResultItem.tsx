import { PhoneIcon } from "@heroicons/react/16/solid";
import { Button, Card, CardBody, Skeleton } from "@heroui/react";
import type { FC, ReactNode } from "react";
import { useListingCalculatorContext } from "./ListingCalculatorProvider";

export interface ResultItemProps {
	index: number;
	title?: ReactNode;
	providerName?: ReactNode;

	children?: ReactNode;

	onInterestClick?: () => void;
}

export const ResultItem: FC<ResultItemProps> = ({ index, title, providerName, children, onInterestClick }) => {
	const { isLoaded } = useListingCalculatorContext();

	return (
		<div className="mb-6" data-testid={`result-item-${index}`}>
			<div className="my-3 flex items-center text-2xl">
				<Skeleton
					className="mx-3 min-w-8 rounded-xl text-center text-secondary-300"
					isLoaded={isLoaded}
					data-testid="result-item-index"
				>
					{index}.
				</Skeleton>
				<div className="w-full">
					<Skeleton
						className="min-w-10 rounded-lg text-foreground-500 text-sm"
						isLoaded={isLoaded}
						data-testid="result-item-provider-name"
					>
						{providerName}&nbsp;
					</Skeleton>
					<Skeleton
						className="min-w-16 rounded-lg text-lg"
						isLoaded={isLoaded}
						data-testid="result-item-title"
					>
						{title}&nbsp;
					</Skeleton>
				</div>
			</div>
			<Card
				className="border-1 border-secondary-200 bg-gradient-to-r from-default-50 to-secondary-50 dark:from-primary-50 dark:to-secondary-50"
				shadow="md"
			>
				<CardBody>
					<div className="flex flex-col items-center justify-between sm:flex-row">
						<div>{children}</div>
						<Skeleton className="rounded-lg" isLoaded={isLoaded}>
							<Button
								className="mt-4 bg-gradient-to-l from-primary-500 to-primary-400 px-8 shadow-lg sm:me-8 sm:mt-0"
								color="primary"
								size="lg"
								startContent={<PhoneIcon className="size-6" />}
								onPress={onInterestClick}
								data-testid="result-item-interest-button"
							>
								Érdekel
							</Button>
						</Skeleton>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};
