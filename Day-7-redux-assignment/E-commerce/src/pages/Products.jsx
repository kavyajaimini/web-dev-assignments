
import React from 'react';

import { useSelector } from 'react-redux';
import ProductTable from '../components/ProductTable';
import SearchBar from '../components/SearchBar';

export default function Products() {
  const products = useSelector(s => s.products.items);
  const [search, setSearch] = React.useState({ q: '', cat: '' });
  const cats = React.useMemo(() => Array.from(new Set(products.map(p => p.category))), [products]);
  const handleSearch = params => setSearch(params);
  const filtered = React.useMemo(() => {
    let out = products;
    if (search.cat) out = out.filter(p => p.category === search.cat);
    if (search.q) {
      const q = search.q.toLowerCase();
      out = out.filter(p => p.name.toLowerCase().includes(q) || String(p.id).includes(q));
    }
    return out;
  }, [products, search]);
  return (
    <div style={{maxWidth:1200,margin:'0 auto',padding:32}}>
      <h1>Products</h1>
      <SearchBar onSearch={handleSearch} categories={cats} />
      <ProductTable products={filtered} />
    </div>
  );
}
