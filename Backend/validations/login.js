const yup = require("yup");

const loginModel = yup.object().shape({
    email: yup.string().email().required("email is required"),
    password: yup.string().min(8,"password must be 8 to 30 charater long").max(30,"password must be 8 to 30 charater long").required("password is required")
})

module.exports = loginModel;