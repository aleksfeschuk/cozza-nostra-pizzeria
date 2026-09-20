import type { Variants } from "motion"

export const ease = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32},
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease},
    },
}

export const slideLeft: Variants = {
    hidden: { opacity: 0, x: -40},
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.65, ease},
    },
}

export const slideRight: Variants = {
    hidden: { opacity: 0, x: -40},
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.65, ease},
    },
}

export const stagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        }
    },
}

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.97},
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease},
    },
}


export const scalePop: Variants = {
    hidden: { opacity: 0, scale: 0.9},
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease},
    },
}

export const pageVariants: Variants = {
    initial: { opacity: 0, y: 16},
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease},
    },
    exit: {
        opacity: 0,
        y: -8,
        transition: { duration: 0.25, ease},
    },
}

export const drawerVariants: Variants = {
    hidden: { x: '100%', opacity: 0.5},
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.32, ease},
    },
    exit: {
        x: '100%',
        opacity: 0.5,
        transition: { duration: 0.22, ease},
    },
}

export const overlayVariants: Variants = {
    hidden: { opacity: 0},
    visible: {
        opacity: 1,
        transition: { duration: 0.2},
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2},
    }
}

export const mobileMenuPanel: Variants = {
    hidden: {x: '100%', opacity: 0},
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.42,
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.06,
            delayChildren: 0.22,
        },
    },
    exit: {
        x: '100%',
        opacity: 0,
        transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
    },
}

export const mobileMenuLink: Variants = {
    hidden: { opacity: 0, x: 40},
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', stiffness: 300, damping: 28}
    },
}

export const cardHover = {
    y: -10,
    scale: 1.02,
    boxShadow: '0 24 48px rgba(0,0,0,0.14), 0 8px 16px rgba(0,0,0,0.08)',
    transition: { type: 'spring', stiffness: 400, damping: 22},
}

export const cardTap = {
    scale: 0.975,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

export const buttonTap = {
    scale: 0.95,
    y: 2,
    transition: { type: 'spring', stiffness: 500, damping: 25},
}

export const badgePop = {
    initial: { scale: 0, opacity: 0},
    animate: { scale: 1, opacity: 1},
    transition: { type: 'spring', stiffness: 500, damping: 20},
}