export type PizzaItem = {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
}

export const MENU: PizzaItem[] = [
  { 
    id: 'margherita', 
    name: 'Margherita', 
    description: 'Sos pomidorowy, mozzarella, świeża bazylia, oliwa z oliwek', 
    price: '29 zł', 
    image: 'src/images/pizza/margherita.jpg' 
  },
  { 
    id: 'margherita-szynka', 
    name: 'Margherita z szynką', 
    description: 'Sos pomidorowy, mozzarella, szynka, oregano', 
    price: '32 zł', 
    image: 'src/images/pizza/margherita.jpg' 
  },
  { 
    id: 'prosciutto-funghi', 
    name: 'Prosciutto e funghi', 
    description: 'Sos pomidorowy, mozzarella, prosciutto, pieczarki', 
    price: '33 zł', 
    image: 'src/images/pizza/prosciutto.jpg' 
  },
  { 
    id: 'parma', 
    name: 'Parma', 
    description: 'Sos pomidorowy, mozzarella, prosciutto di Parma, rukola', 
    price: '45 zł', 
    image: 'src/images/pizza/prosciutto.jpg' 
  },
  { 
    id: 'quatro-formaggi', 
    name: 'Quatro formaggi', 
    description: 'Mozzarella, gorgonzola, parmezan, taleggio, sery', 
    price: '40 zł', 
    image: 'src/images/pizza/quattro.jpg' 
  },
  { 
    id: 'napoli', 
    name: 'Napoli', 
    description: 'Sos pomidorowy, mozzarella, kapary, anchois, oliwki', 
    price: '34 zł', 
    image: 'src/images/pizza/verde.jpg' 
  },
  { 
    id: 'diavola', 
    name: 'Diavola', 
    description: 'Sos pomidorowy, mozzarella, spicy salami, chili, oregano', 
    price: '44 zł', 
    image: 'src/images/pizza/diavola.jpg' 
  },
  { 
    id: 'tartufo', 
    name: 'Tartufo', 
    description: 'Sos śmietanowy, mozzarella, truflowy, pieczarki, parmezan', 
    price: '45 zł', 
    image: 'src/images/pizza/carbonara.jpg' 
  },
  { 
    id: 'wiejska', 
    name: 'Wiejska', 
    description: 'Sos pomidorowy, mozzarella, kiełbasa, boczek, cebula', 
    price: '41 zł', 
    image: 'src /images/pizza/carbonara.jpg' 
  },
]
