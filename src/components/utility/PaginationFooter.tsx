import React from "react";
import PaginationComponent from "./PaginationComponent";

interface PaginationFooterProps {
  handlePageChange: (page: number) => void;
  pagination?: {
    to: number;
    totalPages: number;
  };
  isStopPaginationFirstCall: boolean;
  IntlService:any
}

function PaginationFooter({
  handlePageChange,
  pagination,
  isStopPaginationFirstCall,
  IntlService
}: PaginationFooterProps) {

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="mt-1">
          <p className="list-info">{`${IntlService.m("Showing")} ${
            pagination?.to || 0
          } ${IntlService.m("from")} ${pagination?.totalPages} ${IntlService.m(
            "data"
          )}`}</p>
        </div>
        <div className="">
          <PaginationComponent
            pagination={pagination}
            handlePageChange={handlePageChange}
            isStopPaginationFirstCall={isStopPaginationFirstCall}
          />
        </div>
      </div>
    </>
  );
}

export default PaginationFooter;
