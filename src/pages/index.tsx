import { DefaultLayout } from "@/layouts/default";
import type { FC } from "react";
import { ProductCard } from "../components/ProductCard";

const cards = [
	{
		title: "Nettó bér kalkulátor",
		description: "Készíts egy kalkulátort ami kiszámítja a bruttó bérből a nettó bért.",
		url: "/netto-ber-kalkulator",
	},
	{
		title: "LTP kalkulátor frontend",
		description: "Készíts egy kalkulátort ami a LTP API eredményét jeleníti meg.",
		url: "/lakastakarek-kalkulator",
	},
];

export const Page: FC = () => (
	<DefaultLayout>
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="mb-3 inline-block max-w-lg justify-center text-center font-bold text-4xl">
				Válassz ki egy <span className="text-primary">feladatot!</span>
			</div>
			<div className="grid grid-cols-1 justify-center gap-4 md:grid-cols-2">
				{cards.map((card) => (
					<ProductCard key={card.url} {...card} />
				))}
			</div>
		</section>
	</DefaultLayout>
);
