import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Link } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import Snackbar from '@material-ui/core/Snackbar';
import FundooLogo from "../fundooLogo/fundoo";
import "../register/register.scss";
const userService = require("../../services/user_service");

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {},
  },
}));

export default function RegisterForm(props) {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const [values, setValues] = React.useState({
    password: "",
    confirmpassword: "",
    showPassword: false,
  });
  const classes = useStyles();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isvalueflag, seterrorMessage] = React.useState("");

  const [firstNameErr, setFirstNameErr] = React.useState("");
  const [lastNameErr, setLastNameErr] = React.useState("");
  const [emailErr, setEmailErr] = React.useState("");
  const [passwordErr, setPasswordErr] = React.useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = React.useState("");

  let isValid = false;
  const [isvalidFirstName, seterrorFirstNameMessage] = React.useState(false);
  const [isvalidLastName, seterrorLastNameMessage] = React.useState(false);
  const [isvalidEmail, seterrorEmailMessage] = React.useState(false);
  const [isvalidPassword, seterrorPasswordMessage] = React.useState(false);
  const [isvalidCPassword, seterrorCPasswordMessage] = React.useState(false);

  const validatefirstName = (value) => {
    const read = /[A-Z][a-z]{3,}/;
    if (read.exec(value)) {
      setFirstNameErr("");
      seterrorFirstNameMessage(false);
    } else {
      setFirstNameErr("Invalid input");
      seterrorFirstNameMessage(true);
    }
    // console.log(isvalidFirstName);
  };
  const validateLastName = (value) => {
    const read = /[A-Z][a-z]{3,}/;
    if (read.exec(value)) {
      setLastNameErr("");
      seterrorLastNameMessage(false);
    } else {
      setLastNameErr("Invalid input");
      seterrorLastNameMessage(true);
    }
  };
  const validateEmail = (value) => {
    const read = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (read.exec(value)) {
      setEmailErr("");
      seterrorEmailMessage(false);
    } else {
      setEmailErr("Invalid input");
      seterrorEmailMessage(true);
    }
  };
  const validatePassword = (value) => {
    const read = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (read.exec(value)) {
      setPasswordErr("");
      seterrorPasswordMessage(false);
    } else {
      setPasswordErr("Invalid input");
      seterrorPasswordMessage(true);
    }
  };
  const validateConfirmPassword = (value) => {
    if (value == password) {
      setConfirmPasswordErr("");
      seterrorCPasswordMessage(false);
    } else {
      setConfirmPasswordErr("password does not match");
      seterrorCPasswordMessage(true);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let isValid = formValidation();
    if (isValid) {
      let obj = {
        firstName: firstName,
        lastName: lastName,
        service: "advance",
        email: email,
        password: password,
      };

      userService
        .register(obj)
        .then((res) => {
          handleClick({ vertical: 'top', horizontal: 'right' })
          props.history.push("/");
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const formValidation = () => {
    isValid = true;
    if (firstName.trim().length == 0) {
      setFirstNameErr("This is required field");
      seterrorMessage(true);
      seterrorFirstNameMessage(true);
      isValid = false;
    }
    if (lastName.trim().length == 0) {
      setLastNameErr("This is required field");
      seterrorMessage(true);
      seterrorLastNameMessage(true);
      isValid = false;
    }
    if (email.trim().length == 0) {
      setEmailErr("This is required field");
      seterrorMessage(true);
      seterrorEmailMessage(true);
      isValid = false;
    }
    if (password.trim().length == 0) {
      setPasswordErr("This is required field");
      seterrorMessage(true);
      seterrorPasswordMessage(true);
      isValid = false;
    }
    if (confirmPassword.trim().length == 0) {
      setConfirmPasswordErr("This is required field");
      seterrorMessage(true);
      seterrorCPasswordMessage(true);
      isValid = false;
    }

    return isValid;
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="box1">
      <div className="form">
        <form className={classes.root} noValidate autoComplete="off">
          <div className="container-box">
            <div className="inner-box">
              <FundooLogo />
              <p className="heading">Create your Fundoo Account</p>
              <div className="name">
                <div className="fname">
                  <TextField
                    required
                    error={isvalidFirstName}
                    helperText={firstNameErr}
                    id="outlined-required1"
                    label="First name"
                    variant="outlined"
                    onBlur={(e) => {
                      validatefirstName(e.target.value);
                    }}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    size="small"
                  />
                </div>
                <TextField
                  required
                  error={isvalidLastName}
                  helperText={lastNameErr}
                  id="outlined-required2"
                  label="Last name"
                  variant="outlined"
                  // helperText={firstNameErr}
                  onBlur={(e) => {
                    validateLastName(e.target.value);
                  }}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  size="small"
                />
              </div>
              <div className="emailfield">
                <TextField
                  required
                  error={isvalidEmail}
                  helperText={emailErr}
                  id="outlined-required3"
                  label="Username"
                  variant="outlined"
                  helperText="You can use latters numbers and periods"
                  onBlur={(e) => {
                    validateEmail(e.target.value);
                  }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  size="small"
                />
              </div>

              <div className="password">
                <div className="pass">
                  <TextField
                    required
                    error={isvalidPassword}
                    helperText={passwordErr}
                    type={values.showPassword ? "text" : "password"}
                    id="outlined-password-input1"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    onBlur={(e) => {
                      validatePassword(e.target.value);
                    }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    size="small"
                  />
                </div>

                <TextField
                  required
                  error={isvalidCPassword}
                  helperText={confirmPasswordErr}
                  id="outlined-password-input2"
                  type={values.showPassword ? "text" : "password"}
                  // value={values.confirmpassword}
                  label="Confirm"
                  autoComplete="current-password"
                  variant="outlined"
                  onBlur={(e) => {
                    validateConfirmPassword(e.target.value);
                  }}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  size="small"
                />
              </div>
              <div className="eye">
              <InputAdornment>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
              </div>
              <div className="button">
                <div className="btn-login">
                  <Link to="/">
                    <Button className="login-btn">LOGIN</Button>
                  </Link>
                </div>

                <Button
                  variant="contained"
                  size="medium"
                  className={(classes.margin, "register-btn")}
                  onClick={onSubmit}
                >
                  Register
                </Button>
              </div>
            </div>
            <div className="container-image">
              <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"></img>
            </div>
          </div>
          
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Registration successful"
        key={vertical + horizontal}
      />
    </div>
  );
}
