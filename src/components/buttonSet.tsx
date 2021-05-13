// import React, {useRef} from 'react';

function ButtonSet(props: any) {

  return (
    <div className="ButtonSet">
      <div onClick={props.toggleDimension[0]}>
          {props.toggleDimension[1] ? 'Hide dimensions' : 'Show dimensions'}
      </div>

      <div
        className={props.toggleQueBuilder[1] ? '' : 'disable'}
        onClick={props.toggleQueBuilder[0]}
      >
        Build equation
      </div>

      {
        (props.checkArrBtnEnable) &&
          <div
            className={props.checkArrBtnEnable ? '' : 'disable'}
            onClick={props.checkArrayClicked}
          >
            Check array
          </div>
      }

      {
        // Previous Task Button
        <span className={"navi prev " + (props.updateTask[1] > 0 ? '' : 'disable')} onClick={() => props.updateTask[0]('-')}>
          &larr; Task
        </span>
      }
      {
        // Next Task Button
        <span className={"navi next " + (props.updateTask[1] < (props.updateTask[2] - 1) ? '' : 'disable')} onClick={() => props.updateTask[0]('+')}>
          Task &rarr;
        </span>
      }
    </div>
  );
}

export default ButtonSet