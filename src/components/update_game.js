import React from "react"
import config from "../config";
import axios from "axios";

/*
    props:
        time => update interval
        game_id => id of the game
        onData => callback function for data update


*/

class UpdateGame extends React.Component {
    constructor(){
        super()
        this.state = {
            user_id: "",
            user_token: ""
        }
    }

    getData = () => {
        axios({
            method: 'get',
            url: config.GAME_URL + "/" + this.props.gameId,
            headers: {'Content-Type': 'application/json',
                        'Authorization': this.state.user_token}
            }
        ).then( (res) => {
            if (res.data.success) {
                console.log(res.data)
                this.props.onData((res.data, null))
            } 
        }).catch( (err) => {
            console.log(res.data)
            this.props.onData((null, res.data))
        })
    }

    componentDidMount(){
        var userId = localStorage.getItem("userId")
        var userToken = localStorage.getItem("token")
        this.setState({
          user_id: userId,
          user_token: userToken
        })
        this.interval = setInterval(this.position, this.props.time)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    render(){
        return(<div></div>)
    }
}

UpdateGame.propTypes = {
    time: PropTypes.number.isRequired,
    onData: PropTypes.func.isRequired,
    gameId: PropTypes.string.isRequired
}

export default UpdateGame;