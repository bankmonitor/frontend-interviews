import "@testing-library/jest-dom";
import { expect } from "vitest";

expect.extend({
	toBeSkeleton(element: HTMLElement) {
		const { isNot } = this;

		return {
			pass: element.getAttribute("data-loaded") !== "true",
			message: () => `Element is ${!isNot ? "not " : ""} in skeleton state`,
		};
	},

	toBeLoading(element: HTMLElement) {
		const { isNot } = this;

		return {
			pass: element.getAttribute("data-loading") !== "true",
			message: () => `Element is ${!isNot ? "not " : ""} in loading state`,
		};
	},
});
