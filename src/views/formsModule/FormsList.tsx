import React, { useEffect, useState } from "react";
import List from "../../components/utility/List";
import ActionDropDown from "../../components/utility/ActionDropdown";
import ListHeader from "../../components/utility/ListHeader/ListHeader";

interface MainProps {
  endPoint: string;
  IntlService: any;
  serverCall: any;
}

function ListComponent({ IntlService, serverCall, endPoint }: MainProps) {
  const [pagination, setpagination] = useState({
    page: 0,
    pageCount: 0,
    to: 0,
    totalPages: 0,
  });
  const [items, setItems] = useState([]);
  const [Loading, setLoading] = useState(false);

  const getAllItems = (query = { selected: 0 }) => {
    setLoading(true);

    const params = {
      page: query.selected + 1,
      per_page: 10,
      // //filters
      // ...filter,
    };

    serverCall
      .getCall({ url: endPoint, params })
      .then((res: any) => {
        if (res?.data?.data) {
          setItems(
            res.data.data.data.map((item: any) => {
              item.site =
                (item.site?._id ? item.site : item.obligation_site) || {};

              delete item.obligation_site;
              return item;
            })
          );
          const _pagination = res.data.data;
          const page = _pagination.current_page;
          const perpage = _pagination.per_page;
          const totalPages = _pagination.total;
          const pageCount = Math.ceil(totalPages / perpage);

          const to = _pagination.to;

          setpagination({
            page,
            pageCount,
            totalPages,
            to,
          });
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const columns: Array<object> = [
    {
      name: "Form Name",
      selector: "formName",
      sortable: true,
    },
    // {
    //   name: "Created By",
    //   selector: "createdBy",
    //   sortable: true,
    // },
    // {
    //   name: "Created At",
    //   selector: "createdAt",
    //   sortable: true,
    //   right: true,
    // },
    // {
    //   name: "Total Submission",
    //   selector: "total",
    //   sortable: true,
    //   right: true,
    // },
    {
      name: "Action",
      selector: "action",
      cell: (row: any) => {
        return (
          <>
            <div>
              <ActionDropDown editOp={true} deleteOp={true} data={row} />
            </div>
          </>
        );
      },
      sortable: true,
      right: true,
    },
  ];

  return (
    <>
      <ListHeader pagination={pagination} IntlService={IntlService} />
      <List
        basicColumns={columns}
        Mock={items}
        isLoading={Loading}
        pagination={pagination}
        IntlService={IntlService}
        handlePageChange={getAllItems}
      />
    </>
  );
}

export { ListComponent };
