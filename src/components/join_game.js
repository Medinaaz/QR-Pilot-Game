import React from "react";
import Navbar from "./navbar"

class JoinGame extends React.Component {
    constructor(){
        super()
        this.state = {
            show_modal: true,
            game_code: "",
            invalid_code: false
        }
    }

    join = () => {
        console.log(this.state)
        if (this.state.game_code === "") {
            return;
        } 
        //TODO do something logical
        this.props.history.push("play-game")
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    close = () => {
        this.props.history.push("home")
    }

    render(){
        return(
            <div >
                <Navbar />
                <div className={"modal modal-md " + (this.state.show_modal=== true ? "active" : "")}>
                    <a href="/#" className="modal-overlay" aria-label="Close"> </a>
                    <div className="modal-container">
                        <div className="modal-header">
                        <button onClick={this.close} className="btn btn-clear float-right" aria-label="Close"></button>
                        <div className=" p-centered text-primary modal-title h5"> Join game and start collecting QRs</div>
                        </div>
                        <div className="modal-body">
                        <div className="input-group">
                            <input type="text" 
                                    className="form-input input-lg" 
                                    placeholder="Enter game code"
                                    name="game_code"
                                    onChange={this.handleChange}
                                    value={this.state.game_code}
                                    />
                            <button className="btn btn-primary btn-lg input-group-btn" onClick={this.join}>Join Game</button>
                        </div >
                        {this.state.invalid_code ? <p className="text-error">Could not find any game with this code</p>: ""}
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default JoinGame;