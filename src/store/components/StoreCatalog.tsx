import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import StoreSearchBar from './StoreSearchBar';
import CategoryCard from './CategoryCard';
import ProductFilters, { emptyCatalogFilters, type CatalogFilters } from './ProductFilters';
import ProductGrid from './ProductGrid';
import { EmptyState, StoreSkeletonGrid } from './StoreStates';
import type { Category, Product } from '../types';

interface StoreCatalogProps {
  categories: Category[];
  products: Product[];
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  onNavigate: (path: string) => void;
}

const pageSize = 12;

export default function StoreCatalog({ categories, products, loading = false, error, onRetry, onNavigate }: StoreCatalogProps) {
  const [search, setSearch] = React.useState('');
  const [filters, setFilters] = React.useState<CatalogFilters>(emptyCatalogFilters);
  const [sort, setSort] = React.useState('featured');
  const [page, setPage] = React.useState(1);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const brands = React.useMemo(() => [...new Set(products.flatMap((product) => product.brand ? [product.brand] : []))].sort(), [products]);
  const availability = React.useMemo(() => [...new Set(products.map((product) => product.availability))], [products]);

  const filteredProducts = React.useMemo(() => {
    const term = search.trim().toLocaleLowerCase('fr');
    const minimum = filters.minPrice === '' ? undefined : Number(filters.minPrice);
    const maximum = filters.maxPrice === '' ? undefined : Number(filters.maxPrice);
    const result = products.filter((product) => {
      const text = [product.name, product.brand, product.shortDescription, product.category.name].filter(Boolean).join(' ').toLocaleLowerCase('fr');
      const amount = product.price?.amount;
      return (!term || text.includes(term)) &&
        (!filters.categories.length || filters.categories.includes(product.category.slug)) &&
        (!filters.brands.length || (!!product.brand && filters.brands.includes(product.brand))) &&
        (!filters.availability.length || filters.availability.includes(product.availability)) &&
        (minimum === undefined || (amount !== undefined && amount >= minimum)) &&
        (maximum === undefined || (amount !== undefined && amount <= maximum));
    });
    return result.sort((a, b) => {
      if (sort.startsWith('price')) {
        if (!a.price) return b.price ? 1 : 0;
        if (!b.price) return -1;
        return sort === 'price_asc' ? a.price.amount - b.price.amount : b.price.amount - a.price.amount;
      }
      if (sort === 'newest') return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
      return Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured));
    });
  }, [products, search, filters, sort]);

  const changeFilters = (value: CatalogFilters) => { setFilters(value); setPage(1); };
  const reset = () => { changeFilters(emptyCatalogFilters); setSearch(''); setSort('featured'); };
  const pages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(page, pages);
  const visibleProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const filterProps = { categories, brands, availability, value: filters, onChange: changeFilters };
  const filterCount = filters.categories.length + filters.brands.length + filters.availability.length + Number(!!filters.minPrice) + Number(!!filters.maxPrice);

  return (
    <div className='mx-auto max-w-[1400px]'>
      <StoreSearchBar value={search} onChange={(value) => { setSearch(value); setPage(1); }} />
      <section aria-labelledby='store-categories-title' className='mb-10'>
        <h2 id='store-categories-title' className='mb-4 font-display text-xl font-semibold text-navy'>Parcourir les catégories</h2>
        <div className='grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6'>{categories.map((category) => <CategoryCard key={category.id} category={category} active={filters.categories.includes(category.slug)} onClick={() => changeFilters({ ...filters, categories: filters.categories.includes(category.slug) ? filters.categories.filter((slug) => slug !== category.slug) : [...filters.categories, category.slug] })} />)}</div>
        {!loading && categories.length === 0 && <p className='text-sm text-slate-text'>Les catégories seront disponibles avec le catalogue.</p>}
      </section>
      <section id='store-catalog' className='scroll-mt-28' aria-labelledby='store-catalog-title'>
        <div className='mb-6 flex flex-wrap items-end justify-between gap-4'>
          <div><h2 id='store-catalog-title' className='font-display text-2xl font-semibold text-navy md:text-3xl'>Le catalogue</h2><p role='status' className='mt-2 text-sm text-slate-text'>{loading ? 'Chargement du catalogue...' : `${filteredProducts.length} produit${filteredProducts.length > 1 ? 's' : ''}`}</p></div>
          <div className='flex flex-wrap items-center gap-3'>
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild><Button variant='outline' className='lg:hidden'><SlidersHorizontal data-icon='inline-start' />Filtrer{filterCount > 0 && ` (${filterCount})`}</Button></SheetTrigger>
              <SheetContent side='left' className='w-[min(90vw,360px)] overflow-y-auto'>
                <SheetHeader><SheetTitle>Filtrer les produits</SheetTitle><SheetDescription>Affinez votre sélection selon vos besoins.</SheetDescription></SheetHeader>
                <div className='px-5 pb-5'><ProductFilters {...filterProps} /><Button className='mt-5 w-full' onClick={() => setFiltersOpen(false)}>Voir {filteredProducts.length} produits</Button></div>
              </SheetContent>
            </Sheet>
            <label className='flex items-center gap-2 text-sm text-slate-text'>Trier par<select value={sort} onChange={(event) => { setSort(event.target.value); setPage(1); }} className='h-11 max-w-[170px] rounded-xl border border-slate-200 bg-white px-3 text-sm text-navy focus-visible:outline-2 focus-visible:outline-[#0b7c9e]'><option value='featured'>Notre sélection</option><option value='newest'>Nouveautés</option><option value='price_asc'>Prix croissant</option><option value='price_desc'>Prix décroissant</option></select></label>
          </div>
        </div>
        <div className='grid items-start gap-7 lg:grid-cols-[210px_minmax(0,1fr)] xl:grid-cols-[230px_minmax(0,1fr)]'>
          <aside aria-label='Filtres du catalogue' className='sticky top-28 hidden rounded-2xl border border-slate-200 bg-white p-5 lg:block'><ProductFilters {...filterProps} /></aside>
          <div className='min-w-0'>
            {loading ? <StoreSkeletonGrid /> : error ? <EmptyState title='Impossible de charger les produits.' text={error} actionLabel='Réessayer' onAction={onRetry ?? reset} /> : !filteredProducts.length ? <EmptyState title={products.length ? 'Aucun produit ne correspond à votre recherche.' : 'Cette sélection ne contient encore aucun produit.'} text='Explorez les catégories ou modifiez votre recherche.' actionLabel={products.length ? 'Voir tous les produits' : 'Demander conseil'} onAction={products.length ? reset : () => onNavigate('/#contact')} /> : <ProductGrid products={visibleProducts} onNavigate={onNavigate} />}
            {pages > 1 && <nav aria-label='Pagination du catalogue' className='mt-7 flex items-center justify-center gap-4'><Button variant='outline' disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Précédent</Button><span className='text-sm text-slate-text'>{currentPage} / {pages}</span><Button variant='outline' disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)}>Suivant</Button></nav>}
          </div>
        </div>
      </section>
    </div>
  );
}
