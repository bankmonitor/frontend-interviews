import { HeroUIProvider, ToastProvider } from "@heroui/react";
import type { FC, ReactNode } from "react";
import type { NavigateOptions } from "react-router-dom";
import { useHref, useNavigate } from "react-router-dom";
import { siteConfig } from "./config/site";

declare module "@react-types/shared" {
	interface RouterConfig {
		routerOptions: NavigateOptions;
	}
}

interface Props {
	children: ReactNode;
}

export const Provider: FC<Props> = ({ children }) => {
	const navigate = useNavigate();

	return (
		<HeroUIProvider locale={siteConfig.locale} navigate={navigate} useHref={useHref}>
			<ToastProvider />
			{children}
		</HeroUIProvider>
	);
};
