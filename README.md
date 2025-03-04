# Frontend Interview feladat

## Interview folyamata
- 10 perc bemutatkozás
- 40 perc feladat megoldás
- 10 perc kérdezz felelek

## Feladat: Lakástakarék kalkulátor

Az üzlet szeretne egy lakástakarék termékekek összehasonlító kalkulátort, ennek el is készültek a tervei és a hozzá tartozó backendi API is. Munkatár Matyi elkezdte a megvalósítást, de sajnos menet közben lebetegedett 🤒...
Fejezd be a kalkulátor fejlesztését!

### Részfeladatok

1. Matyi megpróbálta a példakalkulációt megvalósítani, de valamiért nem működik. Kérlek javítsd ki a hibát!

2. A találati lista szerkezete elkészült, de a kalkulátor még nem működik. Implementáld a kalkulátor működését!
__Elvárások__:

	a. Amíg nem kattintott a felhasználó a kalkulálás gombra, addig ne jelenjen meg a találati lista.

	b. Kalkulálás indításakor jelenjen meg a találati lista kezdetben átmeneti töltő állapotban (skeleton).

	c. A kalkulálás gombra kattintva futtassuk le a kalkulációt a backend API-n keresztül ``services/home-savings/calculation.ts`` és jelenítsük meg az eredményeket a találati listában.

	d. Ha nincs találat, akkor jelenjen meg egy üzenet, hogy nincs találat.

	e. Ha a kalkuláció hibát ad vissza akkor jelenjen meg egy hibaüzenet.

	f. A találati lista alján legyen egy lapozó gomb, amivel lehet lapozni a találati listán.
