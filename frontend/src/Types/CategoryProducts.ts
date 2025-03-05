// data.ts

interface Image {
  id: number;
  image: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  images: Image[];
  type: string;
  category: number;
  image: string;
}

export interface Category {
  id: number;
  name: string;
  products: Product[];
}

