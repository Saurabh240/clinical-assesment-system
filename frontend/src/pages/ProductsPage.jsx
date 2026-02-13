
import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";


import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({
    page: 0,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  });

  const [loading, setLoading] = useState(false);


  const [search, setSearch] = useState("");


  const [filter, setFilter] = useState({
    type: "",
    value: "",
  });


  const [filterOptions, setFilterOptions] = useState([]);


  const [page, setPage] = useState(0);


  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const params = {
        page,
        size: 50,
        sortBy: "name",
        sortDir: "asc",
      };

      if (search) params.search = search;

      if (filter.type && filter.value) {
        params[filter.type] = filter.value;
      }

      const res = await api.get("/products", { params });

      const list = res.data.data || [];

      setProducts(list);
      setMeta(
        res.data.meta || {
          page: 0,
          totalPages: 1,
          hasNext: false,
          hasPrevious: false,
        }
      );

  
      const ailments = [...new Set(list.map(p => p.ailment).filter(Boolean))];
      const categories = [...new Set(list.map(p => p.category).filter(Boolean))];
      const brands = [...new Set(list.map(p => p.brand).filter(Boolean))];

      const combined = [
        ...ailments.map(a => ({
          label: `Ailment: ${a}`,
          value: `ailment:${a}`,
        })),
        ...categories.map(c => ({
          label: `Category: ${c}`,
          value: `category:${c}`,
        })),
        ...brands.map(b => ({
          label: `Brand: ${b}`,
          value: `brand:${b}`,
        })),
      ];

      setFilterOptions(combined);

    } catch (err) {
      console.error("Products fetch failed", err);
    } finally {
      setLoading(false);
    }
  }, [search, filter, page]);


  useEffect(() => {
    const timer = setTimeout(fetchProducts, 400);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const resetFilters = () => {
    setSearch("");
    setFilter({ type: "", value: "" });
    setPage(0);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Card className="shadow-lg border border-teal-100">
        <Card.Header className="bg-white border-b p-6">

          <div className="flex justify-between items-center mb-6">
            <Card.Title className="text-2xl font-bold text-teal-800">
              Rx Inventory
            </Card.Title>

            <Button variant="secondary" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>

       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Input
              placeholder="Search name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
            />

            
            <Select
  placeholder="All Filters"
  options={filterOptions}
  value={
    filter.value
      ? `${filter.type}:${filter.value}`
      : ""
  }
  onChange={(val) => {
    if (!val) {
      setFilter({ type: "", value: "" });
    } else {
      const [type, value] = val.split(":");
      setFilter({ type, value });
    }
    setPage(0);
  }}
/>

          </div>
        </Card.Header>

        <Card.Content className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-teal-50 text-teal-900 uppercase text-xs font-bold">
                <tr>
                  <th className="p-4 border-b">Product Name</th>
                  <th className="p-4 border-b">Ailment</th>
                  <th className="p-4 border-b">Category</th>
                  <th className="p-4 border-b">Brand</th>
                  <th className="p-4 border-b">Description</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-10 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : products.length > 0 ? (
                  products.map((p) => (
                    <tr key={p.id} className="hover:bg-teal-50/40">
                      <td className="p-4 font-semibold">{p.name}</td>
                      <td className="p-4">{p.ailment}</td>
                      <td className="p-4">{p.category}</td>
                      <td className="p-4">{p.brand}</td>
                      <td className="p-4 text-sm italic">
                        {p.description}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-12 text-center">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card.Content>

        <Card.Footer className="flex justify-between p-4 bg-gray-50">
          <span>
            Page <b>{meta.page + 1}</b> of <b>{meta.totalPages}</b>
          </span>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!meta.hasPrevious}
              onClick={() => setPage(p => p - 1)}
            >
              Prev
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={!meta.hasNext}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </Button>
          </div>
        </Card.Footer>

      </Card>
    </div>
  );
}

