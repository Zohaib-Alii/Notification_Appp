import * as yup from "yup";
//add payment  Login Schema here

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid Email")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});
