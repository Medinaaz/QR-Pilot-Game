import React from 'react';


class CreateGame extends React.Component {
  constructor(){
    super()
    this.state = {
      hints: ["Hint1", "Hint2", "Hint3", "Hint4"]
    }
  }

  render(){
    return(
      <div className="container">
            <div className="columns">
            <div className="col-2 col-lg-1 col-md-0 col-sm-0 col-xs-0"></div>

            <div className="col-4 col-lg-5 col-md-6 col-sm-6 col-xs-6">
            <div style={{paddingTop: "10%", display: "flex", justifyContent: "center"}}>
              <h1>Manage Hints</h1>
            </div>
                   
            <table style={{paddingTop: "10%" }} className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Hints</th>
                </tr>
              </thead>
              <tbody>
                {this.state.hints.map(item => <tr>
                                                <td>{item}</td>
                                              </tr>)}
              </tbody>
            </table>
            <div class="input-group">
              <input type="text" class="form-input" placeholder="Enter new hint"/>
              <button class="btn btn-primary input-group-btn">Add Hint</button>
            </div>

            </div>

            <div className="col-4 col-lg-5 col-md-6 col-sm-6 col-xs-6">
              <h1>Hello</h1>
            </div>

            <div className="col-2 col-lg-1 col-md-0 col-sm-0 col-xs-0"></div>
            </div>
        </div>
    )
  }
}

export default CreateGame;
