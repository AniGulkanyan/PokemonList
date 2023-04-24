import React, { useState } from "react";
import "./styles.css"

const usePagination = (data: any, itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  };

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  };

  const prev = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const jump = (page:any) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  };

  return { next, prev, jump, currentData, currentPage, maxPage };
};

const Pagination = ({ data, itemsPerPage, renderItem }: { data: any, itemsPerPage: number, renderItem: Function }) => {

  const { next, prev, jump, currentData, currentPage, maxPage } =
    usePagination(data, itemsPerPage);

  return (
    <div className="pagination">
      <div className="data">
        {currentData().map((item: any, index: any) => renderItem(item, index))}
      </div>
      <div className="buttons">
        <button onClick={prev} disabled={currentPage === 1} className="prev">
          prev
        </button>
        {Array.from({ length: maxPage }, (_, i) => (
          <button
            key={i}
            onClick={() => jump(i + 1)}
            className={currentPage === i + 1 ? "active" : "pageItem"}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={next} disabled={currentPage === maxPage} className="next">
          next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
