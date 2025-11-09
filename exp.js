const obj = [{
  category: "popcorn",
  price: 30
},
{
  category: "coffee",
  price: 30
}
  , {
  category: "sportinia",
  price: 30
}
  , {
  category: "bcaa",
  price: 30
}
  , {
  category: "popcorn",
  price: 30
}
]


function getTargets(arr, badges = '', search='') {

  const newBadges = badges.trim().toLowerCase().split(',')

  const newSet = new Set(newBadges.map((target) => target.trim().toLowerCase()).filter(Boolean))

  console.log(newSet)

  return arr.filter((item) => {
    return (
      newSet.has(item.category)
    )
  })




}

console.log(getTargets(obj, 'popcorn, bcaa'))