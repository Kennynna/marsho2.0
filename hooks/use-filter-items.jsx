import React from 'react'
import { useMemo } from 'react'



export const UseFilterItems = ( searchQuery, PRODUCTS, badges ) => {
  const selectedCategories = useMemo(() => {
    return new Set(
      badges.filter(b => b.checked).map(b => b.category.toLowerCase())
    )
  }, [badges])

  // Главная логика: приоритет — поиск -> бэйджи
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()

    // 1) если есть поисковый запрос, сначала фильтруем по нему
    let base = PRODUCTS.filter(p => {
      const name = p.name.toLowerCase()
      const description = p.description.toLowerCase()
      const sku = p.sku.toLowerCase()
      return name.includes(q) || description.includes(q) || sku.includes(q)
    })

    // затем (только если выбраны бэйджи) — дополнительно по категориям
    if (q) {
      if (selectedCategories.size > 0) {
        base = base.filter(p =>
          selectedCategories.has(p.category.toLowerCase())
        )
      }
      return base
    }

    // 2) если поиск пустой — приоритет у бэйджей
    if (selectedCategories.size > 0) {
      return PRODUCTS.filter(p =>
        selectedCategories.has(p.category.toLowerCase())
      )
    }

    // 3) если ни поиска, ни бэйджей — показываем всё


    return PRODUCTS
  }, [searchQuery, selectedCategories])

  return{
    filteredProducts
  }
}

