import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import { Button, RemoveButton } from '@/common/components';

type Props = {
  title: string;
  array: string[];
  onAdd: (value: string) => void;
  onRemove: (item: string) => void;
  defaultValue?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const ArrayInputWithTitle = ({
  title,
  placeholder,
  disabled,
  array,
  onAdd,
  onRemove,
  defaultValue = '',
}: Props) => {
  const [input, setInput] = useState(defaultValue);

  const add = () => {
    if (input.trim() == '') return; // reject empty inputs
    if (array.includes(input)) return; // reject duplicate inputs

    onAdd(input);
    setInput(defaultValue);
  };

  const remove = (item: string) => onRemove(item);

  return (
    <div className="w-full flex flex-col gap-4 rounded-md border border-gray-300 p-4 duration-200 hover:border-indigo-600">
      {!!title && <h4 className="block text-sm font-medium text-gray-700">{title}</h4>}

      <div className="flex gap-2">
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
        />

        <Button variant="primary" onClick={add} disabled={disabled}>
          <PlusIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
          {`Add`}
        </Button>
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

              <RemoveButton onClick={() => remove(item)} disabled={disabled} />
            </span>
          ))
        )}
      </div>
    </div>
  );
};
