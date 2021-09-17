import React from "react";

const Square = (props) =>  {

  const style = {
    width: 40, 
    height: 40, 
    border: 'solid 1px black',
    textAlign: 'center',
    background: `${props.color}`
  }
  
      return (
        <div style={style}>{props.text}</div>
      );
    
  }

  export default Square
