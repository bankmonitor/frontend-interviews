/**
 * Returns a promise that resolves with the given value after a specified delay.
 *
 * @param value - The value with which the promise will be resolved.
 * @param delay - The delay in milliseconds before the promise is resolved. Defaults to 500ms.
 * @returns A promise that resolves with the given value after the specified delay.
 */
export const delayedPromiseResolve = (value: any, delay = 500) =>
	new Promise((resolve) => setTimeout(() => resolve(value), delay));

/**
 * Returns a promise that rejects with the given value after a specified delay.
 *
 * @param value - The value with which the promise will be rejected.
 * @param delay - The delay in milliseconds before the promise is rejected. Defaults to 500ms.
 * @returns A promise that rejects with the given value after the specified delay.
 */
export const delayedPromiseReject = (value: any, delay = 500) =>
	new Promise((_resolve, reject) => setTimeout(() => reject(value), delay));
