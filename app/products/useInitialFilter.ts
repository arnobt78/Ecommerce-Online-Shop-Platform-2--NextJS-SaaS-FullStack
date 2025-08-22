import { useSearchParams } from "next/navigation";

export function useInitialFilter(): 'brands' | 'flavors' | 'strength' | 'sort' | undefined {
  const params = useSearchParams();
  const filter = params?.get('filter');
  if (filter === 'brands' || filter === 'flavors' || filter === 'strength' || filter === 'sort') {
    return filter as 'brands' | 'flavors' | 'strength' | 'sort';
  }
  return undefined;
}
