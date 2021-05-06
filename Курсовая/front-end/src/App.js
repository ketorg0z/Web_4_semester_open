import React from "react"
import "./style.css"

class App extends React.Component{
render() {
    return (
      <div>
        
  
        <main>
          {this.props.children}
        </main>  
        
      </div>
    );
  }
}
export default App