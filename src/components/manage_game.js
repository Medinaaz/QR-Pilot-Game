import React, {useState} from 'react';
import './Managegame.css';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps"

function Map(){

    const [number, desc] = useState(null);

    return(
        <GoogleMap defaultZoom={10} 
        defaultCenter={{lat: 41.013000, lng: 28.974800}}
        >
        
        
        <Marker key="1" position={{lat: 41.013000, lng: 28.974800}}
        onClick={()=> {
            desc(this);
        }}
        />

        {number && (
            <InfoWindow position={{lat: 41.013000, lng: 28.974800}}
            ><div>Hit details</div></InfoWindow>
        )}
        </GoogleMap>
        
    );

}

const data = [
    {id:1, owner:'true', username: 'Player1',avatar: "https://picturepan2.github.io/spectre/img/avatar-1.png", score:1},
    {id:2, owner:'false', username: 'Player2',avatar:"https://picturepan2.github.io/spectre/img/avatar-2.png0", score:2},
    {id:3, owner:'false', username: 'Player3',avatar:"https://picturepan2.github.io/spectre/img/avatar-4.png", score:3},
    {id:4, owner:'false', username: 'Player4',avatar:"https://picturepan2.github.io/spectre/img/avatar-3.png", score:4},
    {id:5, owner:'false', username: 'Player5',avatar:"https://picturepan2.github.io/spectre/img/avatar-1.png", score:5},
    {id:6, owner:'false', username: 'Player6',avatar:"https://picturepan2.github.io/spectre/img/avatar-2.png", score:6}
];

const WrappedMap = withScriptjs(withGoogleMap(Map));

class Managegame extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            gameName:'Yakup\'s Hunger Games',
            playerNumber:4,
            totalQR:24,
            findingQR:12,
            hintContent:"Deneme"
        }

    }
   
 
    
    render() {
       
        return (
            //&key=AIzaSyBN9jFsxQ7fF3czjlbT359QOchyU9Cnu-s 
            <div className="flex-centered">  
            
                <div className="page">  
                        <div className="header">  
                             <p>Playing on "{this.state.gameName}" with {this.state.playerNumber} other players!</p> 
                            
                             
                        </div> 
                        <div className="map"> 
                        
                        <WrappedMap  
                             googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
                            loadingElement = {<div style={{height:"100%"}} />}
                            containerElement = {<div style={{height:"100%"}} />}
                            mapElement = {<div style={{height:"100%"}} />}
                        />
                        </div> 
                        <div className="leaderboard"> 
                        <br/>
                        Remaining number of QRs is {this.state.totalQR - this.state.findingQR}
                        <br></br>
                        <div className="bar bar-lg">
                        <div className="bar-item" role="progressbar" style={{width: (this.state.findingQR*100)/this.state.totalQR+'%', 
                        background: '#2196f3'}} aria-valuenow= {(this.state.findingQR*100)/this.state.totalQR} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <br></br>
                        Leaderboard
                         <ul className="menu">
                             {
                                 data.map((item, key) =>
                                 <li className="menu-item" key={item.id}>
                                     
                                     <div className="tile-icon">
                                         <figure className="avatar">
                                            <img src={item.avatar} alt="Avatar">

                                            </img>
                                         </figure>
                                      </div>
                                      <div className="tile-content">
                                        <p className="tile-title">
                                        {item.username}
                                             </p>
                                      </div>
                                     
                                     
                                     </li>
                                )
                               
                             }
                        </ul>

                        <br/>
                        Submit a QR
                        <div className="cameraIcon">

                        </div>
                        <br/>
                        Hint
                        <br/>
                        <div className="popover popover-left">
                        
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
        )
    }
}

export default Managegame;