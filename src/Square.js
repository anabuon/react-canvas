import React from "react";



const Square = (props) =>  {
    
      return (
        <div x={props.x} y={props.y} style={{width: 20, height: 20} }>
       {props.x}
        </div>
      );
    
  }

  export default Square