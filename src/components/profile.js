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
                    <Fragment>
                        <Grid container>
                            <Grid item xs={4}>
                                <Grid container justify="center" color={"inherit"}>
                                    <Paper style={{ padding: 20, width: 1730, marginBottom:30, marginTop:30,marginLeft:10}}>
                                        <Typography variant="h6" component="h6" align={"justify"} paragraph={true}>
                                            <b>User Profile</b>
                                        </Typography>

                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4}>
                                <Grid container justify="center" color={"inherit"}>
                                    <Paper style={{ padding: 20, width: 1730, marginBottom:30, marginTop:30,marginLeft:10}}>
                                        <Typography variant="h6" component="h6" align={"justify"} paragraph={true}>
                                            <b>Game History</b>
                                        </Typography>

                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4}>
                                <Grid container justify="center" color={"inherit"}>
                                    <Paper style={{ padding: 20, width: 1730, marginBottom:30, marginTop:30,marginLeft:10}}>
                                        <Typography variant="h6" component="h6" align={"justify"} paragraph={true}>
                                            <b>Burak's crabs</b>
                                        </Typography>

                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Fragment>
                </div>
            </div>
        );
    }
}