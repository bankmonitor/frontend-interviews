# Frontend Interjú feladat

## Interjú folyamata
- 10 perc bemutatkozás
- 40 perc feladat megoldás
- 10 perc kérdezz felelek

A feladat megoldására 40 perc áll rendelkezésre. Nem kell minden részét megoldani és nem is kell a tökéletes megoldás élérésére törekedni. Gondolkodj hangosan és kérdezz bátran, mert nem olyan embert keresünk aki mindent tud (mert olyan nincs), hanem akinek jó a gondolkozás módja!

## Feladat: Lakástakarék kalkulátor

A csapat szeretne készíteni egy lakástakarék termékeket összehasonlító kalkulátort. A kalkulátorban meg kell adni, a havonta megtakarítani kívánt összeget aminek hatására a kalkulátor egy példa kalkulációt végez és megmutatja a felhasználónak nagyjából milyen hozamra számíthat. Ezek után a felhasználó kérhet egy részletes listát, hogy a piacon milyen termékek érhetők el. A fejlesztés backendi része illetve a frontendi felület váza is elkészült, viszont Munkatárs Matyi menet közben sajnos lebetegedett🤒 ezért neked kéne befejezni a kalkulátort. Leírása alapján a példa kalkulációnál akadt el a fejlesztésben.

Lentebb látod a részfeladatokat, de ezekhez készültek tesztesetek így TDD módszerrel is megpróbálkozhatsz. A teszteseteket a következőképpen tudod futtatni:

```bash
npm run test
```

Vagy VScode esetén Vitest pluginnal.

### Részfeladatok

1. Példakalkuláció befejezése

	a. Keresd meg a hibát, hogy miért nem jelenik meg a példa kalkuláció eredménye a kalkulátorban.

	b. Módosítsd úgy a kódot, hogy a megtakarítási összeg módosítását követően frissüljön a példakalkuláció eredménye.

	c. Készítsd fel a kódot arra is, ha valamiért a példa kalkuláció hibára fut, vagy nincs eredménye.

2. Találati lista megjelenítése

	a. Módosítsd úgy a kódot, hogy amíg a felhasználó nem kattintott a kalkulálás gombra, addig ne jelenjen meg a találati lista.

	b. Kalkulálás indításakor jelenjen meg a találati lista kezdetben átmeneti töltő állapotban (skeleton).

	c. A kalkulálás gombra kattintva futtassuk le a kalkulációt a backend API-n keresztül ``services/home-savings/calculation.ts`` és jelenítsük meg az eredményeket a találati listában.

	d. Ha nincs találat, akkor jelenjen meg egy üzenet, hogy nincs találat.

	e. Ha a kalkuláció hibát ad vissza akkor jelenjen meg egy hibaüzenet.

	f. A találati lista alján legyen egy lapozó gomb, amivel lehet navigálni az találatok között.
