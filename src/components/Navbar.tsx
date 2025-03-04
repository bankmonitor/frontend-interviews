import { ThemeSwitch } from "@/components/ThemeSwitch";
import { siteConfig } from "@/config/site";
import { AcademicCapIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import {
	Navbar as HeroUINavbar,
	Input,
	Kbd,
	Link,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	link as linkStyles,
} from "@heroui/react";
import clsx from "clsx";

export const Navbar = () => {
	const searchInput = (
		<Input
			aria-label="Keresés"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			endContent={
				<Kbd className="hidden lg:inline-block" keys={["command"]}>
					K
				</Kbd>
			}
			labelPlacement="outside"
			placeholder="Keresés..."
			startContent={
				<MagnifyingGlassIcon className="pointer-events-none size-4 flex-shrink-0 text-base text-default-400" />
			}
			type="search"
		/>
	);

	return (
		<HeroUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand className="max-w-fit gap-3">
					<Link className="flex items-center justify-start gap-1" color="foreground" href="/">
						<AcademicCapIcon className="size-4" />
						<p className="font-bold text-inherit">INTERVIEW</p>
					</Link>
				</NavbarBrand>
				<div className="ml-2 hidden justify-start gap-4 lg:flex">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<Link
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:font-medium data-[active=true]:text-primary",
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</Link>
						</NavbarItem>
					))}
				</div>
			</NavbarContent>

			<NavbarContent className="hidden basis-1/5 sm:flex sm:basis-full" justify="end">
				<NavbarItem className="hidden gap-2 sm:flex">
					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
			</NavbarContent>

			<NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				{searchInput}
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navItems.map((item, index) => (
						<NavbarMenuItem key={`${item.label}`}>
							<Link
								color={
									index === 2
										? "primary"
										: index === siteConfig.navItems.length - 1
											? "danger"
											: "foreground"
								}
								href="#"
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</HeroUINavbar>
	);
};
