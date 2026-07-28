export const easePremium = [0.22, 1, 0.36, 1]

export const viewportOnce = { once: true, amount: 0.22 }

export const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: easePremium },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: easePremium },
  },
}

export const staggerWrap = (delayChildren = 0.08, staggerChildren = 0.08) => ({
  hidden: {},
  show: {
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
})
