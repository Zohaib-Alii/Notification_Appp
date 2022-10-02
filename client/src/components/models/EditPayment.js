import React, { useContext, useState } from "react";
import { Modal, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Box } from "@mui/material";
import "./addModel.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
const AddPaymentModel = ({
  editModelOpen,
  setEditPaymentModelOpen,
  idForUpdate,
  setToggle,
  toggle,
}) => {
  const { currentUser } = useContext(AuthContext);
  const [defaultData, setDefaultData] = useState({
    title: idForUpdate.title,
    dueDate: idForUpdate.dueDate,
    description: idForUpdate.description,
  });

  const handleChange = (e) => {
    debugger;
    setDefaultData({ ...defaultData, [e.target.name]: e.target.value });
  };
  // edit payment form here
  const onSubmit = async (e) => {
    e.preventDefault();
    debugger;
    debugger;
    let data = {
      userID: currentUser.uid,
      ...defaultData,
    };
    try {
      const res = await axios.put(
        `http://localhost:3000/api/userDetails/${idForUpdate._id}`,
        data
      );
      debugger;

      if (res.status) {
        setToggle(!toggle);
        setEditPaymentModelOpen(false);
        Swal.fire({
          icon: "success",
          title: "Your payment edit successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      debugger;
      alert(error);
    }
  };

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
  // jsx all here
  return (
    <Modal
      open={editModelOpen}
      onClose={() => {
        setEditPaymentModelOpen(false);
      }}
    >
      <Box sx={{ ...styleBoxAddUser }} width={1 / 4}>
        <div className="crossIcon">
          <p className="addPaymentTitle">Edit Payment</p>
          <main>
            <span>
              <IconButton
                id="createNewUserModelCloseIcon"
                color="secondary"
                onClick={() => setEditPaymentModelOpen(false)}
              >
                <CloseIcon>close</CloseIcon>
              </IconButton>
            </span>
          </main>
        </div>

        <Box style={{ width: "100%" }} sx={{ mt: 1 }}>
          <form onSubmit={onSubmit} noValidate>
            <div className="displayCol">
              <label className="labelAddPaymentModel">Title</label>

              <input
                defaultValue={idForUpdate.title}
                onChange={handleChange}
                autoComplete="off"
                name="title"
                id="title"
                type="text"
                placeholder="Enter your title"
                className="addPaymentInputs"
              />
            </div>

            <div className="displayCol">
              <label className="labelAddPaymentModel">Due Date</label>
              <input
                defaultValue={idForUpdate.dueDate}
                onChange={handleChange}
                id="dueDate"
                type="date"
                name="dueDate"
                placeholder="Enter your password"
                className="addPaymentInputs"
              />
            </div>
            <div className="displayCol">
              <label className="labelAddPaymentModel">Description</label>

              <textarea
                id="description"
                name="description"
                rows="3"
                cols="33"
                placeholder="Enter your Description"
                defaultValue={idForUpdate.description}
                onChange={handleChange}
                className=" addPaymentInputs"
              />
            </div>
            <span className="btnAddPayment">
              <span className="btnSmWrapper">
                <button
                  className="btnModel"
                  onClick={() => setEditPaymentModelOpen(false)}
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
                  Edit Data
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
