
import quattroImg from '../../images/pizza/quattro.jpg'
import carbonaraImg from '../../images/pizza/carbonara.jpg'
import prosciuttoImg from '../../images/pizza/prosciutto.jpg'
import margheritaImg from '../../images/pizza/margherita.jpg'
import verdeImg from '../../images/pizza/verde.jpg'
import diavolaImg from '../../images/pizza/diavola.jpg'

export const SIZE_MULTIPLIERS = {
  S: -4,
  M: 0,
  L: 6,
} as const

export type PizzaSize = keyof typeof SIZE_MULTIPLIERS


export type PizzaItem = {
    id: string;
    name: string;
    description: string;
    priceBase: number;
    price: string;
    image: string;
    popular?: boolean;
}


export function priceForSize(base: number, size: PizzaSize): number {
  return base + SIZE_MULTIPLIERS[size]
}

export const SIZES: PizzaSize[] = ['S', 'M', 'L']
export const SIZE_CM: Record<PizzaSize, string> = { S: '25cm', M: '30cm', L: '40cm' }

export const MENU: PizzaItem[] = [
  { 
    id: 'quatro-formaggi', 
    name: 'Quatro formaggi', 
    description: 'Biały sos, mozzarella, gorgonzola, Grana Padano, provolone.',
    price: '40 zł', 
    priceBase: 40,
    image: quattroImg ,
    popular: true
  },
  { 
    id: 'wiejska', 
    name: 'Wiejska', 
    description: 'Sos biały, pieczarki, pancetta Napoli, cebula, ogórek kiszony.',
    price: '41 zł', 
    priceBase: 41,
    image: carbonaraImg,
    popular: true
  },
  { 
    id: 'parma', 
    name: 'Parma', 
    description: 'Sos pomidorowy, mozzarella, szynka parmeńska, rukola, cherry, Grana Padano.',
    price: '45 zł',
    priceBase: 45, 
    image: prosciuttoImg,
    popular: true
  },
  { 
    id: 'margherita', 
    name: 'Margherita', 
    description: 'Sos pomidorowy, mozzarella, bazylia.',
    price: '29 zł',
    priceBase: 29,
    image: margheritaImg, 
  },
  { 
    id: 'margherita-szynka', 
    name: 'Margherita z szynką', 
    description: 'Sos pomidorowy, mozzarella, cotto.',
    price: '32 zł', 
    priceBase: 32,
    image: margheritaImg 
  },
  { 
    id: 'prosciutto-funghi', 
    name: 'Prosciutto e funghi', 
    description: 'Sos pomidorowy, mozzarella, pieczarki, cotto.',
    price: '33 zł', 
    priceBase: 33,
    image: prosciuttoImg 
  },
  { 
    id: 'napoli', 
    name: 'Napoli', 
    description: 'Sos pomidorowy, mozzarella, kapary, anchois, oliwki', 
    price: '34 zł', 
    priceBase: 34,
    image: verdeImg 
  },
  { 
    id: 'diavola', 
    name: 'Diavola', 
    description: 'Sos pomidorowy, mozzarella, spicy salami, chili, oregano', 
    price: '44 zł',
    priceBase: 44, 
    image: diavolaImg 
  },
  { 
    id: 'tartufo', 
    name: 'Tartufo', 
    description: 'Sos śmietanowy, mozzarella, truflowy, pieczarki, parmezan', 
    price: '45 zł',
    priceBase: 45, 
    image: carbonaraImg 
  },
]

export const POPULAR = MENU.filter(p => p.popular)
