import { Page as IndexPage } from "@/pages/index";
import { Page as LakastakarekPage } from "@/pages/lakastakarek-kalkulator";
import { Page as NettoBerPage } from "@/pages/netto-ber-kalkulator";
import { Route, Routes } from "react-router-dom";

export const App = () => (
	<Routes>
		<Route element={<IndexPage />} path="/" />
		<Route element={<LakastakarekPage />} path="/lakastakarek-kalkulator" />
		<Route element={<NettoBerPage />} path="/netto-ber-kalkulator" />
	</Routes>
);
