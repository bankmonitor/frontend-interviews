import { Navbar } from "@/components/Navbar";
import { Link } from "@heroui/react";
import type { FC } from "react";

interface DefaultLayoutProps {
	children: React.ReactNode;
}

export const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => (
	<div className="relative flex h-screen flex-col">
		<Navbar />
		<main className="container mx-auto max-w-7xl flex-grow px-6 pt-16">{children}</main>
		<footer className="flex w-full items-center justify-center py-3">
			<Link
				isExternal
				className="flex items-center gap-1 text-current"
				href="https://heroui.com"
				title="heroui.com homepage"
			>
				<span className="text-default-600">Powered by</span>
				<p className="text-primary">HeroUI</p>
			</Link>
		</footer>
	</div>
);
