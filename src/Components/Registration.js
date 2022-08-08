import React from 'react';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log('target value: ' + e.target.value);
    console.log('target name: ' + e.target.name);
  };

  render() {
    return (
      <div>
        <form>
          <label>Email:</label>
          <br />
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={(e) => this.handleChange(e)}
            placeholder="Email here..."
          />
          {console.log(this.state.email)}
          <br />

          <label>Password:</label>
          <br />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}
            placeholder="Password here..."
            required
            minLength="8"
          />
          {console.log(this.state.password)}
          <br />
          <br />
          <input
            type="submit"
            value="signup"
            onClick={(e) =>
              this.props.handleSignup(
                e,
                this.state.email,
                this.state.password,
                alert('Sign up Successful :)')
              )
            }
          />

          <input
            type="submit"
            value="login"
            onClick={(e) =>
              this.props.handleLogin(
                e,
                this.state.email,
                this.state.password,
                alert('Login Success')
              )
            }
          />
        </form>
      </div>
    );
  }
}
