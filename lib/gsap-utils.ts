'use client'
// lib/gsap-utils.ts — Reusable GSAP animation helpers

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register once at module level (safe to call multiple times)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/** Fade + slide up on scroll enter */
export function revealOnScroll(
  targets: string | Element | Element[],
  options: {
    y?: number
    x?: number
    duration?: number
    stagger?: number
    delay?: number
    start?: string
  } = {}
) {
  const {
    y = 40,
    x = 0,
    duration = 0.7,
    stagger = 0.12,
    delay = 0,
    start = 'top 80%',
  } = options

  return gsap.fromTo(
    targets,
    { y, x, opacity: 0 },
    {
      y: 0,
      x: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: typeof targets === 'string' ? targets : undefined,
        start,
        once: true,
      },
    }
  )
}

/** 3D perspective flip entrance — USP cards */
export function flipInOnScroll(
  targets: string | Element | Element[],
  triggerEl?: Element | string
) {
  return gsap.fromTo(
    targets,
    { rotateX: 15, y: 50, opacity: 0, transformPerspective: 800 },
    {
      rotateX: 0,
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: triggerEl || (typeof targets === 'string' ? targets : undefined),
        start: 'top 75%',
        once: true,
      },
    }
  )
}

/** Animated counter */
export function animateCounter(
  el: Element,
  target: number,
  duration = 1.8,
  triggerEl?: Element
) {
  const obj = { val: 0 }
  return gsap.to(obj, {
    val: target,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: triggerEl || el,
      start: 'top 85%',
      once: true,
    },
    onUpdate() {
      el.textContent = Math.round(obj.val).toString()
    },
  })
}

/** Timeline line draw effect */
export function drawTimeline(lineEl: Element) {
  return gsap.fromTo(
    lineEl,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: lineEl,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 1.5,
      },
    }
  )
}

/** Stagger tags in */
export function staggerTagsIn(container: Element) {
  const tags = container.querySelectorAll('.tag')
  return gsap.fromTo(
    tags,
    { scale: 0.85, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      stagger: 0.04,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        once: true,
      },
    }
  )
}
