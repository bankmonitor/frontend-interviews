import { FaceFrownIcon } from "@heroicons/react/24/outline";

export const NoResult = () => (
	<div className="my-6" data-testid="no-result">
		<FaceFrownIcon className="mx-auto size-16 text-default-300" />
		<p className="text-center font-semibold text-default-500 text-xl">
			Sajnos a megadott adatok alapján nincs találat
		</p>
	</div>
);
