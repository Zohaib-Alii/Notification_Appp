import * as yup from "yup";
//add payment  SignUp Schema here

// here we set password rules
const passwordRules = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$";
export const SignUpSchema = yup.object().shape({
  firstName: yup.string().required("First name is Required"),
  lastName: yup.string().required("Last name is Required"),
  email: yup
    .string()
    .email("Please enter a valid Email")
    .required("Email is Required "),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, {
      message:
        "Please create a strong password. Capital or small letters & Number",
    })
    .required("Password is Required "),
});
