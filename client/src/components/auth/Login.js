import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ViewOnGithubButton from '../ViewOnGithubButton/ViewOnGithubButton';
import Typography from '@material-ui/core/Typography';
import "./Auth.scss";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      Powered by awayfromme
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  fillDemoEmail = () => {
    this.setState({ email: "test@test.com" });
  };

  fillDemoPassword = () => {
    this.setState({ password: "test123" });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="base-wrapper">
      <Typography component="h1" variant="h5">
       Sign In
       </Typography>
        <form className="form" noValidate onSubmit={this.onSubmit}>
              <div>Email address</div>
              <TextField
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                type="email"
                className="auth-input"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <div className="auth-error">
                {errors.email}
                {errors.emailnotfound}
              </div>
              <div>Password</div>
              <TextField
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className="auth-input"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
              <div className="auth-error">
                {errors.password}
                {errors.passwordincorrect}
          </div>
          <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          <div>
            <Button
             type="submit" 
             fullWidth
             variant="contained"
             color="primary"
             className="submit"
             >
              Login
            </Button>
          </div>
               <Grid container>
              <Grid item>
                <Link to="register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
        </form>
        <Box mt={5}>
              <Copyright />
              <ViewOnGithubButton />
            </Box>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);