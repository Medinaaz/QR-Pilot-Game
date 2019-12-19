import React from "react";
import { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Navbar from "./navbar"
import {Container} from "@material-ui/core";
import Sky from 'react-sky';



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
                    <Paper style={{ padding: 16 }}>
                        <Grid container alignItems="flex-start">
                            <Grid item xs={2}>
                                <Paper style={{width:100, marginLeft:20}}>
                                    <Grid container alignItems="flex-start">
                                        <b>PROFILE SETTINGS</b>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper style={{width:450, marginLeft:2,marginRight:1,height:"500"}}>
                                    <Grid container alignItems="flex-start">
                                        <h5 style = {{color: "MediumSeaGreen", justifyContent:"center",paddingTop:"5%"}} >USER PROFILE </h5>
                                        <div style={{paddingTop: "15%",paddingRight:"2%",paddingLeft:"3%"}}>
                                            <button onClick={this.submit_data} className="btn btn-info">Game History</button>
                                        </div>
                                        <div style={{paddingTop: "15%",paddingRight:"2%",paddingLeft:"3%"}}>
                                            <button onClick={this.submit_data} className="btn btn-info">Edit Profile</button>
                                        </div>
                                        <div style={{paddingTop: "5%",paddingRight:"2%",paddingLeft:"33%"}}>
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
                                <Paper style={{width:350, marginLeft:50}}>
                                    <Grid container alignItems="flex-start">
                                        <h6 style = {{color: "MediumSeaGreen"}} >GAME HISTORY</h6>
                                        <div style={{paddingTop: "15%",paddingRight:"2%",paddingLeft:"3%"}}>
                                            <h6 style = {{color: "MediumSeaGreen"}} >GAME HISTORY</h6>
                                        </div>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </div>
        );
    }
}