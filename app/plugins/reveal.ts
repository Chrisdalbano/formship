import type { Directive } from 'vue'

/**
 * v-reveal: fades an element up the first time it scrolls into view.
 * Anything already on screen at mount is left alone, and the hidden state is only
 * ever added by client code, so there is no flash and no way to get stuck hidden.
 * Opacity and transform only, so it cannot shift layout.
 */
const observers = new WeakMap<HTMLElement, IntersectionObserver>()

const reveal: Directive<HTMLElement, number | undefined> = {
  getSSRProps: () => ({}),
  mounted(el, binding) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return

    if (binding.value) el.style.transitionDelay = `${binding.value}ms`
    el.classList.add('reveal', 'reveal--pre')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        el.classList.remove('reveal--pre')
        observer.disconnect()
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    observers.set(el, observer)
  },
  unmounted(el) {
    observers.get(el)?.disconnect()
    observers.delete(el)
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', reveal)
})
