import mock from '../mock'
import { paginateArray } from '../utils'

const data = [
  {
    id: 1,
    image: '',
    name: "Product Route 1",
    description: "Job creation helps to escape poverty",
    type: 'UN Goal',
    status: 1
  }
]

mock.onGet('/api/routes').reply(config => {
  
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