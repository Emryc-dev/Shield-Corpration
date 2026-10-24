import type { Category, ProductAvailability } from '../types';

export interface CatalogFilters {
  categories: string[];
  brands: string[];
  availability: ProductAvailability[];
  minPrice: string;
  maxPrice: string;
}

export const emptyCatalogFilters: CatalogFilters = { categories: [], brands: [], availability: [], minPrice: '', maxPrice: '' };
const availabilityLabels: Record<ProductAvailability, string> = { in_stock: 'Disponible', limited: 'Stock limité', preorder: 'Sur commande', out_of_stock: 'Indisponible' };

interface Props {
  categories: Category[];
  brands: string[];
  availability: ProductAvailability[];
  value: CatalogFilters;
  onChange: (value: CatalogFilters) => void;
}

export default function ProductFilters({ categories, brands, availability, value, onChange }: Props) {
  const toggle = <T extends string,>(items: T[], item: T): T[] => items.includes(item) ? items.filter((entry) => entry !== item) : [...items, item];
  const checkboxClass = 'h-4 w-4 shrink-0 accent-[#0b7c9e]';
  return (
    <div className='space-y-7 text-sm text-navy'>
      <fieldset><legend className='mb-3 font-semibold'>Catégories</legend><div className='space-y-1'>{categories.map((category) => <label key={category.id} className='flex min-h-10 cursor-pointer items-center gap-3'><input type='checkbox' checked={value.categories.includes(category.slug)} onChange={() => onChange({ ...value, categories: toggle(value.categories, category.slug) })} className={checkboxClass} />{category.name}</label>)}</div></fieldset>
      {brands.length > 0 && <fieldset><legend className='mb-3 font-semibold'>Marques</legend>{brands.map((brand) => <label key={brand} className='flex min-h-10 cursor-pointer items-center gap-3'><input type='checkbox' checked={value.brands.includes(brand)} onChange={() => onChange({ ...value, brands: toggle(value.brands, brand) })} className={checkboxClass} />{brand}</label>)}</fieldset>}
      <fieldset><legend className='mb-3 font-semibold'>Prix</legend><div className='grid grid-cols-2 gap-2'>{(['minPrice', 'maxPrice'] as const).map((key) => <label key={key} className='text-xs text-slate-text'>{key === 'minPrice' ? 'Minimum' : 'Maximum'}<input type='number' min='0' value={value[key]} onChange={(event) => onChange({ ...value, [key]: event.target.value })} className='mt-2 h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 text-sm text-navy focus-visible:outline-2 focus-visible:outline-[#0b7c9e]' /></label>)}</div>{value.minPrice && value.maxPrice && Number(value.minPrice) > Number(value.maxPrice) && <p role='alert' className='mt-2 text-xs text-red-700'>Le minimum doit être inférieur au maximum.</p>}</fieldset>
      {availability.length > 0 && <fieldset><legend className='mb-3 font-semibold'>Disponibilité</legend>{availability.map((item) => <label key={item} className='flex min-h-10 cursor-pointer items-center gap-3'><input type='checkbox' checked={value.availability.includes(item)} onChange={() => onChange({ ...value, availability: toggle(value.availability, item) })} className={checkboxClass} />{availabilityLabels[item]}</label>)}</fieldset>}
      <button type='button' onClick={() => onChange(emptyCatalogFilters)} className='min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 font-semibold hover:bg-slate-100'>Réinitialiser les filtres</button>
    </div>
  );
}
