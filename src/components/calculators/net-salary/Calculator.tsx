import { BanknotesIcon, CheckCircleIcon, UserGroupIcon } from "@heroicons/react/16/solid";
import { Button, Form, NumberInput } from "@heroui/react";
import React, { useState } from "react";

// Egyszerű bérszámítási logika
const calculateNetSalary = (grossSalary: number, children: number): number => {
	if (grossSalary <= 0) {
		return 0;
	}

	const taxRate = 0.33; // Egyszerűsített adókulcs (33%)
	const childAllowance = children * 10000; // Gyerekenkénti kedvezmény

	let netSalary = grossSalary * (1 - taxRate);
	netSalary += childAllowance; // Gyerekek után járó kedvezmény

	return Math.max(netSalary, 0); // Nettó bér nem lehet negatív
};

export const Calculator = () => {
	const [submitted, setSubmitted] = useState<{
		income: number;
		numberOfChildren: number;
		netSalary: number;
	} | null>(null);
	const [errors, setErrors] = useState<{
		income?: string;
		numberOfChildren?: string;
	}>({});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		// Explicit módon stringből számmá alakítás
		const incomeRaw = formData.get("income")?.toString().replace(/,/g, "") ?? "";
		const numberOfChildrenRaw = formData.get("numberOfChildren") as string;

		const income = Number.parseFloat(incomeRaw);
		const numberOfChildren = Number.parseInt(numberOfChildrenRaw, 10);

		const newErrors: { income?: string; numberOfChildren?: string } = {};

		if (Number.isNaN(income) || income <= 0) {
			newErrors.income = "Adjon meg egy érvényes bruttó bért!";
		}

		if (Number.isNaN(numberOfChildren) || numberOfChildren < 0) {
			newErrors.numberOfChildren = "Adjon meg egy érvényes gyermek számot!";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setErrors({});
		setSubmitted({
			income,
			numberOfChildren,
			netSalary: calculateNetSalary(income, numberOfChildren),
		});
	};

	return (
		<>
			<div className="mx-auto max-w-[460px] rounded-lg border border-default-200 bg-default-50 p-6 shadow-lg">
				<h2 className="mb-4 text-center font-semibold text-2xl">Nettó Bér Kalkulátor</h2>
				<Form className="w-full space-y-4" onSubmit={onSubmit}>
					<div className="flex flex-col gap-4">
						<div className="flex max-w-md gap-4">
							<NumberInput
								isRequired
								label="Bruttó bér"
								name="income"
								endContent="Ft"
								errorMessage={errors.income}
								startContent={<BanknotesIcon className="size-5 text-gray-500" />}
							/>
							<NumberInput
								isRequired
								label="Gyermekek száma"
								name="numberOfChildren"
								errorMessage={errors.numberOfChildren}
								startContent={<UserGroupIcon className="size-5 text-gray-500" />}
							/>
						</div>
						<Button className="w-full" size="lg" color="primary" type="submit">
							Kalkulálás
						</Button>
					</div>
				</Form>
			</div>
			{submitted && (
				<div className="mx-auto mt-6 max-w-[480px] rounded-lg border border-primary-300 bg-primary-100 p-4 text-primary-foreground shadow-sm">
					<h3 className="flex items-center gap-2 font-semibold text-lg">
						<CheckCircleIcon className="size-6 text-blue-600" />
						Eredmény
					</h3>
					<div className="mt-3 space-y-2">
						<p className="flex items-center gap-2">
							<BanknotesIcon className="size-4 text-gray-500" />
							<strong>Bruttó bér:</strong>
							<span className="text-gray-900">{submitted.income.toLocaleString()} Ft</span>
						</p>
						<p className="flex items-center gap-2">
							<UserGroupIcon className="size-4 text-gray-500" />
							<strong>Gyermekek száma:</strong>
							<span className="text-gray-900">{submitted.numberOfChildren}</span>
						</p>
						<p className="flex items-center gap-2 font-semibold text-green-700 text-xl">
							<BanknotesIcon className="size-5 text-green-600" />
							<strong>Nettó bér:</strong>
							<span>{submitted.netSalary.toLocaleString()} Ft</span>
						</p>
					</div>
				</div>
			)}
		</>
	);
};
