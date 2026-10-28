"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import type { MotionValue } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { createPanelTexture, PANEL_ASPECT, type PanelKind } from "./panelTextures";

/**
 * The hero "Assembly": four layers of a product — code, design, AI, product —
 * float apart in depth, then collapse into one finished object as you scroll.
 */

type PanelDef = {
  kind: PanelKind;
  label: string;
  exploded: [number, number, number];
  assembled: [number, number, number];
};

const PANELS: PanelDef[] = [
  { kind: "code", label: "Code", exploded: [-1.6, 1.0, -1.2], assembled: [0.12, 0.18, -0.3] },
  { kind: "design", label: "Design", exploded: [-0.52, 0.34, -0.4], assembled: [0.08, 0.12, -0.2] },
  { kind: "ai", label: "AI", exploded: [0.56, -0.32, 0.4], assembled: [0.04, 0.06, -0.1] },
  { kind: "product", label: "Product", exploded: [1.64, -0.98, 1.2], assembled: [0, 0, 0] },
];

const PANEL_H = 1.5;
const PANEL_W = PANEL_H * PANEL_ASPECT;
const DEPTH = 0.07;

const damp = THREE.MathUtils.damp;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

/** The custom cursor reads data-cursor-label from whatever is under the pointer. */
function setCursorLabel(el: HTMLElement, label: string | null) {
  if (label) el.dataset.cursorLabel = label;
  else delete el.dataset.cursorLabel;
}

type SceneProps = {
  progress: MotionValue<number>;
  reduced: boolean;
  compact: boolean;
};

function usePointer(disabled: boolean) {
  const p = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (disabled) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      p.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      p.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [disabled]);
  return p;
}

function Panel({
  def,
  index,
  progress,
  reduced,
  start,
}: {
  def: PanelDef;
  index: number;
  progress: MotionValue<number>;
  reduced: boolean;
  start: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const gl = useThree((s) => s.gl);
  const texture = useMemo(
    () => createPanelTexture(def.kind, gl.capabilities.getMaxAnisotropy()),
    [def.kind, gl],
  );
  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state, dt) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const p = easeInOut(Math.min(1, Math.max(0, progress.get())));
    const intro = reduced ? 1 : easeOut(Math.min(1, Math.max(0, (t - start - index * 0.12) / 1.4)));

    const [ex, ey, ez] = def.exploded;
    const [ax, ay, az] = def.assembled;
    const float = reduced ? 0 : Math.sin(t * 0.7 + index * 1.3) * 0.05 * (1 - p);
    const lift = hovered && p < 0.5 ? 0.28 : 0;

    const tx = THREE.MathUtils.lerp(ex, ax, p);
    const ty = THREE.MathUtils.lerp(ey, ay, p) + float;
    const tz = THREE.MathUtils.lerp(ez, az, p) + lift - (1 - intro) * 5;

    g.position.x = damp(g.position.x, tx, 6, dt);
    g.position.y = damp(g.position.y, ty, 6, dt);
    g.position.z = damp(g.position.z, tz, 6, dt);
    const s = 0.7 + 0.3 * intro;
    g.scale.setScalar(damp(g.scale.x, hovered && p < 0.5 ? s * 1.03 : s, 8, dt));
  });

  const onOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHovered(true);
    setCursorLabel(gl.domElement, def.label);
  };
  const onOut = () => {
    setHovered(false);
    setCursorLabel(gl.domElement, null);
  };

  return (
    <group ref={ref} position={[def.exploded[0], def.exploded[1], def.exploded[2] - 5]} scale={0.7}>
      <RoundedBox
        args={[PANEL_W + 0.08, PANEL_H + 0.08, DEPTH]}
        radius={0.035}
        smoothness={4}
        onPointerOver={onOver}
        onPointerOut={onOut}
      >
        <meshPhysicalMaterial
          color={def.kind === "code" || def.kind === "ai" ? "#1b1d22" : "#fbfbfc"}
          roughness={0.22}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </RoundedBox>
      <mesh position={[0, 0, DEPTH / 2 + 0.002]}>
        <planeGeometry args={[PANEL_W, PANEL_H]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Accent({
  from,
  to,
  progress,
  reduced,
  speed,
  children,
}: {
  from: [number, number, number];
  to: [number, number, number];
  progress: MotionValue<number>;
  reduced: boolean;
  speed: number;
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const p = easeInOut(Math.min(1, Math.max(0, progress.get())));
    const bob = reduced ? 0 : Math.sin(t * speed) * 0.12;
    g.position.x = damp(g.position.x, THREE.MathUtils.lerp(from[0], to[0], p), 4, dt);
    g.position.y = damp(g.position.y, THREE.MathUtils.lerp(from[1], to[1], p) + bob, 4, dt);
    g.position.z = damp(g.position.z, THREE.MathUtils.lerp(from[2], to[2], p), 4, dt);
    if (!reduced) {
      g.rotation.x += dt * 0.25 * speed;
      g.rotation.y += dt * 0.35 * speed;
    }
  });
  return (
    <group ref={ref} position={from}>
      {children}
    </group>
  );
}

function Rig({ progress, reduced, compact }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const pointer = usePointer(reduced || compact);
  const viewport = useThree((s) => s.viewport);
  const [start] = useState(() => 0.15);

  // Fit the composition to whatever box the canvas has.
  const fit = Math.min(1.05, viewport.width / (compact ? 5.4 : 6.6), viewport.height / 4.6);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const p = easeInOut(Math.min(1, Math.max(0, progress.get())));
    const baseY = THREE.MathUtils.lerp(-0.42, -0.1, p);
    const baseX = THREE.MathUtils.lerp(0.1, 0.02, p);
    g.rotation.y = damp(g.rotation.y, baseY + pointer.current.x * 0.14, 3, dt);
    g.rotation.x = damp(g.rotation.x, baseX + pointer.current.y * 0.08, 3, dt);
    const s = fit * THREE.MathUtils.lerp(1, 1.12, p);
    g.scale.setScalar(damp(g.scale.x, s, 4, dt));
  });

  return (
    <group ref={group} scale={fit}>
      {PANELS.map((def, i) => (
        <Panel key={def.kind} def={def} index={i} progress={progress} reduced={reduced} start={start} />
      ))}

      <Accent from={[2.35, 1.35, 0.2]} to={[1.72, 1.04, 0.5]} progress={progress} reduced={reduced} speed={0.9}>
        <RoundedBox args={[0.4, 0.4, 0.4]} radius={0.07} smoothness={4}>
          <meshPhysicalMaterial color="#ff8b00" roughness={0.3} clearcoat={1} clearcoatRoughness={0.2} />
        </RoundedBox>
      </Accent>
      <Accent from={[-2.3, -1.2, 0.9]} to={[-1.68, -0.98, 0.5]} progress={progress} reduced={reduced} speed={1.2}>
        <mesh>
          <sphereGeometry args={[0.15, 48, 48]} />
          <meshPhysicalMaterial color="#ffc90c" roughness={0.18} clearcoat={1} />
        </mesh>
      </Accent>
      <Accent from={[0.35, 1.7, -1.4]} to={[-1.4, 1.1, -0.6]} progress={progress} reduced={reduced} speed={0.7}>
        <RoundedBox args={[0.22, 0.22, 0.22]} radius={0.04} smoothness={3}>
          <meshPhysicalMaterial color="#16181d" roughness={0.35} clearcoat={0.6} />
        </RoundedBox>
      </Accent>
      {!compact && (
        <Accent from={[-0.4, -1.75, 1.6]} to={[1.3, -1.05, 0.6]} progress={progress} reduced={reduced} speed={1}>
          <mesh>
            <torusGeometry args={[0.13, 0.045, 24, 64]} />
            <meshPhysicalMaterial color="#ffffff" roughness={0.1} clearcoat={1} />
          </mesh>
        </Accent>
      )}
    </group>
  );
}

export default function AssemblyScene({
  progress,
  reduced,
  compact,
  active,
  onReady,
}: SceneProps & { active: boolean; onReady?: () => void }) {
  return (
    <Canvas
      dpr={compact ? [1, 1.5] : [1, 1.75]}
      camera={{ position: [0, 0, 10.5], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      onCreated={() => onReady?.()}
      aria-hidden
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[-4, 6, 6]} intensity={1.4} />
      <Rig progress={progress} reduced={reduced} compact={compact} />
      {!compact && (
        <ContactShadows position={[0, -2.35, 0]} opacity={0.32} scale={13} blur={2.8} far={4.5} resolution={512} color="#0c0d10" />
      )}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.4} position={[0, 5, -1]} rotation-x={Math.PI / 2} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={1.4} position={[-5, 1, 1]} rotation-y={Math.PI / 2} scale={[3, 7, 1]} />
        <Lightformer form="rect" intensity={1.1} position={[5, 0, 3]} rotation-y={-Math.PI / 2} scale={[3, 7, 1]} />
        <Lightformer form="ring" color="#ff8b00" intensity={1.6} position={[4, -3, 5]} scale={2.5} />
      </Environment>
    </Canvas>
  );
}
