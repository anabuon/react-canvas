export const calc = () => {
    

    const temp = []
    let countX = 1
    let countY = 1
    let  x = 20
    let  y = 4
    for(let i = 0; i < x*y; i++) {

      temp.push( {x: countX, y: countY})
      if(countX === x) {
        countY +=  1
        countX = 1
      } else {
        countX += 1
      }
    }
    // console.log(temp);
    return temp
}
  

// const temp = []
// let count = 1
// let  x = 6
// let  y = 3
// for(let i = 0; i < x*y; i++) {

//   temp.push( {x:count, y})
//   if(count === x) {
//     y -= 1
//     count = 1
//   } else {
//     count += 1
//   }
// }
// return temp
