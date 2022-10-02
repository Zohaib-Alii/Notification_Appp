import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Icon } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import EditPayment from "../models/EditPayment";
import Swal from "sweetalert2";
import axios from "axios";
import "../main.css";
const HomeTable = ({ rows, toggle, setToggle }) => {
  debugger;
  // state here
  const [idForUpdate, setIdForUpdate] = useState("");
  const [editModelOpen, setEditPaymentModelOpen] = useState(false);

  // edit user
  const EditUserData = (e) => {
    setIdForUpdate(e);
    setEditPaymentModelOpen(true);
  };
  // delete user
  const DeleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/api/userDetails/${id}`)
          .then((res) => {
            if (res.data) {
              Swal.fire({
                icon: "success",
                title: "Your Payment has been deleted.",
                showConfirmButton: false,
                timer: 1500,
              });
              setToggle(!toggle);
            }
          });
      }
    });
  };
  return (
    <main>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="tableHeader">
            <TableRow>
              <TableCell className="tableHeaderCol">Title</TableCell>
              <TableCell className="tableHeaderCol">Description</TableCell>
              <TableCell className="tableHeaderCol">Due Date</TableCell>
              <TableCell className="tableHeaderCol">Action</TableCell>
            </TableRow>
          </TableHead>
          {rows.length <= 0 ? (
            <h3 className="optionalText"> PLease ADD Your First Payment </h3>
          ) : (
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.dueDate}</TableCell>
                  <TableCell>
                    <span className="iconSection">
                      {/* onClick={() => getLeadByUserId(row.id, row.row.fullName)}*/}

                      <Checkbox />
                      <Icon
                        onClick={() => EditUserData(row)}
                        component={EditIcon}
                        color="primary"
                        inheritViewBox
                      ></Icon>
                      <Icon
                        onClick={() => DeleteUser(row._id)}
                        className="DeleteLead"
                        id="btnDelete"
                        component={DeleteIcon}
                        sx={{ color: "red" }}
                        inheritViewBox
                      ></Icon>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {/*edit payment model here */}
      <EditPayment
        editModelOpen={editModelOpen}
        setEditPaymentModelOpen={setEditPaymentModelOpen}
        idForUpdate={idForUpdate}
        setToggle={setToggle}
        toggle={toggle}
      />
    </main>
  );
};

export default HomeTable;
