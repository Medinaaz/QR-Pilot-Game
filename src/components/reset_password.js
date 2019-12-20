import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import {
    FormGroup,
    FormControl,
    FormLabel
} from "react-bootstrap";
import "./reset_password.css";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            secretq:"",
            secreta:"",
            password: "",
            codeSent: false,
            confirmed: false,
            confirmPassword: "",
            isConfirming: false,
            isSendingCode: false
        };
    }

    validateResetForm() {
        return (
            this.state.code.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSendCodeClick = async event => {
        event.preventDefault();

        this.setState({ isSendingCode: true });

        try {
            await Auth.forgotPassword(this.state.secreta);
            this.setState({ codeSent: true });
        } catch (e) {
            alert(e.message);
            this.setState({ isSendingCode: false });
        }
    };

    handleConfirmClick = async event => {
        event.preventDefault();

        this.setState({ isConfirming: true });

        try {
            await Auth.forgotPasswordSubmit(
                this.state.secreta,
                this.state.password
            );
            this.setState({ confirmed: true });
        } catch (e) {
            alert(e.message);
            this.setState({ isConfirming: false });
        }
    };

    renderRequestCodeForm() {
        return (
            <form onSubmit={this.handleSendCodeClick}>
                <FormGroup bsSize="large" controlId="secreta">
                    <FormLabel>Answer</FormLabel>
                    <FormControl
                        autoFocus
                        type="secreta"
                        value={this.state.secreta}
                        onChange={this.handleChange}
                    />
                </FormGroup>
            </form>
        );
    }

    renderConfirmationForm() {
        return (
            <form onSubmit={this.handleConfirmClick}>

                <FormGroup bsSize="large" controlId="password">
                    <FormLabel>New Password</FormLabel>
                    <FormControl
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup bsSize="large" controlId="confirmPassword">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        type="password"
                        onChange={this.handleChange}
                        value={this.state.confirmPassword}
                    />
                </FormGroup>

            </form>
        );
    }

    renderSuccessMessage() {
        return (
            <div className="success">
                <p>Your password has been reset.</p>
                <p>
                    <Link to="/login">
                        Click here to login with your new credentials.
                    </Link>
                </p>
            </div>
        );
    }

    render() {
        return (
            <div className="ResetPassword">
                {!this.state.codeSent
                    ? this.renderRequestCodeForm()
                    : !this.state.confirmed
                        ? this.renderConfirmationForm()
                        : this.renderSuccessMessage()}
            </div>
        );
    }
}