import { Calculator } from "@/components/calculators/net-salary/Calculator";
import { DefaultLayout } from "@/layouts/default";
import type { FC } from "react";

export const Page: FC = () => (
	<DefaultLayout>
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg justify-center text-center">
				<h1 className="font-bold text-2xl">Nettó bér kalkulátor</h1>
				<p>Készíts egy egyszerű kalkulátort ami bruttó bér alapján kiszámolja a nettó bért.</p>
			</div>
		</section>
		<Calculator />
	</DefaultLayout>
);
