'use client'

import { useState, useMemo } from 'react'
// import { Search } from 'lucide-react'
import ProductCard from '@/components/product-card'
import CopyNotification from '@/components/copy-notification'
import { BadgesBlock } from '@/components/bafges-block' // проверь: не опечатка ли?
import { BADGES, PRODUCTS } from '@/constant'
import { UseFilterItems } from '@/hooks/use-filter-items'


export default function Home() {
	const [searchQuery, setSearchQuery] = useState('')
	const [copiedSku, setCopiedSku] = useState<string | null>(null)
	const [badges, setBadges] = useState(BADGES)

	// переключение чекбокса у бэйджа
	const toggle = (category: string) => {
		setBadges(prev =>
			prev.map(b =>
				b.category === category ? { ...b, checked: !b.checked } : b
			)
		)
	}

	// Set выбранных категорий — вычисляем из состояния бэйджей
	const { filteredProducts } = UseFilterItems(searchQuery, PRODUCTS, badges)

	const handleCopySku = (sku: string) => {
		navigator.clipboard.writeText(sku)
		setCopiedSku(sku)
		setTimeout(() => setCopiedSku(null), 2000)
	}

	return (
		<main className='flex flex-col h-screen w-screen bg-background text-foreground overflow-hidden'>
			{/* Header */}
			<header className='flex-shrink-0 border-b border-border px-4 py-4 bg-card'>
				<div className='flex items-center gap-2'>
					<h1 className='text-xl font-bold text-primary'>TK "Marsho"</h1>
				</div>
				<p className='text-xs text-muted-foreground mt-1'>Доверяй качеству</p>
			</header>

			{/* Search + Badges */}
			<div className='flex-shrink-0 px-4 py-3 bg-secondary border-b border-border'>
				<div className='relative'>
					<input
						maxLength={40}
						enterKeyHint='enter'
						type='text'
						placeholder='Search products...'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						className='w-full pl-10 pr-4 py-2 rounded-lg bg-background text-foreground border border-input focus:outline-none focus:ring-2 focus:ring-primary'
					/>
				</div>
				<BadgesBlock badges={badges} toggle={toggle} />
			</div>

			{/* Products Grid */}
			<div className='flex-1 overflow-y-auto px-3 py-3'>
				{filteredProducts.length > 0 ? (
					<div className='grid grid-cols-2 gap-2 pb-4'>
						{filteredProducts.map(product => (
							<ProductCard
								key={product.id}
								product={product}
								onCopySku={handleCopySku}
								isCopied={copiedSku === product.sku}
							/>
						))}
					</div>
				) : (
					<div className='flex flex-col items-center justify-center h-full text-center py-8'>
						<div className='text-4xl mb-3'>🔍</div>
						<p className='text-foreground font-medium'>No products found</p>
						<p className='text-sm text-muted-foreground mt-1'>
							Try different search terms
						</p>
					</div>
				)}
			</div>

			{/* Copy Notification */}
			{copiedSku && <CopyNotification sku={copiedSku} />}
		</main>
	)
}
