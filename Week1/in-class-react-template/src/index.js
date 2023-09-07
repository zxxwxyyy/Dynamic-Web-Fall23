// Import React and ReactDom libraries
import React from 'react'
import ReactDOM from 'react-dom/client'

// Grab root div and store as a var
// Tie React to our root div aka let react control this div
const el = document.getElementById('root')
const root = ReactDOM.createRoot(el)

// Crreate an app component
function App(){
  const name = 'Li'
  const age = 18
  const isHead = false
  let coin = 'tails'
  let flip = Math.random()
  if (flip > 0.5){
    coin = 'heads'
  }
  return (
  <>
    <h1>Hello React!</h1>
    <p>My name is {name} and I am {age} years old</p>
    <p>Coin flip: {coin} </p>
    <button disabled = {false} style ={{color: 'red'}}>Click me</button>
    <input type="number" min={5}/>
  </>
  )
}

// Render it in our react root / root div element from index.html
root.render(<App />)
