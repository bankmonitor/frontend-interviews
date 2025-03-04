import { BanknotesIcon } from "@heroicons/react/16/solid";
import { Button, Card, CardBody, CardFooter, Divider, Form, NumberInput } from "@heroui/react";
import { type FC, type FormEvent, useState } from "react";
import { HomeSavingsExampleCalculation } from "./HomeSavingsExampleCalculation";
import { useHomeSavings } from "./HomeSavingsProvider";

export const HomeSavingsForm: FC = () => {
	const { onCalculate, isLoaded } = useHomeSavings();
	const [monthlySavings, setMonthlySavings] = useState(50_000);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		onCalculate({
			monthlySavings,
			withMortgage: false,
			noAdditionalProducts: true,
		});
	};

	return (
		<Card
			className="max-w-[360px] overflow-visible border-4 border-primary bg-default-50"
			shadow="lg"
			as={Form}
			onSubmit={handleSubmit}
		>
			<div className="-top-4 -translate-x-1/2 absolute left-1/2 z-10 box-border inline-flex h-7 min-w-min max-w-fit items-center justify-between whitespace-nowrap rounded-full bg-primary px-1 text-primary-foreground text-small">
				<span className="flex-1 px-2 font-medium text-inherit">Kalkuláld ki a hozamod!</span>
			</div>
			<CardBody className="mt-6">
				<NumberInput
					data-testid="monthly-savings"
					name="monthlySavings"
					label="Havi megtakarítás"
					size="lg"
					value={monthlySavings}
					onValueChange={(value) => {
						setMonthlySavings(value);
					}}
					labelPlacement="outside"
					startContent={<BanknotesIcon className="size-4" />}
					endContent="Ft"
					step={10_000}
					min={10_000}
					max={100_000}
					isRequired
				/>
			</CardBody>
			<CardBody>
				<Divider className="mx-auto mb-4 h-1 w-12 bg-primary" />
				<div className="text-center text-foreground-700">
					Így gyűlik össze a megtakarításod egy népszerű ajánlattal!
				</div>
				<HomeSavingsExampleCalculation monthlySavings={monthlySavings} />
			</CardBody>
			<CardFooter className="w-full">
				<Button
					data-testid="calculate-button"
					type="submit"
					color="primary"
					isLoading={!isLoaded}
					spinner=""
					size="lg"
					fullWidth
				>
					Nézd meg a legjobb ajánlatokat!
				</Button>
			</CardFooter>
		</Card>
	);
};
