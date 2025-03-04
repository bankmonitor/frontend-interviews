import { Button, Card, CardBody, CardFooter, CardHeader, Image, Link } from "@heroui/react";
import type { FC } from "react";

interface Props {
	title: string;
	description: string;
	url: string;
}

export const ProductCard: FC<Props> = ({ title, description, url }) => (
	<Card key={url}>
		<CardHeader className="flex gap-3">
			<Image
				alt="heroui logo"
				height={40}
				radius="sm"
				src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
				width={40}
			/>
			<div className="flex flex-col">
				<p className="text-md">{title}</p>
			</div>
		</CardHeader>
		<CardBody>
			<p>{description}</p>
		</CardBody>
		<CardFooter className="flex justify-end">
			<Button as={Link} showAnchorIcon href={url}>
				Kezdés
			</Button>
		</CardFooter>
	</Card>
);
