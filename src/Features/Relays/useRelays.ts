import { useLocalStore } from '@/store';

export const useRelays = () => {
  const { addRelay, relays, removeRelay } = useLocalStore();

  return { addRelay, relays, removeRelay };
};
