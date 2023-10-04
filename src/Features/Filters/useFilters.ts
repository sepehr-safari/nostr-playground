import { useLocalStore } from '@/store';

export const useFilters = () => {
  const { filters, newFilter, removeFilterAt, setFilterItemAt, subscription } = useLocalStore();

  return {
    filters,
    newFilter,
    removeFilterAt,
    setFilterItemAt,
    subscription,
  };
};
