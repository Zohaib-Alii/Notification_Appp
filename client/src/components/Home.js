import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/FireBase";
import AddPaymentModel from "./models/AddPaymentModel";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import HomeTable from "./homeTable/HomeTable";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import "./main.css";
import MuiAlert from "@mui/material/Alert";

// in the props you can saw the currentUser
const Home = ({ currentUser }) => {
  // state initialization
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState([]);
  const [isAddPaymentModelOpen, setIsAddPaymentModelOpen] = useState(false);
  // useNavigate for navigate to the logout page
  const navigate = useNavigate();
  // fatch table data
  useEffect(() => {
    const fatchDate = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/userDetails`
        );
        // we can filter the data for same users and show on the dashboard
        const filterd = data.filter((item) => currentUser?.uid === item?.user);
        setData(filterd);
        // set notification here
        // every rerender you show the notification
        // if you have one or more then one payment you show the notifation
        // i use here also sendGrid for email but my account already in another project thats why i not use here
        if (filterd.length) {
          setTimeout(() => {
            setnotificationShow(true);
          }, 10000);
        }
      } catch (error) {
        alert(error);
      }
    };
    fatchDate();
  }, [toggle, currentUser?.uid]);
  // logout here
  const handleLogout = () => {
    // here we called firebse function for signOut and navigate to login page
    signOut(auth);
    navigate("/login");
    // clear the localStorage
    localStorage.clear();
  };

  // notification work here
  const [notificationShow, setnotificationShow] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div style={{ height: "80vh" }}>
      {/*notification here */}
      <Snackbar
        open={notificationShow}
        autoHideDuration={6000}
        onClose={() => setnotificationShow(!false)}
      >
        <Alert
          onClose={() => setnotificationShow(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {currentUser.displayName} you have to send payment..!
        </Alert>
      </Snackbar>
      {/*navbar componet here we can show the name dynamically*/}
      <Navbar name={currentUser.displayName} />
      {/*in this wrapper we have table data and add or logout functionality  */}
      <main className="homeMainWrapper">
        <div style={{ height: 400, width: "80%" }}>
          <span className="addPaymentBtn">
            {/*Add payment btn here you can add the payment */}
            <Button
              variant="outlined"
              onClick={() => setIsAddPaymentModelOpen(true)}
            >
              Add Payment
            </Button>
          </span>
          {/* Home table here */}
          <HomeTable rows={data} setToggle={setToggle} toggle={toggle} />
          <span className="addPaymentBtn">
            {/*logout btn here  */}
            <Button
              variant="outlined"
              className="logoutbtnwrapper"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </span>
        </div>
      </main>

      {/* add payment model here */}
      <AddPaymentModel
        setIsAddPaymentModelOpen={setIsAddPaymentModelOpen}
        isAddPaymentModelOpen={isAddPaymentModelOpen}
        setToggle={setToggle}
        toggle={toggle}
      />
    </div>
  );
};

export default Home;
