import React from 'react';
import QRCode from "qrcode.react";
import uuid from "uuid"


class CreateGame extends React.Component {
  constructor(){
    super()
    this.state = {
      hints: [],
      qr_blobs: [],
      hint_input: "",
      game_title: "",
      max_player: "",
      password: "",
      game_desc: "",
      game_type: "Standard",
      latitude: "",
      longitude: "",
      radius: "",
      game_id: uuid.v4(),
      hint_err: false,
      title_err: false,
      desc_err: false,
      geolocation_err: false,
    }
  }

  check_errors = () => {
    this.setState({
      hint_err: this.state.hints.length === 0 ? true : false,
      title_err: this.state.game_title === "" ? true : false,
      desc_err: this.state.game_desc === "" ? true : false,
      geolocation_err: (this.state.radius === "" || this.state.longitude === "" || this.state.latitude === "") ? true : false,
    }, () => {return (this.state.hint_err || this.state.title_err ||this.state.desc_err || this.state.geolocation_err)})

  }

  submit_data = (e) => {
    e.preventDefault()
    if (this.check_errors() !== 0) {
      return;
    } 
    var blobs = []
    for(var i = 0; i < this.state.hints.length; i++){
      blobs.push(this.get_qr_blob(i))
    }
    console.log(this.state)
  }

  download_all = (e) => {
    e.preventDefault()
    for(var i = 0; i < this.state.hints.length; i++)
      this.download_QR(i)
  }

  get_qr_blob = (index) => {
    const canvas = document.getElementById(this.state.hints[index]);
    canvas.toBlob( blob => {
        return blob
     }, 'image/png', 1)
  }

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
    this.setState({
        [e.target.name]: e.target.value
    });
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
            {this.state.hint_err ? <p class="text-error">At least one hint is needed</p>: ""}
            <div style={{paddingTop: "3%" }}>
              <button onClick={this.download_all} className="btn btn-success">Print QR codes <i className="icon icon-download"></i></button>
            </div>

            <div style={{paddingTop: "10%" }}>
              <h5 style = {{color: "blue"}} >The more the merrier! Share this link with friends :)</h5>
              <u style= {{color: "blue"}}> {`https://share.qrpilot/invite/${this.state.game_id}`}</u>
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
                {this.state.title_err ? <p class="text-error">Title cannot be empty</p>: ""}
                <div style={{paddingTop: "4%"}}>
                  <select  required onChange={this.handleChange} name="game_type" value={this.state.game_type} className="form-select select-lg">
                      <option>Standard</option>
                      <option>Time Rush</option>
                  </select>
                </div>
                <form>

                
                <div style={{paddingTop: "4%"}}>
                  <input className="form-input input-lg"
                            placeholder="Maximum Player (Optional)"
                            name="max_player"
                            type = "text"
                            pattern="[0-9]+"
                            onChange={this.handleChange}
                            value={this.state.max_player}/>
                </div>
                <div style={{paddingTop: "4%"}}>
                  <input className="form-input input-lg"
                            placeholder="Set Password (Optional)"
                            name= "password"
                            type = "text"
                            onChange={this.handleChange}
                            value={this.state.password}/>
                </div>
                <form style={{paddingTop: "4%"}} class="form-horizontal">
                <div class="form-group">
                    <div class="col-4 col-sm-12">
                      <input class="form-input" type="text" name="latitude" placeholder="Center Latitude"
                        onChange={this.handleChange}
                        value={this.state.latitude}/>
                    </div>
                    <div class="col-4 col-sm-12">
                      <input class="form-input" type="text" name="longitude" placeholder="Center Longitude"
                        onChange={this.handleChange}
                        value={this.state.longitude}/>
                    </div>
                    <div class="col-4 col-sm-12">
                      <input class="form-input" type="text" name="radius" placeholder="Radius in meters"
                        onChange={this.handleChange}
                        value={this.state.radius}/>
                    </div>
                </div>
                {this.state.geolocation_err ? <p class="text-error">All geolocation information must be given</p>: ""}
                </form>
                <div style={{paddingTop: "4%"}}>
                  <textarea className="form-input input-lg"
                            placeholder="Game Description ..."
                            name="game_desc"
                            type = "text"
                            onChange={this.handleChange}
                            value={this.state.game_desc}/>
                </div>
                <div style={{paddingTop: "4%"}}>
                  <button onClick={this.submit_data} className="btn btn-success btn-lg">Create Game</button>
                </div>
                </form>
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
