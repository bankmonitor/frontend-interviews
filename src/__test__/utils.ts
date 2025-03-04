export const delayedPromiseResolve = (value: any, delay = 500) =>
	new Promise((resolve) => setTimeout(() => resolve(value), delay));

export const delayedPromiseReject = (value: any, delay = 500) =>
	new Promise((_resolve, reject) => setTimeout(() => reject(value), delay));
