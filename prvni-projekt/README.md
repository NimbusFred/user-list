# FE: úkol k dopracování

> Webová aplikace pro správu uživatelů využívajících API: https://am-api.inqubi.eu/api/v1/

### Obsah

- [Jak začít](#jak-začít)
- [Tipy](#tipy)
- [Úkoly - obecně](#úkoly---obecně)
- [Todo, které nejsou v kódu](#todo-které-nejsou-v-kódu)

## Jak začít

1. naklonování projektu
2. nainstalování dependencí: `npm install`
3. spuštění aplikaci: `npm start`
4. pokud nemáte účet, vytvořte si ho přes Swagger (`/auth/signup`)

   - výchozí role je 'ghost', tzn. ideálně s rolí "admin", protože ostatní role neumožňují upravovat 'role' nebo vytvářet uživatele viz.

   ```
   {
       "firstName": "test",
       "lastName": "user",
       "username": "testtest",
       "password": "heslo111,
       "role": "admin"
   }
   ```

### Tipy

- na stránce `http://localhost:3000/test` (komponenta: `TestScreen`) je použití Heroicons a jejich dokumentace

## Úkoly - obecně

1. prostudujte si celou aplikaci
2. snažte se držet podobný programovací styl
3. piště stručné komentáře ke spoustě věcí, co vytvoříte (komponenty, stránky, funkce)
4. pokud někde komentář není, prostudujte co daná věc dělá a doplňte komentář
5. snažte se vyřešit jednotlivá TODO v kódu a v README
6. využívejte TypeScript, typy (ať už pomocí `type` / `interface`), snažte se používat co nejméně `any`
7. pro validace využívejte Formik a Yup

## TODO, které nejsou v kódu:

1. vytvořte stránku RegisterScreen s formulářem pro registraci nového uživatele (inspirace u LoginScreen)

   - cesta: `/register`
   - formulář musí být validovaný (nezapomeňte na ověření zadaného hesla)
   - po úspěšné registraci uživatele přihlaste a přesměrujte na obrazovku s přehledem

2. vytvořte stránku UserDetailScreen s detailem vybraného uživatele

   - cesta: `/users/:id`
   - zde by měly být tlačítka pro editaci a smazání uživatele

3. vytvořte stránku NewUserScreen s formulářem pro vytvoření nového uživatele

   - cesta: `/users/new`
   - formulář musí být validovaný (zde není potřeba ověřovat zadané heslo)
   - po vytvoření uživatele přesměrujte uživatele seznam uživatelů
   - nějakým libovolným způsobem implementujte výběr uživatelské role
   - NICE-TO-HAVE:
     - využijte knihovnu: https://www.npmjs.com/package/react-toastify
     - pokud se něco nepodaří, zobrazte uživateli nějakou chybovou hlášku (error toast message)
     - pokud se vytvoření podaří zobrazte success toast message

4. vytvořte stránku EditUserScreen (a nebo modifikujte NewUserScreen) s formulářem pro editaci uživatele

   - cesta:
     - při vytváření nové stránky: `/users/edit/:id`
     - při úpravě stránky pro vytvoření nového uživatele: `/users/new/:id`
   - podle :id v cestě naplňte formulář uživatelskými daty
   - platí to samé co pro předchozí TODO 3)

5. vytvořte v `types/` typ User pro uživatele

6. vytvořte `ThemeProvider` pro přepínání tématu aplikace

   - témata:
     - Light - světlé pozadí, tmavý text
     - Dark - tmavé pozadí, světlý text
     - a nějaké vaše custom

7. snažte se pracovat i s responzivitou (https://tailwindcss.com/docs/responsive-design)

8. povolení vytváření a editace uživatelů podle rolí + editace vlastního uživatele

   - **až budete mít vyřešené vytváření a editaci uživatelů**
     -> objekt `user` (v auth contextu) má v sobě field `role`
     - pokud bude mít aktuální uživatel roli "admin" nebo "manager", umožněte mu vytvářet a editovat uživatele (conditional rendering)
     - umožněte uživateli editaci vlastního uživatele i když nemá roli "admin" nebo "manager"
     - roli může měnit jen "admin"
     - v seznamu uživatelů a v detailu uživatele by měly zmizet tlačítka pro editaci a smazání (conditional rendering)

9. až nebudete `TestScreen` s ukázkou, jak používat Heroicons potřebovat, tak komponentu i routu na ni odeberte
