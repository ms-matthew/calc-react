# 🧮 React Calculator App

Stylowy, animowany kalkulator stworzony w React z użyciem Tailwind CSS.

## ✨ Funkcje

- ✅ Podstawowe działania arytmetyczne: `+`, `-`, `*`, `/`
- ✅ Obsługa przecinka dziesiętnego (`.`)
- ✅ Formatowanie liczb (np. 1,000 zamiast 1000)
- ✅ Przycisk `DEL` – usuwanie pojedynczych cyfr
- ✅ Przycisk `AC` – reset całego działania
- ✅ `=` – wyliczanie wyniku
- ✅ Zabezpieczenia przed błędnymi wejściami (np. wielokrotne `.` lub `00`)

## 🛠️ Stack technologiczny

- ⚛️ **React** – komponentowy system budowania UI
- 💨 **Tailwind CSS** – szybkie i elastyczne stylowanie
- 🧠 **useReducer** – do zarządzania logiką kalkulatora

## 📁 Struktura plików
```
src/
├── Calc.jsx # Główny komponent aplikacji
├── Button.jsx # Komponent cyfr
├── OperationButton.jsx # Komponent przycisków operacji
├── index.css # Style globalne (Tailwind)
├── main.jsx # Punkt wejścia aplikacji
```
## ▶️ Uruchomienie projektu lokalnie


```bash
git clone https://github.com/ms-matthew/calc-react.git
cd react-calculator
npm install
npm run dev
```
