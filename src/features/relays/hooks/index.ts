import { useStore } from '@/common/store';

export const useRelays = () => {
  const addRelay = useStore((store) => store.addRelay);
  const relays = useStore((store) => store.relays);
  const removeRelay = useStore((store) => store.removeRelay);
  const subscription = useStore((store) => store.subscription);

  return { addRelay, relays, removeRelay, subscription };
};
