import React, { useState } from "react";
// ** Third Party Components
import ReactPaginate from "react-paginate";
// import { FormattedMessage, useIntl } from "react-intl";

interface PaginationComponentProps {
  pagination: {
    page: number;
    pageCount: number;
    totalPages: number;
  };
  handlePageChange: (selectedPage: number) => void;
  isStopPaginationFirstCall: boolean;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  pagination,
  handlePageChange,
  isStopPaginationFirstCall,
}) => {
  const [initialPageChange, setInitialPageChange] = useState(true);

  const Previous: React.FC = () => {
    return (
      <span className="align-middle d-none d-md-inline-block">
        {/* <FormattedMessage id="Previous" defaultMessage="Previous" /> */}
        Previous
      </span>
    );
  };

  const Next: React.FC = () => {
    return (
      <span className="align-middle d-none d-md-inline-block">
        {/* <FormattedMessage id="Next" defaultMessage="Next" /> */}
        Next
      </span>
    );
  };

  const _handlePageChange = (selectedPage: { selected: number }) => {
    if (initialPageChange && isStopPaginationFirstCall) {
      setInitialPageChange(false);
      return;
    }
    handlePageChange(selectedPage.selected);
  };

  return (
    <ReactPaginate
      initialPage={pagination.page - 1}
      forcePage={pagination.page - 1}
      onPageChange={_handlePageChange}
      pageCount={pagination.pageCount}
      breakLabel="..."
      nextLabel={<Next />}
      previousLabel={<Previous />}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      nextClassName="page-item next"
      breakLinkClassName="page-link"
      previousClassName="page-item prev"
      previousLinkClassName="page-link"
      containerClassName={`
      ${
        !pagination.totalPages && "hidden"
      } pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1`}
    />
  );
};

export default PaginationComponent;


