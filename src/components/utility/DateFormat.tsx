import moment, { Moment } from "moment";

export const dateFormat = (date: Date | string): string => {
  return moment(date).format("lll");
};

export const dateFormatdash = (date: Date | string): string => {
  return moment(date).format("YYYY-MM-DD");
};
