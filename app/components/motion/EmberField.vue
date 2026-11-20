<script setup lang="ts">
/**
 * EmberField: campfire embers rising from a point inside the nearest positioned ancestor.
 * Canvas, additive blending, frame-time based. Runs only while on screen and the tab is visible.
 * Under prefers-reduced-motion there is no loop: the firelight is drawn once, still.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    originX?: number
    originY?: number
    spread?: number
    rate?: number
    glow?: boolean
  }>(),
  { originX: 0.5, originY: 0.8, spread: 0.06, rate: 12, glow: true },
)

const canvas = ref<HTMLCanvasElement | null>(null)

interface Ember {
  x: number
  y: number
  vx: number
  vy: number
  age: number
  life: number
  size: number
  seed: number
  spark: boolean
}

const SOFT_CAP = 90
const HARD_CAP = 220

let ctx: CanvasRenderingContext2D | null = null
let W = 0
let H = 0
let dpr = 1
let embers: Ember[] = []
let simTime = 0
let spawnAcc = 0
let raf = 0
let last = 0
let running = false
let onScreen = false
let pageVisible = true
let reduced = false
let ro: ResizeObserver | null = null
let io: IntersectionObserver | null = null
let mq: MediaQueryList | null = null

// ---------- noise ----------
function hash(n: number): number {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}
function vnoise(x: number): number {
  const i = Math.floor(x)
  const f = x - i
  const u = f * f * (3 - 2 * f)
  return hash(i) * (1 - u) + hash(i + 1) * u
}
/** Organic 0..1 flicker: three octaves of value noise, no sine. */
function flicker(t: number): number {
  return 0.55 * vnoise(t * 2.1) + 0.3 * vnoise(t * 5.3 + 17) + 0.15 * vnoise(t * 11.7 + 41)
}

// ---------- colour ramp: white-hot -> amber -> deep red ----------
const STOPS: Array<[number, number, number, number]> = [
  [0, 255, 248, 228],
  [0.16, 255, 214, 142],
  [0.4, 240, 166, 58],
  [0.74, 192, 66, 26],
  [1, 104, 20, 12],
]
function ramp(f: number): [number, number, number] {
  for (let i = 1; i < STOPS.length; i++) {
    const b = STOPS[i]!
    if (f <= b[0]) {
      const a = STOPS[i - 1]!
      const k = (f - a[0]) / (b[0] - a[0])
      return [a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k, a[3] + (b[3] - a[3]) * k]
    }
  }
  const z = STOPS[STOPS.length - 1]!
  return [z[1], z[2], z[3]]
}

// ---------- spawning ----------
function spawn(spark: boolean, boost = 1): void {
  const ox = props.originX * W
  const oy = props.originY * H
  // average of two randoms = soft triangular spread around the fire's core
  const jitter = (Math.random() + Math.random() - 1) * props.spread * W * 0.5
  const e: Ember = {
    x: ox + jitter,
    y: oy - Math.random() * 0.01 * H,
    vx: (Math.random() - 0.5) * 0.04 * H,
    vy: -(0.14 + Math.random() * 0.2) * H,
    age: 0,
    life: 1.5 + Math.random() * 1.6,
    size: 0.5 + Math.random() * 0.75,
    seed: Math.random() * 1000,
    spark,
  }
  if (spark) {
    e.vx = (Math.random() - 0.5) * 0.26 * H * boost
    e.vy = -(0.34 + Math.random() * 0.3) * H * boost
    e.life = 0.7 + Math.random() * 0.7
    e.size = 0.85 + Math.random() * 0.4
  }
  embers.push(e)
}

// ---------- simulation ----------
function step(dt: number): void {
  simTime += dt
  spawnAcc += props.rate * dt
  while (spawnAcc >= 1) {
    spawnAcc -= 1
    if (embers.length < SOFT_CAP) spawn(Math.random() < 0.09)
  }

  const wind = (vnoise(simTime * 0.23 + 99) - 0.5) * 0.05 * H
  const turb = 0.22 * H
  for (let i = embers.length - 1; i >= 0; i--) {
    const e = embers[i]!
    e.age += dt
    if (e.age >= e.life) {
      embers[i] = embers[embers.length - 1]!
      embers.pop()
      continue
    }
    if (e.spark) {
      // pop, arc, cool: stronger drag and a touch of gravity
      const drag = Math.exp(-1.7 * dt)
      e.vx *= drag
      e.vy = e.vy * drag + 0.12 * H * dt
    } else {
      // hot air carries them up, they slow as they cool, turbulence pushes them around
      const drag = Math.exp(-0.85 * dt)
      const n = (vnoise(simTime * 1.6 + e.seed) - 0.5) * 2
      e.vx = e.vx * drag + (n * turb + wind) * dt
      e.vy = e.vy * drag - 0.03 * H * dt
    }
    e.x += e.vx * dt
    e.y += e.vy * dt
  }
}

// ---------- drawing ----------
function drawGlow(fl: number): void {
  if (!ctx || !props.glow) return
  const ox = props.originX * W + (vnoise(simTime * 0.9 + 7) - 0.5) * 0.006 * W
  const oy = props.originY * H
  const R = Math.max(W, H) * 0.3 * (0.9 + 0.22 * fl)
  const a = 0.13 + 0.11 * fl
  const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, R)
  g.addColorStop(0, `rgba(255,186,96,${a.toFixed(3)})`)
  g.addColorStop(0.3, `rgba(240,146,52,${(a * 0.5).toFixed(3)})`)
  g.addColorStop(1, 'rgba(232,110,36,0)')
  ctx.fillStyle = g
  ctx.fillRect(ox - R, oy - R, R * 2, R * 2)
}

function draw(): void {
  if (!ctx) return
  ctx.clearRect(0, 0, W, H)
  ctx.globalCompositeOperation = 'lighter'
  drawGlow(flicker(simTime))

  for (const e of embers) {
    const f = e.age / e.life
    const [r, g, b] = ramp(f)
    const fadeIn = f < 0.06 ? f / 0.06 : 1
    const twinkle = 0.72 + 0.28 * vnoise(e.age * 9 + e.seed)
    const alpha = fadeIn * Math.pow(1 - f, 1.25) * twinkle
    const rad = e.size * (1 - Math.pow(f, 1.5) * 0.6)
    const rgb = `${r | 0},${g | 0},${b | 0}`

    if (e.spark) {
      // short streak behind the spark, along its velocity
      ctx.strokeStyle = `rgba(${rgb},${(alpha * 0.55).toFixed(3)})`
      ctx.lineWidth = rad * 1.4
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(e.x, e.y)
      ctx.lineTo(e.x - e.vx * 0.06, e.y - e.vy * 0.06)
      ctx.stroke()
    }
    if (f < 0.55) {
      ctx.fillStyle = `rgba(${rgb},${(alpha * (e.spark ? 0.22 : 0.12)).toFixed(3)})`
      ctx.beginPath()
      ctx.arc(e.x, e.y, rad * (e.spark ? 4.5 : 3.2), 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.fillStyle = `rgba(${rgb},${alpha.toFixed(3)})`
    ctx.beginPath()
    ctx.arc(e.x, e.y, rad, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalCompositeOperation = 'source-over'
}

function drawStatic(): void {
  if (!ctx) return
  ctx.clearRect(0, 0, W, H)
  ctx.globalCompositeOperation = 'lighter'
  drawGlow(0.5)
  ctx.globalCompositeOperation = 'source-over'
}

// ---------- loop control ----------
function tick(now: number): void {
  raf = requestAnimationFrame(tick)
  let dt = (now - last) / 1000
  last = now
  if (dt > 0.1 || dt < 0) dt = 1 / 60 // after a stall or a resume, never jump
  step(dt)
  draw()
}
function start(): void {
  if (running) return
  running = true
  last = performance.now()
  raf = requestAnimationFrame(tick)
}
function stop(): void {
  if (!running) return
  running = false
  cancelAnimationFrame(raf)
}
function sync(): void {
  if (onScreen && pageVisible && !reduced) start()
  else stop()
}

function resize(): void {
  const el = canvas.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  W = Math.max(1, rect.width)
  H = Math.max(1, rect.height)
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  el.width = Math.round(W * dpr)
  el.height = Math.round(H * dpr)
  ctx = el.getContext('2d')
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
  if (reduced) drawStatic()
  else if (!running) draw()
}

function onVisibility(): void {
  pageVisible = !document.hidden
  sync()
}
function onReducedChange(ev: MediaQueryListEvent): void {
  reduced = ev.matches
  if (reduced) {
    embers = []
    drawStatic()
  }
  sync()
}

/** Throw n extra sparks up at once (easter egg). */
function burst(n = 40): void {
  if (reduced || !ctx) return
  for (let i = 0; i < n && embers.length < HARD_CAP; i++) {
    spawn(Math.random() < 0.7, 1.15 + Math.random() * 0.35)
  }
}

defineExpose({ burst })

onMounted(() => {
  const el = canvas.value
  if (!el) return
  mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced = mq.matches
  mq.addEventListener('change', onReducedChange)
  pageVisible = !document.hidden
  document.addEventListener('visibilitychange', onVisibility)

  resize()
  ro = new ResizeObserver(() => resize())
  ro.observe(el)

  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) onScreen = entry.isIntersecting
        sync()
      },
      { rootMargin: '80px' },
    )
    io.observe(el)
  } else {
    onScreen = true
    sync()
  }
})

onBeforeUnmount(() => {
  stop()
  ro?.disconnect()
  io?.disconnect()
  mq?.removeEventListener('change', onReducedChange)
  document.removeEventListener('visibilitychange', onVisibility)
  ro = null
  io = null
  mq = null
  ctx = null
  embers = []
})
</script>

<template>
  <canvas ref="canvas" class="ember-field" aria-hidden="true" />
</template>

<style scoped>
.ember-field {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
}
</style>
