import React from "react";
import { Route, BrowserRouter as Router} from "react-router-dom";
import CreateGame from "./components/create_game"
import Login from "./components/login"
import ManageGame from "./components/manage_game"
import PlayGame from "./components/play_game"
import SignUp from "./components/sign_up"
import Profile from "./components/profile"
import JoinGame from "./components/join_game";



class App extends React.Component {
    render() {
      return (
        <Router>
            <Route path="/create-game" exact component={CreateGame} />
            <Route path="/manage-game" exact component={ManageGame} />
            <Route path="/play-game" exact component={PlayGame} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/join-game" exact component={JoinGame} />
            <Route path="/" exact component={Login} />
        </Router>
      )
    }
}

export default App