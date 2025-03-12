import { ReactNode } from 'react'
import { Header } from '@/components/header'
import { CartProvider } from '@/contexts/card-context'

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    /* Criamos em tailwind.config.ts o tailwind grid rows app */
    <CartProvider>
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-app gap-5 px-8 py-8">
        <Header />
        {/* children dentro do CartProvider poderá ser server component */}
        {children}
      </div>
    </CartProvider>
  )
}
