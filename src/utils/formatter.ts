import { siteConfig } from "@/config/site";

export const optionalFormat = <T>(value: T | undefined | null, callback: (value: T) => string) =>
	value === undefined || value === null ? "-" : callback(value);

export const formatCurrency = (value: number) => `${value.toLocaleString(siteConfig.locale)} Ft`;

export const formatMonths = (v: number) => {
	if (v % 12 === 0) {
		return `${v / 12} év`;
	}

	return `${v} hónap`;
};

export const formatPercent = (v: number) =>
	optionalFormat(v, (value: number) => `${(value * 100).toLocaleString(siteConfig.locale)}%`);
