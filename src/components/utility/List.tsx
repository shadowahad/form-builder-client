import React, { forwardRef } from "react";
import DataTable from "react-data-table-component";
import { Card, Input } from "reactstrap";
// import { observer } from "mobx-react";
import startCase from "lodash/startCase";

// import { IntlService } from "../../services";
// import PaginationComponent from "./Pagination";
import PaginationFooter from "./PaginationFooter";

interface ListItem {
  // Define the structure of your 'Mock' data here
  // Replace any with the appropriate data type
}

interface ListProps {
  basicColumns: any;
  Mock: any;
  handlePageChange: (page: number) => any;
  pagination?: any; // Replace 'any' with the appropriate type for pagination
  isLoading: boolean;
  tableProps?: any; // Replace 'any' with the appropriate type for tableProps
  isStopPaginationFirstCall?: boolean;
  IntlService: any;
}

const BootstrapCheckbox = forwardRef<HTMLInputElement, any>((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

function List({
  basicColumns,
  Mock,
  handlePageChange,
  pagination = {},
  isLoading,
  tableProps = {},
  isStopPaginationFirstCall,
  IntlService,
}: ListProps) {
  let columns = basicColumns.map((column: any) => {
    if (!column.disableStartCase) {
      column.name = startCase(column.name.toLowerCase());
    } else {
      column.name = column.name;
    }
    return column;
  });

  return (
    <>
      <Card className="shadow-none">
        <DataTable
          noHeader
          noDataComponent={
            <div className="p-2">
              {isLoading
                ? "Loading Data..."
                : "There are no records to display"}
            </div>
          }
          columns={columns}
          data={Mock}
          selectableRowsComponent={BootstrapCheckbox}
          {...tableProps}
        />
      </Card>

      <PaginationFooter
        pagination={pagination}
        handlePageChange={handlePageChange}
        IntlService={IntlService}
        // isStopPaginationFirstCall={true}
      />
    </>
  );
}

export default List;
