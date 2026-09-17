import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { pageVariants } from './lib/animations'

export default function PageWrapper({ children }: {children: ReactNode}) {
    return (
        <motion.div
            variants={pageVariants}
            initial="hidden"
            animate="animate"
            exit="exit"
        >
            {children}
        </motion.div>
    )
}