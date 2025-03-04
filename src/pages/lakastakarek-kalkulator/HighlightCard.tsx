import { Card, CardBody, Divider } from "@heroui/react";
import type { JSXElementConstructor, ReactNode } from "react";

interface HighlightCardProps {
	icon: JSXElementConstructor<{ className: string }>;
	children: ReactNode;
}

export const HighlightCard = ({ icon: Icon, children }: HighlightCardProps) => (
	<Card className="border-1 border-secondary-200 bg-gradient-to-r from-primary-50 to-secondary-50">
		<CardBody className="flex flex-row items-center gap-4 p-4">
			<Icon className="size-8 flex-none text-secondary" />
			<Divider orientation="vertical" />
			<p>{children}</p>
		</CardBody>
	</Card>
);
