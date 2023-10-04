import { Filter } from 'nostr-tools';
import { useMemo } from 'react';

import { useLocalStore } from '@/store';

type Params = {
  filterIndex: number;
  filterKey: keyof Filter;
  placeholder: string;
};

export const StringForm = ({ filterIndex, filterKey, placeholder }: Params) => {
  const CapitalizedFilterKey = useMemo(
    () => filterKey.charAt(0).toUpperCase() + filterKey.slice(1),
    [filterKey]
  );

  const subscription = useLocalStore((state) => state.subscription);
  const filters = useLocalStore((state) => state.filters);
  const setFilterItemAt = useLocalStore((state) => state.setFilterItemAt);

  return (
    <div className="rounded-md border border-gray-300 p-4 duration-200 hover:border-indigo-600">
      <h4 className="block text-sm font-medium text-gray-700">{CapitalizedFilterKey}</h4>

      <input
        name={`filter-until-${filterIndex}`}
        className="mt-4 block w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={subscription != null}
        autoComplete="off"
        placeholder={placeholder}
        value={filters[filterIndex][filterKey]?.toString() ?? ''}
        onChange={(e) => {
          if (e.target.value === '') {
            setFilterItemAt(filterIndex, filterKey, undefined);
          } else {
            setFilterItemAt(filterIndex, filterKey, e.target.value);
          }
        }}
      />
    </div>
  );
};
