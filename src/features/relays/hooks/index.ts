import { useStore } from '@/common/store';

export const useRelays = () => {
  const addRelayToStore = useStore((store) => store.addRelay);
  const relays = useStore((store) => store.relays);
  const removeRelay = useStore((store) => store.removeRelay);
  const subscription = useStore((store) => store.subscription);

  const addRelay = (relay: string) => {
    if (!relay.includes('wss://')) return; // reject non-wss:// relays
    if (relay.trim() == 'wss://') return; // reject empty relays

    addRelayToStore(relay);
  };

  return { addRelay, relays, removeRelay, subscription };
};
