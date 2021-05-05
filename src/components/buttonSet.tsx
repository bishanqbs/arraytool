// import React, {useRef} from 'react';

function ButtonSet(props:any) {
  
  return (
      <div className="ButtonSet">
        <div onClick={props.toggleDimension[0]}>{props.toggleDimension[1] ? 'Hide dimensions' : 'Show dimensions'}</div>
        <div onClick={props.toggleQueBuilder}>Build equation</div>
        <div className={props.checkArrayBtn ? '' : 'disable'}>Check array</div>
      </div>
  );
}

export default ButtonSet