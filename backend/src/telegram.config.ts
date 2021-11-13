export interface CommandFields {
  command: string;
  description: string;
}

export const commands = [
  {
    command: '/new_order',
    description: 'order something right now 📞',
  },
  {
    command: '/orders',
    description: 'all confirmed orders (most recent first) 🧾',
  },
  {
    command: '/order_status',
    description: 'was your order delivered yet ❓',
  },
  {
    command: '/deliver_order',
    description: 'admin confirms that order was delivered ✅',
  },
  {
    command: '/new_catalog',
    description: 'admin adds new catalog to already existing ones 📨',
  },
  {
    command: '/new_stuff',
    description: 'admin adds new stuff to already existing catalogs 📝',
  },
] as CommandFields[];
