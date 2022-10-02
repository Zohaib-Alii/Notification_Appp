import React, { useContext } from "react";
import { Modal, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { AddPaymentSchema } from "../../validationSchemas/AddPaymentSchema";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
// here we can the database of firestore but am facing the issue for same user for multiple collection
// then i use mongodb
// import {
//   doc,
//   setDoc,
//   addDoc,
//   collection,
//   serverTimestamp,
// } from "firebase/firestore";
// import "./addModel.css";
// import { db, query } from "../../firebase/FireBase";

const AddPaymentModel = ({
  isAddPaymentModelOpen,
  setIsAddPaymentModelOpen,
  setToggle,
  toggle,
}) => {
  const { currentUser } = useContext(AuthContext);
  // add new payment from here
  const onSubmit = async (values, actions) => {
    debugger;
    let data = {
      user: currentUser.uid,
      ...values,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/userDetails",
        data
      );
      if (res.status) {
        setToggle(!toggle);
        setIsAddPaymentModelOpen(false);
        Swal.fire({
          icon: "success",
          title: "Your payment add successfilly",
          showConfirmButton: false,
          timer: 1500,
        });
        actions.resetForm();
      }
    } catch (error) {
      debugger;
      alert(error);
    }
  };
  // validation here
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        title: "",
        dueDate: "",
        description: "",
      },
      validationSchema: AddPaymentSchema,
      onSubmit,
    });

  const styleBoxAddUser = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "37%",
    paddingTop: "10px",
    height: "65vh",
    overflow: "auto",
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={isAddPaymentModelOpen}
      onClose={() => {
        setIsAddPaymentModelOpen(false);
      }}
    >
      <Box sx={{ ...styleBoxAddUser }} width={1 / 4}>
        <div className="crossIcon">
          <p className="addPaymentTitle">ADD New Payment</p>
          <main>
            <span>
              <IconButton
                id="createNewUserModelCloseIcon"
                color="secondary"
                onClick={() => setIsAddPaymentModelOpen(false)}
              >
                <CloseIcon>close</CloseIcon>
              </IconButton>
            </span>
          </main>
        </div>
        <Box style={{ width: "100%" }} sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit} noValidate>
            <div className="displayCol">
              <label className="labelAddPaymentModel">Title</label>
              <input
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                id="title"
                type="text"
                placeholder="Enter your title"
                className={
                  errors.title && touched.title
                    ? "input-error  addPaymentInputs"
                    : "addPaymentInputs"
                }
              />
              {errors.title && touched.title && (
                <span className="validation-error ">{errors.title}</span>
              )}
            </div>
            <div className="displayCol">
              <label className="labelAddPaymentModel">Due Date</label>
              <input
                value={values.date}
                onChange={handleChange}
                id="dueDate"
                type="date"
                placeholder="Enter your password"
                className={
                  errors.dueDate && touched.dueDate
                    ? "input-error addPaymentInputs"
                    : " addPaymentInputs"
                }
              />
              {errors.dueDate && touched.dueDate && (
                <span className="validation-error">{errors.dueDate}</span>
              )}
            </div>
            <div className="displayCol">
              <label className="labelAddPaymentModel">Description</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                cols="33"
                placeholder="Enter your Description"
                value={values.description}
                onChange={handleChange}
                className={
                  errors.description && touched.description
                    ? "input-error addPaymentInputs"
                    : " addPaymentInputs"
                }
              />

              {errors.description && touched.description && (
                <span className="validation-error">{errors.description}</span>
              )}
            </div>
            <span className="btnAddPayment">
              <span className="btnSmWrapper">
                <button
                  className="btnModel"
                  onClick={() => setIsAddPaymentModelOpen(false)}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Cancel
                </button>
                <button
                  className="btnModel submitBtn"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </button>
              </span>
            </span>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPaymentModel;
