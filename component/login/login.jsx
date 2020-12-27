import React from "react";
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FundooLogo from "../fundooLogo/fundoo";
import Button from "@material-ui/core/Button";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
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
export default function LoginForm(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const [email, setEmail] = React.useState("");
  const [emailErr, setEmailErr] = React.useState("");
  const [isvalidEmail, seterrorEmailMessage] = React.useState("");

  // const [password, setPassword] = React.useState("");
  const [passwordErr, setPasswordErr] = React.useState("");
  const [isvalidPassword, seterrorPasswordMessage] = React.useState("");

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

  const validatePassword = () => {
    const read = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (read.exec(values.password)) {
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
    if (isValid || true) {
      console.log("login:");
      let obj = {
        service: "advance",
        email: email,
        password: values.password,
      };
      userService
        .login(obj)
        .then((res) => {
          const obj = res.data
          localStorage.setItem('email', obj.email);
          localStorage.setItem('token', obj.id);
          props.history.push("/dashboard");
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const formValidation = () => {
    isValid = true;
    if (email.trim().length == 0) {
      setEmailErr("This is required field");
      seterrorEmailMessage(true);
      isValid = false;
    }
    if (values.password.trim().length == 0) {
      setPasswordErr("This is required field");
      seterrorPasswordMessage(true);
      isValid = false;
    }
    return isValid;
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-container">
      <form className={classes.root} noValidate autoComplete="off">
        <div className="inner-header">
          <FundooLogo />
          <p className="sigh-Name">Sign In</p>
          <p className="use">Use Your Fundoo Account</p>
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
          <div className="password-field">
         
            <TextField
              required
              className="pass"
              id="outlined-password-input"
              error={isvalidPassword}
              helperText={passwordErr}
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              value={values.ftpassword}
              onBlur={(e) => {
                validatePassword(e.target.value);
              }}
              onChange={handleChange('password')}
               InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
            />
            <Link to="/forgotpassword">
            <Button
              className="link"
              color="primary"
            >
              Forgot password?
            </Button>
            </Link>
          </div>
        </div>
        <div className="button">
          <div className="ancor-button">
            <Link to="/register">
            <Button
              className="link2"
              color="primary"
            >
              Create Account
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
