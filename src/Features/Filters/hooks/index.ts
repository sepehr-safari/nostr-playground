import { useStore } from '@/common/store';

export const useFilters = () => {
  const filters = useStore((store) => store.filters);
  const newFilter = useStore((store) => store.newFilter);
  const removeFilterAt = useStore((store) => store.removeFilterAt);
  const setFilterItemAt = useStore((store) => store.setFilterItemAt);
  const subscription = useStore((store) => store.subscription);

  return {
    filters,
    newFilter,
    removeFilterAt,
    setFilterItemAt,
    subscription,
  };
};
