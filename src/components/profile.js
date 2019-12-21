import React from "react";
import { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Navbar from "./navbar"
import {Container} from "@material-ui/core";
import Sky from 'react-sky';
import { FaBeer } from 'react-icons/fa';
import Button from "@material-ui/core/Button";
import QRCode from "qrcode.react";
import config from "../config";
import axios from "axios";

const history = [
    {
        "title":"game1",
        "score": 51,
        "rank":1
    },
    {
        "title":"game2",
        "score": 32,
        "rank":2
    },
    {
        "title":"game3",
        "score": 10,
        "rank":3
    },
]

const myImage = require('../components/medii.png');
const imgMyimageexample = require('../components/prof_pic.png');
const divStyle = {
    top: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${imgMyimageexample})`,
    backgroundSize: 'cover',
    position: 'fixed'
};

export default class Profile extends React.Component {
    constructor() {
        super();
        this.state ={
            userId: " ",
            userToken: " ",
            text: " ",
            username: " ",
            email: " ",
            new_username: " ",
            viewEdit: false,
            gameInfos: [],
            gameNumber:" ",
            gameRank: " ",
            gameScore:" ",
            password: " ",
            secretQuestion: " ",
            usernameInput: " ",
            passwInput: " ",
            secretInput: " ",
            user_err: false,
            pass_err: false,
            secret_err: false
        };
        this.submit_data = this.submit_data.bind(this);
    }

    check_errors = (callback) => {
        this.setState({
            user_err: this.state.data.username === 0 ? true : false,
            pass_err: this.state.password === "" ? true : false,
            secret_err: this.state.secret_err === "" ? true : false,
        },() => {
            callback(this.state.user_err === true || this.state.pass_err === true || this.state.secret_err  === true )
        })
    }

    async componentDidMount() {
        let userId = localStorage.getItem("userId");
        let userToken = localStorage.getItem("token");

        if ((userId === null) || (userToken === null)) {
            this.props.history.push("/login")
        }

        try {
            console.log(this.state.userToken);

            const res = await axios({
                method: 'get',
                url: config.PROFILE_URL + localStorage.getItem("userId"),
                headers: {'Content-Type': 'application/json',
                    'Authorization': userToken},
            });

            console.log("respond", res.data.data);

            if (res.data.success) {
                this.setState({
                    username: res.data.data.username,
                    email: res.data.data.email
                })
            }

        } catch (err) {
            console.log("err", err);
        }

    }

    handleHistoryClick  = (e) =>{
        e.preventDefault()
        this.setState({
            viewEdit: false
        })
    }

    handleEditClick  = (e) =>{
        e.preventDefault()
        this.setState({
            viewEdit: true
        })
    }

    handleSubmitClick  = (e) =>{
        e.preventDefault()
        this.setState({
            viewEdit: true
        })
    }

    handleChange = (e) => {
        if (e.target.name === "userInput"){
            this.setState({
                username: e.target.value,
            })
        } else if (e.target.name === "passwInput") {
            this.setState({
                passwInput: e.target.value,
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    };

    async submit_data(e) {
        e.preventDefault();

        const res = await axios({
            method: 'put',
            url: config.PROFILE_URL,
            headers: {'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")},
            data: {
                username: this.state.username,
                password: this.state.password
            }
        });

        console.log(res);
    }

    render()
    {
        return (
            <div className="cComponent" style={divStyle}>
                <div>
                    <Navbar/>
                    <Sky
                        images={{
                            0: myImage
                        }}
                        how={130} /* Pass the number of images Sky will render chosing randomly */
                        time={40} /* time of animation */
                        size={'50px'} /* size of the rendered images */
                        /*background={'palettedvioletred'} /* color of the background */
                    />
                    <Grid container alignItems="flex-start">
                        <Grid item xs={4}>
                            <Paper style={{width: 250, marginLeft: 50, marginRight: 1, height: 300, marginTop: 70}}>
                                <Grid container alignItems="flex-start">
                                    <div style={{paddingTop: "8%", paddingRight: "2%", paddingLeft: "10%"}}>
                                        <h5 style={{
                                            color: "MediumSeaGreen",
                                            justifyContent: "center",
                                            fontSize: "25px"
                                        }}>USER PROFILE </h5>
                                        <h5 style={{
                                            color: "MediumSeaGreen",
                                            justifyContent: "center",
                                            fontSize: "20px"
                                        }}>{this.state.username}</h5>
                                        <h5 style={{
                                            color: "MediumSeaGreen",
                                            justifyContent: "center",
                                            fontSize: "20px"
                                        }}>{this.state.email} </h5>
                                        <div style={{
                                            paddingTop: "15%",
                                            paddingRight: "2%",
                                            paddingLeft: "3%",
                                            size: "lg",
                                            width: "90%"
                                        }}>
                                            <button onClick={this.handleEditClick}
                                                    className="btn btn-success btn-lg">Edit Profile
                                            </button>
                                            <div style={{paddingTop: "15%", paddingRight: "2%", paddingLeft: "1%"}}>
                                                <button onClick={this.handleHistoryClick}
                                                        className="btn btn-success btn-lg">Game History
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </Grid>
                            </Paper>
                        </Grid>
                        {
                            !this.state.viewEdit ? (
                                <Paper style={{width: 350, marginLeft: 10, marginTop: 70, height: 250}}>
                                    <Grid container alignItems="flex-start">
                                        <h6 style={{color: "MediumSeaGreen", fontSize: "25px"}}>GAME HISTORY</h6>
                                        <table style={{paddingTop: "10%"}}
                                               className="table table-striped table-hover">
                                            <thead>
                                            <tr>
                                                <th>Game Title</th>
                                                <th>Score</th>
                                                <th>Rank</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.gameInfos.map((item, key) =>
                                                    <tr key={key}>
                                                        <td>{item.title}</td>
                                                        <td>{item.score}</td>
                                                        <td>{item.rank} </td>
                                                    </tr>
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    </Grid>
                                </Paper>
                            ) : (
                                /*enter another grid that shows the profile*/
                                <Paper style={{width: 350, marginLeft: 10, marginTop: 70, height: 250}}>
                                    <Grid container alignItems="flex-start">
                                        <h6 style={{
                                            color: "MediumSeaGreen",
                                            fontSize: "25px",
                                            marginTop: "5%",
                                            marginLeft: "5%"
                                        }}>EDIT</h6>
                                        <div className="form-group">
                                            <div style={{paddingTop: "5%", paddingLeft: "20%"}}>
                                                <tr>
                                                    <th>Username</th>
                                                </tr>
                                                <input className="form-input input-lg"
                                                       placeholder="Enter new username"
                                                       name="usernameInput"
                                                       onChange={this.handleChange}
                                                       value={this.state.usernameInput}
                                                />
                                            </div>
                                            {this.state.user_err ?
                                                <p className="text-error">You didn't change your username</p> : ""}
                                            <div className="form-group">
                                                <div style={{paddingTop: "5%", paddingLeft: "20%"}}>
                                                    <tr>
                                                        <th>Password</th>
                                                    </tr>
                                                    <input className="form-input input-lg"
                                                           placeholder="Enter new password"
                                                           name="passwInput"
                                                           onChange={this.handleChange}
                                                           value={this.state.passwInput}
                                                    />
                                                </div>
                                                {this.state.pass_err ?
                                                    <p className="text-error">You didn't change your
                                                        password</p> : ""}

                                                <div className="form-group">
                                                    <div style={{paddingTop: "5%", paddingLeft: "20%"}}>
                                                        <tr>
                                                            <th>Secret Question</th>
                                                        </tr>
                                                        <input className="form-input input-lg"
                                                               placeholder="Enter new secret question"
                                                               name="secretInput"
                                                               onChange={this.handleChange}
                                                               value={this.state.secretInput}
                                                        />
                                                    </div>
                                                    {this.state.secret_err ?
                                                        <p className="text-error">You didn't change your secret
                                                            question</p> : ""}

                                                    <div style={{paddingTop: "20%", paddingLeft: "2%"}}>
                                                        <button onClick={this.submit_data}
                                                                className="btn btn-success btn-lg">SUBMIT CHANGES
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Paper>
                            )
                        }
                    </Grid>
                </div>
            </div>
        );
    }
}
