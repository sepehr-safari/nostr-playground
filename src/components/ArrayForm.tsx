import { PlusIcon } from '@heroicons/react/24/outline';
import { useCallback, useState } from 'react';

import { useLocalStore } from '@/store';

type Params = {
  title: string;
  placeholder: string;
  array: string[];
  onAdd: (value: string) => void;
  onRemove: (item: string) => void;
};

export const ArrayForm = ({ title, placeholder, array, onAdd, onRemove }: Params) => {
  const [input, setInput] = useState('');

  const subscription = useLocalStore((state) => state.subscription);

  const add = useCallback(() => {
    if (input.trim() === '') return;

    onAdd(input);
    setInput('');
  }, [input, setInput, onAdd]);

  const remove = useCallback(
    (item: string) => {
      onRemove(item);
    },
    [onRemove]
  );

  return (
    <div className="w-full flex flex-col gap-4 rounded-md border border-gray-300 p-4 duration-200 hover:border-indigo-600">
      {!!title && <h4 className="block text-sm font-medium text-gray-700">{title}</h4>}

      <div className="flex gap-2">
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          autoComplete="off"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          disabled={subscription != null}
        />

        <button
          onClick={add}
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={subscription != null}
        >
          <PlusIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
          {`Add`}
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {array.length == 0 ? (
          <span className="inline-flex items-center gap-x-2 rounded-md bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600">
            {`Nothing yet!`}
          </span>
        ) : (
          array.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-x-2 rounded-md bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600"
            >
              {item}
              <button
                onClick={() => remove(item)}
                type="button"
                className="group relative -mr-2 -my-1 p-1 rounded-full hover:bg-gray-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={subscription != null}
              >
                <span className="sr-only">{`Remove`}</span>
                <svg
                  viewBox="0 0 14 14"
                  className="h-4 w-4 stroke-gray-600/50 group-hover:stroke-gray-600/75"
                >
                  <path d="M4 4l6 6m0-6l-6 6" />
                </svg>
                <span className="absolute -inset-1" />
              </button>
            </span>
          ))
        )}
      </div>
    </div>
  );
};
