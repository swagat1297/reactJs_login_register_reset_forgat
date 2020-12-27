import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FundooLogo from "../fundooLogo/fundoo";
import Button from "@material-ui/core/Button";
import "../login/login.scss";
import {Link} from 'react-router-dom';
const userService = require("../../services/user_service");

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
let isValid;
export default function ForgotPasswordForm(props) {
  const classes = useStyles();

  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = React.useState("");
  const [isvalidCPassword, seterrorCPasswordMessage] = React.useState(false);

  const [password, setPassword] = React.useState("");
  const [passwordErr, setPasswordErr] = React.useState("");
  const [isvalidPassword, seterrorPasswordMessage] = React.useState("");

  const validateConfirmPassword = (value) => {
    if (value == password) {
      setConfirmPasswordErr("");
      seterrorCPasswordMessage(false);
    } else {
      setConfirmPasswordErr("password does not match");
      seterrorCPasswordMessage(true);
    }
  };
  // console.log(props.match.params.token);

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
  const onSubmit = (e) => {
    e.preventDefault();

    let isValid = formValidation();
    if (isValid) {
      let obj = {
        service: "advance",
        newPassword: password,
      };
      userService
        .reset(obj)
        .then((res) => {
          localStorage.setItem('Authorization', props.match.params.token)
          props.history.push("/");
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const formValidation = () => {
    if (confirmPassword.trim().length == 0) {
      setConfirmPasswordErr("This is required field");
      seterrorCPasswordMessage(true);
      isValid = true;
    }
    if (password.trim().length == 0) {
      setPasswordErr("This is required field");
      seterrorPasswordMessage(true);
      isValid = true;
    }
  };

  return (
    <div className="login-container">
      <form className={classes.root} noValidate autoComplete="off">
        <div className="inner-header">
          <FundooLogo />
          <p className="sigh-Name">Forgot Password</p>
          <p className="use">Enter new password</p>
        </div>
        <div className="form-content">
          <div className="email">
            <TextField
              required
              className="pass"
              id="outlined-password-input"
              error={isvalidPassword}
              helperText={passwordErr}
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
            />
          </div>
          <div className="password-field">
            <TextField
            required
              fullWidth
              className="confirm"
              error={isvalidCPassword}
              helperText={confirmPasswordErr}
              id="outlined-basic"
              label="Confirm"
              type="password"
              variant="outlined"
              onBlur={(e) => {
                validateConfirmPassword(e.target.value);
              }}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="button">
          <div className="ancor-button">
            <Link to="/">
            <Button
              className="link2"
              color="primary"
            >
              Back
            </Button>
            </Link>
          </div>
          <Button
            variant="contained"
            size="small"
            color="primary"
            className={(classes.margin, "next-btn")}
            onClick={onSubmit}
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
