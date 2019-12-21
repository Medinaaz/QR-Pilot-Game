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


const USERNAME = "medina";
const EMAIL = "medina@gmail.com"
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

    componentDidMount() {
        let userId = localStorage.getItem("userId")
        let userToken = localStorage.getItem("token")
        if ((userId === null) || (userToken === null)) {
            this.props.history.push("/login")
        }}

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


    componentDidMount() {
        let userId = localStorage.getItem("userId")
        let userToken = localStorage.getItem("token")

        if ((userId === null) || (userToken === null)) {
            this.props.history.push("/login")
        }
        this.setState({
            user_id: userId,
            user_token: userToken, //authentication
            username: USERNAME,
            email : EMAIL
        })
    }

    submit_data(e){
        e.preventDefault()
        axios({
            method: 'post',
            data: {
                "username": this.state.username,
                "password": this.state.password,
                "secret" : this.state.secretQuestion
            },
            gameInfos:{
                "game_type": this.state.gameNumber,
                "game_scores":this.state.gameScore,
                "game_rank":this.state.gameScore
            }
        }).then((res)=>{
            if(res.data.success){
                localStorage.setItem("username", this.state.username)
                localStorage.setItem("password", this.state.password)
                localStorage.setItem("password", this.state.secretQuestion)
            }
        }).catch( (err) => {
            console.log("err", err);
        })}

    render() {
        return (
            <div className="cComponent" style={divStyle} >
            <div>
            <Navbar/>
            <Sky
        images ={{
            0:myImage
        }}
        how={130} /* Pass the number of images Sky will render chosing randomly */
        time={40} /* time of animation */
        size={'50px'} /* size of the rendered images */
        /*background={'palettedvioletred'} /* color of the background */
        />
        <Grid container alignItems="flex-start">
            <Grid item xs={4}>
            <Paper style={{width:300, marginLeft:100,marginRight:1,height:350,marginTop:100}}>
    <Grid container alignItems="flex-start">
            <div style={{paddingTop: "8%",paddingRight:"2%",paddingLeft:"10%"}}>
    <h5 style = {{color: "MediumSeaGreen", justifyContent:"center",fontSize:"25px"}} >USER PROFILE </h5>
        <h5 style = {{color: "MediumSeaGreen", justifyContent:"center",fontSize:"20px"}} >{this.state.username}</h5>
        <h5 style = {{color: "MediumSeaGreen", justifyContent:"center",fontSize:"20px"}} >{this.state.email} </h5>
        <div style={{paddingTop: "15%",paddingRight:"2%",paddingLeft:"3%",size:"lg",width:"90%"}}>
    <button onClick={this.handleEditClick} className="btn btn-success">Edit Profile</button>
        <div style={{paddingTop: "15%",paddingRight:"2%",paddingLeft:"3%"}}>
    <button onClick={this.handleHistoryClick} className="btn btn-success" >History</button>
            </div>
            </div>
            </div>

            </Grid>
            </Paper>
            </Grid>
        {
            !this.state.viewEdit  ? (<Grid item xs={4}>
            <Paper style={{width:500, marginLeft:50,marginTop:100,height:350}}>
        <Grid container alignItems="flex-start">
            <h6 style = {{color: "MediumSeaGreen",fontSize:"25px"}} >GAME HISTORY</h6>
        <table style={{paddingTop: "10%" }} className="table table-striped table-hover">
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
                <tr key = {key}>
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
        </Grid>): (
        /*enter another grid that shows the profile*/
        <Paper style={{width:500, marginLeft:50,marginTop:100,height:350}}>
        <Grid container alignItems="flex-start">
            <h6 style = {{color: "MediumSeaGreen",fontSize:"25px"}} >EDIT</h6>
        <div style={{paddingTop: "10%"}}>

        <div style={{paddingTop: "10%"}}>
        <div className="input-group">
            <input type="text"
            className="form-input input-lg"
            placeholder="Enter new username"
            name="usernameInput"
            onChange={this.handleChange}
            value={this.state.usernameInput}
            />
            </div>
            </div>
            {this.state.user_err ? <p className="text-error">You didn't change your username</p>: ""}

            <div style={{paddingTop: "10%"}}>
            <div className="input-group">
                <input type="text"
                className="form-input input-lg"
                placeholder="Enter new password"
                name="passwInput"
                onChange={this.handleChange}
                value={this.state.passwInput}
                />
                </div>
                </div>
                {this.state.passwInput ? <p className="text-error">You didn't change your password</p>: ""}

                <div style={{paddingTop: "10%"}}>
                <div className="input-group">
                    <input type="text"
                    className="form-input input-lg"
                    placeholder="Enter new secret question"
                    name="secretInput"
                    onChange={this.handleChange}
                    value={this.state.secretInput}
                    />
                    </div>
                    </div>
                    {this.state.passwInput ? <p className="text-error">You didn't change your secret question</p>: ""}
                    <div style={{paddingTop: "15%",paddingLeft:"100%"}}>
                    <button onClick={this.handleSubmitClick} className="btn btn-success" >Submit</button>
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
