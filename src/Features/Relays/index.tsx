import { ArrayForm } from '@/components';

import { useRelays } from './useRelays';

export const Relays = () => {
  const { addRelay, relays, removeRelay } = useRelays();

  return (
    <div className="flex flex-col gap-2 p-4 rounded-xl shadow-lg border border-gray-300 bg-gray-50 duration-200 hover:border-indigo-600">
      <h3 className="block text-md font-semibold text-gray-900">{`Relays`}</h3>

      <ArrayForm
        title=""
        placeholder="wss://nos.lol"
        array={relays}
        onAdd={addRelay}
        onRemove={removeRelay}
      />
    </div>
  );
};
