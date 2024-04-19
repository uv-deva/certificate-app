import mock from "../mock";
import { paginateArray } from "../utils";
import img1 from "@src/assets/images/avatars/orange.jpg";
import img2 from "@src/assets/images/avatars/apple.jpg";

const data = [
  {
    id: 1,
    image: img1,
    sku: "org001",
    name: "Orange",
    type: "Fruits",
    status: 1,
  },
  {
    id: 2,
    image: img2,
    sku: "app002",
    name: "Apple",
    type: "Fruits",
    status: 0,
  },
  {
    id: 3,
    image: "",
    sku: "grape001",
    name: "Grapes",
    type: "Fruits",
    status: 1,
  },
  {
    id: 4,
    image: "",
    sku: "banan005",
    name: "Banan",
    type: "Fruits",
    status: 1,
  },
  {
    id: 5,
    image: "",
    sku: "straw0989",
    name: "Strawberry",
    type: "Fruits",
    status: 1,
  },
  {
    id: 5,
    image: "",
    sku: "blue505",
    name: "Blueberry",
    type: "Fruits",
    status: 1,
  },
  {
    id: 5,
    image: "",
    sku: "oil",
    name: "Oil",
    type: "Oil",
    status: 1,
  },
];

mock.onGet("/api/materials").reply((config) => {
  const { body } = config;
  let items;
  if (typeof body !== "undefined") {
    const { q = "", perPage = 2, page = 1 } = body;
    const queryLowered = q.toLowerCase();

    if (q !== "") {
      items = data.filter(function (o) {
        return (
          o.name.toLowerCase().includes(queryLowered) ||
          o.name.toLowerCase() === queryLowered
        );
      });
    } else {
      items = data;
    }

    return [
      200,
      {
        items: paginateArray(items, perPage, page),
        page_info: {
          page_size: perPage,
          current_page: page,
          total_rows: items.length,
        },
      },
    ];
  }
});

mock.onGet("/api/materials/all").reply((config) => {
  // eslint-disable-next-line object-curly-newline
  const { q = "", perPage = 10, page = 1 } = config;
  /* eslint-enable */

  const queryLowered = q.toLowerCase();
  const filteredData = data.filter(
    (item) =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      item.name.toLowerCase().includes(queryLowered) ||
      item.sku.toLowerCase().includes(queryLowered) ||
      item.type.toLowerCase().includes(queryLowered)
  );
  /* eslint-enable  */

  return [
    200,
    {
      allData: data,
      invoices: paginateArray(filteredData, perPage, page),
      total: filteredData.length,
    },
  ];
});
