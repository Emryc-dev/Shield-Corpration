import { Boxes } from 'lucide-react';
import type { Category } from '../types';

export default function CategoryCard({ category, active, onClick }: { category: Category; active: boolean; onClick: () => void }) {
  return (
    <button type='button' aria-pressed={active} onClick={onClick} className={`flex min-h-20 flex-col items-start gap-3 rounded-2xl border p-3 text-left transition-colors sm:flex-row sm:items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b7c9e] ${active ? 'border-navy bg-navy text-white' : 'border-slate-200 bg-white text-navy hover:border-[#0b7c9e]'}`}>
      {category.image ? <img src={category.image} alt='' loading='lazy' className='h-12 w-12 shrink-0 rounded-xl object-cover' /> : <Boxes aria-hidden='true' className='h-6 w-6 shrink-0' />}
      <span className='min-w-0 break-words'><span className='block text-sm font-semibold'>{category.name}</span>{category.productCount !== undefined && <span className={`mt-1 block text-xs ${active ? 'text-white/70' : 'text-slate-text'}`}>{category.productCount} produits</span>}</span>
    </button>
  );
}
