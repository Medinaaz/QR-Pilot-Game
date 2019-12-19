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
            text: " "
        };
    }
    clicked(text){
        this.setState({text: text})
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
                        <Grid item xs={2}>
                            <Paper style={{width:150, marginLeft:20,marginTop:100}}>
                                <Grid container alignItems="flex-start">
                                    <h1 style = {{color: "MediumSeaGreen", justifyContent:"center",fontSize:"20px"}} >Profile Settings </h1>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper style={{width:450, marginLeft:2,marginRight:1,height:"500",marginTop:100}}>
                                <Grid container alignItems="flex-start">
                                    <h5 style = {{color: "MediumSeaGreen", justifyContent:"center",fontSize:"25px"}} >USER PROFILE </h5>
                                    <div style={{paddingTop: "15%",paddingRight:"2%",paddingLeft:"3%"}}>
                                        <button onClick={this.submit_data} className="btn btn-success">Edit Profile</button>
                                    </div>
                                    <div style={{paddingTop: "15%",paddingRight:"2%",paddingLeft:"3%"}}>
                                        {this.state.text}
                                        <button onClick={(e)=>this.clicked("hello")} className="btn btn-success">History </button>
                                    </div>
                                    <div style={{paddingTop: "5%",paddingRight:"1%",paddingLeft:"40%"}}>
                                        <div className="form-group">
                                            <div style={{textAlign: "center",fontSize:"25px"}}>
                                                <label htmlFor="exampleFormControlSelect2"></label>
                                                <select multiple className="form-control" id="exampleFormControlSelect2">
                                                    <option>Player 1</option>
                                                    <option>Player 2</option>
                                                    <option>Player 3</option>
                                                    <option>Player 4</option>
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper style={{width:500, marginLeft:50,marginTop:100}}>
                                <Grid container alignItems="flex-start">
                                    <h6 style = {{color: "MediumSeaGreen",fontSize:"25px"}} >GAME HISTORY</h6>
                                    <div style={{paddingTop: "10%" ,paddingRight:"25%"}}>
                                        <h5 style = {{color: "DarkCyan"}} >Game         X</h5>
                                        <h5 style = {{color: "DarkCyan"}} >Game         X</h5>
                                        <h5 style = {{color: "DarkCyan "}} >Game         X</h5>
                                        <h5 style = {{color: "DarkCyan "}} >Game         X</h5>
                                        <h5 style = {{color: "DarkCyan "}} >Game         X</h5>
                                    </div>
                                    <div style={{paddingTop: "10%" }}>
                                        <h5 style = {{color: "LightSlateGrey"}} >Score         X</h5>
                                        <h5 style = {{color: "LightSlateGrey"}} >Score         X</h5>
                                        <h5 style = {{color: "LightSlateGrey"}} >Score         X</h5>
                                        <h5 style = {{color: "LightSlateGrey"}} >Score         X</h5>
                                        <h5 style = {{color: "LightSlateGrey"}} >Score         X</h5>
                                    </div>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
