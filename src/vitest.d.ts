import "vitest";

interface CustomMatchers<R = unknown> {
	/**
	 * Custom matcher for checking if an element is in skeleton state
	 *
	 * @returns {R}
	 */
	toBeSkeleton: () => R;

	/**
	 * Custom matcher for checking if an element is in loading state
	 *
	 * @returns {R}
	 */
	toBeLoading: () => R;
}

declare module "vitest" {
	interface Assertion<T = any> extends CustomMatchers<T> {}
	interface AsymmetricMatchersContaining extends CustomMatchers {}
}
