import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BagItem {
  key: string;
  name: string;
  price: number;
  qty: number;
  img: string;
  meta: string;
}

interface BagState {
  items: BagItem[];
  drawerOpen: boolean;
  filter: { type: string; intention: string };
  add: (item: Omit<BagItem, 'qty'>) => void;
  remove: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clear: () => void;
  setDrawer: (open: boolean) => void;
  setFilter: (filter: Partial<BagState['filter']>) => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useBag = create<BagState>()(
  persist(
    (set, get) => ({
      items: [],
      drawerOpen: false,
      filter: { type: 'Todas', intention: 'Todas' },

      add: (item) => {
        const items = get().items;
        const existing = items.find(i => i.key === item.key);
        if (existing) {
          set({
            items: items.map(i =>
              i.key === item.key ? { ...i, qty: i.qty + 1 } : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, qty: 1 }] });
        }
      },

      remove: (key) => {
        set({ items: get().items.filter(i => i.key !== key) });
      },

      updateQty: (key, qty) => {
        if (qty <= 0) {
          get().remove(key);
          return;
        }
        set({
          items: get().items.map(i =>
            i.key === key ? { ...i, qty } : i
          ),
        });
      },

      clear: () => set({ items: [] }),

      setDrawer: (open) => set({ drawerOpen: open }),

      setFilter: (filter) =>
        set({ filter: { ...get().filter, ...filter } }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.qty, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    {
      name: 'cqpev-sacola',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
