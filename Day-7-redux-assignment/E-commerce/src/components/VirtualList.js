import React, { useRef, useState } from 'react';

export default function VirtualList({ items, rowHeight = 48, height = 600, renderRow }) {
  const [scroll, setScroll] = useState(0);
  const ref = useRef();
  const total = items.length;
  const visible = Math.ceil(height / rowHeight);
  const start = Math.max(0, Math.floor(scroll / rowHeight) - 2);
  const end = Math.min(total, start + visible + 4);
  const offsetY = start * rowHeight;
  return (
    <div
      ref={ref}
      style={{height, overflowY:'auto', position:'relative'}}
      onScroll={e=>setScroll(e.target.scrollTop)}
    >
      <div style={{height: total * rowHeight, position:'relative'}}>
        <div style={{transform:`translateY(${offsetY}px)`}}>
          {items.slice(start, end).map((item, i) => renderRow(item, start + i))}
        </div>
      </div>
    </div>
  );
}
