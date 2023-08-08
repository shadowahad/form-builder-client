import React, { Component } from "react";
import ReactTable, { Column } from "react-table";
import "react-table/react-table.css";
import "../../@core/scss/base/plugins/tables/rtable.scss";
import {
  Button,
  CardHeader,
  InputGroup,
  UncontrolledButtonDropdown,
  InputGroupText,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  Card,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  CardBody,
  Spinner,
} from "reactstrap";
import FlatPicker from "react-flatpickr";
import {
  Link2,
  MoreHorizontal,
  Search,
  BookOpen,
  Check,
  X,
  CheckCircle,
  MoreVertical,
} from "react-feather";
// import ExportExcel from "../../views/ExportExcel";
import "@styles/react/pages/home.scss";
import { errorHandle } from "./ErrorHandl";
import { dateFormat } from "./DateFormat";
// import { IntlContext } from "../context/Internationalization";
import { FormattedMessage } from "react-intl";

interface DataItem {
  // Define the properties of your data item
  _id: string;
  // Add more properties based on your actual data item structure
}

interface PaginationProps {
  pageSize?: number;
  endPoint: string;
  getDataCall: (data: object) => Promise<any>;
  deleteActive: boolean;
  navigate: (url: string) => void;
  // Add other props as needed
}

interface PaginationState {
  sorted: string;
  filtered: string;
  pageSize: number;
  checked: boolean[];
  selectAll: boolean;
  total: number;
  page: number;
  data: DataItem[];
  pages: number;
  showAll: boolean;
  modal: boolean;
  status_id: string | null;
  priority_id: string | null;
  child_team: any; // Add proper type for child_team based on your actual data structure
  parent_teams: any; // Add proper type for parent_teams based on your actual data structure
  filterStates: object; // Add proper type for filterStates based on your actual data structure
  checkData: string[];
  filterActive: boolean;
  Notfound: boolean;
  loading: boolean;
  eod_date_filter: Date[];
}

class Pagination extends Component<PaginationProps, PaginationState> {
  private reactTable: ReactTable | null;
  private myRef: React.RefObject<number>;

  constructor(props: PaginationProps) {
    super(props);
    this.state = {
      sorted: "",
      filtered: "",
      pageSize: this.props.pageSize || 20,
      checked: new Array(this.props.pageSize || 10).fill(false),
      selectAll: false,
      total: 0,
      page: 0,
      data: [],
      pages: 0,
      showAll: false,
      modal: false,
      status_id: null,
      priority_id: null,
      child_team: null,
      parent_teams: null,
      filterStates: {},
      checkData: [],
      filterActive: false,
      Notfound: false,
      loading: true,
      eod_date_filter: [],
    };
    this.myRef = React.createRef<number>();
    this.reactTable = null;
  }

  // Add type annotations for the 'data' variable
  dataCall = (page: number = this.state.page): void => {
    this.setState({
      loading: true,
    });

    const data: any = {
      pageSize: this.state.showAll ? this.state.total : this.myRef.current,
      page: this.state.showAll ? 0 : page,
      filter:
        this.state.eod_date_filter?.length > 1
          ? {
              from: dateFormat(this.state.eod_date_filter[0]),
              to: dateFormat(this.state.eod_date_filter[1]),
            }
          : { from: "", to: "" },
    };

    if (this.props.endPoint === "eod-show") {
      this.props.getDataCall(data).then(
        (response: any) => {
          this.setState(
            {
              data: response.data?.data[0].stock,
              pages: response.data?.last_page,
              page: response.data?.current_page,
              total: response.data?.total,
              loading: false,
            },
            () => {
              if (response?.data?.pagination?.data?.length === 0) {
                this.setState({ Notfound: true });
              } else {
                this.setState({ Notfound: false });
              }
            }
          );
          this.setState({ loading: false });
        },
        (error: any) => {
          errorHandle(error, this.props.navigate);
        }
      );
    } else {
      this.props.getDataCall(data).then(
        (response: any) => {
          this.setState(
            {
              data: response.data?.data.data,
              pages: response.data?.data.last_page,
              page: response.data?.data.current_page,
              total: response.data?.data.total,
              loading: false,
            },
            () => {
              if (response?.data?.data?.data.length === 0) {
                this.setState({ Notfound: true });
              } else {
                this.setState({ Notfound: false });
              }
            }
          );
          this.setState({ loading: false });
        },
        (error: any) => {
          errorHandle(error, this.props.navigate);
        }
      );
    }
  };

  paginationStateData = () => {
    return { ...this.state };
  };

  filterSearchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      filtered: e.target.value,
    });
  };

  componentDidUpdate(
    prevProps: PaginationProps,
    prevState: PaginationState
  ) {
    if (this.props.deleteActive !== prevProps.deleteActive) {
      this.dataCall();
    } else if (this.state.eod_date_filter !== prevState.eod_date_filter) {
      if (this.state.eod_date_filter?.length > 1) this.dataCall();
    }
  }

  handleChange = (): void => {
    this.setState(
      {
        checked: new Array(this.state.data?.length).fill(!this.state.selectAll),
        selectAll: !this.state.selectAll,
      },
      () => {
        if (this.state.checked[0]) {
          this.setState({ filterActive: true });
          this.state.data.map((d) => {
            this.state.checkData?.push(d._id);
          });
        } else {
          this.setState({ checkData: [] });
          this.setState({ filterActive: false });
        }
      }
    );
  };

  handleSingleCheckboxChange = (index: number): void => {
    const checkedCopy = [...this.state.checked];
    checkedCopy[index] = !checkedCopy[index];
    if (checkedCopy[index] === false) {
      this.setState({ selectAll: false });
    }
    this.setState(
      {
        checked: checkedCopy,
      },
      () => {
        const arr = this.state.checkData.filter((item) => {
          return item === this.state.data[index]._id;
        });
        const indexOfOldData = this.state.checkData.indexOf(
          this.state.data[index]._id
        );
        if (indexOfOldData > -1) {
          this.state.checkData?.splice(indexOfOldData, 1);
        } else {
          this.state.checkData?.push(this.state.data[index]._id);
        }
        if (this.state.checkData?.length > 0) {
          this.setState({ filterActive: true });
        } else {
          this.setState({ filterActive: false });
        }
      }
    );
  };

  handlClick = (status: string, id: string): void => {
    const data = {
      ticket_ids: id,
      status_id: status,
    };
    // FilterAction(data);
  };

  render() {
    const {
      showAll,
      data,
      pages,
      filtered,
      pageSize,
      page,
      checkData,
    } = this.state;
    const {
      showAllToggle,
      columns,
      loadingOrder,
      filterView,
      upperContent,
      lowerContent,
      filterPlaceHolder,
      downloadData,
      minRows,
      downloadFileName,
      style,
      showTotal,
      filter,
      endPoint,
      selectMulti,
      headers,
    } = this.props;
    const multicolumns: Column<DataItem>[] = [
      {
        Header: (state: any) => (
          <div className="listing-custom-checkboxes">
            <input
              type="checkbox"
              id="checkbox-1-1"
              className="regular-checkbox"
              onChange={() => this.handleChange()}
              checked={this.state.selectAll}
            />
            <label htmlFor="checkbox-1-1"></label>
          </div>
        ),
        Cell: (row: any) => (
          <div className="listing-custom-checkboxes1">
            <input
              type="checkbox"
              id={`checkbox-sub-1-${row.index}`}
              className="regular-checkbox1"
              name={`checkbox-sub-1-${row.index}`}
              checked={this.state.checked[row.index]}
              onChange={() => this.handleSingleCheckboxChange(row.index)}
            />
            <label htmlFor={`checkbox-sub-1-${row.index}`}></label>
          </div>
        ),
        sortable: false,
        filterable: false,
        width: 70,
      },
    ];

    let Pathname = window.location.pathname.split("/")[2];
    return (
      <React.Fragment>
        
        <div className="d-flex justify-content-between py-2">
          <div className="d-flex">
            {/* {downloadData && (
              <React.Fragment>
                <ExportExcel
                  className="downloadbtn"
                  fileName={downloadFileName}
                  headers={headers}
                  currentRecordsRef={this.reactTable}
                  columnsData={columns}
                  endPoint={
                    endPoint === "eod-show"
                      ? endPoint + "/" + this.props.eodItemId
                      : endPoint
                  }
                  Total={this.state.total}
                />
              </React.Fragment>
            )} */}
          </div>
        </div>
        <Card className="p-0">
          <CardBody className="p-0">
            <ReactTable
              minRows={minRows ? minRows : 5}
              showPagination={showAll ? false : true}
            //   ref={(r) => (this.reactTable = r)}
            //   trProps={this.props.getRowProps}
            //   noDataText={
            //     this.props.noDataText || this.state.Notfound ? (
            //       " Data Not Found!"
            //     ) : (
            //       <Spinner color="primary" />
            //     )
            //   }
              data={data}
              pages={pages}
              pageSize={this.myRef.current || 20}
              rowsText={this.context.locale === "en" ? "Rows" : "صفوف"}
              pageText={this.context.locale === "en" ? "Page" : "صفحة"}
              columns={selectMulti ? [...multicolumns, ...columns] : columns}
              filtered={filtered}
            //   pageSizeOptions={this.props.pageSizeOptions}
              defaultPageSize={pageSize}
              ofText={"of"}
              previousText={
                this.context.locale === "en" ? "Previous" : "السابق"
              }
              nextText={this.context.locale === "en" ? "Next" : "التالي"}
            //   onPageSizeChange={(pageSize) => {
            //     this.myRef.current = pageSize;
            //     this.setState({
            //       pageSize: pageSize,
            //     });
            //   }}
              style={style}
              className={`listing text-align-start ${
                this.state.loading ? "d-none" : "d-block"
              }`}
              loadingText={"Loading..."}
              pageData={this.dataCall}
              manual
            //   onFetchData={(state, instance) => {
            //     var sort =
            //       state.sorted.length === 0
            //         ? ""
            //         : state.sorted[0].id + ",desc:" + state.sorted[0].desc;
            //     state.pageData(
            //       state.page + 1,
            //       state.filtered,
            //       sort,
            //       state.pageSize
            //     );
            //   }}
            //   getTrProps={(state, rowInfo, columns, instance) => {
            //     let data = {};
            //     if (instance.props.trProps) {
            //       if (rowInfo !== undefined) {
            //         const rowData = rowInfo.original;
            //         data = instance.props.trProps(rowData);
            //       }
            //     }
            //     return {
            //       style: data,
            //     };
            //   }}
            />
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

// Pagination.contextType = IntlContext;
export default Pagination;
