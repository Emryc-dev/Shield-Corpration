import { Search, X } from 'lucide-react';

export default function StoreSearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div role='search' className='mx-auto my-8 max-w-3xl'>
      <label htmlFor='store-search' className='sr-only'>Rechercher un produit, une marque ou une catégorie</label>
      <div className='relative'>
        <Search aria-hidden='true' className='pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-text' />
        <input id='store-search' type='search' value={value} onChange={(event) => onChange(event.target.value)} placeholder='Rechercher un produit, une marque ou une catégorie...' className='h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-14 text-sm text-navy shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-[#0b7c9e]' />
        {value && <button type='button' aria-label='Effacer la recherche' onClick={() => onChange('')} className='absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-slate-text hover:bg-slate-100'><X className='h-4 w-4' /></button>}
      </div>
    </div>
  );
}
