import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Link,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import { LoginSchema } from "../validationSchemas/LoginSchema";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/FireBase";
import "./main.css";
const Login = () => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const navigate = useNavigate();
  // context method here
  const { dispatch } = useContext(AuthContext);
  // Login func here
  const onSubmit = (values, actions) => {
    setBtnDisabled(true);
    console.log("submit", values, actions);
    let { email, password } = values;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        debugger;
        navigate("/");
        setBtnDisabled(false);
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        actions.resetForm();
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
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,
      onSubmit,
    });
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <Box
            // component="form"
            // noValidate
            // onSubmit={handleSubmit}
            style={{ width: "100%" }}
            sx={{ mt: 1 }}
          >
            <form onSubmit={handleSubmit} noValidate>
              <div sx={{ display: "flex" }} className="emailInput">
                <label className="labelLoginForm">Email</label>
                <input
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
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
                  placeholder="Enter your password"
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
                disabled={btnDisabled}
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </form>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
