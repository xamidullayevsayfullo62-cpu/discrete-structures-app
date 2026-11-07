/**
 * Discrete Structures - Complete Mathematical Symbols Database & Helper
 * Belgilar, ularning nomlari, muqobil klaviatura yozilishi va misollari.
 */

const MathSymbolsDB = [
  // --- 1. To'plamlar Nazariyasi (Set Theory) ---
  {
    symbol: "∅",
    name: "Bo'sh to'plam (Empty set)",
    category: "sets",
    ascii: "{}",
    desc: "Hech qanday elementga ega bo'lmagan to'plam. Quvvati: |∅| = 0.",
    example: "A ∩ B = ∅ (A va B kesishmaydi)"
  },
  {
    symbol: "∈",
    name: "Tegishlilik belgisi (Element of)",
    category: "sets",
    ascii: "in",
    desc: "Elementning to'plamga tegishli ekanligini bildiradi.",
    example: "5 ∈ ℕ (5 natural son)"
  },
  {
    symbol: "∉",
    name: "Tegishli emaslik (Not element of)",
    category: "sets",
    ascii: "!in, not in",
    desc: "Element to'plamga kirmasligini bildiradi.",
    example: "-3 ∉ ℕ (-3 natural son emas)"
  },
  {
    symbol: "⊆",
    name: "Qism-to'plam (Subset or equal)",
    category: "sets",
    ascii: "subset, <=",
    desc: "A ning barcha elementlari B da ham mavjud bo'lsa (A = B ham bo'lishi mumkin).",
    example: "ℕ ⊆ ℤ ⊆ ℚ ⊆ ℝ"
  },
  {
    symbol: "⊂",
    name: "Qat'iy qism-to'plam (Strict subset)",
    category: "sets",
    ascii: "strict subset, <",
    desc: "A to'plam B ga kiradi va A ≠ B (B da kamida bitta ortiqcha element bor).",
    example: "{1, 2} ⊂ {1, 2, 3}"
  },
  {
    symbol: "∪",
    name: "To'plamlar birlashmasi (Union)",
    category: "sets",
    ascii: "union, U, or",
    desc: "A yoki B to'plamga tegishli barcha elementlar to'plami.",
    example: "{1, 2} ∪ {2, 3} = {1, 2, 3}"
  },
  {
    symbol: "∩",
    name: "To'plamlar kesishmasi (Intersection)",
    category: "sets",
    ascii: "intersect, ^, and",
    desc: "Bir vaqtning o'zida ham A, ham B to'plamda mavjud umumiy elementlar.",
    example: "{1, 2, 3} ∩ {2, 3, 4} = {2, 3}"
  },
  {
    symbol: "∖",
    name: "To'plamlar ayirmasi (Set difference)",
    category: "sets",
    ascii: "\\, diff, -",
    desc: "A da bor, lekin B da yo'q bo'lgan elementlar.",
    example: "{1, 2, 3} ∖ {2, 3, 4} = {1}"
  },
  {
    symbol: "Δ",
    name: "Simmetrik ayirma (Symmetric difference)",
    category: "sets",
    ascii: "delta, symdiff, xor",
    desc: "Faqat bitta to'plamga tegishli elementlar: (A ∖ B) ∪ (B ∖ A).",
    example: "{1, 2} Δ {2, 3} = {1, 3}"
  },
  {
    symbol: "×",
    name: "Dekart ko'paytmasi (Cartesian product)",
    category: "sets",
    ascii: "x, *",
    desc: "Barcha tartiblangan juftliklar (a, b) to'plami. |A × B| = |A| · |B|.",
    example: "{1, 2} × {a, b} = {(1,a), (1,b), (2,a), (2,b)}"
  },
  {
    symbol: "𝒫(A)",
    name: "Bulian / Quvvat to'plami (Power set)",
    category: "sets",
    ascii: "P(A), 2^A",
    desc: "A to'plamning barcha qism-to'plamlari to'plami. Quvvati: 2^|A|.",
    example: "A={1, 2} ⇒ 𝒫(A) = {∅, {1}, {2}, {1,2}}"
  },
  {
    symbol: "ℵ₀",
    name: "Alef-nol (Aleph-zero)",
    category: "sets",
    ascii: "aleph0, alef0",
    desc: "Natural sonlar to'plami ℕ ning quvvati (eng kichik cheksiz quvvat, sanoqli to'plamlar).",
    example: "|ℕ| = |ℤ| = |ℚ| = ℵ₀"
  },
  {
    symbol: "𝔠",
    name: "Kontinuum quvvat (Continuum)",
    category: "sets",
    ascii: "c, continuum, 2^aleph0",
    desc: "Haqiqiy sonlar to'plami ℝ ning quvvati (sanoqsiz quvvat).",
    example: "|ℝ| = |[0, 1]| = 𝔠 = 2^ℵ₀"
  },
  {
    symbol: "ℕ",
    name: "Natural sonlar to'plami (Natural numbers)",
    category: "sets",
    ascii: "N",
    desc: "Sanashda ishlatiladigan sonlar: {1, 2, 3, ...}.",
    example: "x ∈ ℕ"
  },
  {
    symbol: "ℤ",
    name: "Butun sonlar to'plami (Integers)",
    category: "sets",
    ascii: "Z",
    desc: "Musbat, manfiy va nol butun sonlar: {..., -2, -1, 0, 1, 2, ...}.",
    example: "x ∈ ℤ"
  },
  {
    symbol: "ℚ",
    name: "Ratsional sonlar to'plami (Rationals)",
    category: "sets",
    ascii: "Q",
    desc: "m/n kasr ko'rinishida yozilishi mumkin bo'lgan sonlar.",
    example: "3/4 ∈ ℚ"
  },
  {
    symbol: "ℝ",
    name: "Haqiqiy sonlar to'plami (Reals)",
    category: "sets",
    ascii: "R",
    desc: "Barcha ratsional va irratsional sonlar (uzluksiz to'g'ri chiziq).",
    example: "π ∈ ℝ, √2 ∈ ℝ"
  },

  // --- 2. Matematik Mantiq va Bul Algebrasi (Logic) ---
  {
    symbol: "¬",
    name: "Inkor (Negation / NOT)",
    category: "logic",
    ascii: "not, ~, !",
    desc: "Mulohaza qiymatini qarama-qarshisiga o'zgartiradi (1 → 0, 0 → 1).",
    example: "¬1 = 0, ¬(A ∧ B)"
  },
  {
    symbol: "∧",
    name: "Kon'yunksiya (Conjunction / AND)",
    category: "logic",
    ascii: "and, &, *",
    desc: "Mantiqiy ko'paytirish. Faqat ikkala mulohaza ham rost (1) bo'lgandagina 1 bo'ladi.",
    example: "1 ∧ 1 = 1, 1 ∧ 0 = 0"
  },
  {
    symbol: "∨",
    name: "Diz'yunksiya (Disjunction / OR)",
    category: "logic",
    ascii: "or, |, +, v",
    desc: "Mantiqiy qo'shish. Kamida bitta mulohaza rost (1) bo'lsa 1 bo'ladi.",
    example: "0 ∨ 1 = 1, 0 ∨ 0 = 0"
  },
  {
    symbol: "→",
    name: "Implikatsiya (Implication)",
    category: "logic",
    ascii: "->, =>, impl",
    desc: "Agar... u holda... Faqat 1 → 0 holatida 0 bo'ladi, qolgan hamma holatda 1.",
    example: "0 → 0 = 1, 1 → 0 = 0"
  },
  {
    symbol: "↔",
    name: "Ekvivalensiya (Equivalence / Iff)",
    category: "logic",
    ascii: "<->, <=>, ==, eq",
    desc: "Ikkala mulohaza qiymati bir xil bo'lganda (1 ↔ 1 yoki 0 ↔ 0) rost bo'ladi.",
    example: "A ↔ B ≡ (A → B) ∧ (B → A)"
  },
  {
    symbol: "⊕",
    name: "Qat'iy diz'yunksiya (XOR / Exclusive OR)",
    category: "logic",
    ascii: "xor, ^",
    desc: "Modul 2 bo'yicha qo'shish. Qiymatlar turlicha bo'lganda 1, bir xil bo'lsa 0.",
    example: "1 ⊕ 0 = 1, 1 ⊕ 1 = 0"
  },
  {
    symbol: "↑",
    name: "Sheffer shtrixi (Sheffer stroke / NAND)",
    category: "logic",
    ascii: "nand, |",
    desc: "Kon'yunksiyaning inkori: ¬(A ∧ B). Faqat 1 ↑ 1 = 0, qolganlarida 1.",
    example: "A ↑ B = ¬(A ∧ B)"
  },
  {
    symbol: "↓",
    name: "Pirs strelkasi (Peirce arrow / NOR)",
    category: "logic",
    ascii: "nor",
    desc: "Diz'yunksiyaning inkori: ¬(A ∨ B). Faqat 0 ↓ 0 = 1, qolganlarida 0.",
    example: "A ↓ B = ¬(A ∨ B)"
  },
  {
    symbol: "∀",
    name: "Umumiylik kvantori (Universal quantifier)",
    category: "logic",
    ascii: "forall, all",
    desc: "'Har qanday', 'barcha', 'ixtiyoriy' deb o'qiladi.",
    example: "∀x ∈ ℝ: x² ≥ 0"
  },
  {
    symbol: "∃",
    name: "Mavjudlik kvantori (Existential quantifier)",
    category: "logic",
    ascii: "exists",
    desc: "'Mavjudki', 'kamida bittasi topiladiki' deb o'qiladi.",
    example: "∃x ∈ ℤ: x + 5 = 0"
  },
  {
    symbol: "∃!",
    name: "Yagona mavjudlik kvantori",
    category: "logic",
    ascii: "exists!",
    desc: "'Yagona shunday element mavjudki' degan ma'noni bildiradi.",
    example: "∃!x ∈ ℝ: 2x = 4"
  },
  {
    symbol: "≡",
    name: "Teng kuchlilik (Logical equivalence)",
    category: "logic",
    ascii: "equiv, ==",
    desc: "Ikki formula barcha qiymatlarda bir xil natija berishini bildiradi.",
    example: "¬(A ∧ B) ≡ ¬A ∨ ¬B"
  },
  {
    symbol: "⊤",
    name: "Tavtologiya / Haqiqat (Top / True)",
    category: "logic",
    ascii: "1, true, T",
    desc: "Doimo rost (1) bo'lgan mulohaza.",
    example: "A ∨ ¬A ≡ ⊤"
  },
  {
    symbol: "⊥",
    name: "Ziddiyat / Yolg'on (Bottom / False)",
    category: "logic",
    ascii: "0, false, F",
    desc: "Doimo yolg'on (0) bo'lgan mulohaza.",
    example: "A ∧ ¬A ≡ ⊥"
  },

  // --- 3. Munosabatlar va Tartib (Relations & Posets) ---
  {
    symbol: "∣",
    name: "Bo'linish munosabati (Divides)",
    category: "relations",
    ascii: "|, divides",
    desc: "a soni b ni qoldiqsiz bo'ladi degani.",
    example: "3 ∣ 12 (3 soni 12 ni bo'ladi)"
  },
  {
    symbol: "∤",
    name: "Bo'linmaslik (Does not divide)",
    category: "relations",
    ascii: "!|, does not divide",
    desc: "a soni b ni qoldiqsiz bo'la olmaydi.",
    example: "5 ∤ 12"
  },
  {
    symbol: "≤",
    name: "Kichik yoki teng (Less than or equal)",
    category: "relations",
    ascii: "<=",
    desc: "Poset (qisman tartib) va chiziqli tartibning asosiy belgisi.",
    example: "a ≤ b"
  },
  {
    symbol: "≥",
    name: "Katta yoki teng (Greater than or equal)",
    category: "relations",
    ascii: ">=",
    desc: "Katta yoki teng munosabati.",
    example: "b ≥ a"
  },
  {
    symbol: "R⁺",
    name: "Tranzitiv yopilma (Transitive closure)",
    category: "relations",
    ascii: "R+, Warshall",
    desc: "Munosabatni tranzitiv holga keltirish uchun qo'shiladigan minimal juftliklar yig'indisi.",
    example: "Uorshall algoritmi bilan topiladi"
  },
  {
    symbol: "[a]",
    name: "Ekvivalentlik sinfi (Equivalence class)",
    category: "relations",
    ascii: "[a], Cl(a)",
    desc: "a elementi bilan ekvivalent munosabatda bo'lgan barcha elementlar to'plami.",
    example: "[a] = { x ∈ A | (a, x) ∈ R }"
  },
  {
    symbol: "A / R",
    name: "Faktor-to'plam (Quotient set)",
    category: "relations",
    ascii: "A / R",
    desc: "A to'plamning R ekvivalentlik munosabati bo'yicha barcha sinflari to'plami.",
    example: "ℤ / 2ℤ = {[0], [1]} (Juft va toqlar)"
  },
  {
    symbol: "sup",
    name: "Aniq yuqori chegara (Supremum / Join ∨)",
    category: "relations",
    ascii: "sup, join, max bound",
    desc: "To'plamning barcha yuqori chegaralari orasidagi eng kichigi.",
    example: "sup{1, 2, 3} = 3"
  },
  {
    symbol: "inf",
    name: "Aniq quyi chegara (Infimum / Meet ∧)",
    category: "relations",
    ascii: "inf, meet, min bound",
    desc: "To'plamning barcha quyi chegaralari orasidagi eng kattasi.",
    example: "inf{1, 2, 3} = 1"
  },

  // --- 4. Kombinatorika (Combinatorics) ---
  {
    symbol: "n!",
    name: "Faktorial (Factorial)",
    category: "combinatorics",
    ascii: "n!",
    desc: "1 dan n gacha bo'lgan barcha natural sonlar ko'paytmasi. 0! = 1.",
    example: "5! = 1 · 2 · 3 · 4 · 5 = 120"
  },
  {
    symbol: "!n",
    name: "Subfaktorial (Derangements)",
    category: "combinatorics",
    ascii: "!n, subfact",
    desc: "n ta elementning birortasi ham o'z joyida qolmaydigan tartibsiz o'rinlashtirishlari soni.",
    example: "!4 = 9 (Shlyapalar masalasi)"
  },
  {
    symbol: "Pₙ",
    name: "Permutatsiya (Permutations)",
    category: "combinatorics",
    ascii: "P(n)",
    desc: "n ta elementning o'rin almashtirishlari soni: Pₙ = n!.",
    example: "P₃ = 3! = 6"
  },
  {
    symbol: "Aₙᵏ",
    name: "O'rinlashtirish (Arrangements / Variations)",
    category: "combinatorics",
    ascii: "A(n, k)",
    desc: "n tadan k tasini tartib bilan tanlash: Aₙᵏ = n! / (n - k)!.",
    example: "A₅³ = 5 · 4 · 3 = 60"
  },
  {
    symbol: "Cₙᵏ",
    name: "Guruhlash / Kombinatsiya (Combinations)",
    category: "combinatorics",
    ascii: "C(n, k), nCr",
    desc: "n tadan k tasini tartibsiz tanlash: Cₙᵏ = n! / (k! · (n - k)!).",
    example: "C₅² = 10"
  },
  {
    symbol: "⌈x⌉",
    name: "Yuqori butun qism (Ceiling / Shift)",
    category: "combinatorics",
    ascii: "ceil(x)",
    desc: "x sonidan kichik bo'lmagan eng kichik butun son (Dirixle printsipida).",
    example: "⌈13 / 4⌉ = 4"
  },
  {
    symbol: "⌊x⌋",
    name: "Quyi butun qism (Floor / Pol)",
    category: "combinatorics",
    ascii: "floor(x)",
    desc: "x sonidan katta bo'lmagan eng katta butun son.",
    example: "⌊3.7⌋ = 3"
  },

  // --- 5. Graflar Nazariyasi (Graph Theory) ---
  {
    symbol: "G = (V, E)",
    name: "Graf ta'rifi (Graph)",
    category: "graphs",
    ascii: "G = (V, E)",
    desc: "V - uchlar (Vertices) to'plami, E - qirralar (Edges) to'plami.",
    example: "|V| = uchlar soni, |E| = qirralar soni"
  },
  {
    symbol: "deg(v)",
    name: "Uchning darajasi (Degree)",
    category: "graphs",
    ascii: "deg(v), d(v)",
    desc: "Uchga tutashgan qirralar soni. Handshaking lemma: ∑ deg(v) = 2|E|.",
    example: "deg(v) toq bo'lsa toq uch, juft bo'lsa juft uch"
  },
  {
    symbol: "deg⁻(v)",
    name: "Kiruvchi daraja (In-degree)",
    category: "graphs",
    ascii: "in-deg(v)",
    desc: "Yo'naltirilgan grafda uchga kirayotgan qirralar soni.",
    example: "deg⁻(v) = 0 bo'lsa Manba (Source)"
  },
  {
    symbol: "deg⁺(v)",
    name: "Chiquvchi daraja (Out-degree)",
    category: "graphs",
    ascii: "out-deg(v)",
    desc: "Yo'naltirilgan grafda uchdan chiqayotgan qirralar soni.",
    example: "deg⁺(v) = 0 bo'lsa Botqoqlik (Sink)"
  },
  {
    symbol: "Kₙ",
    name: "To'liq graf (Complete graph)",
    category: "graphs",
    ascii: "K_n",
    desc: "Har bir uchi qolgan barcha uchlar bilan tutashgan graf. Qirralar soni: C(n, 2) = n(n-1)/2.",
    example: "K₅ ning 10 ta qirrasi bor va planar emas"
  },
  {
    symbol: "Kₘ,ₙ",
    name: "To'liq ikkibo'lakli graf (Complete bipartite graph)",
    category: "graphs",
    ascii: "K_m,n",
    desc: "m ta va n ta uchli ikki guruhga ajralgan, har bir juftlik tutashgan graf.",
    example: "K₃,₃ ning 9 ta qirrasi bor va planar emas"
  },
  {
    symbol: "V - E + F = 2",
    name: "Eylerning planar formulasi (Euler planar formula)",
    category: "graphs",
    ascii: "V - E + F = 2",
    desc: "Bog'langan planar grafda Uchlar (V), Qirralar (E) va Sohalar (F) orasidagi qat'iy munosabat.",
    example: "Kvadrat: V=4, E=4, F=2 (ichki va tashqi)"
  }
];

window.MathSymbolsDB = MathSymbolsDB;
