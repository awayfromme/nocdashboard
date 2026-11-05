import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import "./Auth.scss";
import ViewOnGithubButton from '../ViewOnGithubButton/ViewOnGithubButton';

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


class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      inviteCode: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      inviteCode: this.state.inviteCode
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="base-wrapper">
      <Typography component="h1" variant="h5">
       Register Below
       </Typography>
       <form className="form" noValidate onSubmit={this.onSubmit}>
              <div>Name</div>
              <TextField
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
                className="auth-input"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <div className="auth-error">
                {errors.name}
                </div>
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
                autoComplete="current-password"
              />
              <div className="auth-error">
                {errors.password}
                </div>
              <div>Invitation code</div>
              <TextField
                onChange={this.onChange}
                value={this.state.inviteCode}
                error={Boolean(errors.inviteCode)}
                id="inviteCode"
                type="password"
                className="auth-input"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Invitation code"
                name="inviteCode"
                autoComplete="off"
              />
              <div className="auth-error">{errors.inviteCode}</div>
                <div>
            <Button
             type="submit" 
             fullWidth
             variant="contained"
             color="primary"
             className="submit"
             >
              Sign Up!
            </Button>
          </div>
           <Grid container>
              <Grid item >
                <Link to="/" variant="body2">
                  Log in!
                </Link>
              </Grid>
              </Grid>
              <Box mt={5}>
            </Box>
        </form>
        <Copyright />
        <ViewOnGithubButton />
      </div>
     
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
