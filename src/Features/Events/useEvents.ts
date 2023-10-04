import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useLocalStore } from '@/store';

export const useEvents = () => {
  const eose = useLocalStore((state) => state.eose);
  const events = useLocalStore((state) => state.events);
  const subscription = useLocalStore((state) => state.subscription);
  const addEvent = useLocalStore((state) => state.addEvent);
  const setEose = useLocalStore((state) => state.setEose);

  useEffect(() => {
    if (!subscription) return;

    subscription.on('event', (event) => {
      addEvent(event);
    });

    subscription.on('eose', () => {
      setEose(true);

      toast('EOSE (End of subscription event)', { type: 'info' });
    });
  }, [subscription, addEvent, setEose]);

  return { events, eose };
};
