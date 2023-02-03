---
author: Przemek Malirz
title: Pierwszy naleśnik 🥞
code: blog 
date: 2023-01-30 
description: Technikalia strony przemek.malirz.pl 
keywords: [blog, hugo, tailwind, alpine.js, midjourney]
weight: 1
---
To startowy wpis a jak wiadomo, pierwszy wpis jest jak pierwszy naleśnik. Ponoć takich pierwszych naleśników w
blogowaniu jest po pachy. Zatem owe pierwsze moje naleśniki zamierzam zmarnować na mniej istotne tematy. Rozgrzeję się i
zobaczę, jak działa to całe modne blogowanie. Obiecuję sobie, że będzie jak najkrócej. Przy okazji przetestujemy
działanie Hugo dla plików Markdown. Co działa a co mniej. Acha, celem tej strony jest bardziej uruchomienie się w sferze
szkoleń. Blog zaś jedynie dopełnia całości.

Będzie to post o technologiach użytych do utworzenia strony _przemek.malirz.pl_

Zatem smażymy!

## Technologie

* [Hugo](https://gohugo.io/) - content engine (implementacja w golang)
* [Tailwindcss](https://tailwindcss.com/) - jestem zakochany w tych komponentach (prawie kupiłem licencje)
* [Markdown](https://www.markdownguide.org/) - treści tworzone są z użyciem szeroko znanego w środowisku programistów
  formatu _md_.
* [Midjournej](https://midjourney.com/) - wszystkie obrazy (łącznie z logo, oprócz mojego zdjęcia :))
* [Alpine.js](https://alpinejs.dev/) - stronka musi się ruszać, co nie?
* [Github Pages](https://pages.github.com/) - stronka w końcu musi zostać opublikowana?

Strony w takiej formie na pewno nie rekomendowałbym osobom mało technicznym. W takich przypadkach bierzemy CMS'a jak
Wordpress (prosto i przyjemnie = WYSWIG). W sumie również ja powinienem wybrać CMS, jednak postanowiłem się katować
Markdown'em.

### Hugo

Miało być Gatsby 5. Jednak po jednodniowej, przegranej walce odpuszczam. Rozważając kilka innych możliwości, decyduję
się w końcu na się na **Hugo**.
**Hugo** to po prostu maszynka, która tak samo jak npm, wypluje nam paczkę gotową do umieszczenia na dowolnym serwerze
HTTP.

W telegraficznym skrócie konstrukcja mojej strony przebiegała następująco:

1. **Przygotowanie szkieletu / wyglądu strony**. Czyli opracowanie szablonów (praca z HTML i CSS). Ten punkt powinno się
   z założenia zrobić raz a dobrze. Podczas pracy nad materiałami będziemy poruszać sie w punktach 2 -> 3.
2. **Tworzenie kontentu**. Kontent (oferty, blog, o mnie) tworzę w plikach _md_. Pliki _md_ renderowane są przez Hugo do
   postaci HTML w cyklu budowania (czyli w kroku 3). Podczas renderowania Hugo używa szblonów skonstruowanych w punkcie
    1.
3. **Publikacja zmian**. Puszczam build Hugo i dostaje pakiet gotowy do wrzucenia na serwer (dla mnie builda uruchamia
   Github actions).

Podczas pracy nad edycją treśći (punkt 2) posługuję się trybem`--watch` Hugo. Jest to dokładnie coś co znamy z watch'a
npm. **Hugo** posiada wbudowany serwer, kompilując każdą zmianę (na Ctrl+S) do pamięci (opcjonalnie może zrzucać
kombilaty na dysk). Jest to diabelnie szybki proces.

Zatem moja praca z **Hugo** składa się na:

* **HTML**, **CSS**, **JavaScript** - za pomocą których zaprojektowałem szablony oraz re-używalne fragmenty szablonów, z
  wstawkami kodu **Golang** i użyciem API **Hugo**.
* **Markdown** cała treść - oferty, blog, o mnie.

Przykładowy kod Hugo, renderujący kafelki ofert na mojej głównej stronie:

```html

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
  kodowaniu (jak np. Dozer lub Lombook). Ilu czytelników własnie straciłem? 😈
* **Draft i inne metadane** w plikach _md_ pozwalają łatwo sterować tym co, kiedy i jak publikujemy. Np ustawienie
  atrybutu _Draft_ na artykule w pliku _md_ pozwala nam zdecydować w trakcie builda czy publikujemy czy też nie
  _Draftowe_ artykuły.
* **Strona za darmo** - tworzenie i infrastruktura nic nas nie kosztują. Hosting mamy na Github Pages. Pamiętajmy, że
  mówimy o stronie statycznej.
* **Nauka** - poznałem Hugo, TailwindCSS i Alpine.js... i Github Pages oraz Midjournej.
* **i18n** - której muszę spróbować
* **Aktywny Github** - projekt jest aktywny na Githubie, popularny i nawet często releasowany.
* **Pluginy** - takie jak Discuss czy Google Analitics. Poza tym nie ma problemu z samodzielnymi wstawkami JS w naszych
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

* **HTML i CSS na start** może zniechęcić. Układanie flex, grid, typografia dla roznych ekranów? Tak, niestety. Bonusem
  jest to, że dodatkowo nabywamy wiedzę (chwilową, bo układania div'ów nie da się zapamiętać).
* **CSS w trybie watch** - coś mi to nie chce zadziałać. Mam problem z uwzględnianiem zmian podczas modyfikacji `class`
  na elementach HTML. Będę to próbował ugryżć użyciem babel. Zobaczymy.
* **Markdown** - tak, dorzucam też MD do wad. Przejżystość artykułu w IntelliJ vs edytor WYSWIG Wordpress? Nie ma o czym
  mówić nawet. Ja tu pracuje z jakimiś ślaczkami, gwiazdkami i tagami. Oczywiście białymi na czarnym tle. Wiadomo.
* **Wstawki Go** nie bardzo mi się podobają. Strasznie toporne jak dla mnie. Plus brak autocomplete i debug oczywiście
  to metoda kroczącej dupy.

**👃Smell**

* **One man army?** - przeglądając dokumentację, pomimo bogatego community i naprawdę wielu materiałów, wszędzie
  wyświetla się zdjęcie jednego kolegi (kudos). Czyżby projekt One man army? Zawsze zwracajcie na to uwagę! Ja
  absolutnie zawsze zwracam, ale tym razem zapomniałem :). Poza tym, któż nie słyszał o Hugo, który jest bardzo aktywnym
  projektem na Githubie.

### TailwindCSS

Pozamiatane. Jestem zakochany w Tailwind. Do tego stopnia, iż przez chwilę zastanawiałem się nad jego zakupem. Niestety
zaporowa cena dla jednej skromnej osoby dosyć odstrasza. Natomiast trzeba przyznać, że model sprzedaży jest bardzo
fajny: płacisz raz i masz dostęp na zawsze. Tailwind działa na zasadzie znanego podejścia stylowania elementów poprzez
dodawanie różnych klas.

```html
<main class="container max-w-3xl mx-auto mb-auto sm:mt-12 mt-4 px-2">
</main>
```

Dodatkowe prefixy rozmiaru lub innych kontekstów pomagają nam na różnicowanie wyglądu w zależności od okoliczności. W
ten sposób powyższy `<main/>` będzie posiadał topowy margines o rozmiarze 12rem dla wszystkich ekranów od małego wzwyż.
Wszystkie ekrany mniejsze niż `sm`, będą posiadały ten margines o rozmiarze 4rem. Tworząc treści mamy nawet dostęp do
modyfikatora klas `dark:`, zobaczcie jak można zmieniać automatycznie tło artykułu w zależności czy ktoś ustawi tryb
ciemny, czy jasny:

```html
<article class="prose dark:prose-invert">
    {{ markdown }}
</article>
```

Plugin Tailwind'a `@typografy` pozwala na operowanie klasami `prose`. Plugin ten pozwala na modyfikowanie wyglądu stron
HTML automatycznie generowanych z _Markdown_. Bomba! Przecież tego właśnie potrzebujemy!
Jak już *Hugo* prezrobi nam _md_ na _HTML_ to jeszcze musimy jakoś ostylować te wszystkie paragrafy, listy, nagłówki,
linki, itd. Działa to bardzo dobrze. No i oczywiście _prose_ działa w wariantach jak `prose-sm` lub `prose-lg` i
dodatkowo pozwala się miksować z modyfikatorami rozmiaru ekranu `sm`, `md`, `lg` itd. Ogromny wachlarz możliwości.

### Markdown

Nie będę o nim wiele pisał. Może jedynie, że dla twórców treści jest ograniczony (może to dobrze?) i zabrudzony
znacznikami. Posiada natomiast pluginy npm, np. do weryfikacji reguł, treści gramatycznych i ortograficznych przed
opublikowaniem (jak [Vale](https://github.com/errata-ai/vale)). Markdown posiada również w nagłówku metadane, którymi
możemy sie posługiwać w szablonach HTML. Np. oto sama góra mojego pliku _about.md_:

```markdown
---
author: Przemek Malirz title: O mnie date: 2023-01-09 description: O mnie keywords: [about, omnie]
type: about
---
Nazywam się **Przemek Malirz** i mógłbym prokrastynować pasjami. Przed prezentacją zaś najchętniej poszedłbym na
chorobowe...
```

### Midjourney

Wszystkie, ale to absolutnie wszystkie grafiki wygenerowane są w Midjourney (logo, tło, obrazy w kafelkach ofert).
Bardzo fajny tool. Cierpi na drobne niuanse, ale nie będę się nad nimi rozwodził. Jestem pod wrażeniem tego, co
zafundował nam świat AI ostatnimi czasy. Dla takich zastosowań jak moje jest to killer dla stockowych rozwiązań. Czyż to
nie jest piękne?:

{{< figure src="/img/blog/how-this-site-works/robots-mj.png" class="flex max-w-xs" >}}

### Alpine.js

Szukałem czegoś zwięzłego, co doda klikalność do mojego menu, w trybie małego ekranu. Czyli otwórz i schowaj.
To cała moja dynamika na stronie (na dzień pisania tekstu). Czy ktoś wybrałby tutaj Angulara? 
Trafiłem na Alpine.js, który obiecuje niezwykłą prostotę i przyjemność użytkowania. 
Powiem Wam, że coś fantastycznego do takiego właśnie zastosowania. Zobaczcie sami:

```html
<nav x-data="{ open: false }">
</nav>
```

To tyle z programowanie mojego menu. Otwieranie i zamykanie panelu to dodanie `x-data` z Alpine.js. Niesamowite co Ci
programiści frontu potrafią wymyślić. Szacunek.

## Wrażenia z pisania

Bardzo przyjemnie mi się tworzy. Używam dwóch monitorów. Z jednej strony IntelliJ z drugiej przeglądarka, błyskawicznie
odświeżająca zmiany na Ctrl+S. Pisząc błyskawicznie, mam na myśli mrugnięcie oka. Nie trwa to nawet pół sekundy. MD jest
od razu widoczny jako HTML.

## Dziękuję

Naleśnik wyszedł taki, jaki miał wyjść. Napiszę tylko, że pierwszego naleśnika lubię w domu zjadać ja. Jest gruby,
krzywy i tłusty. Czy ktoś się nim poczęstował? Nie wiem, ale z obgryzionymi paznokciami będę sprawdzał na Google
Analytics.

Chcę na koniec napisać, iż jestem pod wrażeniem technologi, z którymi mam tutaj do czynienia. Wymagana wiedza do ich
obsługi tak naprawdę daje jedynie frajdę i pozwala człowiekowi obcować z tym, czego w pracy najczęściej brak. A przecież
to tylko statyczny content. 





