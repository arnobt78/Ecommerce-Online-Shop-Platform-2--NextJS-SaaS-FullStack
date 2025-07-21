import { useSearchParams } from "next/navigation";

export function useInitialFilter(): 'brands' | 'flavors' | 'strength' | undefined {
  const params = useSearchParams();
  const filter = params?.get('filter');
  if (filter === 'brands' || filter === 'flavors' || filter === 'strength') {
    return filter;
  }
  return undefined;
}
