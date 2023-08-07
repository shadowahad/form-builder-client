import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";

interface User {
  _id: string;
  type: string;
}

interface Item {
  site: {
    _id?: string;
    name?: string;
    name_ar?: string;
  };
  user: {
    _id: string;
    name: string;
  };
  created_at: string;
}

interface Pagination {
  page: number;
  pageCount: number;
  to: number;
  totalPages: number;
}

interface Filter {
  search: string;
  fromDate: string;
  toDate: string;
}

interface Props {
  user: User;
  PDFModal: React.FC;
  getPdfObject: (formFields: any[]) => any; // Please replace 'any' with actual type
}

function ListComponent() {
  const columns: Array<object> = [
    {
      name: "Title",
      selector: "title",
      sortable: true,
    },
    {
      name: "Directior",
      selector: "director",
      sortable: true,
    },
    {
      name: "Runtime (m)",
      selector: "runtime",
      sortable: true,
      right: true,
    },
  ];
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  }, []);

  return (
    <>
      <DataTable
        title="Movies"
        columns={columns}
        data={[
          {
            title: "red",
            director: "james",
            runtime: "200m",
          },
          {
            title: "red",
            director: "james",
            runtime: "200m",
          },
          ,
          {
            title: "red",
            director: "james",
            runtime: "200m",
          },
        ]}
        defaultSortFieldId="title"
        pagination
      />
    </>
  );
}

export { ListComponent };
