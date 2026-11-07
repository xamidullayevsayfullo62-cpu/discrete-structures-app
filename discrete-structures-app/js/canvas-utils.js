/**
 * Interactive Canvas Engine for Graphs, Venn Diagrams, Hasse Diagrams, and Logic Circuits
 * Rock-solid rendering: High-DPI support with setTransform, DOM re-attachment, and stable physics.
 */

class InteractiveGraphCanvas {
  constructor(canvasId, options = {}) {
    this.canvasId = canvasId;
    this.options = Object.assign({
      directed: false,
      weighted: false,
      physics: true,
      nodeRadius: 22,
      primaryColor: '#6366f1',
      accentColor: '#06b6d4',
      highlightColor: '#10b981'
    }, options);

    this.nodes = [];
    this.edges = [];
    this.draggedNode = null;
    this.pan = { x: 0, y: 0 };
    this.zoom = 1;
    this.isPanning = false;
    this.panStart = { x: 0, y: 0 };
    this.animFrameId = null;

    this.bindCanvas();
    this.attachEvents();
  }

  bindCanvas() {
    const el = document.getElementById(this.canvasId);
    if (!el) return false;
    this.canvas = el;
    this.ctx = this.canvas.getContext('2d');
    return true;
  }

  checkCanvas() {
    if (!this.canvas || !document.body.contains(this.canvas)) {
      return this.bindCanvas();
    }
    return true;
  }

  resize() {
    if (!this.checkCanvas()) return;

    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const pWidth = this.canvas.parentElement ? this.canvas.parentElement.clientWidth : 800;

    this.width = rect.width > 30 ? rect.width : (pWidth > 30 ? pWidth : 800);
    this.height = rect.height > 30 ? rect.height : 380;

    // Set internal pixel buffer
    this.canvas.width = Math.floor(this.width * dpr);
    this.canvas.height = Math.floor(this.height * dpr);

    // Use setTransform to NEVER accumulate scale
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.render();
  }

  setData(nodes, edges) {
    if (!this.checkCanvas()) {
      setTimeout(() => this.setData(nodes, edges), 40);
      return;
    }

    this.resize();

    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const count = Math.max(1, nodes.length);
    const radius = Math.max(80, Math.min(this.width, this.height) * 0.35);

    this.nodes = nodes.map((n, idx) => {
      const angle = (2 * Math.PI * idx) / count;
      const initialX = n.x !== undefined && !isNaN(n.x) ? n.x : centerX + radius * Math.cos(angle);
      const initialY = n.y !== undefined && !isNaN(n.y) ? n.y : centerY + radius * Math.sin(angle);
      return {
        id: n.id,
        label: n.label || String(n.id),
        x: initialX,
        y: initialY,
        vx: 0,
        vy: 0,
        color: n.color || this.options.primaryColor,
        highlighted: !!n.highlighted
      };
    });

    this.edges = edges.map(e => ({
      from: e.from,
      to: e.to,
      weight: e.weight !== undefined ? e.weight : null,
      highlighted: !!e.highlighted,
      color: e.color || null,
      directed: e.directed !== undefined ? e.directed : this.options.directed
    }));

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    if (this.options.physics && this.nodes.length > 1) {
      this.startPhysics();
    } else {
      this.render();
    }

    if (this.width <= 30) {
      setTimeout(() => {
        this.resize();
        this.render();
      }, 60);
    }
  }

  startPhysics() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }

    let iterations = 0;
    const maxIterations = 140;
    const nodeCount = Math.max(1, this.nodes.length);
    const k = Math.min(this.width, this.height) / (Math.sqrt(nodeCount) + 1.2);
    const repulse = k * k;

    const simulate = () => {
      if (!this.checkCanvas()) return;
      if (iterations++ > maxIterations) {
        this.render();
        return;
      }

      // 1. Repulsion between all pairs
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const n1 = this.nodes[i];
          const n2 = this.nodes[j];
          let dx = n1.x - n2.x;
          let dy = n1.y - n2.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 1) { dx = (Math.random() - 0.5) * 5; dy = (Math.random() - 0.5) * 5; dist = 2; }

          if (dist < 450) {
            let force = repulse / (dist * dist);
            force = Math.min(force, 18);
            let fx = (dx / dist) * force;
            let fy = (dy / dist) * force;
            n1.vx += fx; n1.vy += fy;
            n2.vx -= fx; n2.vy -= fy;
          }
        }
      }

      // 2. Attraction along edges
      const nodeMap = new Map(this.nodes.map(n => [n.id, n]));
      for (const e of this.edges) {
        const u = nodeMap.get(e.from);
        const v = nodeMap.get(e.to);
        if (u && v && u !== v) {
          let dx = v.x - u.x;
          let dy = v.y - u.y;
          let dist = Math.sqrt(dx * dx + dy * dy) || 1;
          let force = (dist * dist) / (k * 2.8);
          force = Math.min(force, 15);
          let fx = (dx / dist) * force;
          let fy = (dy / dist) * force;
          u.vx += fx; u.vy += fy;
          v.vx -= fx; v.vy -= fy;
        }
      }

      // 3. Center gravity (pull gently towards center)
      const cx = this.width / 2;
      const cy = this.height / 2;
      const padding = Math.max(35, this.options.nodeRadius + 15);

      for (const n of this.nodes) {
        if (n !== this.draggedNode) {
          n.vx += (cx - n.x) * 0.008;
          n.vy += (cy - n.y) * 0.008;

          n.vx = Math.max(-12, Math.min(12, n.vx * 0.85));
          n.vy = Math.max(-12, Math.min(12, n.vy * 0.85));

          n.x += n.vx;
          n.y += n.vy;

          n.x = Math.max(padding, Math.min(this.width - padding, n.x));
          n.y = Math.max(padding, Math.min(this.height - padding, n.y));
        }
      }

      this.render();
      this.animFrameId = requestAnimationFrame(simulate);
    };

    simulate();
  }

  attachEvents() {
    if (!this.canvas) return;

    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left - this.pan.x) / this.zoom,
        y: (e.clientY - rect.top - this.pan.y) / this.zoom
      };
    };

    // Use Pointer Events for seamless touch & mouse drag
    this.canvas.onpointerdown = (e) => {
      this.checkCanvas();
      const pos = getPos(e);
      const clicked = this.nodes.find(n => {
        const dx = n.x - pos.x;
        const dy = n.y - pos.y;
        return Math.sqrt(dx * dx + dy * dy) <= this.options.nodeRadius + 8;
      });

      if (clicked) {
        this.draggedNode = clicked;
        try { this.canvas.setPointerCapture(e.pointerId); } catch(err){}
      } else {
        this.isPanning = true;
        this.panStart = { x: e.clientX - this.pan.x, y: e.clientY - this.pan.y };
      }
    };

    this.canvas.onpointermove = (e) => {
      if (this.draggedNode) {
        const pos = getPos(e);
        this.draggedNode.x = Math.max(25, Math.min(this.width - 25, pos.x));
        this.draggedNode.y = Math.max(25, Math.min(this.height - 25, pos.y));
        this.render();
      } else if (this.isPanning) {
        this.pan.x = e.clientX - this.panStart.x;
        this.pan.y = e.clientY - this.panStart.y;
        this.render();
      }
    };

    const stopDrag = (e) => {
      if (this.draggedNode && e && e.pointerId) {
        try { this.canvas.releasePointerCapture(e.pointerId); } catch(err){}
      }
      this.draggedNode = null;
      this.isPanning = false;
    };

    this.canvas.onpointerup = stopDrag;
    this.canvas.onpointercancel = stopDrag;

    this.canvas.onwheel = (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      this.zoom = Math.max(0.4, Math.min(3, this.zoom * zoomFactor));
      this.render();
    };
  }

  render() {
    if (!this.checkCanvas()) return;
    const ctx = this.ctx;
    const dpr = window.devicePixelRatio || 1;

    // Reset transform to DPR
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.save();
    // Apply pan & zoom
    ctx.translate(this.pan.x, this.pan.y);
    ctx.scale(this.zoom, this.zoom);

    // Draw background grid lines (cybernetic feel)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    const gridStep = 40;
    for (let x = 0; x < this.width; x += gridStep) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
    for (let y = 0; y < this.height; y += gridStep) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }

    const nodeMap = new Map(this.nodes.map(n => [n.id, n]));

    // 1. Draw Edges
    for (const edge of this.edges) {
      const u = nodeMap.get(edge.from);
      const v = nodeMap.get(edge.to);
      if (!u || !v) continue;

      const isLoop = u === v;
      ctx.save();

      if (edge.highlighted) {
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3.5;
        ctx.shadowColor = 'rgba(16, 185, 129, 0.8)';
        ctx.shadowBlur = 14;
      } else if (edge.color) {
        ctx.strokeStyle = edge.color;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = edge.color;
        ctx.shadowBlur = 6;
      } else {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 0;
      }

      if (isLoop) {
        ctx.beginPath();
        const loopR = 24;
        const lx = u.x;
        const ly = u.y - this.options.nodeRadius - loopR + 5;
        ctx.arc(lx, ly, loopR, 0, 2 * Math.PI);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(u.x, u.y);
        ctx.lineTo(v.x, v.y);
        ctx.stroke();

        // Arrow for directed graphs
        if (edge.directed) {
          const dx = v.x - u.x;
          const dy = v.y - u.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0) {
            const r = this.options.nodeRadius + 4;
            const endX = v.x - (dx / dist) * r;
            const endY = v.y - (dy / dist) * r;
            const angle = Math.atan2(dy, dx);
            const arrowLen = 13;

            ctx.fillStyle = ctx.strokeStyle;
            ctx.beginPath();
            ctx.moveTo(endX, endY);
            ctx.lineTo(
              endX - arrowLen * Math.cos(angle - Math.PI / 6.5),
              endY - arrowLen * Math.sin(angle - Math.PI / 6.5)
            );
            ctx.lineTo(
              endX - arrowLen * Math.cos(angle + Math.PI / 6.5),
              endY - arrowLen * Math.sin(angle + Math.PI / 6.5)
            );
            ctx.closePath();
            ctx.fill();
          }
        }

        // Edge Weight label
        if (edge.weight !== null && edge.weight !== undefined) {
          const midX = (u.x + v.x) / 2;
          const midY = (u.y + v.y) / 2;

          ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
          ctx.beginPath();
          ctx.arc(midX, midY, 13, 0, 2 * Math.PI);
          ctx.fill();
          ctx.strokeStyle = edge.highlighted ? '#10b981' : 'rgba(255, 255, 255, 0.35)';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = edge.highlighted ? '#34d399' : '#f8fafc';
          ctx.font = 'bold 11px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(edge.weight, midX, midY);
        }
      }
      ctx.restore();
    }

    // 2. Draw Nodes
    for (const node of this.nodes) {
      ctx.save();
      const r = this.options.nodeRadius;

      // Glow effect
      if (node.highlighted) {
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 22;
      } else {
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 14;
      }

      // Outer circle fill
      const grad = ctx.createRadialGradient(node.x - 4, node.y - 4, 2, node.x, node.y, r);
      if (node.highlighted) {
        grad.addColorStop(0, '#34d399');
        grad.addColorStop(1, '#059669');
      } else {
        grad.addColorStop(0, '#818cf8');
        grad.addColorStop(1, '#4f46e5');
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
      ctx.fill();

      // Border ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label text
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, node.x, node.y);

      ctx.restore();
    }

    ctx.restore();
  }
}

class VennDiagramCanvas {
  constructor(canvasId) {
    this.canvasId = canvasId;
    this.bindCanvas();
  }

  bindCanvas() {
    const el = document.getElementById(this.canvasId);
    if (!el) return false;
    this.canvas = el;
    this.ctx = this.canvas.getContext('2d');
    return true;
  }

  checkCanvas() {
    if (!this.canvas || !document.body.contains(this.canvas)) {
      return this.bindCanvas();
    }
    return true;
  }

  resize() {
    if (!this.checkCanvas()) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const pWidth = this.canvas.parentElement ? this.canvas.parentElement.clientWidth : 750;

    this.width = rect.width > 30 ? rect.width : (pWidth > 30 ? pWidth : 750);
    this.height = rect.height > 30 ? rect.height : 360;

    this.canvas.width = Math.floor(this.width * dpr);
    this.canvas.height = Math.floor(this.height * dpr);

    // Use setTransform to NEVER accumulate scaling
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  draw2Sets(data) {
    if (!this.checkCanvas()) {
      setTimeout(() => this.draw2Sets(data), 40);
      return;
    }

    this.resize();
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    const r = Math.min(w, h) * 0.32;
    const cy = h / 2;
    const offset = r * 0.65;
    const c1 = { x: w / 2 - offset, y: cy, label: 'A', count: data.setA.length };
    const c2 = { x: w / 2 + offset, y: cy, label: 'B', count: data.setB.length };

    const Aonly = data.setA.filter(x => !data.setB.includes(x));
    const Bonly = data.setB.filter(x => !data.setA.includes(x));
    const AnB = data.setA.filter(x => data.setB.includes(x));

    const op = data.operation || 'none';

    const shadeRegion = (x, y, radius, color, glow) => {
      ctx.save();
      ctx.fillStyle = color;
      ctx.shadowColor = glow;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    };

    // Base glowing regions
    shadeRegion(c1.x, c1.y, r, 'rgba(99, 102, 241, 0.18)', 'rgba(99, 102, 241, 0.45)');
    shadeRegion(c2.x, c2.y, r, 'rgba(6, 182, 212, 0.18)', 'rgba(6, 182, 212, 0.45)');

    // Operation Highlights
    if (op === 'union' || op === 'diffAB' || op === 'symdiff') {
      ctx.save();
      ctx.fillStyle = 'rgba(99, 102, 241, 0.48)';
      ctx.beginPath();
      ctx.arc(c1.x, c1.y, r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    }
    if (op === 'union' || op === 'diffBA' || op === 'symdiff') {
      ctx.save();
      ctx.fillStyle = 'rgba(6, 182, 212, 0.48)';
      ctx.beginPath();
      ctx.arc(c2.x, c2.y, r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    }
    if (op === 'diffAB' || op === 'diffBA' || op === 'symdiff') {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(op === 'diffAB' ? c2.x : c1.x, cy, r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    }
    if (op === 'intersection') {
      ctx.save();
      ctx.beginPath();
      ctx.arc(c1.x, c1.y, r, 0, 2 * Math.PI);
      ctx.clip();
      ctx.fillStyle = 'rgba(16, 185, 129, 0.68)';
      ctx.beginPath();
      ctx.arc(c2.x, c2.y, r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    }

    // Outlines
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(c1.x, c1.y, r, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(c2.x, c2.y, r, 0, 2 * Math.PI);
    ctx.stroke();

    // Circle Labels
    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = '#818cf8';
    ctx.fillText(`To'plam A (|A| = ${data.setA.length})`, c1.x - 70, cy - r - 15);
    ctx.fillStyle = '#22d3ee';
    ctx.fillText(`To'plam B (|B| = ${data.setB.length})`, c2.x - 30, cy - r - 15);

    // Elements inside regions
    const drawElements = (items, x, y, maxShow = 6) => {
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      if (items.length === 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillText('∅ (bo\'sh)', x, y);
        return;
      }
      const toShow = items.slice(0, maxShow);
      const lines = [];
      for (let i = 0; i < toShow.length; i += 2) {
        lines.push(toShow.slice(i, i + 2).join(', '));
      }
      if (items.length > maxShow) lines.push(`... (+${items.length - maxShow})`);
      lines.forEach((line, idx) => {
        ctx.fillText(line, x, y - ((lines.length - 1) * 8) + idx * 16);
      });
    };

    drawElements(Aonly, c1.x - offset * 0.6, cy);
    drawElements(AnB, w / 2, cy);
    drawElements(Bonly, c2.x + offset * 0.6, cy);

    if (this.width <= 30) {
      setTimeout(() => this.draw2Sets(data), 60);
    }
  }
}

class LogicCircuitSimulator {
  constructor(containerId) {
    this.containerId = containerId;
  }

  renderCircuit(state) {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    container.innerHTML = `
      <div style="display: flex; gap: 24px; align-items: center; justify-content: center; flex-wrap: wrap;">
        <!-- Inputs -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div class="glass-panel" style="padding: 12px 18px; display: flex; align-items: center; gap: 12px;">
            <span style="font-weight: 700; color: #818cf8;">Kirish A:</span>
            <button id="gate-btn-a" class="gate-switch ${state.A ? 'on' : ''}">${state.A ? '1' : '0'}</button>
          </div>
          <div class="glass-panel" style="padding: 12px 18px; display: flex; align-items: center; gap: 12px;">
            <span style="font-weight: 700; color: #818cf8;">Kirish B:</span>
            <button id="gate-btn-b" class="gate-switch ${state.B ? 'on' : ''}">${state.B ? '1' : '0'}</button>
          </div>
        </div>

        <!-- Gates Grid -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; flex: 1; max-width: 650px;">
          ${this.gateItem('AND (Kon\'yunksiya)', state.A && state.B, 'A ∧ B')}
          ${this.gateItem('OR (Diz\'yunksiya)', state.A || state.B, 'A ∨ B')}
          ${this.gateItem('NOT A (Inkor)', !state.A, '¬A')}
          ${this.gateItem('XOR (Qat\'iy OR)', (!state.A && state.B) || (state.A && !state.B), 'A ⊕ B')}
          ${this.gateItem('NAND (Sheffer)', !(state.A && state.B), '¬(A ∧ B)')}
          ${this.gateItem('NOR (Pirs)', !(state.A || state.B), '¬(A ∨ B)')}
        </div>
      </div>
    `;
  }

  gateItem(title, value, formula) {
    const valStr = value ? '1 (ROST)' : '0 (YOLG\'ON)';
    const badgeCls = value ? 'badge-emerald' : 'badge-rose';
    const glowStyle = value 
      ? 'border-color: #10b981; box-shadow: 0 0 15px rgba(16, 185, 129, 0.35);' 
      : 'opacity: 0.85;';
    return `
      <div class="glass-panel" style="padding: 14px; ${glowStyle}">
        <div style="font-size: 13px; font-weight: 700; color: #f8fafc; margin-bottom: 4px;">${title}</div>
        <div style="font-size: 11px; color: #94a3b8; font-family: var(--font-mono); margin-bottom: 8px;">${formula}</div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="badge ${badgeCls}">${valStr}</span>
        </div>
      </div>
    `;
  }
}

window.InteractiveGraphCanvas = InteractiveGraphCanvas;
window.VennDiagramCanvas = VennDiagramCanvas;
window.LogicCircuitSimulator = LogicCircuitSimulator;
