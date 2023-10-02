import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Input,
  Select,
  FormItem,
  FormLayout,
  FormButtonGroup,
  Submit,
  Space,
  FormTab,
  FormCollapse,
  ArrayTable,
  ArrayCards,
  FormGrid,
  DatePicker,
  Checkbox,
  Cascader,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Editable,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
} from "@formily/antd";
import { createForm } from "@formily/core";
import { FormProvider, createSchemaField, FormConsumer } from "@formily/react";
import "@formily/antd/dist/antd.css";

const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    ArrayCards,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
  },
});

// {
//   values: {
//     aaa: "sdsadsad",
//     bbb: "asd",
//     ccc: "asdsa",
//   },
// }
const form = createForm();

export const RenderForm = ({ scema, serverCall, endPoint }: any) => {
  const params = useParams();
  const getForm = () => {
    serverCall
      .getCall({ url: endPoint, params: params.id })
      .then((res: any) => console.log(res));
  };

  useEffect(() => {
    getForm();
  }, []);

  return (
    <FormProvider form={form}>
      <SchemaField schema={scema} />
      <FormConsumer>
        {() => (
          <FormButtonGroup.FormItem>
            <Submit onSubmit={console.log}>Submit</Submit>
          </FormButtonGroup.FormItem>
        )}
      </FormConsumer>
    </FormProvider>
  );
};
