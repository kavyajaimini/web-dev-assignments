
import React from 'react';

import { useSelector } from 'react-redux';
import ProductTable from '../components/ProductTable';
import SearchBar from '../components/SearchBar';

export default function Products() {
  const tenant = useSelector(s => s.user.tenant);
  const products = useSelector(s => s.products.items);
  const tenantProducts = React.useMemo(() => products.filter(p => p.tenant === tenant), [products, tenant]);
  const [search, setSearch] = React.useState({ q: '', cat: '' });
  const cats = React.useMemo(() => Array.from(new Set(tenantProducts.map(p => p.category))), [tenantProducts]);
  const handleSearch = params => setSearch(params);
  const filtered = React.useMemo(() => {
    let out = tenantProducts;
    if (search.cat) out = out.filter(p => p.category === search.cat);
    if (search.q) {
      const q = search.q.toLowerCase();
      out = out.filter(p => p.name.toLowerCase().includes(q) || String(p.id).includes(q));
    }
    return out;
  }, [tenantProducts, search]);
  return (
    <div style={{maxWidth:1200,margin:'0 auto',padding:32}}>
      <h1>Products</h1>
      <SearchBar onSearch={handleSearch} categories={cats} />
      <ProductTable products={filtered} />
    </div>
  );
}
