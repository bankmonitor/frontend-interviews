import { HomeSavingsForm, HomeSavingsResultList } from "@/components/calculators/home-savings";
import { DefaultLayout } from "@/layouts/default";
import { BanknotesIcon, CurrencyDollarIcon, GiftIcon, ScaleIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, Divider } from "@heroui/react";
import type { FC } from "react";

export const Page: FC = () => (
	<DefaultLayout>
		<section className="flex flex-col gap-10 lg:flex-row">
			<div className="flex flex-col gap-8">
				<h1 className="font-bold text-3xl lg:text-5xl">
					<span className="bg-gradient-to-l from-primary-500 to-secondary-400 bg-clip-text text-transparent">
						Lakástakarék kalkulátor
					</span>{" "}
					– Tervezz okosan, takaríts meg könnyedén!
				</h1>
				<h2 className="text-xl lg:text-3xl">
					Használd ki a legjobb ajánlatokat és építsd a jövőd kedvezményekkel!
				</h2>
				<div className="flex lg:mt-6">
					<div className="pointer-events-auto rounded-large border-1 border-divider bg-gradient-to-r from-secondary-500 to-primary-400 px-6 py-2 text-white sm:px-3.5 dark:from-secondary-200 dark:to-primary-100">
						Ne hagyd ki! Most akár <strong>0 Ft-os számlanyitással</strong> kezdheted a lakástakarékot!
						<br />
						<span className="hidden lg:inline">
							Takaríts meg havi 10-100 ezer forintot, és élvezd a <strong>garantált bónuszokat</strong>!
						</span>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-8 xl:w-[75%]">
					<Card className="border-1 border-secondary-200 bg-gradient-to-r from-primary-50 to-secondary-50">
						<CardBody className="flex flex-row items-center gap-4 p-4">
							<CurrencyDollarIcon className="size-8 flex-none text-secondary" />
							<Divider orientation="vertical" />

							<p>Akár 185 000 Ft bónusz a megtakarításod mellé!</p>
						</CardBody>
					</Card>
					<Card
						className="border-1 border-secondary-200 bg-gradient-to-r from-primary-50 to-secondary-50"
						isHoverable
					>
						<CardBody className="flex flex-row items-center gap-4 p-4">
							<BanknotesIcon className="size-8 flex-none text-secondary" />
							<Divider orientation="vertical" />
							<p>Magas hozam: éves szinten akár 6% felett!</p>
						</CardBody>
					</Card>
					<Card className="border-1 border-secondary-200 bg-gradient-to-r from-primary-50 to-secondary-50">
						<CardBody className="flex flex-row items-center gap-4 p-4">
							<ScaleIcon className="size-8 flex-none text-secondary" />
							<Divider orientation="vertical" />

							<p>Teljesen adómentes – minden forint a tiéd!</p>
						</CardBody>
					</Card>
					<Card className="border-1 border-secondary-200 bg-gradient-to-r from-primary-50 to-secondary-50">
						<CardBody className="flex flex-row items-center gap-4 p-4">
							<GiftIcon className="size-8 flex-none text-secondary" />
							<Divider orientation="vertical" />

							<p>Extra kamatbónusz a befektetésed után!</p>
						</CardBody>
					</Card>
				</div>
			</div>
			<div className="flex items-center justify-center">
				<HomeSavingsForm />
			</div>
		</section>
		<HomeSavingsResultList />
	</DefaultLayout>
);
