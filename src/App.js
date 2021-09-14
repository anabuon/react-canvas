import React, { useEffect, useState } from 'react'
import Square from './Square'
import fs from 'fs'

// fs.readFile(file, 'utf8' , (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(data)
// })


function App() {

 
const file = './input.txt'
const array = fs.readFileSync(file).toString().split("\n");
console.log(array);



const [data, setData] = useState([])


const calc = () => {
  const temp = []
  let count = 1
  let x = 6
  let y = 3
  for(let i = 0; i < 18; i++) {
    temp.push( {x:count, y})
    if(count === x) {
      y -= 1
      count = 1
    } else {
      count += 1
    }
  }
  return temp
}
useEffect(()=> {
  setData(calc())
}, [])
console.log(data)
return (

      <div style={{width: 20*6, height: 20*3}}>
        {data.length > 0 ? data.map((el) => {
          return (<Square x={el.x} y={el.y} key={`${el.x}${el.y}`}/>)}) 
        : null}
        
        
      </div>

);
}

export default App