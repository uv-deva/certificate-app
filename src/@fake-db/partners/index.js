import mock from '../mock'
import { paginateArray } from '../utils'

const data = [
  {
    id: 1,
    image: '',
    name: "Partner 1",
    description: "Job creation helps to escape poverty",
    type: 'UN Goal',
    roles:'ProcessingPartner',
    status: 1
  },
  {
    id: 2,
    image: '',
    name: "Partner 2",
    description: "Carbon Less Footprint, lorem ipsum",
    type: 'UN Goal',
    roles:'OperatingPartner',
    status: 0
  },
  {
    id: 3,
    image: '',
    name: "Partner 3",
    description: "Creation of new jobs helps to escape poverty",
    type: 'UN Goal',
    roles:'ProcessingPartner',
    status: 1
  },
  {
    id: 4,
    image: '',
    name: "Partner 4",
    description: "Boost in the local economy",
    type: 'UN Goal',
    roles:'OperatingPartner',
    status: 1
  },
  {
    id: 5,
    image: '',
    name: "Partner 5",
    description: "Job creation helps to escape poverty",
    type: 'UN Goal',
    roles:'ProcessingPartner',
    status: 1
  },
  {
    id: 6,
    image: '',
    name: "Partner 6",
    description: "Job creation helps to escape poverty",
    type: 'UN Goal',
    roles:'ProcessingPartner',
    status: 1
  }
]

mock.onGet('/api/partners').reply(config => {
  
  try {
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
  } catch (err) {
    console.log(err.toString())
  }
})
