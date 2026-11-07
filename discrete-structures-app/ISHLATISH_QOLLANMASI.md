# DISKRET TUZILMALARI FANIDAN INTERAKTIV DASTUR
### Zamonaviy O'quv, Hisoblash va Vizualizatsiya Platformasi

Ushbu ilova fotosuratdagi barcha **15 ta ma'ruza mavzusini** to'liq qamrab olgan, zamonaviy **Glassmorphism (shisha effektli) va kiber-neon dizayndagi** yagona interaktiv veb-platformadir.

---

## 🚀 VS CODE DA ISHGA TUSHIRISH (3 XIL OSON USUL)

Loyiha quyidagi manzilda joylashgan:
```bash
/home/sayfullo/.gemini/antigravity/scratch/discrete-structures-app
```

### 1-USUL: Terminal orqali (Eng qulay va tezkor)
1. VS Code ni oching va papkaga o'ting:
   ```bash
   cd /home/sayfullo/.gemini/antigravity/scratch/discrete-structures-app
   ```
2. Python orqali serverni ishga tushiring:
   ```bash
   python3 server.py
   ```
   *(Yoki Node.js da `npm start` deb yozishingiz mumkin).*
3. Brauzer avtomatik ravishda ochiladi yoki brauzeringizda quyidagi manzilga kiring:
   👉 **`http://localhost:5500`**

---

### 2-USUL: VS Code "Run Task" tugmasi orqali (1-klik)
Loyiha ichiga maxsus `.vscode/tasks.json` sozlangan:
1. VS Code da ushbu papkani oching (`File -> Open Folder -> discrete-structures-app`).
2. Klaviaturada **`Ctrl + Shift + B`** tugmalarini bosing.
3. Server avtomatik ishga tushadi!

---

### 3-USUL: VS Code "Live Server" plagini orqali
1. Agar sizda VS Code da **Live Server** kengaytmasi o'rnatilgan bo'lsa:
2. `index.html` faylini oching.
3. Sichqonchaning o'ng tugmasini bosib **"Open with Live Server"** yoki pastki o'ng burchakdagi **"Go Live"** tugmasini bosing.

---

### 4-USUL: Hech qanday serversiz (Offline)
* `index.html` faylini ikki marta bosib to'g'ridan-to'g'ri Chrome, Edge yoki Firefox brauzerida ochishingiz mumkin. Barcha funksiyalar 100% oflayn rejimda ham xatosiz ishlaydi.

---

## 🔣 MATEMATIK BELGILAR VA INTERAKTIV KLAVIATURA

Dasturga talabalar va o'qituvchilar uchun diskret matematikaning barcha maxsus belgilari to'liq qo'shildi:

### 1. Maydonlar ustidagi Interaktiv Belgilar Paneli (Toolbar)
Har bir kiritish maydoni (To'plamlar, Mantiqiy formulalar, Munosabatlar) tepasida maxsus tugmachalar joylashgan. Ularni bosish orqali klaviaturada yo'q belgilarni to'g'ridan-to'g'ri maydonga kiritasiz:
- **To'plamlar uchun:** `∅`, `∈`, `∉`, `⊆`, `⊂`, `∪`, `∩`, `∖`, `Δ`, `×`, `ℵ₀`, `𝔠`, `ℕ`, `ℤ`, `ℚ`, `ℝ`
- **Mantiq va Bul algebrasi uchun:** `¬`, `∧`, `∨`, `→`, `↔`, `⊕`, `↑` (NAND), `↓` (NOR), `∀`, `∃`, `≡`, `⊤` (1), `⊥` (0)
- **Munosabatlar va Tartib uchun:** `∣` (bo'linadi), `∤`, `≤`, `≥`, `R⁺`, `[a]`, `sup`, `inf`
- **Kombinatorika uchun:** `n!`, `!n`, `Pₙ`, `Aₙᵏ`, `Cₙᵏ`, `⌈x⌉`, `⌊x⌋`
- **Graflar uchun:** `deg(v)`, `deg⁻(v)`, `deg⁺(v)`, `K₅`, `K₃,₃`, `V - E + F = 2`

### 2. Global "Belgilar Ensiklopediyasi" (Modal darcha)
Tepada o'ng tomonda yoki chap panel pastida **"🔣 Belgilar Ensiklopediyasi"** tugmasi mavjud. Unda:
- Har bir belgining o'zbekcha va inglizcha nomi;
- Oddiy klaviaturada qanday yozilishi (masalan, `¬` o'rniga `not` yoki `!`, `∧` o'rniga `and` yoki `*`, `→` o'rniga `->`);
- Qoidasi, ma'nosi va amaliy namunasi;
- **1-bosishda nusxa olish (Copy)** yoki maydonga joylash (Insert).

---

## 📚 DASTURDAGI 15 TA MAVZU VA IMKONIYATLAR

| № | Mavzu nomi | Asosiy funksiyalari va Chizmalar |
|---|------------|---------------------------------|
| **1** | **Kirish. Diskret va diskret bo'lmagan to'plamlar** | Diskret vs Uzluksiz to'plamlar, Sanoqli ($\aleph_0$) va Sanoqsiz ($\mathfrak{c}$) to'plamlar quvvati tahlili, **Sonlar o'qida vizual nur va diskret nuqtalar animatsiyasi**, o'z-o'zini sinash testi. |
| **2** | **To'plamlar ustida amallar. Eyler-Venn diagrammasi** | Birlashma ($A \cup B$), Kesishma ($A \cap B$), Ayirma ($A \setminus B$), Simmetrik ayirma ($A \Delta B$), Dekart ko'paytma ($A \times B$). **Interaktiv Eyler-Venn Canvas diagrammasi**: har bir soha nurlanib yonadi, elementlar to'g'ri bo'limda ko'rsatiladi. |
| **3** | **Tartiblangan to'plamlar & Xasse diagrammasi** | Kortejlar, leksikografik tartib, Qisman tartib (Poset), **Xasse diagrammasi vizualizatori**: $D_{12}, D_{24}, D_{30}, D_{36}$ bo'luvchilari yoki $\mathcal{P}(\{a, b, c\})$ qism-to'plamlar panjarasi, minimal, maksimal, eng kichik (least), eng katta (greatest) elementlar. |
| **4** | **Munosabatlar turlari va xossalari** | Refleksivlik, Simmetriklik, Antisimetriklik, Tranzitivlik avtomatik isboti. Ekvivalentlik sinflari va faktor-to'plam $A/R$. **Uorshall (Warshall) algoritmi bilan tranzitiv yopilma ($R^+$)** va munosabat or-grafi. |
| **5** | **Kombinatorikaning asosiy qoidalari** | Qo'shish va ko'paytirish qoidalari, Faktorial ($n!$), Subfaktorial ($!n$), Permutatsiyalar ($P_n$), Takrorli permutatsiya ($P(n; k_1, \dots)$ masalan: ANANAS), O'rinlashtirishlar ($A_n^k, \bar{A}_n^k$), Guruhlashlar ($C_n^k, \bar{C}_n^k$). **Interaktiv Paskal uchburchagi** va barcha variantlarni generatsiya qilish. |
| **6** | **Kombinatorikaning to'plamlar quvvatini aniqlashga tatbiqi** | Kiritish-chiqarish (Inclusion-Exclusion) printsipi 2 va 3 to'plam uchun. Murakkab amaliy masalalarni yechuvchi. **Dirixle (Kabutar) printsipi interaktiv simulyatori** ($\lceil n/k \rceil$). |
| **7** | **Bul algebrasi va mulohazalar** | Barcha 8 ta asosiy amallar: NOT ($\neg$), AND ($\land$), OR ($\lor$), Implikatsiya ($\to$), Ekvivalensiya ($\leftrightarrow$), XOR ($\oplus$), Sheffer (NAND), Pirs (NOR). **Ixtiyoriy Bul ifodasini qadamma-qadam hisoblagich**. |
| **8** | **Mantiq qonunlari va Rostlik jadvali** | Har qanday $n$ o'zgaruvchili formula uchun to'liq **Rostlik jadvali (Truth Table)** generatori. Tavtologiya, Ziddiyat yoki Bajariluvchanlikni aniqlash. **Mukammal DNS (SDNF), Mukammal KNS (SKNF), Jegalqin ko'phadi ($\oplus$) va Karno xaritasi (K-Map)**. |
| **9** | **Ikkilik mantiqiy elementlar (Ventillar simulyatori)** | AND, OR, NOT, NAND, NOR, XOR ventillari jonli kommutatorlar bilan. **Yarim jamlagich (Half Adder), To'liq jamlagich (Full Adder) va 2:1 Multipleksor (MUX)** signallarni neon simlar orqali uzatish simulyatori. |
| **10** | **Graflar nazariyasi asoslari** | Uchlar darajasi ($deg(v)$), **Handshaking lemma** ($\sum deg(v) = 2|E|$), Qo'shnilik matritsasi ($A$) va Insidentlik matritsasi. **Interaktiv Canvas**: tugunlarni sudrash, fizika kuchi, $K_5, K_{3,3}$, Petersen grafi shablonlari. |
| **11** | **Yo'l, zanjir, sikl. Eyler va Gamilton graflari** | Bog'liqlik komponentlari. **Eyler yo'li va sikli teoremasi** (Hierholzer algoritmi). **Gamilton sikli (Backtracking)** qidiruvi, Diraq va Ore teoremalari. Königsberg 7 ko'prigi masalasi. |
| **12** | **Planar graflar** | Graflarni tekislikda kesishmasdan chizish. **Eylerning planar formulasi: $V - E + F = 2$**. Sohalar ($F$) sonini topish. $E \le 3V - 6$ va $E \le 2V - 4$ shartlari. **Kuratovskiy teoremasi ($K_5$ va $K_{3,3}$ nima uchun planar emasligining to'liq matematik isboti)**. |
| **13** | **O'rmon. Daraxtlar va Minimal Qamrovchi Daraxt (MST)** | Daraxt xossalari ($E = V - 1$, siklsiz). **Kruskal algoritmi (Disjoint Set Union bilan qadamma-qadam)**. Minimal qamrovchi daraxt qirralarini yashil neon nur bilan yonishi va minimal umumiy vazn hisobi. |
| **14** | **Yo'naltirilgan graf (Digraf)** | Kiruvchi va chiquvchi darajalar ($deg^-, deg^+$), Manbalar (Sources) va Botqoqliklar (Sinks). **DAG tekshiruvi va Kahn algoritmi asosida Topologik saralash (Topological Sort)** qadamma-qadam. Sikl bo'lsa xabar berish. |
| **15** | **Eng qisqa yo'l algoritmlari** | **Dijkstra algoritmi** (boshlang'ich va oxirgi uchni tanlab, eng qisqa yo'lni qadamma-qadam jadvalda ko'rsatish va grafda neon yo'l bilan nurlatish). **Floyd-Warshall algoritmi** (barcha juftliklar orasidagi masofalar matritsasi $D^{(k)}$). |

---

## 🎨 DIZAYN VA FOYDALANUVCHI QULAYLIKLARI

- **Glassmorphism:** Yarim shaffof muzlatilgan shisha kartochkalar (`backdrop-filter: blur(20px)`), kiber-neon yaltirash effektlari.
- **Interaktiv Chizmalar:** Sichqoncha bilan tugunlarni sudrash (drag & drop), kattalashtirish (zoom), Eyler-Venn sohalarining dinamik ranglanishi, mantiqiy sxemalar kommutatorlari.
- **Tezkor klaviatura:** `←` va `→` klavishlari orqali mavzular orasida darhol o'tish.
- **Qidiruv paneli:** Chap paneldagi qidiruv orqali istalgan mavzuni nom yoki raqam bo'yicha darhol topish.
- **Tayyor masalalar (Presets):** Har bir bo'limda "Tayyor namunalar" tugmachalari mavjud bo'lib, 1 bosishda real masalalarni yuklaydi.
