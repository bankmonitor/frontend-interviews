import "@testing-library/jest-dom";
import { expect } from "vitest";

expect.extend({
	toBeSkeleton(element: HTMLElement) {
		const { isNot } = this;

		return {
			pass: element.getAttribute("data-loaded") !== "true",
			message: () => `It is ${!isNot ? " not" : ""} skeleton`,
		};
	},

	toBeLoading(element: HTMLElement) {
		const { isNot } = this;

		return {
			pass: element.getAttribute("data-loading") !== "true",
			message: () => `It is ${!isNot ? " not" : ""} skeleton`,
		};
	},
});
