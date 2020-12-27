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
let isValid = true;
export default function LoginForm(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const [email, setEmail] = React.useState("");
  const [emailErr, setEmailErr] = React.useState("");
  const [isvalidEmail, seterrorEmailMessage] = React.useState("");


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
  const onSubmit = (e) => {
    e.preventDefault();

    let isValid = formValidation();
    if (isValid) {
      let obj = {
        service: "advance",
        email: email,
      };
      userService
        .forgot(obj)
        .then((res) => {
          props.history.push("/");
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const formValidation = () => {
    if (email.trim().length == 0) {
      setEmailErr("This is required field");
      seterrorEmailMessage(true);
      isValid = false;
    }
    return isValid
  };

  return (
    <div className="login-container">
      <form className={classes.root} noValidate autoComplete="off">
        <div className="inner-header">
          <FundooLogo />
          <p className="sigh-Name">Change password</p>
          <p className="use">Enter your email</p>
        </div>
        <div className="form-content">
          <div className="email">
            <TextField
              required
              error={isvalidEmail}
              helperText={emailErr}
              id="outlined-basic"
              label="email"
              variant="outlined"
              onBlur={(e) => {
                validateEmail(e.target.value);
              }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="button">
          <div className="ancor-button">
            <Link to='/'>
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
