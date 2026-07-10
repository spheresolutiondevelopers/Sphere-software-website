// src/pages/Home/sections/Hero/OrbitalGlobe.jsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ORBITAL_NODES } from '@/data/heroData';
import styles from './Hero.module.css';

// Helper: 3D rotation
const rot3D = (x, y, z, rx, ry) => {
  const x1 = x * Math.cos(ry) + z * Math.sin(ry);
  const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
  const y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
  const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
  return [x1, y2, z2];
};

// Spherical to Cartesian (checkerboard)
const sPoint = (lat, lng, a, b) => {
  const la = (lat * Math.PI) / 180;
  const lo = (lng * Math.PI) / 180;
  return [a * Math.cos(la) * Math.cos(lo), b * Math.sin(la), a * Math.cos(la) * Math.sin(lo)];
};

const OrbitalGlobe = () => {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [rotation, setRotation] = useState({ x: 0.18, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: -0.006 });
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Resize observer
  useEffect(() => {
    const updateSize = () => {
      if (wrapRef.current) {
        const rect = wrapRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(wrapRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Main draw function – returns positions for nodes
  const draw = useCallback(
    (ctx, W, H, rx, ry, orbitAngle) => {
      const cx = W / 2;
      const cy = H * 0.4;
      const baseR = Math.min(W, H) * 0.13;
      const a = baseR * 1.38;  // same as HTML
      const b = baseR * 0.86;  // same as HTML

      ctx.clearRect(0, 0, W, H);

      // ---- Orbit ring (dashed ellipse) ----
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, a, b, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(124,108,248,0.13)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 11]);
      ctx.stroke();
      ctx.setLineDash([]);
      // Spokes from center to each node
      ORBITAL_NODES.forEach((_, i) => {
        const angle = orbitAngle + (i / ORBITAL_NODES.length) * Math.PI * 2 + Math.PI / 2;
        const nx = cx + a * Math.cos(angle);
        const ny = cy + b * Math.sin(angle);
        const grad = ctx.createLinearGradient(cx, cy, nx, ny);
        grad.addColorStop(0, 'rgba(124,108,248,0.20)');
        grad.addColorStop(1, 'rgba(124,108,248,0.01)');
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      });
      ctx.restore();

      // ---- Drop shadow ----
      ctx.save();
      ctx.translate(cx, cy + b + 4);
      ctx.scale(1, 0.12);
      const sh = ctx.createRadialGradient(0, 0, 0, 0, 0, a * 0.5);
      sh.addColorStop(0, 'rgba(94,79,240,0.4)');
      sh.addColorStop(1, 'rgba(94,79,240,0)');
      ctx.beginPath();
      ctx.ellipse(0, 0, a * 0.5, a * 0.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = sh;
      ctx.fill();
      ctx.restore();

      // ---- Globe body ----
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, a, b, 0, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = 'rgba(26,20,62,0.98)';
      ctx.fillRect(cx - a, cy - b, a * 2, b * 2);

      // Checkerboard tiles
      const STEP = 12;
      const cells = [];
      for (let lat = -90; lat < 90; lat += STEP) {
        for (let lng = -180; lng < 180; lng += STEP) {
          cells.push({ lat, lng, p: (Math.round(lat / STEP) + Math.round(lng / STEP)) % 2 });
        }
      }
      const sorted = cells
        .map((c) => {
          const [px, py, pz] = sPoint(c.lat + STEP / 2, c.lng + STEP / 2, a, b);
          const [,, rz] = rot3D(px, py, pz, rx, ry);
          return { ...c, rz };
        })
        .filter((c) => c.rz > -0.06)
        .sort((ca, cb) => ca.rz - cb.rz);

      sorted.forEach((cell) => {
        const corners = [
          sPoint(cell.lat, cell.lng, a, b),
          sPoint(cell.lat, cell.lng + STEP, a, b),
          sPoint(cell.lat + STEP, cell.lng + STEP, a, b),
          sPoint(cell.lat + STEP, cell.lng, a, b),
        ];
        const rc = corners.map(([x, y, z]) => rot3D(x, y, z, rx, ry));
        const avgZ = rc.reduce((s, c) => s + c[2], 0) / 4;
        if (avgZ < -0.06) return;
        const l = 0.3 + avgZ * 0.7;
        ctx.beginPath();
        rc.forEach(([rx_, ry_], i) => {
          i === 0 ? ctx.moveTo(cx + rx_, cy - ry_) : ctx.lineTo(cx + rx_, cy - ry_);
        });
        ctx.closePath();
        ctx.fillStyle =
          cell.p === 0
            ? `rgb(${Math.round(58 + l * 56)},${Math.round(48 + l * 42)},${Math.round(138 + l * 74)})`
            : `rgb(${Math.round(26 + l * 36)},${Math.round(18 + l * 28)},${Math.round(96 + l * 64)})`;
        ctx.fill();
      });
      ctx.restore();

      // ---- Globe border ----
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, a, b, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(155,141,250,0.72)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(cx, cy, a + 5, b + 5, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(124,108,248,0.18)';
      ctx.lineWidth = 10;
      ctx.stroke();
      ctx.restore();

      // ---- Specular highlight ----
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, a, b, 0, 0, Math.PI * 2);
      ctx.clip();
      const spec = ctx.createRadialGradient(
        cx - a * 0.36,
        cy - b * 0.34,
        a * 0.01,
        cx - a * 0.2,
        cy - b * 0.18,
        a * 0.46
      );
      spec.addColorStop(0, 'rgba(200,190,255,0.54)');
      spec.addColorStop(0.32, 'rgba(180,170,255,0.15)');
      spec.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = spec;
      ctx.fillRect(cx - a, cy - b, a * 2, b * 2);
      ctx.restore();

      // ---- Rim glow (pulsing) ----
      const pulse = 0.5 + 0.5 * Math.sin(orbitAngle * 5); // use orbitAngle as time
      const rim = ctx.createRadialGradient(cx, cy, a * 0.82, cx, cy, a * 1.22);
      rim.addColorStop(0, 'rgba(124,108,248,0)');
      rim.addColorStop(0.5, `rgba(124,108,248,${0.18 + 0.11 * pulse})`);
      rim.addColorStop(1, 'rgba(124,108,248,0)');
      ctx.beginPath();
      ctx.ellipse(cx, cy, a * 1.22, b * 1.22, 0, 0, Math.PI * 2);
      ctx.fillStyle = rim;
      ctx.fill();

      // ---- "SPHERE" text on globe ----
      const scale = a / 260;
      const baseY = cy - b * 0.22;
      const letters = [
        { ch: 'S', fs: 78, x: 30 },
        { ch: 'P', fs: 82, x: 78 },
        { ch: 'H', fs: 118, x: 152 },
        { ch: 'E', fs: 118, x: 260 },
        { ch: 'R', fs: 82, x: 368 },
        { ch: 'E', fs: 78, x: 416 },
      ];
      const mapX = (vx) => cx - a + (vx / 520) * (a * 2);
      letters.forEach(({ ch, fs, x }) => {
        const sx = mapX(x);
        const sy = baseY;
        const fz = Math.round(fs * scale);
        ctx.save();
        ctx.font = `800 ${fz}px 'Plus Jakarta Sans','Inter',sans-serif`;
        ctx.textBaseline = 'alphabetic';
        ctx.shadowColor = 'rgba(0,0,20,0.9)';
        ctx.shadowBlur = 7;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.fillStyle = '#180738';
        ctx.fillText(ch, sx, sy);
        ctx.shadowColor = 'rgba(124,108,248,0.45)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        const g = ctx.createLinearGradient(sx, sy - fz, sx, sy);
        g.addColorStop(0, '#d8b4fe');
        g.addColorStop(0.42, '#7C6CF8');
        g.addColorStop(1, '#4c1d95');
        ctx.fillStyle = g;
        ctx.fillText(ch, sx, sy);
        ctx.restore();
      });

      // ---- Compute node positions for DOM elements ----
      const nodePositions = ORBITAL_NODES.map((_, i) => {
        const angle = orbitAngle + (i / ORBITAL_NODES.length) * Math.PI * 2 + Math.PI / 2;
        return {
          x: cx + a * Math.cos(angle),
          y: cy + b * Math.sin(angle),
        };
      });
      return nodePositions;
    },
    []
  );

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;
    const ctx = canvas.getContext('2d');
    const W = dimensions.width;
    const H = dimensions.height;
    canvas.width = W * devicePixelRatio;
    canvas.height = H * devicePixelRatio;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(devicePixelRatio, devicePixelRatio);

    let frameId = null;
    let orbitAngle = 0;             // rotation angle of the nodes
    const SPEED = 0.0038;           // slow rotation (same as HTML)
    let rx = rotation.x;
    let ry = rotation.y;
    let vx = velocity.x;
    let vy = velocity.y;

    const loop = () => {
      // Update orbit angle (rotation around the globe)
      if (!isDragging) {
        orbitAngle += SPEED;
        // Also apply inertia to globe tilt
        ry += vy;
        rx += vx;
        vx *= 0.97;
        if (Math.abs(vy) < 0.006) vy = vy < 0 ? -0.006 : 0.006;
        vy *= 0.997;
        rx = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, rx));
      }

      const positions = draw(ctx, W, H, rx, ry, orbitAngle);

      // Update DOM node positions
      const nodeContainers = document.querySelectorAll('.orb-node-planet-container');
      nodeContainers.forEach((el, i) => {
        if (i < positions.length) {
          el.style.left = positions[i].x + 'px';
          el.style.top = positions[i].y + 'px';
        }
      });

      frameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [dimensions, draw, rotation, velocity, isDragging]);

  // Mouse/touch handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    const pos = e.touches ? e.touches[0] : e;
    setLastPos({ x: pos.clientX, y: pos.clientY });
    setVelocity({ x: 0, y: 0 });
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const pos = e.touches ? e.touches[0] : e;
    const dx = pos.clientX - lastPos.x;
    const dy = pos.clientY - lastPos.y;
    setRotation((prev) => ({
      x: prev.x + dy * 0.007,
      y: prev.y + dx * 0.007,
    }));
    setVelocity({ x: dy * 0.007 * 0.7, y: dx * 0.007 * 0.7 });
    setLastPos({ x: pos.clientX, y: pos.clientY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleNodeClick = (idx) => {
    setSelectedIdx(idx);
    // Optional: trigger product modal via prop
  };

  return (
    <div className={styles.orbitalWrapper}>
      <div
        ref={wrapRef}
        className={styles.platformOrbWrap}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        <canvas ref={canvasRef} className={styles.orbCanvas} />
        {ORBITAL_NODES.map((node, idx) => (
          <div
            key={node.id}
            className="orb-node-planet-container"
            style={{
              position: 'absolute',
              width: node.size + 'px',
              height: node.size + 'px',
              marginLeft: -node.size / 2 + 'px',
              marginTop: -node.size / 2 + 'px',
              borderRadius: '50%',
              background: node.bg,
              boxShadow: `0 4px 22px ${node.color}, inset 2px 2px 6px rgba(255,255,255,0.22)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'transform 0.2s, filter 0.2s',
              pointerEvents: 'all',
            }}
            onClick={() => handleNodeClick(idx)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.15)';
              e.currentTarget.style.filter = `drop-shadow(0 0 10px ${node.color})`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.filter = 'none';
            }}
          >
            <span style={{ fontSize: '1.25em', lineHeight: 1 }}>{node.emoji}</span>
            <span
              style={{
                position: 'absolute',
                bottom: '-22px',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                whiteSpace: 'nowrap',
                textShadow: '0 1px 8px rgba(0,0,0,1)',
                pointerEvents: 'none',
              }}
            >
              {node.title}
            </span>
          </div>
        ))}
      </div>
      {/* Description panel (unchanged) */}
      <div className={styles.orbDescPanel}>
        <div className={styles.orbDescIconWrap}>
          <span id="orb-desc-icon">{ORBITAL_NODES[selectedIdx]?.emoji}</span>
        </div>
        <div className={styles.orbDescContent}>
          <div className={styles.orbDescTitle}>{ORBITAL_NODES[selectedIdx]?.title}</div>
          <div className={styles.orbDescText}>{ORBITAL_NODES[selectedIdx]?.desc}</div>
        </div>
      </div>
    </div>
  );
};

export default OrbitalGlobe;