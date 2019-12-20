import React,{Component} from 'react';
import qrcode from "../qr-code.png";
import {BrowserRouter as Router, NavLink} from "react-router-dom";
import axios from "axios";
import config from "../config";

class SignUp extends Component{
    constructor() {
        super();

        this.state = {
            username: '',
            email: '',
            password: '',
            secretQuestion: '',
            secretAnswer: ''
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

    async handleSubmit(e) {
        e.preventDefault();

        console.log("state", this.state);

        const res = await axios({
            method: 'post',
            url: config.SIGNUP_URL,
            headers: {'Content-Type': 'application/json'},
            data: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                secretQuestion: this.state.secretQuestion,
                secretAnswer: this.state.secretAnswer,
            }
        });

        console.log(res);

        if (res.data.success) {
            this.props.history.push("/login");
        }
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
                        <form onSubmit={this.handleSubmit} className="FormFields" >

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="username">Username </label>
                                <input type="text" id="username" className="FormField__Input" placeholder="Enter your username"
                                       name="username" value={this.state.username} onChange={this.handleChange}/>
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="email">Email </label>
                                <input type="text" id="email" className="FormField__Input" placeholder="Enter your email"
                                       name="email" value={this.state.email} onChange={this.handleChange}/>
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="password">Password </label>
                                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password"
                                       name="password" value={this.state.password} onChange={this.handleChange}/>
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="secretq">Secret Question </label>
                                <input type="text" id="secretq" className="FormField__Input" placeholder="Enter your secret question"
                                       name="secretQuestion" value={this.state.secretQuestion} onChange={this.handleChange}/>
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="secreta">Secret Answer </label>
                                <input type="text" id="secreta" className="FormField__Input" placeholder="Enter your secret answer"
                                       name="secretAnswer" value={this.state.secretAnswer} onChange={this.handleChange}/>
                            </div>

                            <div>
                                <div className="FormField">
                                    <button className="FormField__Button nr-20">Sign Up </button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        );
    }
}
export  default SignUp;
