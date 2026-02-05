'use client'

import { useOptimistic } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Trash2, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toggleItem, deleteItem } from '@/actions/items'

type Item = {
  id: string
  name: string
  quantity: string | null
  isChecked: boolean
}

export default function GroceryList({ initialItems }: { initialItems: Item[] }) {
  const [items, addOptimisticItem] = useOptimistic(
    initialItems,
    (state, newItem: { id: string; type: 'toggle' | 'delete' | 'add'; payload?: any }) => {
      if (newItem.type === 'toggle') {
        return state.map((item) =>
          item.id === newItem.id ? { ...item, isChecked: !item.isChecked } : item
        )
      }
      if (newItem.type === 'delete') {
        return state.filter((item) => item.id !== newItem.id)
      }
      return state
    }
  )

  const activeItems = items.filter((i) => !i.isChecked)
  const checkedItems = items.filter((i) => i.isChecked)

  return (
    <div className="space-y-8 pb-32">
      <Section title="To Buy" items={activeItems} addOptimisticItem={addOptimisticItem} />
      {checkedItems.length > 0 && (
        <Section title="Done" items={checkedItems} isCheckedList addOptimisticItem={addOptimisticItem} />
      )}

      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-4">
          <div className="p-4 bg-gray-100 dark:bg-zinc-800 rounded-full">
            <ShoppingCart className="w-8 h-8 opacity-50" />
          </div>
          <p>Your list is empty</p>
        </div>
      )}
    </div>
  )
}

function Section({
  title,
  items,
  isCheckedList = false,
  addOptimisticItem
}: {
  title: string
  items: Item[]
  isCheckedList?: boolean
  addOptimisticItem: (action: any) => void
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold px-1 opacity-80">{title} ({items.length})</h2>
      <AnimatePresence mode='popLayout'>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, height: 0 }}
            className={cn(
              "group flex items-center gap-3 p-4 rounded-2xl border transition-all glass-card",
              isCheckedList
                ? "bg-gray-50/50 dark:bg-zinc-900/50 border-gray-100 dark:border-zinc-800"
                : "bg-white/60 dark:bg-zinc-800/60 border-white/40 dark:border-white/5 active:scale-[0.99] active:shadow-sm"
            )}
          >
            <button
              onClick={async () => {
                addOptimisticItem({ id: item.id, type: 'toggle' })
                await toggleItem(item.id, !item.isChecked)
              }}
              className={cn(
                "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                item.isChecked
                  ? "bg-brand-500 border-brand-500 text-white"
                  : "border-gray-300 dark:border-gray-600 hover:border-brand-400"
              )}
            >
              {item.isChecked && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
            </button>

            <div className={cn("flex-1 min-w-0 flex flex-col justify-center", item.isChecked && "opacity-50 line-through grayscale")}>
              <span className="font-medium truncate text-base leading-snug">{item.name}</span>
              {item.quantity && <span className="text-xs text-gray-500 dark:text-gray-400">{item.quantity}</span>}
            </div>

            {!isCheckedList && (
              <button
                onClick={async () => {
                  addOptimisticItem({ id: item.id, type: 'delete' })
                  await deleteItem(item.id)
                }}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            {isCheckedList && (
              <button
                onClick={async () => {
                  addOptimisticItem({ id: item.id, type: 'delete' })
                  await deleteItem(item.id)
                }}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
