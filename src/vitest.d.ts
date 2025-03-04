import "vitest";

interface CustomMatchers<R = unknown> {
	toBeSkeleton: () => R;
	toBeLoading: () => R;
}

declare module "vitest" {
	interface Assertion<T = any> extends CustomMatchers<T> {}
	interface AsymmetricMatchersContaining extends CustomMatchers {}
}
