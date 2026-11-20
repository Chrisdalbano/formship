/**
 * Pointer tilt for a card or a picture. Writes --tx and --ty (each -1 to 1, the pointer's
 * position across the element) so CSS decides what the tilt looks like. Mouse only:
 * touch and pen get nothing.
 */
export function useTilt() {
  let frame = 0

  function onMove(e: PointerEvent) {
    if (e.pointerType !== 'mouse') return
    const el = e.currentTarget as HTMLElement
    const { clientX, clientY } = e
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--tx', (((clientX - r.left) / r.width) * 2 - 1).toFixed(3))
      el.style.setProperty('--ty', (((clientY - r.top) / r.height) * 2 - 1).toFixed(3))
    })
  }

  function onLeave(e: PointerEvent) {
    cancelAnimationFrame(frame)
    const el = e.currentTarget as HTMLElement
    el.style.setProperty('--tx', '0')
    el.style.setProperty('--ty', '0')
  }

  return { onMove, onLeave }
}
