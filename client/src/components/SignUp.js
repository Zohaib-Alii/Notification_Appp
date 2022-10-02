import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Link,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { useFormik } from "formik";
import { SignUpSchema } from "../validationSchemas/SignUpSchema";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/FireBase";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const navigate = useNavigate();
  // signup  function here
  const onSubmit = (values, actions) => {
    debugger;
    setBtnDisabled(true);
    console.log("submit", values, actions);
    let { email, password, firstName } = values;
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;
        debugger;
        await updateProfile(user, {
          displayName: firstName,
        });
        setBtnDisabled(false);
        actions.resetForm();
        navigate("/login");
      })
      .catch((err) => {
        setBtnDisabled(false);
        alert(err.message);
      });
  };
  // validation here
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      validationSchema: SignUpSchema,
      onSubmit,
    });
  return (
    <main>
      <Container className="signupWrapper" component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography className="signupMainHeading" component="h1" variant="h5">
            Sign up
          </Typography>

          <form onSubmit={handleSubmit} noValidate>
            <span className="d-flex">
              <div className="emailInput ">
                <div>
                  <label className="labelLoginForm">FirstName</label>
                </div>
                <span>
                  <input
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    id="firstName"
                    type="firstName"
                    placeholder="Enter your first name"
                    className={
                      errors.firstName && touched.firstName
                        ? "input-error nameInputs inputs"
                        : "nameInputs inputs"
                    }
                  />
                  {errors.firstName && touched.firstName && (
                    <span className="validation-error ">
                      {errors.firstName}
                    </span>
                  )}
                </span>
              </div>
              <div className="emailInput ">
                <div>
                  <label className="labelLoginForm">LastName</label>
                </div>
                <span className="fNamelNameInputs">
                  <input
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    id="lastName"
                    type="email"
                    placeholder="Enter your last name"
                    className={
                      errors.lastName && touched.lastName
                        ? "input-error nameInputs inputs"
                        : "nameInputs inputs"
                    }
                  />
                </span>
                {errors.lastName && touched.lastName && (
                  <span className="validation-error m-left">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </span>
            <div sx={{ display: "flex" }} className="emailInput">
              <label className="labelLoginForm">Email</label>
              <input
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoomplete="off"
                id="email"
                type="email"
                placeholder="Enter your email"
                className={
                  errors.email && touched.email
                    ? "input-error inputs"
                    : "inputs"
                }
              />
              {errors.email && touched.email && (
                <span className="validation-error ">{errors.email}</span>
              )}
            </div>
            <div sx={{ display: "flex" }} className="emailInput">
              <label className="labelLoginForm">Password</label>

              <input
                value={values.password}
                onChange={handleChange}
                id="password"
                type="password"
                placeholder="Enter your email"
                className={
                  errors.password && touched.password
                    ? "input-error inputs"
                    : " inputs"
                }
              />
              {errors.password && touched.password && (
                <span className="validation-error">{errors.password}</span>
              )}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={btnDisabled}
            >
              SignUp
            </Button>
          </form>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </main>
  );
};

export default SignUp;
