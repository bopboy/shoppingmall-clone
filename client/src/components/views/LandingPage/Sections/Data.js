const continents = [
    { _id: 1, name: 'Africa' },
    { _id: 2, name: 'Europe' },
    { _id: 3, name: 'Asia' },
    { _id: 4, name: 'North America' },
    { _id: 5, name: 'South America' },
    { _id: 6, name: 'Australia' },
    { _id: 7, name: 'Antarcica' },
]
const price = [
    { _id: 0, name: 'Any', array: [] },
    { _id: 1, name: '$0 ~ $999', array: [0, 999] },
    { _id: 2, name: '$1000 ~ $4999', array: [1000, 4999] },
    { _id: 3, name: '$5000 ~ $9999', array: [5000, 9999] },
    { _id: 4, name: '$10000 ~ $19999', array: [10000, 19999] },
    { _id: 5, name: '$20000 ~ ', array: [20000, 10000000] },
]

export { continents, price }