import React,{Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import qrcode from "../qr-code.png";

class Login extends Component{
    constructor() {
        super();

        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    render() {
        return (
            <div className="App">
                <div className="App__Aside">
                    <img src={qrcode} alt="QR Icon"/>
                </div>
                <div className="App__Form">

                    <div className="PageSwitcher">
                        <NavLink to="/login" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Login </NavLink>
                        <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up </NavLink>
                    </div>

                    <div className="FormTitle">
                        <NavLink to="/login" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Login</NavLink> or <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
                    </div>
                    <div className="FormCenter">
                        <form onSubmit={this.handleSubmit} className="FormFields" onSubmit={this.handleSubmit} >
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="username">Username </label>
                                <input type="text" id="username" className="FormField__Input" placeholder="Enter your username"
                                       name="username" value={this.state.username} onChange={this.handleChange}/>
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="password">Password </label>
                                <input type="text" id="password" className="FormField__Input" placeholder="Enter your password"
                                       name="password" value={this.state.password} onChange={this.handleChange}/>
                            </div>


                            <div className="FormField">
                                <button className="FormField__Button nr-20">Login </button> <Link to="/login/reset-password" className="FormField__Link">Forgot Password?</Link>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}
export default Login;