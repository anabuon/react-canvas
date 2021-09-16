import React from "react";

const Square = (props) =>  {
  // console.log(props);
  const style = {
    width: 40, 
    height: 40, 
    border: 'solid 1px black',
    display: 'inline-block'
  }
  
      return (
        <div style={style}>{props.x}</div>
      );
    
  }

  export default Square
