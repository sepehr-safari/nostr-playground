import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { useStore } from '@/common/store';

export const useControls = () => {
  const pool = useStore((store) => store.pool);
  const events = useStore((store) => store.events);
  const filters = useStore((store) => store.filters);
  const relays = useStore((store) => store.relays);
  const subscription = useStore((store) => store.subscription);
  const clearEvents = useStore((store) => store.clearEvents);
  const setEose = useStore((store) => store.setEose);
  const setSubscription = useStore((store) => store.setSubscription);
  const clearSubscription = useStore((store) => store.clearSubscription);

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
