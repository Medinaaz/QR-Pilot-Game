import React from 'react';
import QRCode from "qrcode.react";
import uuid from "uuid"
import Navbar from "./navbar"


const Word2Radius = {
    "Pick Size": 0,
    "Tiny": 40,
    "Small": 80,
    "Medium": 200,
    "Large": 500,
    "Extreme": 1000,
}

const Location2Geo = {
    "Pick Location": {
      latitude: "",
      longitude: ""
    },
    "MED" : {
      latitude: "41.105399",
      longitude: "29.023522"
    },

    "Kadikoy Bull" : {
      latitude: "40.990437",
      longitude: "29.029146"
    },

    "Taksim Square" : {
      latitude: "41.036899",
      longitude: "28.985056"
    },

    "Galata Bridge" : {
      latitude: "41.020069",
      longitude: "28.973243"
    },

    "Uskudar Fountain of Ahmed III" : {
      latitude: "41.026785",
      longitude: "29.015357"
    },

    "Macka Park" : {
      latitude:   "41.042234",
      longitude:  "28.994765"
    }
}

/*
  show share 5 letter code as popover after creation
*/

class CreateGame extends React.Component {
  constructor(){
    super()
    this.state = {
      //data for backend
      hints: [],
      secrets: [],
      hint_input: "",
      game_title: "",
      game_desc: "",
      game_duration: 0,
      game_type: "Standard",
      latitude: "",
      longitude: "",
      radius: "",
      area_size: "",
      game_location: "",
      //For Error handling
      hint_err: false,
      title_err: false,
      desc_err: false,
      geolocation_err: false,
      game_duration_err: false,
      //is custom location clicked
      custom_location: false,
      //pop share link
      show_share_code: false,
      //TODO set state accordingly (after create game)
      share_code: "Ab5CQr"
    }
  }

  toggle_custom_location = () => {
    this.setState({
      custom_location: !this.state.custom_location
    })
  }

  check_errors = (callback) => {
    this.setState({
      hint_err: this.state.hints.length === 0 ? true : false,
      title_err: this.state.game_title === "" ? true : false,
      desc_err: this.state.game_desc === "" ? true : false,
      game_duration_err: this.state.game_duration <= 0 ? true: false,
      geolocation_err: (this.state.radius === 0 || this.state.longitude === "" || this.state.latitude === "") ? true : false,
    },() => {
      console.log(this.state)
      callback(this.state.hint_err === true || this.state.title_err === true || this.state.desc_err  === true || this.state.geolocation_err === true ||this.state.game_duration_err === true)
    })
  }

  submit_data = (e) => {
    e.preventDefault()
    this.check_errors((err) => {
      if (!err) {
        var secrets_arr = []
        var i
        for(i = 0; i < this.state.hints.length; i++){
          secrets_arr.push(uuid.v4())
        }

        this.setState({
          secrets: secrets_arr
        }, () => {
          var data = {
            "players": "sadhlskdjgskdsa",
            "name": this.state.game_title,
            "adminId": "sadhlskdjgskdsa",
            "type": this.state.game_type,
            "location": {
              "latitude": this.state.latitude,
              "longitude": this.state.longitude,
              "radius": this.state.radius
            },
            "hints": {
              "hintSecret": this.state.secrets,
              "hint": this.state.hints
            },
            "description": this.state.description
          }
          //TODO sent data to backend instead of printing
          console.log(data)
          var game_id = "asdfkjhadlsadl"
          var game_title = this.state.game_title
          localStorage.setItem("game_id", game_id)
          localStorage.setItem("game_title", game_title)
          this.setState({
            show_share_code: true
            })
          })
      } else {
        return ;
      }

    }) 
  }

  download_all = (e) => {
    e.preventDefault()
    for(var i = 0; i < this.state.hints.length; i++)
      this.download_QR(i)
  }

  /*
  May help later
  get_qr_blob = (index) => {
    const canvas = document.getElementById(this.state.hints[index]);
    canvas.toBlob( blob => {
        return blob
     }, 'image/png', 1)
  }
  */

  download_QR = (index) => {
    const canvas = document.getElementById(this.state.hints[index]);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${this.state.hints[index]}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  go = (link) => {
    const fn = () =>{
        this.props.history.push(link);
    }
    return fn.bind(this);
}

  removeHint = (key) => {
    return  () => {
      var arr = this.state.hints
      arr.splice(key, 1)
      this.setState({
          hints: arr
          
      })
    }
  }

  handleChange = (e) => {
    if (e.target.name === "game_location"){
      this.setState({
        game_location: e.target.value,
        latitude: Location2Geo[e.target.value].latitude,
        longitude: Location2Geo[e.target.value].longitude
      })
    } else if (e.target.name === "area_size") {
      this.setState({
        area_size: e.target.value,
        radius: Word2Radius[e.target.value]
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value
    });
    }
  }

  add_hint = () => {
    if (this.state.hint_input === "") {
      return;
    } 
    this.setState({
      hints: this.state.hints.concat(this.state.hint_input),
      hint_input: ""
    })
  }

  render(){
    return(
      <div className="container">
            <Navbar />
            <div className={"modal modal-md " + (this.state.show_share_code === true ? "active" : "")}>
              <a href="/#" className="modal-overlay" aria-label="Close">a</a>
              <div className="modal-container">
                <div className="modal-header">
                  <button onClick={this.go("manage-game")} className="btn btn-clear float-right" aria-label="Close"></button>
                  <div className=" p-centered  modal-title h5">The more the merrier, Share this code with friends :)</div>
                </div>
                  <h2 className = " p-centered text-primary">{this.state.share_code}</h2>
              </div>
            </div>
            <div className="columns">
            <div className="col-2 hide-lg"></div>

            <div className="column">
            <div style={{paddingTop: "10%", display: "flex", justifyContent: "center"}}>
              <h1 className="hide-lg">Manage Hints</h1>
              <h3 className="show-lg">Manage Hints</h3>
            </div>
            
            <table style={{paddingTop: "10%" }} className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Hints</th>
                </tr>
              </thead>
              <tbody>
                {this.state.hints.map((item,key) => 
                  <tr key={key}>
                    <td>{item}</td>
                    <td>
                      <div style={{textAlign: "right"}}>
                      <button onClick={this.removeHint(key)}  className="btn btn-error s-circle">
                        <i className="icon icon-cross"></i>
                      </button>
                      <QRCode style={{display: "none"}}
                          id={item}
                          value={item}
                          size={290}
                          level={"H"}
                          includeMargin={true}
                        />
                      </div>
                    </td>
                  </tr>
                  )}
              </tbody>
            </table>
            <div className="input-group">
              <input type="text" 
                      className="form-input input-lg" 
                      placeholder="Enter new hint"
                      name="hint_input"
                      onChange={this.handleChange}
                      value={this.state.hint_input}
                      />
              <button className="btn btn-primary btn-lg input-group-btn" onClick={this.add_hint}>Add Hint</button>
            </div >
            {this.state.hint_err ? <p className="text-error">At least one hint is needed</p>: ""}
            <div style={{paddingTop: "3%" }}>
              <button onClick={this.download_all} className="btn btn-success">Print QR codes <i className="icon icon-download"></i></button>
            </div>
          
            </div>
            <div className="divider-vert hide-lg" data-content=" "></div>
            <div className="divider show-lg" data-content=" "></div>


            <div className="column">
              <div style={{paddingTop: "10%", display: "flex", justifyContent: "center"}}>
                <h1 className="hide-lg">Game Configuration</h1>
                <h3 className="show-lg">Game Configuration</h3>
              </div>
              <div className="form-group">
                <div style={{paddingTop: "4%"}}>
                  <input className="form-input input-lg"
                          placeholder="Game Title"
                          name="game_title"
                          onChange={this.handleChange}
                          value={this.state.game_title}/>
                </div>
                {this.state.title_err ? <p className="text-error">Title cannot be empty</p>: ""}
                <div style={{paddingTop: "4%"}}>
                  <select  required onChange={this.handleChange} name="game_type" value={this.state.game_type} className="form-select select-lg">
                      <option>Standard</option>
                      <option>Time Rush</option>
                  </select>
                </div>
                <div style={{paddingTop: "2%"}}>
                 <label className="form-label">Game Duration in Minutes</label>
                  <input className="form-input input-lg"
                          placeholder="Game Duration"
                          name="game_duration"
                          type="number"
                          onChange={this.handleChange}
                          value={this.state.game_duration}/>
                  {this.state.game_duration_err ? <p className="text-error">Game duration must be greater than 0 minutes</p>: ""}
                </div>
                

                {
                  this.state.custom_location ? 
                  (<form style={{paddingTop: "4%"}} className="form-horizontal">
                      <div className="form-group">
                        <div className="col-4 col-sm-12">
                          <input className="form-input" type="text"  name="latitude" placeholder="Center Latitude"
                            onChange={this.handleChange}
                            value={this.state.latitude}/>
                        </div>
                        <div className="col-4 col-sm-12">
                          <input className="form-input" type="text" name="longitude" placeholder="Center Longitude"
                            onChange={this.handleChange}
                            value={this.state.longitude}/>
                        </div>
                        <div className="col-4 col-sm-12">
                          <select  onChange={this.handleChange} name="area_size" value={this.state.area_size} className="form-select select-lg">
                            {Object.keys(Word2Radius).map((opt, key) => <option key={key}>{opt}</option>)}
                          </select>
                        </div>
                      </div>
                    </form>
                    )
                      :
                      <div className="form-group">
                        <label className="form-label">Game Area</label>
                        <select onChange={this.handleChange} name="game_location" value={this.state.game_location} className="form-select select-lg">
                          {Object.keys(Location2Geo).map((opt, key) => <option key={key}>{opt}</option> )}
                        </select>
                        <select  onChange={this.handleChange} name="area_size" value={this.state.area_size} className="form-select select-lg">
                          {Object.keys(Word2Radius).map((opt, key) => <option key={key}>{opt}</option> )}
                        </select>
                      </div>
                }
                <div className="form-group">
                  <label className="form-checkbox">
                    <input onClick={this.toggle_custom_location} type="checkbox"/>
                    <i className="form-icon"/>Custom Location
                  </label>
                </div>

                {this.state.geolocation_err ? <p className="text-error">All geolocation information must be given</p>: ""} 
                
                
                
                <div style={{paddingTop: "4%"}}>
                  <textarea className="form-input input-lg"
                            placeholder="Game Description ..."
                            name="game_desc"
                            type = "text"
                            onChange={this.handleChange}
                            value={this.state.game_desc}/>
                </div>
                {this.state.desc_err ? <p className="text-error">Please enter a description</p>: ""}
                <div style={{paddingTop: "4%"}}>
                  <button onClick={this.submit_data} className="btn btn-success btn-lg">Create Game</button>
                </div>
              </div>
            </div>

            <div className="col-2 hide-lg">
            
            </div>
            </div>
        </div>
    )
  }
}

export default CreateGame;
