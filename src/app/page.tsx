import { getItems } from '@/actions/items'
import GroceryList from '@/components/GroceryList'
import AddItem from '@/components/AddItem'

export default async function Home() {
  const items = await getItems()

  return (
    <div className="relative z-0">
      <header className="mb-6 pt-2 select-none">
        <h1 className="text-3xl font-extrabold bg-gradient-to-br from-brand-600 to-brand-400 bg-clip-text text-transparent dark:from-brand-300 dark:to-brand-100">
          Grocery<span className="text-brand-500">List</span>
        </h1>
        <p className="text-sm text-gray-400 font-medium">Synced & Shared</p>
      </header>

      <GroceryList initialItems={items} />

      <AddItem />
    </div>
  )
}
