import React, { useCallback, useEffect } from "react";
import { Plus } from "react-feather";
import { Button, Card, CardBody, Col, Input, Row, Spinner } from "reactstrap";
import { DashboardIcon, filterDateIcon, searchIcon } from "../../utility/SVG";
import TotalRecords from "../../TotalRecords/TotalRecords";
import FlatPicker from "react-flatpickr";
// import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
// import "../../../style.scss"
// import PerPage from "../../../views/pages/List/components/PerPage";

interface ListHeaderProps {
  pagination: any;
  exportComponent: any;
  dashboardUrl: string;
  addFormUrl: string;
  filter: any;
  setFilter: React.Dispatch<React.SetStateAction<any>>;
  getData: () => void;
  loading: boolean;
  isPerPage?: boolean;
  onPageSelection?: () => void;
  per_page: number;
  totalHeader: string;
  addButtonText: string;
  IntlService: any;
}

const ListHeader: React.FC<ListHeaderProps> = ({
  pagination,
  exportComponent,
  dashboardUrl,
  addFormUrl,
  filter,
  setFilter,
  getData,
  loading,
  isPerPage = false,
  onPageSelection = () => {},
  per_page = 10,
  totalHeader,
  addButtonText,
  IntlService,
}) => {
  // const navigate = useNavigate();

  const handleChange = useCallback(
    debounce((name: string, value: any) => {
      if (name === "date")
        setFilter((prev) => ({
          ...prev,
          fromDate: value[0]?.toDateString?.(),
          toDate: value?.[1]?.toDateString?.(),
        }));
      else setFilter((prev) => ({ ...prev, search: value }));
    }, 2000),
    []
  );

  // useEffect(() => {
  //   getData();
  // }, [filter]);

  const userData = JSON.parse(localStorage.getItem("userData") || "");

  return (
    <Card className="shadow-none">
      <CardBody className="list-header">
        <Row>
          <Col
            sm="12"
            className="d-flex justify-content-end"
            style={{
              border: "1px",
              borderBottomColor: "#EDEDED",
              borderBottomStyle: "solid",
              paddingBottom: 10,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              {addFormUrl && (
                <Button.Ripple
                  outline
                  // onClick={() => navigate(addFormUrl)}
                  className="add-form-button waves-effect round btun   btn btn-primary my-1"
                >
                  <p className="">{addButtonText || "Add New Form"}</p>
                  <Plus size={18} />
                </Button.Ripple>
              )}

              {dashboardUrl &&
              userData?.type !== "agent" &&
              userData?.type !== "pharmacist" ? (
                <Button.Ripple
                  outline
                  // onClick={() => navigate(dashboardUrl)}
                  className="dashboard-button  my-1"
                >
                  <p>Dashboard</p>
                  <figure>{DashboardIcon}</figure>
                </Button.Ripple>
              ) : null}
            </div>
          </Col>
          <Col md="4" className="d-flex">
            <Col md="6" sm="12 mt-1">
              <TotalRecords
                title={totalHeader || "Total Submissions"}
                number={pagination?.totalPages}
              />
            </Col>
            {/* <div style={{ marginLeft: 10 }} className="d-flex">
              {isPerPage && (
                <PerPage
                  onPageSelection={onPageSelection}
                  per_page={per_page}
                />
              )}
            </div> */}
          </Col>

          <Col md={"8"} sm="12" className="filter-container">
            {filter && (
              <>
                {" "}
                <div className="filter-date mt-1">
                  <FlatPicker
                    className="form-control date-picker-input"
                    options={{
                      dateFormat: "d-m-Y",
                      mode: "range",
                    }}
                    onClose={(e) => {
                      handleChange("date", e);
                    }}
                    placeholder={IntlService.m("Filter Date")}
                  />
                  <figure>
                    {loading ? <Spinner size="sm" /> : filterDateIcon}
                  </figure>
                </div>
                <div className="pagination-row-search mt-1">
                  <Input
                    placeholder={IntlService.m("Search in the list")}
                    onChange={(e) => handleChange("search", e.target.value)}
                  />
                  <figure>
                    {loading ? <Spinner size="sm" /> : searchIcon}
                  </figure>
                </div>
              </>
            )}

            {/* <span className="mt-1">{exportComponent}</span> */}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ListHeader;
