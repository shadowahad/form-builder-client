import React, { FC, Fragment, useContext, useState } from "react";
import { Edit, Trash2, FileText } from "react-feather";
// import { Link, useNavigate } from "react-router-dom";
// import { UncontrolledTooltip } from "reactstrap";
import { useNavigate } from "react-router-dom";

// import { SC } from "./helper";
// import SweetAlert from "react-bootstrap-sweetalert";
// import toast from "react-hot-toast";
// import { handleDelete } from "../../redux/layout";
// import { IntlContext } from "../context/Internationalization";
// import TemporaryDrawer from "./drawer";
// import UserCreate from "../../views/Users/UserCreate";

interface ActionDropDownProps {
  _id: string;
  endPoint: string;
  deleteOp?: boolean;
  editOp?: boolean;
  path: string;
  name: string;
  isDeleteToPost?: boolean;
  getData: () => void;
  data: any;
}

const ActionDropDown: FC<ActionDropDownProps> = ({
  _id,
  endPoint,
  deleteOp,
  editOp,
  path,
  name,
  isDeleteToPost,
  getData,

  data,
}) => {
  const navigate = useNavigate();
  // const [state, setstate] = useState("");
  // const dispatch = useDispatch();
  // const [visibility, setVisibility] = useState(false);
  // const navigate = useNavigate();

  // const deleteField = () => {
  //   if (isDeleteToPost) {
  //     SC.postCall(`${endPoint}`, { id: _id }).then((res) => {
  //       if (res.status === 200) {
  //         dispatch(handleDelete(_id));
  //         toast.success(res?.data?.data);
  //         setstate(res.data?.message);
  //       }
  //     });
  //   } else {
  //     SC.deleteCall(`${endPoint}/${_id}`).then((res) => {
  //       if (res.status === 200) {
  //         dispatch(handleDelete(_id));
  //         toast.success(res?.data?.data);
  //         setstate(res.data?.message);
  //       }
  //     });
  //   }
  // };

  // const [show, setShow] = useState(false);
  // const intlContext = useContext(IntlContext);

  return (
    <Fragment>
      {/* <SweetAlert
        title={intlContext.locale === "en" ? "Are you sure?" : "هل أنت واثق؟"}
        warning
        show={show}
        confirmBtnText={intlContext.locale === "en" ? "OK" : "موافق"}
        confirmBtnBsStyle="success"
        cancelBtnText={intlContext.locale === "en" ? "Cancel" : "يلغي"}
        cancelBtnBsStyle="danger"
        showCancel
        onConfirm={() => {
          deleteField();
          setShow(false);
        }}
        onCancel={() => setShow(false)}
        focusCancelBtn
      >
        <h4>
          {intlContext.locale === "en"
            ? "Do You want to delete this."
            : "هل تريد حذف هذا."}
        </h4>
      </SweetAlert> */}

      {editOp && (
        <>
          {/* <UncontrolledTooltip placement="bottom" target="edit"> */}
          {/* Edit */}
          {/* </UncontrolledTooltip> */}
          <Edit
            size={20}
            id="edit"
            // onClick={() => navigate(`${path}${_id}`)}
            className="cursor-pointer font-weight-bolder Black "
          />
        </>
      )}
      {
        // fill && (
        <FileText
          className="ml-1 cursor-pointer font-weight-bolder Black ms-1"
          size={20}
          onClick={() => navigate(`/Form/${data.formName}/${data.projectId}`)}
        />

        // )
      }

      {deleteOp && (
        <>
          {/* <UncontrolledTooltip placement="bottom" target="delete"> */}
          {/* Delete */}
          {/* </UncontrolledTooltip> */}
          <Trash2
            className="ml-1 cursor-pointer font-weight-bolder Black ms-1"
            id="delete"
            // onClick={() => setShow(true)}
            size={20}
          />
        </>
      )}
    </Fragment>
  );
};

export default ActionDropDown;
