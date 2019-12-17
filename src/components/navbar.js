import React from "react";
import {withRouter} from "react-router";


class Navbar extends React.Component {
    signout = () => {
        this.props.history.push("/");
    }

    go = (link) => {
        const fn = () =>{
            this.props.history.push(link);
        }
        return fn.bind(this);
    }

    render(){
        return(
            <header className="navbar">
                <section className="navbar-section">
                    <button onClick={this.go("/create-game")} className="btn btn-link navbar-brand mr-1">Create Game</button>
                    <button onClick={this.go("/join-game")} className="btn btn-link navbar-brand mr-1">Join Game</button>
                </section>
                <section className="navbar-center">
                    <h3 className="text-primary"> QR PILOT </h3>
                </section>
                <section className="navbar-section">
                    <button href="" onClick={this.go("/profile")} className="btn btn-link navbar-brand mr-1">Profile</button>
                    <button href="" onClick={this.signout} className="btn btn-link navbar-brand mr-1">Sign Out</button>
                </section>
            </header>
        )
    }
}


export default withRouter(Navbar)