import React, { useEffect, useState} from 'react'
import Square from './Square'


const App = () => {

const [dataCalc, setDataCalc] = useState([])
const [dataInput, setDataInput] = useState([])

const width = 20

const getIndex = (x, y) => {
  return width*(y-1)+x-1
}

const drawLine = (x1, y1, x2, y2) => {

        const isVertical = x1 === x2;
        const isHorizontal = y1 === y2;
        const createVector = (a, b) => [Math.min(a, b), Math.max(a, b)];

        if (isVertical) {
            let [start, end] = createVector(y1, y2);
            for (let i = start; i <= end; ++i) {
                getIndex(x1, i);
            }
        }

        if (isHorizontal) {
            let [start, end] = createVector(x1, x2);
            for (let i = start; i <= end; ++i) {
              getIndex(i, y1);
            }
        }
   
    }

useEffect(()=> {
  const fetchData = async () => {
    const data = await fetch('http://localhost:5000')
    const result = await data.json()
    setDataInput(result.readFile)

    const arrayCanvas = dataInput[0]?.match(/\d+/g)
    const [width, height] = arrayCanvas
    const arr = new Array(width*height).fill('d')

      setDataCalc(arr)

    //1. достаем размер массива
    //2. создаем массив на основе высоты и ширины
    //3. начинаем обход по массиву из инпута
    //4. и по первому элементу/букве мы вызываемфункцию для отрисовки фигуры
    //5. по завершению цикла сетаем массив клеток в стейт
  }

  fetchData()
}, [])

// useEffect(() => {
//  setDataCalc(calc)
// }, [])

console.log(dataCalc);
const style = {
  // width: `20*${arrayCanvas[0]}px`,
  display: 'flex',
  flexWrap: 'wrap',
}
// console.log(dataCalc);
return (

      <div style={style}>
      {/* <div> */}
        
        {dataCalc.length > 0 ? dataCalc.map((el, index) => {
          console.log(el)
          // return el.map((square, index) => {
            // console.log(square);
             return (<Square key={index}/>)}) 
        : null}
      </div>

);
}

export default App





