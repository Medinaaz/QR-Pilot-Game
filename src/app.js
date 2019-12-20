import React from "react";
import { Route, BrowserRouter as Router} from "react-router-dom";
import CreateGame from "./components/create_game"
import Login from "./components/login"
import ManageGame from "./components/AdminManage"
import PlayGame from "./components/Managegame"
import SignUp from "./components/sign_up"
import Profile from "./components/profile"
import JoinGame from "./components/join_game";
import './App.css';
import ResetPassword from "./components/reset_password";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Route path="/create-game" exact component={CreateGame} />
                <Route path="/manage-game" exact component={ManageGame} />
                <Route path="/play-game" exact component={PlayGame} />
                <Route path="/" exact component={SignUp} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/join-game" exact component={JoinGame} />
                <Route path="/login" exact component={Login} />
                <Route path="/login/reset-password" exact component={ResetPassword}/>

            </Router>
        );
    }
}

export default App;
