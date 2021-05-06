import React from "react"
import "./style.css"
import { Link } from 'react-router';

class Translate extends React.Component{
render() {
    return (
      <div class="App">
        <body>
            <main>
            {this.props.children}
            </main>  
            
            <Link href="/">Main</Link>
        </body>
      </div>
    );
  }
}
export default Translate