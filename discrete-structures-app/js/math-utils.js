/**
 * Discrete Structures Mathematical Engine
 * Accurate, robust algorithms for sets, relations, combinatorics, logic, and graphs.
 */

const MathUtils = {
  // --- BigInt Math & Combinatorics ---
  factorial(n) {
    if (n < 0) return 0n;
    let res = 1n;
    for (let i = 2n; i <= BigInt(n); i++) res *= i;
    return res;
  },

  subfactorial(n) {
    // Derangements !n = round(n! / e) or recursive
    if (n === 0) return 1n;
    if (n === 1) return 0n;
    let d0 = 1n, d1 = 0n, d = 0n;
    for (let i = 2n; i <= BigInt(n); i++) {
      d = (i - 1n) * (d1 + d0);
      d0 = d1;
      d1 = d;
    }
    return d;
  },

  permutation(n) {
    return this.factorial(n);
  },

  permutationRepeated(n, counts) {
    // n! / (k1! * k2! * ...)
    let num = this.factorial(n);
    let den = 1n;
    for (const c of counts) {
      den *= this.factorial(c);
    }
    return num / den;
  },

  arrangement(n, k) {
    // A_n^k = n! / (n - k)!
    if (k > n || k < 0) return 0n;
    let res = 1n;
    const bigN = BigInt(n);
    const bigK = BigInt(k);
    for (let i = 0n; i < bigK; i++) {
      res *= (bigN - i);
    }
    return res;
  },

  arrangementRepeated(n, k) {
    // n^k
    return BigInt(n) ** BigInt(k);
  },

  combination(n, k) {
    // C_n^k = n! / (k! * (n - k)!)
    if (k < 0 || k > n) return 0n;
    if (k === 0 || k === n) return 1n;
    let effectiveK = k > n - k ? n - k : k;
    let num = 1n;
    let den = 1n;
    for (let i = 1n; i <= BigInt(effectiveK); i++) {
      num *= (BigInt(n) - i + 1n);
      den *= i;
    }
    return num / den;
  },

  combinationRepeated(n, k) {
    // C_{n + k - 1}^k
    if (n <= 0 && k > 0) return 0n;
    if (k === 0) return 1n;
    return this.combination(n + k - 1, k);
  },

  getPascalTriangle(rows = 10) {
    const triangle = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c <= r; c++) {
        row.push(this.combination(r, c));
      }
      triangle.push(row);
    }
    return triangle;
  },

  generatePermutations(arr, maxLimit = 120) {
    const results = [];
    const used = new Array(arr.length).fill(false);
    const current = [];

    function backtrack() {
      if (results.length >= maxLimit) return;
      if (current.length === arr.length) {
        results.push([...current]);
        return;
      }
      for (let i = 0; i < arr.length; i++) {
        if (!used[i]) {
          used[i] = true;
          current.push(arr[i]);
          backtrack();
          current.pop();
          used[i] = false;
        }
      }
    }
    backtrack();
    return results;
  },

  generateCombinations(arr, k, maxLimit = 120) {
    const results = [];
    const current = [];

    function backtrack(start) {
      if (results.length >= maxLimit) return;
      if (current.length === k) {
        results.push([...current]);
        return;
      }
      for (let i = start; i < arr.length; i++) {
        current.push(arr[i]);
        backtrack(i + 1);
        current.pop();
      }
    }
    backtrack(0);
    return results;
  },

  // --- Set Operations ---
  parseSet(str) {
    if (!str) return [];
    let cleaned = str.trim().replace(/^\{|\}$/g, '');
    if (!cleaned) return [];
    return [...new Set(cleaned.split(',').map(s => s.trim()).filter(s => s.length > 0))];
  },

  setUnion(A, B) {
    return [...new Set([...A, ...B])];
  },

  setIntersection(A, B) {
    const bSet = new Set(B);
    return A.filter(x => bSet.has(x));
  },

  setDifference(A, B) {
    const bSet = new Set(B);
    return A.filter(x => !bSet.has(x));
  },

  setSymmetricDifference(A, B) {
    return this.setUnion(this.setDifference(A, B), this.setDifference(B, A));
  },

  setCartesianProduct(A, B) {
    const res = [];
    for (const a of A) {
      for (const b of B) {
        res.push(`(${a}, ${b})`);
      }
    }
    return res;
  },

  // --- Boolean Algebra & Expression Parser ---
  evaluateBooleanExpr(expr, scope) {
    const ops = {
      '¬': (a) => !a,
      '∧': (a, b) => a && b,
      '∨': (a, b) => a || b,
      '⊕': (a, b) => (a ? !b : b),
      '→': (a, b) => (!a || b),
      '↔': (a, b) => (!!a === !!b),
      '↑': (a, b) => !(a && b),
      '↓': (a, b) => !(a || b)
    };

    let s = expr
      .replace(/\bAND\b|\band\b|&|\*/g, ' ∧ ')
      .replace(/\bOR\b|\bor\b|\+/g, ' ∨ ')
      .replace(/\bNOT\b|\bnot\b|!|~/g, ' ¬ ')
      .replace(/\bXOR\b|\bxor\b|\^/g, ' ⊕ ')
      .replace(/->|=>|\bimpl\b/g, ' → ')
      .replace(/<->|<=>|==|≡|\beq\b/g, ' ↔ ')
      .replace(/↑|\bNAND\b|\bnand\b/g, ' ↑ ')
      .replace(/↓|\bNOR\b|\bnor\b/g, ' ↓ ')
      .replace(/⊤|\bTRUE\b|\btrue\b/g, ' 1 ')
      .replace(/⊥|\bFALSE\b|\bfalse\b/g, ' 0 ');

    const prec = { '↔': 1, '→': 2, '∨': 3, '↓': 3, '⊕': 4, '∧': 5, '↑': 5, '¬': 6 };
    const isUnary = { '¬': true };
    const output = [];
    const opStack = [];

    const tokens = s.match(/[A-Za-z0-9_]+|[()¬∧∨⊕→↔↑↓]/g) || [];
    for (const t of tokens) {
      if (t === '1') output.push(true);
      else if (t === '0') output.push(false);
      else if (scope.hasOwnProperty(t)) output.push(!!scope[t]);
      else if (isUnary[t]) opStack.push(t);
      else if (prec[t]) {
        while (opStack.length && prec[opStack[opStack.length - 1]] >= prec[t]) {
          output.push(opStack.pop());
        }
        opStack.push(t);
      } else if (t === '(') {
        opStack.push(t);
      } else if (t === ')') {
        while (opStack.length && opStack[opStack.length - 1] !== '(') {
          output.push(opStack.pop());
        }
        opStack.pop();
        if (opStack.length && isUnary[opStack[opStack.length - 1]]) {
          output.push(opStack.pop());
        }
      }
    }
    while (opStack.length) output.push(opStack.pop());

    const stack = [];
    for (const item of output) {
      if (typeof item === 'boolean') {
        stack.push(item);
      } else if (isUnary[item]) {
        const a = stack.pop();
        stack.push(ops[item](a));
      } else if (ops[item]) {
        const b = stack.pop();
        const a = stack.pop();
        stack.push(ops[item](a, b));
      }
    }
    return stack.length > 0 ? stack[0] : false;
  },

  extractVariables(expr) {
    const reserved = new Set([
      'and', 'or', 'not', 'xor', 'nand', 'nor', 'true', 'false', '0', '1',
      'AND', 'OR', 'NOT', 'XOR', 'NAND', 'NOR', 'TRUE', 'FALSE', 'impl', 'eq'
    ]);
    const matches = expr.match(/[a-zA-Z_][a-zA-Z0-9_]*/g) || [];
    const vars = new Set();
    for (const m of matches) {
      if (!reserved.has(m)) {
        vars.add(m);
      }
    }
    return Array.from(vars).sort();
  },

  generateTruthTable(expr) {
    const variables = this.extractVariables(expr);
    const n = variables.length;
    if (n === 0) {
      throw new Error("Kamida bitta o'zgaruvchi (masalan: A, B, C) kiritilishi shart.");
    }
    if (n > 6) {
      throw new Error("O'zgaruvchilar soni juda ko'p (maksimal 6 ta).");
    }

    const rowsCount = 1 << n;
    const table = [];
    let trueCount = 0;
    const minterms = [];
    const maxterms = [];

    for (let i = 0; i < rowsCount; i++) {
      const scope = {};
      const row = { values: {}, result: false };
      for (let j = 0; j < n; j++) {
        // High bit to low bit
        const bit = (i >> (n - 1 - j)) & 1;
        scope[variables[j]] = bit === 1;
        row.values[variables[j]] = bit;
      }
      try {
        const res = this.evaluateBooleanExpr(expr, scope);
        row.result = res ? 1 : 0;
        if (row.result === 1) {
          trueCount++;
          minterms.push(i);
        } else {
          maxterms.push(i);
        }
      } catch (err) {
        throw err;
      }
      table.push(row);
    }

    const isTautology = trueCount === rowsCount;
    const isContradiction = trueCount === 0;
    const isContingent = !isTautology && !isContradiction;

    // Build SDNF (PCNF)
    let sdnf = '';
    if (minterms.length === 0) {
      sdnf = 'Mavjud emas (Ziddiyat)';
    } else {
      sdnf = minterms.map(m => {
        const parts = [];
        for (let j = 0; j < n; j++) {
          const bit = (m >> (n - 1 - j)) & 1;
          parts.push(bit === 1 ? variables[j] : `¬${variables[j]}`);
        }
        return `(${parts.join(' ∧ ')})`;
      }).join(' ∨ ');
    }

    // Build SKNF (PDNF)
    let sknf = '';
    if (maxterms.length === 0) {
      sknf = 'Mavjud emas (Tavtologiya)';
    } else {
      sknf = maxterms.map(m => {
        const parts = [];
        for (let j = 0; j < n; j++) {
          const bit = (m >> (n - 1 - j)) & 1;
          parts.push(bit === 0 ? variables[j] : `¬${variables[j]}`);
        }
        return `(${parts.join(' ∨ ')})`;
      }).join(' ∧ ');
    }

    // Build Zhegalkin Polynomial (Triangle method)
    const zhegalkin = this.calculateZhegalkin(variables, table.map(r => r.result));

    return {
      variables,
      table,
      isTautology,
      isContradiction,
      isContingent,
      minterms,
      maxterms,
      sdnf,
      sknf,
      zhegalkin
    };
  },

  calculateZhegalkin(variables, results) {
    const n = variables.length;
    const size = results.length;
    let current = [...results];
    const coefficients = [current[0]];

    for (let step = 1; step < size; step++) {
      const next = [];
      for (let i = 0; i < current.length - 1; i++) {
        next.push(current[i] ^ current[i + 1]);
      }
      coefficients.push(next[0]);
      current = next;
    }

    const terms = [];
    for (let i = 0; i < size; i++) {
      if (coefficients[i] === 1) {
        if (i === 0) {
          terms.push('1');
        } else {
          const vars = [];
          for (let j = 0; j < n; j++) {
            if ((i >> (n - 1 - j)) & 1) {
              vars.push(variables[j]);
            }
          }
          terms.push(vars.join(''));
        }
      }
    }
    return terms.length > 0 ? terms.join(' ⊕ ') : '0';
  },

  // --- Poset & Relations Engine ---
  checkRelationProperties(elements, pairs) {
    const elSet = new Set(elements);
    const pairSet = new Set(pairs.map(p => `${p[0]},${p[1]}`));

    // 1. Reflexivity: (a, a) in R for all a
    let reflexive = true;
    const missingReflexive = [];
    for (const a of elements) {
      if (!pairSet.has(`${a},${a}`)) {
        reflexive = false;
        missingReflexive.push(`(${a}, ${a})`);
      }
    }

    // 2. Irreflexive: (a, a) not in R for all a
    let irreflexive = true;
    for (const a of elements) {
      if (pairSet.has(`${a},${a}`)) {
        irreflexive = false;
        break;
      }
    }

    // 3. Symmetric: (a, b) in R => (b, a) in R
    let symmetric = true;
    const nonSymmetricPairs = [];
    for (const p of pairs) {
      if (!pairSet.has(`${p[1]},${p[0]}`)) {
        symmetric = false;
        nonSymmetricPairs.push(`(${p[0]}, ${p[1]}) bor, lekin (${p[1]}, ${p[0]}) yo'q`);
      }
    }

    // 4. Antisymmetric: (a, b) and (b, a) in R => a == b
    let antisymmetric = true;
    const nonAntisymmetricPairs = [];
    for (const p of pairs) {
      if (p[0] !== p[1] && pairSet.has(`${p[1]},${p[0]}`)) {
        antisymmetric = false;
        nonAntisymmetricPairs.push(`(${p[0]}, ${p[1]}) va (${p[1]}, ${p[0]}) ikkisi ham bor`);
      }
    }

    // 5. Transitive: (a, b) in R and (b, c) in R => (a, c) in R
    let transitive = true;
    const missingTransitive = [];
    for (const p1 of pairs) {
      for (const p2 of pairs) {
        if (p1[1] === p2[0]) {
          if (!pairSet.has(`${p1[0]},${p2[1]}`)) {
            transitive = false;
            missingTransitive.push(`(${p1[0]}, ${p1[1]}) va (${p2[0]}, ${p2[1]}) bor, lekin (${p1[0]}, ${p2[1]}) yo'q`);
          }
        }
      }
    }

    const isEquivalence = reflexive && symmetric && transitive;
    const isPartialOrder = reflexive && antisymmetric && transitive;

    // Equivalence classes
    let equivalenceClasses = [];
    if (isEquivalence) {
      const visited = new Set();
      for (const a of elements) {
        if (!visited.has(a)) {
          const cls = elements.filter(b => pairSet.has(`${a},${b}`));
          cls.forEach(x => visited.add(x));
          equivalenceClasses.push(cls);
        }
      }
    }

    return {
      reflexive,
      missingReflexive,
      irreflexive,
      symmetric,
      nonSymmetricPairs,
      antisymmetric,
      nonAntisymmetricPairs,
      transitive,
      missingTransitive: [...new Set(missingTransitive)].slice(0, 5),
      isEquivalence,
      equivalenceClasses,
      isPartialOrder
    };
  },

  transitiveClosureWarshall(matrix) {
    const n = matrix.length;
    const res = matrix.map(row => [...row]);
    const steps = [];

    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          res[i][j] = res[i][j] || (res[i][k] && res[k][j]);
        }
      }
      steps.push({ step: k + 1, pivot: k, matrix: res.map(row => [...row]) });
    }
    return { closure: res, steps };
  },

  // Transitive reduction for Hasse Diagrams
  posetTransitiveReduction(elements, pairs) {
    const pairSet = new Set(pairs.map(p => `${p[0]},${p[1]}`));
    const strictPairs = pairs.filter(p => p[0] !== p[1]);
    const reduced = [];

    for (const p of strictPairs) {
      const [u, v] = p;
      let hasIntermediate = false;
      for (const w of elements) {
        if (w !== u && w !== v) {
          if (pairSet.has(`${u},${w}`) && pairSet.has(`${w},${v}`)) {
            hasIntermediate = true;
            break;
          }
        }
      }
      if (!hasIntermediate) {
        reduced.push([u, v]);
      }
    }
    return reduced;
  },

  // --- Graph Algorithms ---
  dijkstra(nodes, edges, startNode) {
    const dist = {};
    const prev = {};
    const visited = new Set();
    const steps = [];

    nodes.forEach(u => {
      dist[u] = Infinity;
      prev[u] = null;
    });
    dist[startNode] = 0;

    // Adjacency
    const adj = {};
    nodes.forEach(u => (adj[u] = []));
    edges.forEach(e => {
      adj[e.from].push({ to: e.to, weight: e.weight });
      if (!e.directed) {
        adj[e.to].push({ to: e.from, weight: e.weight });
      }
    });

    for (let i = 0; i < nodes.length; i++) {
      // Find unvisited node with min dist
      let curr = null;
      let minDist = Infinity;
      for (const u of nodes) {
        if (!visited.has(u) && dist[u] < minDist) {
          minDist = dist[u];
          curr = u;
        }
      }

      if (curr === null || dist[curr] === Infinity) break;

      visited.add(curr);
      steps.push({
        step: i + 1,
        selectedNode: curr,
        currentDistances: { ...dist },
        visited: Array.from(visited)
      });

      for (const edge of adj[curr]) {
        if (!visited.has(edge.to)) {
          const newDist = dist[curr] + edge.weight;
          if (newDist < dist[edge.to]) {
            dist[edge.to] = newDist;
            prev[edge.to] = curr;
          }
        }
      }
    }

    return { dist, prev, steps };
  },

  kruskalMST(nodes, edges) {
    // Edges sorted by weight
    const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
    const parent = {};
    nodes.forEach(u => (parent[u] = u));

    function find(i) {
      if (parent[i] === i) return i;
      return (parent[i] = find(parent[i]));
    }

    function union(i, j) {
      const rootI = find(i);
      const rootJ = find(j);
      if (rootI !== rootJ) {
        parent[rootI] = rootJ;
        return true;
      }
      return false;
    }

    const mstEdges = [];
    const steps = [];
    let totalWeight = 0;

    for (const edge of sortedEdges) {
      const added = union(edge.from, edge.to);
      steps.push({
        edge,
        accepted: added,
        reason: added ? "Sikl hosil qilmadi, tanlandi" : "Sikl hosil qildi, rad etildi"
      });
      if (added) {
        mstEdges.push(edge);
        totalWeight += edge.weight;
      }
      if (mstEdges.length === nodes.length - 1) break;
    }

    return { mstEdges, totalWeight, steps };
  },

  findEulerTrailOrCircuit(nodes, edges, directed = false) {
    // Check degrees
    const deg = {};
    const inDeg = {};
    const outDeg = {};
    nodes.forEach(u => {
      deg[u] = 0;
      inDeg[u] = 0;
      outDeg[u] = 0;
    });

    edges.forEach(e => {
      if (directed) {
        outDeg[e.from]++;
        inDeg[e.to]++;
      } else {
        deg[e.from]++;
        deg[e.to]++;
      }
    });

    if (!directed) {
      let oddNodes = nodes.filter(u => deg[u] % 2 !== 0);
      if (oddNodes.length === 0) {
        return { type: 'circuit', message: "Barcha uchlarning darajasi juft. Eyler SIKLI mavjud!" };
      } else if (oddNodes.length === 2) {
        return { type: 'trail', oddNodes, message: `Aniq 2 ta toq darajali uch bor (${oddNodes.join(', ')}). Eyler YO'LI mavjud!` };
      } else {
        return { type: 'none', message: `Toq darajali uchlar soni ${oddNodes.length} ta (0 yoki 2 emas). Eyler yo'li ham, sikli ham mavjud EMAS.` };
      }
    } else {
      let startNodes = 0, endNodes = 0, balanced = 0;
      for (const u of nodes) {
        if (outDeg[u] === inDeg[u]) balanced++;
        else if (outDeg[u] - inDeg[u] === 1) startNodes++;
        else if (inDeg[u] - outDeg[u] === 1) endNodes++;
      }
      if (balanced === nodes.length) {
        return { type: 'circuit', message: "Barcha uchlarda kiruvchi va chiquvchi darajalar teng. Yo'naltirilgan Eyler SIKLI mavjud!" };
      } else if (startNodes === 1 && endNodes === 1 && balanced === nodes.length - 2) {
        return { type: 'trail', message: "Yo'naltirilgan Eyler YO'LI mavjud!" };
      } else {
        return { type: 'none', message: "Yo'naltirilgan Eyler sikli yoki yo'li shartlari bajarilmadi." };
      }
    }
  },

  topologicalSort(nodes, edges) {
    // Kahn's algorithm
    const inDegree = {};
    const adj = {};
    nodes.forEach(u => {
      inDegree[u] = 0;
      adj[u] = [];
    });

    edges.forEach(e => {
      adj[e.from].push(e.to);
      inDegree[e.to]++;
    });

    const queue = nodes.filter(u => inDegree[u] === 0);
    const order = [];
    const steps = [];

    while (queue.length > 0) {
      const u = queue.shift();
      order.push(u);
      steps.push({
        selected: u,
        inDegreeState: { ...inDegree },
        currentOrder: [...order]
      });

      for (const v of adj[u]) {
        inDegree[v]--;
        if (inDegree[v] === 0) {
          queue.push(v);
        }
      }
    }

    const hasCycle = order.length !== nodes.length;
    return {
      hasCycle,
      order,
      steps,
      message: hasCycle 
        ? "Grafda sikl mavjud! Shuning uchun Topologik saralash imkonsiz (Graf DAG emas)." 
        : `Topologik tartib: ${order.join(' → ')}`
    };
  }
};

if (typeof window !== 'undefined') {
  window.MathUtils = MathUtils;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MathUtils;
}

