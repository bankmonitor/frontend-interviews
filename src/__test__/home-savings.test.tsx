import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { Page } from "../pages/lakastakarek-kalkulator/index";
import { DUMMY_RESULT_ITEM } from "./home-savings.data";
import { delayedPromiseReject, delayedPromiseResolve } from "./utils";
import "@testing-library/jest-dom";

const { mockedExampleCalculationMethod, mockedCalculationMethod, mockedAddToast } = vi.hoisted(() => {
	return { mockedExampleCalculationMethod: vi.fn(), mockedCalculationMethod: vi.fn(), mockedAddToast: vi.fn() };
});
vi.mock("@/services/home-savings/example-calculation", () => {
	return { exampleCalculation: mockedExampleCalculationMethod };
});
vi.mock("@/services/home-savings/calculation", () => {
	return { calculation: mockedCalculationMethod };
});
vi.mock("@heroui/toast", () => {
	return { addToast: mockedAddToast };
});

describe("Interview - Home savings", () => {
	describe("1 - Example calculation", () => {
		it("1.a - Initial State: Calculate with default value", async () => {
			// Given
			mockedExampleCalculationMethod.mockReturnValueOnce(delayedPromiseResolve({ totalPayment: 1_300_000 }));

			// When
			render(<Page />);

			// Then
			expect(mockedExampleCalculationMethod).toBeCalledTimes(1);
			const totalPayment = screen.getByTestId("total-payment");
			await waitFor(() => expect(totalPayment).toBeSkeleton());
			await waitFor(() => expect(totalPayment).not.toBeSkeleton());
			expect(totalPayment).toHaveTextContent("1 300 000 Ft");
		});

		it("1.b - Update result", async () => {
			// Given
			mockedExampleCalculationMethod
				.mockReturnValueOnce(delayedPromiseResolve({ totalPayment: 1_100_000 }))
				.mockReturnValueOnce(delayedPromiseResolve({ totalPayment: 1_210_000 }));
			render(<Page />);
			const inputField = screen.getByTestId<HTMLInputElement>("monthly-savings");
			const totalPayment = screen.getByTestId("total-payment");
			await waitFor(() => expect(totalPayment).toBeSkeleton());

			// When
			fireEvent.input(inputField, { target: { value: "10000" } });
			fireEvent.blur(inputField);

			// Then
			expect(inputField.value).toBe("10,000");
			await waitFor(() => expect(totalPayment).toBeSkeleton());
			await waitFor(() => expect(totalPayment).not.toBeSkeleton());
			expect(totalPayment).toHaveTextContent("1 210 000 Ft");
		});

		it("1.c - Calculation error", async () => {
			// Given
			mockedExampleCalculationMethod
				.mockReturnValueOnce(delayedPromiseResolve({ totalPayment: 0 }))
				.mockReturnValueOnce(delayedPromiseReject(new Error("Mock error")));
			render(<Page />);
			const inputField = screen.getByTestId<HTMLInputElement>("monthly-savings");

			// When
			const totalPayment = screen.getByTestId("total-payment");
			await waitFor(() => expect(totalPayment).not.toBeSkeleton());
			fireEvent.input(inputField, { target: { value: "20000" } });
			fireEvent.blur(inputField);

			// Then
			expect(inputField).toHaveValue("20,000");
			await waitFor(() => expect(totalPayment).toBeSkeleton());
			await waitFor(() => expect(totalPayment).not.toBeSkeleton());
			expect(totalPayment).toHaveTextContent("-");
		});
	});

	describe("2 - Result list", () => {
		beforeAll(() => {
			mockedExampleCalculationMethod.mockReturnValue(delayedPromiseResolve({ totalPayment: 1_100_000 }));
		});

		beforeEach(() => {
			mockedCalculationMethod.mockReset();
		});

		it("2.a - Initial State: Hide result list before calculation", () => {
			// Given
			render(<Page />);

			// When
			const resultList = screen.queryByTestId("result-list");

			// Then
			expect(resultList).not.toBeInTheDocument();
		});

		it("2.b - Start Calculation: Show result list after calculation", async () => {
			// Given
			mockedCalculationMethod.mockReturnValueOnce(
				delayedPromiseResolve({
					results: [DUMMY_RESULT_ITEM],
					page: 1,
					total: 1,
				}),
			);

			render(<Page />);

			// When
			const calculateButton = screen.getByTestId("calculate-button");
			fireEvent.click(calculateButton);
			await waitFor(() => expect(calculateButton).toBeLoading());

			// Then
			const resultList = screen.getByTestId("result-list");
			expect(resultList).toBeInTheDocument();
		});

		it("2.c - Error Handling: Show error message on calculation failure", async () => {
			// Given
			mockedCalculationMethod.mockReturnValueOnce(
				delayedPromiseResolve({
					results: [DUMMY_RESULT_ITEM],
					page: 1,
					total: 1,
				}),
			);
			render(<Page />);

			// When
			const calculateButton = screen.getByTestId("calculate-button");
			fireEvent.click(calculateButton);
			await waitFor(() => expect(calculateButton).toBeLoading());

			// Then
			const firstResultItem = within(screen.getByTestId("result-item-1"));
			expect(firstResultItem.getByTestId("result-item-index")).toHaveTextContent("1.");
			expect(firstResultItem.getByTestId("result-item-provider-name")).toHaveTextContent("Bank name");
			expect(firstResultItem.getByTestId("result-item-title")).toHaveTextContent("Product name - Subtype");
			expect(firstResultItem.getByTestId("total-savings")).toHaveTextContent("6 265 008 Ft");
			expect(firstResultItem.getByTestId("deposit-yield")).toHaveTextContent("6,1%");
			expect(firstResultItem.getByTestId("account-opening-fee")).toHaveTextContent("0 Ft");
			expect(firstResultItem.getByTestId("savings-period")).toHaveTextContent("8 év");
		});

		it("2.d - No Results Message", async () => {
			// Given
			mockedCalculationMethod.mockReturnValueOnce(
				delayedPromiseResolve({
					results: [],
					page: 1,
					total: 0,
				}),
			);
			render(<Page />);

			// When
			const calculateButton = screen.getByTestId("calculate-button");
			fireEvent.click(calculateButton);
			await waitFor(() => expect(calculateButton).toBeLoading());

			// Then
			const noResult = screen.getByTestId("no-result");
			expect(noResult).toBeInTheDocument();
		});

		it("2.e - Calculation error: Show error message on calculation failure", async () => {
			// Given
			mockedCalculationMethod.mockReturnValueOnce(delayedPromiseReject(new Error("Mock error")));

			render(<Page />);

			// When
			const calculateButton = screen.getByTestId("calculate-button");
			fireEvent.click(calculateButton);
			await waitFor(() => expect(calculateButton).toBeLoading());

			// Then
			expect(mockedAddToast).toBeCalledWith({
				title: "Error",
				description: "Hiba a kalkuláció közben!",
				severity: "danger",
				color: "danger",
			});
		});

		it("2.f - Pagination: Show next page of results", async () => {
			// Given
			mockedCalculationMethod
				.mockReturnValueOnce(
					delayedPromiseResolve({
						results: Array(10).fill(DUMMY_RESULT_ITEM),
						page: 1,
						total: 11,
					}),
				)
				.mockReturnValueOnce(
					delayedPromiseResolve({
						results: [{ ...DUMMY_RESULT_ITEM, name: "Product 2" }],
						page: 2,
						total: 11,
					}),
				);
			render(<Page />);

			// When
			const calculateButton = screen.getByTestId("calculate-button");
			fireEvent.click(calculateButton);
			await waitFor(() => expect(calculateButton).toBeLoading());
			const nextButton = within(screen.getByTestId("result-list-pagination")).getByLabelText("pagination item 2");
			fireEvent.click(nextButton);
			await waitFor(() => {
				expect(mockedCalculationMethod).toBeCalledTimes(2);
			});

			// Then
			const firstResult = screen.getByTestId("result-item-11");
			const resultIndex = within(firstResult).getByTestId("result-item-index");
			expect(resultIndex).toHaveTextContent("11.");
			const resultProductName = within(firstResult).getByTestId("result-item-title");
			await waitFor(() => expect(resultProductName).not.toBeSkeleton());
			expect(resultProductName).toHaveTextContent("Product 2 - Subtype");
		});
	});
});
