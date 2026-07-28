import { motion } from 'framer-motion'
import { fadeUp, scaleIn, viewportOnce } from '../../lib/motion'

const variantsByType = {
  fadeUp,
  scaleIn,
}

export default function Reveal({
  children,
  className = '',
  as: Tag = motion.div,
  type = 'fadeUp',
  amount = 0.22,
}) {
  const Component = Tag
  const variants = variantsByType[type] || fadeUp

  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={{ ...viewportOnce, amount }}
      variants={variants}
      className={className}
    >
      {children}
    </Component>
  )
}
