import { useState } from "react";

export function useProductPagination<T>(products: T[], perPage: number) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(products.length / perPage);
  const paginated = products.slice((page - 1) * perPage, page * perPage);
  return {
    page,
    setPage,
    totalPages,
    paginated,
  };
}
