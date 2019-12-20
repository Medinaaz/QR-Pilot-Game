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
            viewEdit: false,
            gameInfos: [],
            secretQuestion: " "
        };
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


    componentDidMount() {
        let userId = localStorage.getItem("userId")
        let userToken = localStorage.getItem("token")

        if ((userId === null) || (userToken === null)) {
            this.props.history.push("/login")
        }


        this.setState({
            user_id: userId,
            user_token: userToken,
            username: USERNAME,
            email : EMAIL,
            gameInfos : history
        })
    }


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
                                        <h6 style = {{color: "MediumSeaGreen",fontSize:"25px"}} >EDIT USER PROFILE</h6>
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
