
import { useEffect, useState } from "react";
import api from "../api/axios";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import CustomSelect from "../components/ui/Select";


function FilterChip({ label, value, onRemove }) {
  return (
    <div className="flex items-center gap-2 px-4 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-bold">
      <span className="font-bold text-center">
        {label}: {value}
      </span>

      <button
        onClick={onRemove}
        className="font-bold hover:text-red-600"
      >
        ✕
      </button>
    </div>
  );
}


export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({
    search: "",
    ailment: "",
    category: "",
    brand: "",
    page: 0,
    size: 10,
    sortBy: "name",
    sortDir: "asc",
  });


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products", {
        params: filters,
      });

      setProducts(res.data.data || []);
      setTotalPages(res.data.meta?.totalPages || 0);
    } catch (err) {
      console.error("Products fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters.page, filters.ailment, filters.category, filters.brand]);

  useEffect(() => {
    const t = setTimeout(fetchProducts, 400);
    return () => clearTimeout(t);
  }, [filters.search]);


  const handleChange = (name, value) => {
    setFilters({ ...filters, [name]: value, page: 0 });
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      ailment: "",
      category: "",
      brand: "",
      page: 0,
      size: 10,
      sortBy: "name",
      sortDir: "asc",
    });
  };


  return (
    <div className="p-6 space-y-6">
      <Card>
        <Card.Header>
          <Card.Title>Products Viewer</Card.Title>
          <Card.Description>
            Search and filter available products
          </Card.Description>
        </Card.Header>

        <Card.Content className="space-y-5">
          {/* SEARCH */}
          <Input
            placeholder="Search by name or description..."
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
          />

          {/* FILTERS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* AILMENT */}
            <div className="space-y-1 text-center">
              <label className="text-sm font-bold">Ailment</label>
              <CustomSelect
                value={filters.ailment}
                onChange={(v) => handleChange("ailment", v)}
                options={[
                  { label: "All", value: "" },
                  { label: "Flu", value: "FLU" },
                  { label: "Fever", value: "FEVER" },
                ]}
              />
            </div>

            {/* CATEGORY */}
            <div className="space-y-1 text-center">
              <label className="text-sm font-bold">Category</label>
              <CustomSelect
                value={filters.category}
                onChange={(v) => handleChange("category", v)}
                options={[
                  { label: "All", value: "" },
                  { label: "Antiviral", value: "ANTIVIRAL" },
                ]}
              />
            </div>

            {/* BRAND */}
            <div className="space-y-1 text-center">
              <label className="text-sm font-bold">Brand</label>
              <CustomSelect
                value={filters.brand}
                onChange={(v) => handleChange("brand", v)}
                options={[
                  { label: "All", value: "" },
                  { label: "XYZ", value: "XYZ" },
                  { label: "ABC", value: "ABC" },
                ]}
              />
            </div>

            {/* CLEAR */}
            <div className="flex items-end">
              <Button
                variant="secondary"
                onClick={clearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* ACTIVE CHIPS */}
          {(filters.ailment || filters.category || filters.brand) && (
            <div className="flex flex-wrap justify-center gap-3">
              {filters.ailment && (
                <FilterChip
                  label="Ailment"
                  value={filters.ailment}
                  onRemove={() => handleChange("ailment", "")}
                />
              )}

              {filters.category && (
                <FilterChip
                  label="Category"
                  value={filters.category}
                  onRemove={() => handleChange("category", "")}
                />
              )}

              {filters.brand && (
                <FilterChip
                  label="Brand"
                  value={filters.brand}
                  onRemove={() => handleChange("brand", "")}
                />
              )}
            </div>
          )}

          {/* TABLE */}
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Ailment</th>
                  <th className="p-3 text-left">Brand</th>
                  <th className="p-3 text-left">Description</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center p-6">
                      Loading...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-6">
                      No products found
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id} className="border-t hover:bg-gray-50">
                      <td className="p-3">{p.name}</td>
                      <td className="p-3">{p.category}</td>
                      <td className="p-3">{p.ailment}</td>
                      <td className="p-3">{p.brand}</td>
                      <td className="p-3">{p.description}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card.Content>

        {/* PAGINATION */}
        <Card.Footer className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button
            variant="outline"
            disabled={filters.page === 0}
            onClick={() =>
              setFilters({ ...filters, page: filters.page - 1 })
            }
          >
            Prev
          </Button>

          <span>
            Page {filters.page + 1} of {totalPages || 1}
          </span>

          <Button
            variant="outline"
            disabled={filters.page + 1 >= totalPages}
            onClick={() =>
              setFilters({ ...filters, page: filters.page + 1 })
            }
          >
            Next
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
