const UserDetails = require("../models/userDetails");
//  get all payments
exports.getUsers = async (req, res) => {
  try {
    const usersInfo = await UserDetails.find();
    res.status(200).send(usersInfo);
  } catch (err) {
    console.log(err);
  }
};
// get payment by id
exports.userDetail = async (req, res) => {
  try {
    const info = await UserDetails.findById(req.params.id);
    res.status(201).send(info);
  } catch (error) {
    console.log(error);
  }
};
// update the payment
exports.addNewPayment = async (req, res) => {
  try {
    const { title, description, dueDate, user } = req.body;
    debugger;
    const userInfo = await UserDetails.create({
      title,
      description,
      dueDate,
      user,
    });

    res.status(201).send(userInfo);
  } catch (err) {
    console.log(err.message);
  }
};
// update payment by id
exports.updatePayment = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const updatedPayment = await UserDetails.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        dueDate,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(201).send(updatedPayment);
  } catch (err) {
    console.log(err.message);
  }
};
// delete payment by id
exports.deletePayment = async (req, res) => {
  try {
    await UserDetails.findByIdAndDelete(req.params.id);
    res.status(201).send("Payment deleted Successfully");
  } catch (err) {
    console.log(err.message);
  }
};
