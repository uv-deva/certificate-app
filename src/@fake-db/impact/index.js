import mock from '../mock'
import { paginateArray } from '../utils'

const data = [
  {
    id: 1,
    image: '',
    goal:1,
    name: "No Poverty",
    description: "Job creation helps to escape poverty",
    type: 'UN Goal',
    materials:'Orange, Apple',
    status: 1
  },
  {
    id: 2,
    image: '',
    goal:2,
    name: "No Pollution",
    description: "Carbon Less Footprint, lorem ipsum",
    type: 'Others',
    materials:'Banana, Cherry',
    status: 1
  },
  {
    id: 3,
    image: '',
    goal:3,
    name: "New employment",
    description: "Creation of new jobs helps to escape poverty",
    type: 'UN Goal',
    materials:'Watermelon',
    status: 1
  },
  {
    id: 4,
    image: '',
    goal:4,
    name: "Economy Boost",
    description: "Boost in the local economy",
    type: 'UN Goal',
    materials:'Pear',
    status: 1
  },
  {
    id: 5,
    image: '',
    goal:5,
    name: "No Poverty",
    description: "Job creation helps to escape poverty",
    type: 'UN Goal',
    materials:'Avocado',
    status: 1
  },
  {
    id: 6,
    image: '',
    goal:6,
    name: "No Poverty",
    description: "Job creation helps to escape poverty",
    type: 'Others',
    materials:'Orange, Apple',
    status: 1
  }
]

mock.onGet('/api/impact').reply(config => {
  
    const { body } = config
    let items
    if (typeof body !== 'undefined') {
      const { q = '', perPage = 2, page = 1 } = body
      const queryLowered = q.toLowerCase()

      if (q !== "") {
        items = data.filter(function(o) {
          
          return o.name.toLowerCase().includes(queryLowered) || o.name.toLowerCase() === queryLowered
        })
      } else {
        items = data
      }
      
      return [200, { items: paginateArray(items, perPage, page), page_info : { page_size:perPage, current_page:page, total_rows:items.length } }]
    }
})

mock.onGet('/api/impact/all').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1 } = config
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = data.filter(
    item =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      item.name.toLowerCase().includes(queryLowered) ||
      item.sku.toLowerCase().includes(queryLowered) ||
      item.type.toLowerCase().includes(queryLowered)
  )
  /* eslint-enable  */

  return [
    200,
    {
      allData: data,
      invoices: paginateArray(filteredData, perPage, page),
      total: filteredData.length
    }
  ]
})