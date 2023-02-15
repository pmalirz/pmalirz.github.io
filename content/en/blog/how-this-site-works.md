---
author: Przemek Malirz
title: First pancake 🥞
code: blog 
date: 2023-01-30
draft: true
description: Building blog with use of Hugo, Tailwind and GitHub Pages with just a tad of Alpine.js and Midjuourney 
keywords: [hugo, tailwind, alpine.js, midjourney, markdown, github pages]
weight: 1
---
To startowy wpis a jak wiadomo, pierwszy wpis jest jak pierwszy naleśnik. Ponoć takich pierwszych naleśników w
blogowaniu jest po pachy. Zatem owe pierwsze moje naleśniki zamierzam zmarnować na mniej istotne tematy. Rozgrzeję się i
zobaczę, jak działa to całe modne blogowanie. Obiecuję sobie, że będzie jak najkrócej. Przy okazji przetestujemy
działanie Hugo i tworzenie treści za pomocą plików Markdown. Co działa a co mniej. 

Będzie to post o technologiach użytych do utworzenia strony [przemek.malirz.pl](https://przemek.malirz.pl/).
Nie będę się zatrzymywał zbyt długo przy żadnej z nich, ponieważ na temat każdej są stosy informacji. Jednak opowiem o 
swoich wrażeniach oraz argumentach za i przeciw. 

Zatem smażymy!

## Technologie

* [Hugo](https://gohugo.io/) - content engine (implementacja w golang)
* [Tailwindcss](https://tailwindcss.com/) - jestem zakochany w tych komponentach (prawie kupiłem licencje)
* [Markdown](https://www.markdownguide.org/) - treści tworzone są z użyciem szeroko znanego w środowisku programistów
  formatu _md_.
* [Midjournej](https://midjourney.com/) - wszystkie obrazy (łącznie z logo, oprócz mojego zdjęcia :))
* [Alpine.js](https://alpinejs.dev/) - stronka musi się ruszać, co nie?
* [GitHub Pages](https://pages.github.com/) - stronka w końcu musi zostać opublikowana?

Strony w takiej formie na pewno nie rekomendowałbym osobom mało technicznym. W takich przypadkach bierzemy CMS'a jak
Wordpress (prosto i przyjemnie = WYSWIG). W sumie również ja powinienem wybrać CMS, jednak postanowiłem się katować
Markdown'em.

### Hugo

Miało być Gatsby 5. Jednak po jednodniowej, przegranej walce odpuszczam. Rozważając kilka innych możliwości, decyduję
się w końcu na **Hugo**.
**Hugo** to po prostu maszynka, która tak samo, jak npm wypluje nam paczkę gotową do umieszczenia na dowolnym serwerze
HTTP. Nie ma tutaj mowy o SSR. **Wszystko generujemy build time**. Jeżeli zaś jest taka potrzeba, resztę możemy 
pozostawić JavaScriptowi po stronie przeglądarki (jak JS do otwierania i chowanie menu lub diagramy `mermaid`).

W telegraficznym skrócie konstrukcja mojej strony przebiegała następująco:

1. **Przygotowanie szkieletu / wyglądu strony**. Czyli opracowanie szablonów (praca z HTML, CSS). Ten punkt powinno się
   z założenia zrobić raz a dobrze. Podczas pracy nad materiałami będziemy poruszać sie w punktach 2 -> 3.   
   Opracowując szablony, posługujemy się wstawkami sterującymi [text/template](https://pkg.go.dev/text/template) 
   języka _Go_. 
2. **Tworzenie kontentu**. Kontent (oferty, blog, o mnie) tworzę w plikach _md_. Pliki _md_ renderowane są przez Hugo do
   postaci HTML w cyklu budowania (czyli w kroku 3). 
3. **Publikacja zmian**. Puszczam build Hugo i dostaje pakiet gotowy do wrzucenia na serwer (dla mnie builda uruchamia
   GitHub actions).

Podczas pracy nad edycją treści (punkt 2) posługuję się trybem`--watch` Hugo. Jest to dokładnie coś co znamy z watch'a
npm. **Hugo** posiada wbudowany serwer, kompilując każdą zmianę (na Ctrl+S) do pamięci (opcjonalnie może zrzucać
kompilaty na dysk). Jest to diabelnie szybki proces.

Zatem moja praca z **Hugo** składa się na:

* **HTML**, **CSS**, **JavaScript** - za pomocą których zaprojektowałem szablony oraz re-używalne fragmenty szablonów ze
  wstawkami kodu **Golang** i użyciem API **Hugo**.
* **Markdown** cała treść - oferty, blog, o mnie.

Przykładowy fragment szablonu _Hugo_, renderujący kafelki ofert na mojej głównej stronie:

```html
<!-- Kod iteruje po plikach md, leżących w folderze "offer". Folder taki przez konwencję określa nam atrybut Sekcji. -->
<main class="md:container mx-auto mb-auto sm:mt-12 mt-4 px-4 md:px-8 lg:px-24 2xl:px-48">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-4">
        {{range where .Site.Pages "Section" "offer" }}
            {{if .IsPage}}
                {{partial "offer-list-item.html" (dict "context" .)}}
            {{ end }}
        {{end}}
    </div>
</main>
```

_"offer-list-item.html"_ jest reużywalnym fragmentem HTML, w którym zaimplementowałem wygląd samego kafelka.

Mimo iż krótko używam **Hugo**, postaram sie wypisać zauważone fakty i ciekawostki.

**👍Lubię**

* **Hugo** bazuje na **Golang** i kompiluje output do pamięci RAM. Pracując w trybie `--watch` działa szybciej niż
  mrugnięcie oka.
* **Markdown** czyli seniorzy programują swoje blogi, a nie je piszą, right? My używamy do edycji VS Code.
* **Totalna kontrola** nad każdym calem swojego rozwiązania. Uwielbiam to i tyle. Dlatego jestem antyfanem magii w
  kodowaniu (jak np. Dozer lub Lombook). Ilu czytelników właśnie straciłem? 😈
* **Draft i inne metadane** w plikach _md_ pozwalają łatwo sterować tym co, kiedy i jak publikujemy. Np ustawienie
  atrybutu _Draft_ na artykule w pliku _md_ pozwala nam zdecydować w trakcie builda czy publikujemy czy też nie
  _Draftowe_ artykuły.
* **Strona za darmo** - tworzenie i infrastruktura nic nas nie kosztują. Hosting mamy na GitHub Pages. Pamiętajmy, że
  mówimy o stronie statycznej.
* **Nauka** - poznałem Hugo, TailwindCSS i Alpine.js... i GitHub Pages oraz Midjournej.
* **i18n** - której muszę spróbować
* **Aktywny GitHub** - projekt jest aktywny na GitHubie, popularny i nawet często releasowany.
* **Pluginy** - takie jak Discuss czy Google Analytics. Poza tym nie ma problemu z samodzielnymi wstawkami JS w naszych
  szablonach. W końcu rzeźbimy niskopoziomowo z palca.
* **Struktura folderów** - convention over configuration. Poprostu, foldery mają swoje przeznaczenie. Można je na siłę
  modyfikować ale po co?
* **Optymalizacja obrazów** poprzez API **Hugo**. Wygląda to tak:

```html
{{ $image := $image.Resize "420x jpeg q85" }}
<img class="object-cover w-full h-full offer-item-list-image" src="{{$image.Permalink}}"
     alt="Image {{.context.Params.code}}">
```

**👎Nie bardzo lubię**

* **HTML i CSS na start** może zniechęcić. Układanie flex, grid, typografia dla różnych ekranów? Tak, niestety. Bonusem
  jest to, że dodatkowo nabywamy wiedzę (chwilową, bo układania div'ów nie da się zapamiętać).
* **CSS w trybie watch** - coś mi to nie chce zadziałać. Mam problem z uwzględnianiem zmian podczas modyfikacji `class`
  na elementach HTML. Będę to próbował ugryźć użyciem babel. Zobaczymy.
* **Markdown** - tak, dorzucam też MD do wad. Przejrzystość artykułu w IntelliJ vs edytor WYSWIG Wordpress? Nie ma o 
  czym
  mówić nawet. Ja tu pracuje z jakimiś ślaczkami, gwiazdkami i tagami. Oczywiście białymi na czarnym tle. Wiadomo.
* **Wstawki Go** nie bardzo mi się podobają ([text/template](https://pkg.go.dev/text/template)). Strasznie toporne jak 
  dla mnie. Brak autocomplete, debug to metoda kroczącej dupy zaś ustawianie zmiennej przez 
[.Scratch](https://gohugo.io/functions/scratch/) to jakiś żart.

**👃Smell**

* **Czyżby One man army?** - przeglądając dokumentację, pomimo bogatego community i naprawdę wielu materiałów, wszędzie
  wyświetla się zdjęcie jednego kolegi (kudos). Czyżby projekt One man army? Zawsze zwracajcie na to uwagę! Ja
  absolutnie zawsze zwracam, ale tym razem zapomniałem :). Poza tym, któż nie słyszał o Hugo, który jest bardzo aktywnym
  projektem na GitHubie.

### TailwindCSS

Przyznaję, że z Tailwind pracuje mi się świetnie. Do tego stopnia, iż przez chwilę zastanawiałem się nad jego zakupem. 
Cena jest dość wysoka, natomiast trzeba przyznać, że model sprzedaży jest bardzo atrakcyjny: 
płacisz raz i masz dostęp na zawsze do wszystkich komponentów, aktualizacji i szablonów. Darmowa wersja, 
którą używam jest dla mnie póki co wystarczająca, jednak nie ma w niej gotowych, często fantastycznie 
wyglądających i skomplikowanych komponentów.
Musimy zatem dziergać je sami. Ja, bardzo skomplikowanych komponentów nie miałem, jednak już np. kafelki z ofertami 
(główna strona), czy badges musiałem składać sam. Po prostu Tailwind, w wersji darmowej, dostarcza nam samych klas CSS 
utility. Tailwind działa na zasadzie znanego podejścia do stylowania elementów (chociażby z Bootstrap) poprzez 
dodawanie do elementów HTML różnych atomowych klas.  Oto przykład:

```html
<main class="container max-w-3xl mx-auto mb-auto sm:mt-12 mt-4 px-2">
</main>
```

Dodatkowe [warianty rozmiaru](https://tailwindcss.com/docs/responsive-design) (`sm`, `md`, `lg`) pomagają
nam na różnicowanie wyglądu w
zależności od rozmiaru ekranu, tworząc układ naszej strony responsywnym. W ten sposób powyższy `<main/>` będzie 
posiadał topowy margines o rozmiarze `12rem` dla wszystkich ekranów od małego wzwyż.
Wszystkie ekrany mniejsze niż `sm`, będą posiadały ten margines o rozmiarze `4rem`. Tworząc treści mamy nawet dostęp do
modyfikatora klas `dark`, zobaczcie, jak można zmieniać automatycznie tło artykułu w zależności czy ktoś ustawi tryb
ciemny, czy jasny:

```html
<article class="prose dark:prose-invert">
    {{ markdown }}
</article>
```

Plugin Tailwind'a `@typografy` pozwala na operowanie klasami `prose`. Plugin ten pozwala na modyfikowanie wyglądu stron
HTML automatycznie generowanych z _Markdown_. Bomba! Przecież tego właśnie potrzebujemy!
Jak już *Hugo* prezrobi nam _md_ na _HTML_ to jeszcze musimy jakoś ostylować te wszystkie paragrafy, listy, nagłówki,
linki itd. Działa to bardzo dobrze. No i oczywiście _prose_ działa w wariantach jak `prose-sm` lub `prose-lg` i
dodatkowo pozwala się miksować z modyfikatorami rozmiaru ekranu `sm`, `md`, `lg` itd. Ogromny wachlarz możliwości.

### Markdown

Nie będę o nim wiele pisał. Może jedynie, że dla twórców treści jest dosyć ograniczony (może to dobrze?) i 
zabrudzony znacznikami. Posiada natomiast pluginy _npm_, np. do weryfikacji reguł, treści gramatycznych i 
ortograficznych przed opublikowaniem (jak [Vale](https://github.com/errata-ai/vale)) i wiele innych. 
_Markdown_ dla _Hugo_ posiada również w nagłówku metadane, którymi
możemy się posługiwać w szablonach HTML. Np. oto nagłówek mojego pliku _about.md_:

```markdown
---
author: Przemek Malirz title: O mnie date: 2023-01-09 description: O mnie keywords: [about, omnie]
type: about
---
Nazywam się **Przemek Malirz** i przed prezentacją najchętniej poszedłbym na chorobowe...
```

Tutaj uwaga. _Markdown_ nie jest jedyną opcją, bynajmniej. Proszę bardzo, każdy znajdzie coś dla siebie: 
https://gohugo.io/content-management/formats/

### Midjourney

Wszystkie, ale to absolutnie wszystkie grafiki wygenerowane są w _Midjourney_ (tło, obrazy w kafelkach ofert).
Bardzo fajne narzędzie. Cierpi na drobne niuanse, ale nie będę się nad nimi rozwodził. Jestem pod wrażeniem tego, co
zafundował nam świat AI ostatnimi czasy. Dla takich zastosowań jak moje jest to killer dla stockowych rozwiązań. Czyż to
nie jest piękne?:

{{< figure src="/img/blog/how-this-site-works/robots-mj.png" class="flex max-w-xs" >}}

Z _Midjourney_ pracujemy poprzez bota na Discordzie wydając mu polecenia. Bot kolejkuje polecenie i po chwili wypluwa
dla nas propozycje swoich wyobrażeń na temat tego, co opisaliśmy w poleceniu, w postaci 4 proponowanych obrazów.
Za każdym razem wyrzuca zupełnie coś innego (nawet dla tego samego polecenia). Na darmowym koncie możemy poprosić
o wygenerowanie 25 propozycji.

Przykładowa komenda
```shell
/imagine propmpt: robotic pancakes, colorful --ar 3:2
```

Tyle o _Midjourney_. Polecam go gorąco, choć trzeba się do niego sporo nagadać, żeby uzyskać właściwy rezultat.

### Alpine.js

Strzał w 10. Szukałem czegoś zwięzłego, co doda klikalność do mojego menu, w trybie małego ekranu. Czyli otwórz i 
schowaj menu. To cała moja dynamika na stronie (na dzień pisania tekstu). Czy ktoś wybrałby tutaj Angulara? 
Trafiłem na Alpine.js, który obiecuje niezwykłą prostotę i przyjemność użytkowania. 
To jest to, czego potrzebowałem. Zobaczcie sami:

```html
<nav x-data="{ open: false }">
</nav>
```

To tyle z programowanie mojego menu. Otwieranie i zamykanie panelu to dodanie `x-data` z Alpine.js. Niesamowite co Ci
programiści frontu potrafią wymyślić. Szacunek.

### GitHub Pages

Czyli dla nas infrastruktura. Serwer, na którym wdrażana jest nasza strona. _Hugo_ buduje wszystko do folderu 
_public_, a folder ten wędruje sobie automatycznie na _GitHub Pages_. Wszystko się dzieje automatycznie poprzez 
akcje GitHuba. Akcje po poprawnym wywołaniu builda _Hugo_, commitują wynikowy folder _public_ na specjalnie nazwany 
("gh-pages") branch naszego publicznego repozytorium (repo z tym branchem lub sam branch musi być publiczne). 

W zasadzie sposób publikowania i commitowania artykułów skłonił mnie do wybrania takiego stosu. Zobaczcie, nie ma 
tutaj CMS'owej bazy danych, która może paść i którą trzeba aktualizować i chuchać i dmuchać. Baza danych to nasze pliki 
_md_ commitowane i pushowane na GitHuba. Praca w kilka osób i rozwiązywanie konfliktów? Znamy to z pracy z Gitem.
Dodatkowe zalety to to, że możemy pracować na branchach oraz reviewować zmiany przed dopuszczeniem do publikacji.
Backup bazy / naszych prac? Ja mam u siebie cały projekt, no i na GitHubie. Wystarczy. Jak będę chciał to po prostu 
kopia na pena i tyle.

## Dziennik pracy

1. Wstępna inicjalizacja i konfiguracja projektu
   1. Globalna instalacja Hugo `scoop install hugo-extended`
   2. Inicjalizacja projektu npm `npm init`
   3. Inicjalizacja repozytorium git `git init`
   4. Utworzenie repozytorium na GitHubie `pmalirz.github.io` (nazwa wymuszona przez GitHub Pages)
      1. Utworzenie brancha `/main`
      2. Utworzenie brancha `/gh-pages` - branch techniczny, do którego trafia skompilowany kod z brancha /main 
         (czyli zawartosc katalogu _public_ tworzonego przez build _Hugo_). GitHub Actions sam wrzuca kompilat na 
         tego brancha.
         GitHub Pages releasuje)
   5. Zakup i konfiguracja domeny malirz.pl
      1. Ręczna konfiguracja DNS w panelu dostawcy domeny `przemek.malirz.pl	3600	CNAME	pmalirz.github.io`  
      2. Konfiguracja domeny na repozytorium GitHub `przemek.malirz.pl`
         https:\//github.com/**[user]/[user].github.io**/settings/pages
2. Początkowa konfiguracja strony
   1. Instalacja potrzebnych bibliotek do obsługi CSS i JS
      1. Instalacja TailwindCSS \
         `npm i -D tailwindcss@latest postcss@latest autoprefixer@latest` \
         Sprawdź, w jaki sposób _Hugo_ buduje CSS bundle wrenderowując go w stronę: 
         ```js
         // Poszukaj resources.PostCSS
         themes/trainer/partials/head.html   
         ```
      2. Instalacja Alpine.js `npm i -D alpinejs` \
         Sprawdź w moim repozytorium pliki, w których globalnie odpalam Alpine.js dla strony:
         ```js
         // inicjalizacja Alpine.js
         themes/trainer/assets/script/index.js
         // pratial który wrenderuje skrypt w strone
         themes/trainer/partials/script
         // użycie powyższego partialu w sekcji <head/>
         themes/trainer/partials/head.html          
         ``` 
   2. Konfiguracja parametrów _Hugo_ w pliku ```config.toml``` 
   3. Utworzenie szkieletu folderów _Hugo_
   4. Utworzenie własnego theme w _Hugo_. Folder `themes/trainer`
   5. Praca nad szablonami HTML w połączeniu z kodem sterującym _Hugo_
      1. Zerknij koniecznie do `themes/trainer/partials/head.html`
         Znajdziesz w nim m.in. konfigurację Google Analytics oraz protokołu [Open Graph](https://ogp.me/).
         Jest też [Mermaid](https://mermaid.js.org/), którego jeszcze nie użyłem (ale działa)
   6. Utworzenie logo i wygenerowanie dla niego kolekcji favicons (https://realfavicongenerator.net/) 
3. Tworzenie kontentu
   1. Uruchamiam lokalnie serwer _Hugo_ `npm run watch:hugo` (zadanie zdefiniowane w `package.json`). \
      W IntelliJ na Ctrl+S podglądam zmiany na przeglądarce.
   2. Tworzenie Bloga - pliki _md_ w folderze `content/blog`
   2. Tworzenie Ofert - pliki _md_ w folderze `content/offer`
      1. Oferty renderowane są przez szablon `layoyts/index.html` iterując po plikach _md_. Dla każdego pliku 
         _md_ tworzony jest kafelek, którego szablon jest w `layouts/partials/offer-list-item.html`
4. Publikacja
   1. Git push zmian brancha `/main`  na zdalne repozytorium `przemek.malirz.pl`
      1. Jeżeli publikujemy pliki _md_, które są pracami w toku, wystarczy w ich nagłówku ustawić zmienną _Hugo_ 
         `Draft: true` 
   2. GitHub Actions samoczynnie zbuduje i wcommituje zmiany do brancha `/gh-pages`
   3. GitHub Pages pobiera każdą zmianę, udostępniając ją w domenie publicznej (zmiany są widoczne na internecie)
      Uwaga! Publikacja działa z opóźnieniem, możesz na ten temat poczytać w internecie
   
Pamiętajmy, że _npm_ tak naprawdę nie służy nam du budowania (kompilacji) strony. Dlatego też wszystkie zależności 
znajdują się w dev dependencies. To _Hugo_ kompiluje szablony, paczki CSS i JS.

## Wrażenia z pracy

Gdy już ogarnąłem szablony HTML różnych sekcji na mojej stronie, same wpisy tworzy mi się całkiem przyjemnie.
Używam dwóch monitorów. Z jednej strony IntelliJ z drugiej przeglądarka, błyskawicznie
odświeżająca zmiany na Ctrl+S. Pisząc "błyskawicznie", mam na myśli mrugnięcie oka. Nie trwa to nawet pół sekundy.  
_md_ jest od razu widoczny jako HTML.

Jeżeli miałbym podać 2 największe wady (w stosunku np. do takiego Wordpress), to pewnie byłyby to: przejrzystość 
podczas tworzenia tekstu oraz obrządki celem publikacji.

Jaka jest różnica między CMS WYSWIG jak _Wordpress_ a statycznym generatorem stron jak _Hugo_?
W _Wordpress_ używamy front-endu tworząc i publikując treści. 
W _Hugo_ używamy back-endu, treści zaś programujemy i wdrażamy.

## Dziękuję 🙏

Naleśnik wyszedł taki, jaki miał wyjść. Napiszę tylko, że pierwszego naleśnika lubię w domu zjadać ja. Jest gruby,
krzywy i tłusty. Czy ktoś się nim poczęstował? Nie wiem, ale z obgryzionymi paznokciami będę sprawdzał na Google
Analytics.

Chcę na koniec napisać, iż jestem pod wrażeniem technologi, z którymi mam tutaj do czynienia. Wymagana wiedza do ich
obsługi tak naprawdę daje jedynie frajdę i pozwala człowiekowi obcować z tym, czego w pracy najczęściej brak. A przecież
to tylko statyczny content. 

Kropka.