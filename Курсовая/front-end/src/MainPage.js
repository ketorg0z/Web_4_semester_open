import React from "react"
import "./style.css"
import { Link } from 'react-router'

class MainPage extends React.Component{
render() {
    return (
      <div class="App">
        <body>
          <ul>
            <button type="button" class="btn btn-light btn-lg"><Link to="/Game">Game</Link></button>
            <button type="button" class="btn btn-light btn-lg"><Link to="/Translate">Translate</Link></button>
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