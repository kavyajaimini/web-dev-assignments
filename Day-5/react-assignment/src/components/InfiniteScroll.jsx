import React, { useEffect, useRef } from "react";

function InfiniteScroll({
  children,
  fetchMoreData,
  hasMore,
  loading,
  threshold = 0.9,
}) {
  const loader = useRef();

  useEffect(() => {
    if (!loader.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) fetchMoreData();
      },
      { threshold }
    );
    observer.observe(loader.current);
    return () => observer.disconnect();
  }, [fetchMoreData, hasMore, loading, threshold]);

  return (
    <>
      {children}
      <div ref={loader} style={{ height: 50, textAlign: "center" }}>
        {loading && (
          <span style={{ color: "#555" }}>Loading more items...</span>
        )}
      </div>
    </>
  );
}

export default InfiniteScroll;
