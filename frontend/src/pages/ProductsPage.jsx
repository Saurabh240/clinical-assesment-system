import { useEffect, useState } from "react";
import api from "../api/axios";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import CustomSelect from "../components/ui/Select";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    ailment: "",
    category: "",
    brand: "",
    page: 0,
    size: 10,
    sortBy: "",
    sortDir: ""
  });


  const buildParams = () => {
    const params = {};

    Object.entries(filters).forEach(([k, v]) => {
      if (v !== "" && v !== null && v !== undefined) {
        params[k] = v;
      }
    });

    return params;
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get("/products", {
        params: buildParams()
      });

      setProducts(res.data.data);
      setMeta(res.data.meta);

    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const t = setTimeout(fetchProducts, 400);
    return () => clearTimeout(t);
  }, [filters]);

  const handleChange = (key, value) => {
    setFilters(f => ({ ...f, [key]: value, page: 0 }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      ailment: "",
      category: "",
      brand: "",
      page: 0,
      size: 10,
      sortBy: "",
      sortDir: ""
    });
  };

  return (
    <div className="p-6 space-y-6">
      <Card>

        <Card.Header>
          <Card.Title>Products</Card.Title>
          <Card.Description>Search & filter</Card.Description>
        </Card.Header>

        <Card.Content className="space-y-4">

          {/* SEARCH */}
          <Input
            placeholder="Search..."
            value={filters.search}
            onChange={e => handleChange("search", e.target.value)}
          />

          {/* FILTERS */}
          <div className="grid grid-cols-4 gap-4">

            <CustomSelect
              value={filters.ailment}
              onChange={v => handleChange("ailment", v)}
              options={[
                { label: "All Ailments", value: "" },
                { label: "Fever", value: "Fever" },
                { label: "Pain", value: "Pain" },
                { label: "Allergy", value: "Allergy" }
              ]}
            />

            <CustomSelect
              value={filters.category}
              onChange={v => handleChange("category", v)}
              options={[
                { label: "All Categories", value: "" },
                { label: "Antihistamine", value: "Antihistamine" },
                { label: "NSAID", value: "NSAID" },
                { label: "Pain Relief", value: "Pain Relief" }
              ]}
            />

            <CustomSelect
              value={filters.brand}
              onChange={v => handleChange("brand", v)}
              options={[
                { label: "All Brands", value: "" },
                { label: "Cipla", value: "Cipla" },
                { label: "Sun Pharma", value: "Sun Pharma" },
                { label: "Abbott", value: "Abbott" }
              ]}
            />

            <Button variant="secondary" onClick={clearFilters}>
              Clear
            </Button>
          </div>

          {/* TABLE */}
    <table className="w-full border border-gray-200 border-collapse table-auto">
  <thead>
    <tr className="bg-gray-100 text-left">
      <th className="p-3 border-b">Name</th>
      <th className="p-3 border-b">Ailment</th>
      <th className="p-3 border-b">Category</th>
      <th className="p-3 border-b">Brand</th>
      <th className="p-3 border-b">Description</th>
    </tr>
  </thead>

  <tbody>
    {loading ? (
      <tr>
        <td colSpan="5" className="p-6 text-center">
          Loading...
        </td>
      </tr>
    ) : products.length === 0 ? (
      <tr>
        <td colSpan="5" className="p-6 text-center">
          No products
        </td>
      </tr>
    ) : (
      products.map(p => (
        <tr key={p.id} className="border-b hover:bg-gray-50">
          <td className="p-3">{p.name}</td>
          <td className="p-3">{p.ailment}</td>
          <td className="p-3">{p.category}</td>
          <td className="p-3">{p.brand}</td>
          <td className="p-3">{p.description}</td>
        </tr>
      ))
    )}
  </tbody>
</table>


        </Card.Content>

        {/* PAGINATION */}
        <Card.Footer className="flex justify-center gap-4">

          <Button variant="secondary"
            disabled={!meta.hasPrevious}
            onClick={() => setFilters(f => ({...f, page: f.page-1}))}
          >
            Prev
          </Button>

          <span>
            Page {(meta.page ?? 0) + 1} of {meta.totalPages ?? 1}
          </span>

          <Button variant="secondary"
            disabled={!meta.hasNext}
            onClick={() => setFilters(f => ({...f, page: f.page+1}))}
          >
            Next
          </Button>

        </Card.Footer>

      </Card>
    </div>
  );
}
