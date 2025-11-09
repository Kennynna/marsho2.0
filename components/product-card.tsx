"use client"

import { Copy, Check } from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  price: number
  sku: string
  image: string
}

interface ProductCardProps {
  product: Product
  onCopySku: (sku: string) => void
  isCopied: boolean
}

export default function ProductCard({ product, onCopySku, isCopied }: ProductCardProps) {
  return (
		<div className='bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-colors duration-200 flex flex-col h-full'>
			{/* Product Image */}
			<div className='relative w-full  bg-muted overflow-hidden h-[180px]'>
				<img
					src={product.image || '/placeholder.svg'}
					alt={product.name}
					className='w-full h-full  object-cover'
				/>
			</div>

			{/* Product Info */}
			<div className='flex flex-col flex-1 p-2'>
				{/* Name */}
				<h3 className='font-semibold text-xs text-foreground line-clamp-2'>
					{product.name}
				</h3>

				{/* Price */}
				<p className='text-base font-bold text-primary mt-1'>
					₽{product.price.toFixed(2)} <span className="text-black">/{product.count}</span>
				</p>

				{/* SKU */}
				<div className='mt-2 pt-2 border-t border-border'>
					<p className='text-xs text-muted-foreground mb-1'>Article:</p>
					<code className='text-xs bg-muted px-1.5 py-0.5 rounded font-mono break-all block mb-2'>
						{product.sku}
					</code>

					{/* Copy Button */}
					<button
						onClick={() => onCopySku(product.sku)}
						className='w-full py-1.5 px-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-1 text-xs font-medium'
					>
						{isCopied ? (
							<>
								<Check className='w-3 h-3' />
								Copied!
							</>
						) : (
							<>
								<Copy className='w-3 h-3' />
								Copy
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	)
}
