import ProductCard from './ProductCard';
import type { Product } from '../types';

export default function ProductGrid({ products, onNavigate }: { products: Product[]; onNavigate: (path: string) => void }) {
  return <div className='grid grid-cols-3 gap-2 sm:gap-4 xl:grid-cols-4'>{products.map((product) => <ProductCard key={product.id} product={product} onNavigate={onNavigate} />)}</div>;
}
