import React, { useEffect, useState} from 'react'
import Square from './Square'


const App = () => {

const [dataDraw, setDataDraw] = useState([])
const [dataInput, setDataInput] = useState([])
const [canvasSize, setCanvasSize] = useState([])
const [arr, setArr] = useState([])



const getIndex = (x, y) => {
  const width = canvasSize[0]
  return width*(y-1)+x-1
}

const drawLine = (x1, y1, x2, y2) => {
    const isVertical = x1 === x2;
    const isHorizontal = y1 === y2;
    const createVector = (a, b) => [Math.min(a, b), Math.max(a, b)];

    if (isVertical) {
        let [start, end] = createVector(y1, y2);
        for (let i = start; i <= end; ++i) {
          arr[getIndex(x1, i)].text = 'x'
        }
    }

    if (isHorizontal) {
        let [start, end] = createVector(x1, x2);
        for (let i = start; i <= end; ++i) {
          arr[getIndex(i, y1)].text = 'x'
        }
    }

}
    

const drawRectangle = (x1, y1, x2, y2) => {
  drawLine(x1, y1, x2, y1)
  drawLine(x2, y1, x2, y2)
  drawLine(x2, y2, x1, y2)
  drawLine(x1, y2, x1, y1)
}

const checkPoints = (...point) => {
  const [width, height] = canvasSize
  const abs = point.filter((e, i) => !(i % 2))
  const ord = point.filter((e, i) => i % 2)

  return (
      abs.every(e => e >= 1 && e <= width) &&
      ord.every(e => e >= 1 && e <= height)
  )
};

    const fill = (x, y, color) => {
          const point = { x: +x, y: +y }
          const queue = []
          const checkPixels = {}
          queue.push(point)

          if (color === 'o')  color = '#808000'
          if (color === 'f') color = '#FA8072'

          while (queue.length) {
              let { x, y } = queue.pop();
              const pixelKey = `${x}-${y}`
  
              if (checkPoints(x, y) && !checkPixels[pixelKey]) {
                  const pixel = arr[getIndex(x, y)].text
                  checkPixels[pixelKey] = true
  
                  if (pixel !== 'x') {
                      arr[getIndex(x, y)].color = color
                      queue.push({ x: x + 1, y })
                      queue.push({ x: x - 1, y })
                      queue.push({ x, y: y + 1 })
                      queue.push({ x, y: y - 1 })
                  }
              }
          }
  }


useEffect(() => {
  if(canvasSize.length > 0) {
    const [width, height] = canvasSize
    const arr = new Array(width*height).fill().map(e => ({text: '', color: ''}))
    setArr(arr)
    
  }  
}, [canvasSize])

useEffect(()=> {
  const fetchData = async () => {
    const data = await fetch('http://localhost:5000')
    const result = await data.json()
    const canvasSize = result.readFile[0]?.match(/\d+/g)
    setCanvasSize(canvasSize)
    setDataInput(result.readFile)

  }

  fetchData()
}, [])


useEffect(()=> {
  const dataNum = dataInput.map((e, index) => {
    return e.match(/[\dof]+/g)
  })
  for (let i = 1; i <= dataInput.length - 1; i++) {
  const [x1, y1, x2, y2] = dataNum[i]
  const [x, y, color] = dataNum[i]
 

    if (dataInput[i][0] === 'L' ) {
      drawLine(+x1, +y1, +x2, +y2)
    }
    if (dataInput[i][0] === 'R'){
      drawRectangle(+x1, +y1, +x2, +y2)
    }
    if (dataInput[i][0] === 'B') {
      fill(x, y, color)
    }
  }
  setDataDraw(arr)
}, [canvasSize, dataInput])


const style = {
  width: `${42*canvasSize[0]}px`,
  display: 'flex',
  flexWrap: 'wrap',
}

return (

      <div style={style}>
        {dataDraw.length > 0 ? dataDraw.map((el, index) => {
             return (<Square color={el.color} key={index} text={el.text}/>)}) 
        : null}
      </div>

);
}

export default App
