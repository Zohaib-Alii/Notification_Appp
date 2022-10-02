import * as yup from "yup";
//add payment  Validition Schema here
export const AddPaymentSchema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  dueDate: yup.string().required("Due Date is Required"),
  description: yup.string().required("Description is  Required"),
});
