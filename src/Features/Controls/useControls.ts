import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { useLocalStore } from '@/store';

export const useControls = () => {
  const pool = useLocalStore((state) => state.pool);
  const events = useLocalStore((state) => state.events);
  const filters = useLocalStore((state) => state.filters);
  const relays = useLocalStore((state) => state.relays);
  const subscription = useLocalStore((state) => state.subscription);
  const clearEvents = useLocalStore((state) => state.clearEvents);
  const setEose = useLocalStore((state) => state.setEose);
  const setSubscription = useLocalStore((state) => state.setSubscription);
  const clearSubscription = useLocalStore((state) => state.clearSubscription);

  const subscribe = useCallback(() => {
    if (filters.length > 0 && relays.length > 0) {
      setSubscription(pool.sub(relays, filters));

      toast('Subscription started', { type: 'success' });
    }
  }, [relays, filters, setSubscription]);

  const unsubscribe = useCallback(() => {
    if (subscription) {
      subscription.unsub();
      clearSubscription();
      setEose(false);

      toast('Subscription stoped', { type: 'success' });
    }
  }, [subscription, clearSubscription, setEose]);

  return {
    events,
    filters,
    relays,
    subscription,
    clearEvents,
    setEose,
    subscribe,
    unsubscribe,
  };
};
