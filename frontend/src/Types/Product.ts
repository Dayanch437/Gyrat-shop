export interface Product {
  id: number;
  type: string;
  category: string;
  image: string;
  price: number;
  description: string;
  images?: Images[];
  name: string;
}

interface Images {
  id: number;
  image: string;
}

