import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{

    --color-grey-0: #fff;
    --color-grey-50: #f9fafb;
    --color-grey-100: #f3f4f6;
    --color-grey-200: #e5e7eb;
    --color-grey-300: #d1d5db;
    --color-grey-400: #9ca3af;
    --color-grey-500: #6b7280;
    --color-grey-600: #4b5563;
    --color-grey-700: #374151;
    --color-grey-800: #1f2937;
    --color-grey-900: #111827;

    /* Stone */
    --color-stone-50: #fafaf9;
    --color-stone-100:#f5f5f4;
    --color-stone-200:#e7e5e4;
    --color-stone-300:#d6d3d1;
    --color-stone-400:#a8a29e;
    --color-stone-500:#78716c;
    --color-stone-600:#57534e;
    --color-stone-700:#44403c;
    --color-stone-800:#292524;
    --color-stone-900:#1c1917;
    --color-stone-950:#0c0a09;

    /* Red */
    --color-red-50: #fef2f2;
    --color-red-100: #fee2e2;
    --color-red-200: #fecaca;
    --color-red-300: #fca5a5;
    --color-red-400: #f87171;
    --color-red-500: #ef4444;
    --color-red-600: #dc2626;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;
    --color-red-900: #7f1d1d;
    --color-red-950: #450a0a;

    /* Green */
    --color-green-50: #f0fdf4;
    --color-green-100: #dcfce7;
    --color-green-200: #bbf7d0;
    --color-green-300: #86efac;
    --color-green-400: #4ade80;
    --color-green-500: #22c55e;
    --color-green-600: #16a34a;
    --color-green-700: #15803d;
    --color-green-800: #166534;
    --color-green-900: #14532d;
    --color-green-950: #052e16;

}

body {
    font-family: "Plus Jakarta Sans", sans-serif;
    margin: 0;
    padding: 0;
    width: 100vw;
    max-width: 100%;
    overflow-x: hidden;
}

/* Override Core UI's font family */
/* Increase specificity for elements with Core UI components */
core-ui-container {
    font-family: "Plus Jakarta Sans", sans-serif !important;
}



input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
    cursor: pointer
}

*:disabled {
  cursor: not-allowed;
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}
`;
export default GlobalStyles;
