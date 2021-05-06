import React from "react"
import "./style.css"
import { Link } from 'react-router';


const Check1 = () => (
    <div class="form-check">
      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
      <label class="form-check-label" for="flexRadioDefault1">
        Default radio
      </label>
    </div>
)

const Check2 = () => (
  <div class="form-check">
    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
    <label class="form-check-label" for="flexRadioDefault2">
      Default checked radio
    </label>
  </div>
)

class Game extends React.Component{
render() {
    return (
      <div class="App">
        <body>
          <Check1 />
          <Check2 />
        </body>
        <main>
          {this.props.children}
        </main>  
        
        <Link href="/">Main</Link>
      </div>
    )
  }
}
export default Game