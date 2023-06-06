import { Product } from './product.model';
export interface Category{
    categoryId: number;
    name: string;
    products: Product[];
}