import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { Page } from "../pages/lakastakarek-kalkulator/index";
import { DUMMY_RESULT_ITEM } from "./home-savings.data";
import { delayedPromiseReject, delayedPromiseResolve } from "./utils";
import "@testing-library/jest-dom";

const { mockExampleCalculation, mockCalculation, mockAddToast } = vi.hoisted(() => ({
	mockExampleCalculation: vi.fn(),
	mockCalculation: vi.fn(),
	mockAddToast: vi.fn(),
}));

vi.mock("@/services/home-savings/example-calculation", () => ({ exampleCalculation: mockExampleCalculation }));
vi.mock("@/services/home-savings/calculation", () => ({ calculation: mockCalculation }));
vi.mock("@heroui/toast", () => ({ addToast: mockAddToast }));

describe("Home Savings Calculator", () => {
	describe("1 - Example Calculation", () => {
		it("1.a - should display an initial example calculation result", async () => {
			// Given
			mockExampleCalculation.mockReturnValueOnce(delayedPromiseResolve({ totalPayment: 1_300_000 }));

			// When
			render(<Page />);

			// Then
			expect(mockExampleCalculation).toBeCalledTimes(1);
			const totalPayment = screen.getByTestId("total-payment");
			await waitFor(() => expect(totalPayment).toBeSkeleton());
			await waitFor(() => expect(totalPayment).not.toBeSkeleton());
			expect(totalPayment).toHaveTextContent("1 300 000 Ft");
		});

		it("1.b - should update the example calculation when the input changes", async () => {
			// Given
			mockExampleCalculation
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

		it("1.c - should handle example calculation errors gracefully", async () => {
			// Given
			mockExampleCalculation
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

	describe("2 - Results List", () => {
		beforeAll(() => {
			mockExampleCalculation.mockReturnValue(delayedPromiseResolve({ totalPayment: 1_100_000 }));
		});

		beforeEach(() => {
			mockCalculation.mockReset();
		});

		it("2.a - should not display the result list initially", () => {
			// Given
			render(<Page />);

			// Then
			expect(screen.queryByTestId("result-list")).not.toBeInTheDocument();
		});

		it("2.b - should show the result list after clicking calculate", async () => {
			// Given
			mockCalculation.mockReturnValueOnce(
				delayedPromiseResolve({ results: [DUMMY_RESULT_ITEM], page: 1, total: 1 }),
			);
			render(<Page />);
			expect(screen.queryByTestId("result-list")).not.toBeInTheDocument();

			// When
			const calculateButton = screen.getByTestId("calculate-button");
			fireEvent.click(calculateButton);
			await waitFor(() => expect(calculateButton).toBeLoading());

			// Then
			expect(screen.getByTestId("result-list")).toBeInTheDocument();
			expect(screen.queryByTestId("no-result")).not.toBeInTheDocument();
		});

		it("2.c - should show the result list after clicking calculate", async () => {
			// Given
			mockCalculation.mockReturnValueOnce(
				delayedPromiseResolve({ results: [DUMMY_RESULT_ITEM], page: 1, total: 1 }),
			);
			render(<Page />);

			// When
			const calculateButton = screen.getByTestId("calculate-button");
			fireEvent.click(calculateButton);
			const firstResultItem = within(screen.getByTestId("result-item-1"));
			const totalSavings = firstResultItem.getByTestId("total-savings");
			await waitFor(() => expect(totalSavings).toBeSkeleton());
			await waitFor(() => expect(totalSavings).not.toBeSkeleton());

			// Then
			expect(firstResultItem.getByTestId("result-item-index")).toHaveTextContent("1.");
			expect(firstResultItem.getByTestId("result-item-provider-name")).toHaveTextContent("Bank name");
			expect(firstResultItem.getByTestId("result-item-title")).toHaveTextContent("Product name - Subtype");
			expect(firstResultItem.getByTestId("total-savings")).toHaveTextContent("6 265 008 Ft");
			expect(firstResultItem.getByTestId("deposit-yield")).toHaveTextContent("6,1%");
			expect(firstResultItem.getByTestId("account-opening-fee")).toHaveTextContent("0 Ft");
			expect(firstResultItem.getByTestId("savings-period")).toHaveTextContent("8 év");
		});

		it("2.d - should show a message if no results are found", async () => {
			// Given
			mockCalculation.mockReturnValueOnce(delayedPromiseResolve({ results: [], page: 1, total: 0 }));
			render(<Page />);

			// When
			const calculateButton = screen.getByTestId("calculate-button");
			fireEvent.click(calculateButton);
			await waitFor(() => expect(calculateButton).toBeLoading());

			// Then
			expect(screen.getByTestId("no-result")).toBeInTheDocument();
			expect(screen.queryByTestId("result-list-pagination")).not.toBeInTheDocument();
		});

		it("2.e - should handle calculation errors and display an error message", async () => {
			// Given
			mockCalculation.mockReturnValueOnce(delayedPromiseReject(new Error("Mock error")));
			render(<Page />);

			// When
			const calculateButton = screen.getByTestId("calculate-button");
			fireEvent.click(calculateButton);
			await waitFor(() => expect(calculateButton).toBeLoading());

			// Then
			expect(mockAddToast).toBeCalledWith({
				title: "Error",
				description: "Hiba a kalkuláció közben!",
				severity: "danger",
				color: "danger",
			});
		});

		it("2.f - should support pagination and fetch the next page of results", async () => {
			// Given
			mockCalculation
				.mockReturnValueOnce(
					delayedPromiseResolve({ results: Array(10).fill(DUMMY_RESULT_ITEM), page: 1, total: 11 }),
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
			fireEvent.click(within(screen.getByTestId("result-list-pagination")).getByLabelText("pagination item 2"));
			await waitFor(() => {
				expect(mockCalculation).toBeCalledTimes(2);
			});

			// Then
			const firstResult = within(screen.getByTestId("result-item-11"));
			expect(firstResult.getByTestId("result-item-index")).toHaveTextContent("11.");
			const resultProductName = firstResult.getByTestId("result-item-title");
			await waitFor(() => expect(resultProductName).not.toBeSkeleton());
			expect(resultProductName).toHaveTextContent("Product 2 - Subtype");
		});
	});
});
