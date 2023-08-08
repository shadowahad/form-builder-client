import React, { useEffect, useState } from "react";

import List from "../../components/utility/List";
import ActionDropDown from "../../components/utility/ActionDropdown";
import ListHeader from "../../components/utility/ListHeader/ListHeader";

interface MainProps {
  endPoint: string
  IntlService:any
}

function ListComponent({IntlService}:MainProps) {
  const [pagination, setpagination] = useState({
    page: 9,
    pageCount: 45,
    to: 100,
    totalPages: 100,
  });
  const columns: Array<object> = [
    {
      name: "Form Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Created By",
      selector: "createdBy",
      sortable: true,
    },
    {
      name: "Created At",
      selector: "createdAt",
      sortable: true,
      right: true,
    },
    {
      name: "Total Submission",
      selector: "total",
      sortable: true,
      right: true,
    },
    {
      name: "Action",
      selector: "action",
      cell:(row:any)=>{

        return <>
        <div>
                
      <ActionDropDown  editOp={true} deleteOp={true} />
        </div>
        </>
      },
      sortable: true,
      right: true,
    },
  ];

  

  return (
    <>
    <ListHeader 
        pagination={pagination}
        IntlService={IntlService}
        />
    <List
        basicColumns={columns}
      
        Mock={[
          {
            name: "red",
createdBy:"something",
createdAt:"something",
total:"something",
          },
          {
            name: "red",
createdBy:"something",
createdAt:"something",
total:"something",
          },
          {
            name: "red",
createdBy:"something",
createdAt:"something",
total:"something",
          },
          {
            name: "red",
createdBy:"something",
createdAt:"something",
total:"something",
          },
          
        ]}
        // Mock={items}
        isLoading={false}
        pagination={pagination}
        IntlService={IntlService}

        // handlePageChange={getAllItems}
      />
      {/* <DataTable
        columns={columns}
       
        defaultSortFieldId="title"
        pagination
      /> */}
    </>
  );
}

export { ListComponent };
