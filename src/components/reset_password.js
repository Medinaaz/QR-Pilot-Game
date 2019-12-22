import React, { Component } from "react";
import config from "../config";
import axios from "axios";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            secretq:"",
            secreta:"",
            password: "",
            username: "",
            real_secret_answer: "",
            answer_confirmed: false,
            confirmation_error: false
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    submitAnswer = (e) => {
        e.preventDefault()
        if (this.state.real_secret_answer === this.state.secreta) {
            this.setPassword({
                answer_confirmed: true
            })
        } else {
            this.setPassword({
                answer_confirmed: false,
                confirmation_error: true
            })
        }
    }

    setPassword = (e) => {
        e.preventDefault()
    }

    fetchQ  = (e) => {
        e.preventDefault()
        axios({
            method: 'get',
            url: config.PROFILE_URL + this.state.username, //TODO: this does not work
            headers: {'Content-Type': 'application/json',
                'Authorization': null},
        }).then( (res) => {
            if (res.data.success) {
                this.setState({
                    secretq: res.data.secretQuestion,
                    real_secret_answer: res.data.secretAnswer
                }) 
                
            } 
        }).catch((err) => {
            alert(err)
        })
    }
    

    render() {
        return (
            <div className="columns">
                <div className="col-4 col-lg-3 col-md-2"></div>
                <div className="col-4 col-lg-6 col-md-8">
                    <h2 style={{textAlign: "center", paddingTop: "8%"}} className="text-error">Reset Password</h2>
                    <div style={{paddingTop: "5%"}} className="form-group">
                        <div className="input-group" style={{paddingTop: "4%"}}>
                            <input className="form-input input-lg"
                                    placeholder="Username ..."
                                    name="username"
                                    onChange={this.handleChange}
                                    value={this.state.username}/>
                            <button className="btn btn-primary btn-lg input-group-btn">Fetch Question</button>
                        </div>

                        <div style={{paddingTop: "4%"}}>
                        <input className="form-input input-lg"
                                placeholder="Secret Question"
                                name="secretq"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.secretq}>
                        </input>
                        </div>

                        <div style={{paddingTop: "4%"}}>
                        <input className="form-input input-lg"
                                placeholder="Secret Answer"
                                name="secreta"
                                type="text"
                                value={this.state.secreta}/>
                        </div>
                        <div style={{paddingTop: "2%"}}>
                            <button className="btn btn-success btn-lg">Submit</button>
                        </div>
                        {this.state.confirmation_error? <p className="text-error">Secret answer is wrong</p>: ""}
                    </div>
                </div>
                <div className="col-4 col-lg-3 col-md-2"></div>
            </div>
        );
    }
}