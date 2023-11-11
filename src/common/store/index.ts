import { Event, Filter, SimplePool, Sub } from 'nostr-tools';
import { create } from 'zustand';

type State = {
  pool: SimplePool;
  relays: string[];
  filters: Filter[];
  events: Event[];
  subscription: Sub | null;
  eose: boolean;
};

type Actions = {
  addRelay: (relay: string) => void;
  removeRelay: (relay: string) => void;
  newFilter: () => void;
  removeFilterAt: (index: number) => void;
  setFilterItemAt: (index: number, key: keyof Filter, value: Filter[keyof Filter]) => void;
  addEvent: (event: Event) => void;
  clearEvents: () => void;
  setSubscription: (sub: Sub) => void;
  clearSubscription: () => void;
  setEose: (eose: boolean) => void;
};

export const useStore = create<State & Actions>((set) => ({
  pool: new SimplePool(),
  relays: [],
  filters: [],
  events: [],
  subscription: null,
  eose: false,
  addRelay: (relay) => set((state) => ({ relays: [...state.relays, relay] })),
  removeRelay: (relay) => set((state) => ({ relays: state.relays.filter((r) => r != relay) })),
  newFilter: () => set((state) => ({ filters: [...state.filters, {}] })),
  removeFilterAt: (index) =>
    set((state) => ({ filters: state.filters.filter((_, i) => i != index) })),
  setFilterItemAt: (index, key, value) =>
    set((state) => {
      const filters = [...state.filters];

      if (value != undefined) {
        filters[index] = { ...filters[index], [key]: value };
      } else {
        delete filters[index][key];
      }

      return { filters };
    }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  clearEvents: () => set({ events: [] }),
  setSubscription: (sub) => set({ subscription: sub }),
  clearSubscription: () => set({ subscription: null }),
  setEose: (eose) => set({ eose }),
}));
