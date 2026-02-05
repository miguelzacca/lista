'use client'

import { useState, useRef } from 'react'
import { Plus, Loader2 } from 'lucide-react'
import { addItem } from '@/actions/items'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function AddItem() {
  const [isPending, setIsPending] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    const name = formData.get('name') as string
    if (!name?.trim()) return

    setIsPending(true)
    try {
      await addItem(name, formData.get('quantity') as string)
      formRef.current?.reset()
    } finally {
      setIsPending(false)
    }
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-4 right-4 max-w-md mx-auto z-10"
    >
      <form
        ref={formRef}
        action={handleSubmit}
        className="flex gap-2 p-2 bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-xl shadow-brand-500/10"
      >
        <input
          name="name"
          type="text"
          placeholder="Add item (e.g. Milk)"
          className="flex-1 px-4 py-3 bg-transparent outline-none text-base placeholder:text-gray-400"
          autoComplete="off"
          required
        />
        <input
          name="quantity"
          type="text"
          placeholder="Qty"
          className="w-16 px-2 py-3 bg-transparent outline-none text-base placeholder:text-gray-400 text-center border-l border-gray-200 dark:border-gray-800"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            "p-3 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100",
            isPending && "animate-pulse"
          )}
        >
          {isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : <Plus className="w-6 h-6" />}
        </button>
      </form>
    </motion.div>
  )
}
