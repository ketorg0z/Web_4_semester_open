import React from "react"
import "./style.css"
import { Link } from 'react-router'

class MainPage extends React.Component{
render() {
    return (
      <div class="App">
        <body>
          <ul>
            <Link to="/Game"><button type="button" class="btn btn-light btn-lg btn-main">Game</button></Link>
            <Link to="/Translate"><button type="button" class="btn btn-light btn-lg btn-main">Translate</button></Link>
          </ul>
        </body>
        
        <main>
          {this.props.children}
        </main> 
      </div>
    );
  }
}

export default MainPage