import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useStore } from '@/common/store';

export const useEvents = () => {
  const eose = useStore((store) => store.eose);
  const events = useStore((store) => store.events);
  const subscription = useStore((store) => store.subscription);
  const addEvent = useStore((store) => store.addEvent);
  const setEose = useStore((store) => store.setEose);

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
