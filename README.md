# Praxeon Demo (lokalne)

Lokalna wersja platformy Praxeon **bez backendu**. Konta, sesja i seedowane treści żyją w `localStorage`.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- React Router
- Zustand

## Uruchomienie

```bash
npm install
npm run dev
```

## Hosting (GitHub Pages)

Deploy idzie automatycznie z `main` przez Actions (`.github/workflows/deploy-pages.yml`).

URL: https://praxeon-r.github.io/praxeon-demo/

Jednorazowo w repo: **Settings → Pages → Source: GitHub Actions**.

Lokalny build jak na Pages:

```bash
GITHUB_PAGES=true npm run build
npm run preview
```

## Konta demo

| Rola   | E-mail           | Hasło          |
|--------|------------------|----------------|
| Uczeń  | `uczen@demo.pl`  | `DemoStudent12` |
| Mistrz | `mistrz@demo.pl` | `DemoMaster12`  |

Możesz też zarejestrować własne konto — po „weryfikacji e-mail” (mock) przejdziesz konfigurator profilu.

## Co działa

- Rejestracja / logowanie / wylogowanie
- Role Uczeń / Mistrz
- Konfigurator profilu (bez uploadu zdjęć)
- Home z sekcjami treści (seed)
- Szukaj (filtr lokalny)
- Profile + zakładki
- Rankingi
- Podgląd treści (bez prawdziwego wideo)

## Czego nie ma

- Backend / API
- Upload mediów
- OAuth (Google / Apple / Facebook) — przyciski tylko informują, że są niedostępne
- Prawdziwa weryfikacja e-mail

## Reset danych

W DevTools → Application → Local Storage usuń klucze zaczynające się od `praxeon.` albo:

```js
Object.keys(localStorage).filter(k => k.startsWith('praxeon.')).forEach(k => localStorage.removeItem(k))
location.reload()
```

Design odniesienia: [Praxeon_App (Figma)](https://www.figma.com/design/EHFKSUANry6BSso3IxwWsv/Praxeon_App)
