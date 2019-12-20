import React, {useState} from 'react';
import './Managegame.css';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, Circle } from "react-google-maps"
import QrReader from 'react-qr-reader'
import LocTracker from "./loc_tracker.js"

//This structure may be changed
var radius = 300;
var lat = 41.013000;
var lng = 28.974800;

//Data Types may be changed
const data = [
    {gametype:"hint", time: "Dec 19, 2019 22:00:00", id:1, owner:true, username: 'Player1',avatar: "https://picturepan2.github.io/spectre/img/avatar-1.png", score:1, lat:41.014000, lng:28.974800},
    {gametype:"hint", time: "Dec 19, 2019 22:00:00",id:2, owner:false, username: 'Player2',avatar:"https://picturepan2.github.io/spectre/img/avatar-2.png", score:2, lat:41.015000, lng:28.975000},
    {gametype:"hint", time: "Dec 19, 2019 22:00:00",id:3, owner:false, username: 'Player3',avatar:"https://picturepan2.github.io/spectre/img/avatar-4.png", score:3, lat:41.013500, lng:28.974100},
    {gametype:"hint", time: "Dec 19, 2019 22:00:00",id:4, owner:false, username: 'Player4',avatar:"https://picturepan2.github.io/spectre/img/avatar-3.png", score:4, lat:41.013000, lng:28.974900},
    {gametype:"hint", time: "Dec 19, 2019 22:00:00",id:5, owner:false, username: 'Player5',avatar:"https://picturepan2.github.io/spectre/img/avatar-1.png", score:5, lat:41.010000, lng:28.974880},
    {gametype:"hint", time: "Dec 19, 2019 22:00:00",id:6, owner:false, username: 'Player6',avatar:"https://picturepan2.github.io/spectre/img/avatar-2.png", score:6, lat:41.013000, lng:28.972500}
];

const userInfo = [
    {gametype:"time", time: "Dec 20, 2019 22:00:00",id:5, owner:false, username: 'Player5',avatar:"https://picturepan2.github.io/spectre/img/avatar-1.png", score:5, lat:41.010000, lng:28.974880}
];

function Map(){
    //lat lg state
  
   // const google=window.google;
    const [number, desc] = useState(null);
    const area = {
        radius: 300,
        options: {
          strokeColor: "#ff0000"
        }
      };
    return(
        <GoogleMap defaultZoom={15} 
        defaultCenter={{lat: 41.013000, lng: 28.974800}}
        
        >
        <Marker key="1" position={{lat: 41.013000, lng: 28.974800}}
        onClick={()=> {
           // desc(this);
        }}
        />
        {data.map((item, key) => <Marker key={item.username} position={{lat: item.lat, lng: item.lng}}
        onClick={()=> {
            desc(item);
        }}/>
        )}

        <Circle
            defaultCenter={{
                lat: parseFloat(41.013000),
                lng: parseFloat(28.974800)
            }}
            radius={area.radius}
            options={area.options}
            />

        {number && (
            <InfoWindow position={{
                lat:number.lat , lng: number.lng
            }}
            onCloseClick={() => {
                desc(null);
            }}
            >
            <div style={{fontWeight:"bold"}}>
            <figure className="avatar">
            <img src={number.avatar} alt="Avatar">
            
            </img> 
            {number.owner?<img src="./star.png" className="avatar-icon" alt="Star"/>:null}
            </figure>
            {number.username}
            </div></InfoWindow>
        )}

        </GoogleMap>
        
    );

}

const WrappedMap = withScriptjs(withGoogleMap(Map));
let timee;
var countDownDate;
class Managegame extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            gameName:'Yakup\'s Hunger Games',
            playerNumber:4,
            totalQR:24,
            findingQR:12,
            hintContent:"Deneme",
            gameType:"Remaining",
            playerData: [],
            leaderboard:"",
            remainingTime:"",
            x:"",
            qrData:"",
            qrDiv:""
        }
        this.changeTime = this.changeTime.bind(this);
        this.closeWarning = this.closeWarning.bind(this);
        this.openCamera = this.openCamera.bind(this);

    }
    openCamera(){
        console.log("girdi");
        var content =<div className="modal active" id="modal-id">
        
        <div className="modal-container">
          <div className="modal-header">
            <a href="/manage-game" className="btn btn-clear float-right" aria-label="Close"></a>
            <div className="modal-title h5">Scan The QR Code</div>
          </div>
          <div className="modal-body">
            <div className="content">
            <QrReader
                delay={300}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: '80%' }}
                />
                <p>{this.state.qrData}</p>
            </div>
          </div>

          <div className="modal-footer">
          <p>{this.state.qrData}</p>
          <button className="btn btn-primary">Submit</button>
          &nbsp;&nbsp;
          <a href="/manage-game" className="btn" aria-label="Close">Close</a>
         
        </div>
          
        </div>
      </div>

      this.setState({qrDiv: content})
    }
    handleScan = data => {
        if (data) {
          this.setState({
            qrData: data
          })
        }
        alert(this.state.qrData);
      }

      handleError = err => {
        console.error(err)
      }
      
    changeTime(){
         // Get today's date and time
         var now = new Date().getTime();
            
         // Find the distance between now and the count down date
         var distance = countDownDate - now;
             
         // Time calculations for days, hours, minutes and seconds
         var days = Math.floor(distance / (1000 * 60 * 60 * 24));
         var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
         var seconds = Math.floor((distance % (1000 * 60)) / 1000);
 
         this.setState({
             remainingTime: days + "d " + hours + "h "
             + minutes + "m " + seconds + "s "
         })

         // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(timee);
            this.setState({
            remainingTime: "Game Over"
        })
    }

        const content = <div>
        Remaining time is 
        <div className="timeBox">
        {this.state.remainingTime}
        </div>
        </div>
        this.setState({ leaderboard: content})
    }
    
    closeWarning(){
        console.log("what");
        this.setState({x:""})
    }
   componentDidMount() {

        data.sort((a, b) => Number(b.score) - Number(a.score));
        console.log("descending", data);
        this.setState({playerData: data})
        var y;

        //It can be controlled in a time interval.

        var latDiff = (userInfo[0].lat - lat)*(userInfo[0].lat - lat)
        var lngDiff = (userInfo[0].lng - lng)*(userInfo[0].lng - lng)
        var result = Math.sqrt(latDiff+lngDiff)*100000
        
        if(result > radius){
          
            console.log("result");
                y =<div className="toast toast-warning" style={{textAlign:'center'}}>
                <button className="btn btn-clear float-right" onClick={this.closeWarning}></button>
                    <p>Warning!!</p>
                    You are out of the area!!!
            </div>  
            
        }
         
       this.setState({x:y})


        if(userInfo[0].gametype==="hint"){
            const content = <div>Remaining number of QRs is {this.state.totalQR - this.state.findingQR}
            <br></br>
            <div className="bar bar-lg">
            <div className="bar-item" role="progressbar" style={{width: (this.state.findingQR*100)/this.state.totalQR+'%', 
            background: '#2196f3'}} aria-valuenow= {(this.state.findingQR*100)/this.state.totalQR} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            </div>
            this.setState({ leaderboard: content})
        }
        else if (userInfo[0].gametype==="time"){
            countDownDate = new Date(userInfo[0].time).getTime();
            timee = setInterval(this.changeTime, 1000);
        }

   }
    render() {
       
        return (
            //&key=AIzaSyBN9jFsxQ7fF3czjlbT359QOchyU9Cnu-s 
            <div className="flex-centered">  <LocTracker time={5000}/> {this.state.x}
            {this.state.qrDiv}
           
                <div className="card">   
                        <div className="header"> 
                            {this.state.qrData} 
                             <p>Playing on "{this.state.gameName}" with {this.state.playerNumber} other players!</p>  
                        </div> 
                        <div className="container">
                        <div className="columns">
                        <div className="column col-8 col-xs-12">
                         
                        <div className="map">
                        <WrappedMap  
                             googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
                            loadingElement = {<div style={{height:"100%"}} />}
                            containerElement = {<div style={{height:"100%"}} />}
                            mapElement = {<div style={{height:"100%"}} />}
                        />
                        </div>
                        </div>
                        
                        <div className="column col-4 col-xs-12">
                            
                            <div className="leaderboard"> 
                            <br/>
                            {this.state.leaderboard}
                            <br></br>
                            Leaderboard
                            <div className="flex-centered" >
                            <ul className="menu">
                                {
                                    data.map((item, key) =>
                                    <li className="menu-item" key={item.id}>
                                        
                                        <div className="tile-icon">
                                        
                                            <figure className="avatar">
                                                <img src={item.avatar} alt="Avatar">
                                                
                                                </img> 
                                                {item.owner?<img src="./star.png" className="avatar-icon" alt="Star"/>:null}
                                            </figure>
                                        </div>
                                        <div className="tile-content">
                                            <p className="tile-title">
                                            {item.username}&nbsp;&nbsp;-&nbsp;&nbsp;<span style={{color:"#FF0000"}}>{item.score}</span>&nbsp;
                                            </p>
                                        </div>
                                        </li>
                                    )
                                }
                            </ul>
                            </div>

                            <br/>
                            Submit a QR
                            <div className="flex-centered" >
                            <button onClick={this.openCamera}><img src="./camera.png" className="img-responsive ..." alt="..."></img></button>
                            </div>
                            <br/>
                            Hint
                            <br/>
                            <div className="popover popover-up">
                                <img src="./hint.png" className="img-responsive ..." alt="..."></img>
                                <div className="popover-container">
                                    <div className="card">
                                    <div className="card-header">
                                        Hint #1
                                    </div>
                                    <div className="card-body">
                                        {this.state.hintContent}
                                    </div>
                                    </div>
                                </div>
                            </div>
                            </div> 
                        </div>
                        </div>
                        </div>
                        
                </div>
            </div>
        )
    }
}

export default Managegame;