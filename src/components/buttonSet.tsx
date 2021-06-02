// import React, {useRef} from 'react';

function ButtonSet(props: any) {

  return (
    <div className="ButtonSet">
      {
        // Previous Task Button
        <button
          className={"navi prev " + (props.updateTask[1] > 0 ? '' : 'disable')}
          onClick={(e) => {
            if(props.updateTask[1] == 1) {
              e.currentTarget.blur()
            }
            props.updateTask[0]('-')
          }}
          tabIndex={(props.updateTask[1] > 0) ? 0 : -1}
        >
          Previous Task
        </button>
      }



      <button onClick={props.toggleDimension[0]} className="mBtns">
          {props.toggleDimension[1] ? props.langLabels['hidedimension'] : props.langLabels['showdimension']}
      </button>

      <button
        className={"mBtns " + (props.toggleQueBuilder[1] ? '' : 'disable')}
        onClick={props.toggleQueBuilder[0]}
        tabIndex={props.toggleQueBuilder[1] ? 0 : -1}
      >
        {props.langLabels['buildequation']}
      </button>

      {
        (props.checkArrBtnEnable) &&
          <button
            className={"mBtns " + (props.checkArrBtnEnable ? '' : 'disable')}
            onClick={props.checkArrayClicked}
          >
            {props.langLabels['checkarray']}
          </button>
      }

      
      {
        // Next Task Button
        <button
          className={"navi next " + (props.updateTask[1] < (props.updateTask[2] - 1) ? '' : 'disable')}
          onClick={(e) => {
            if((props.updateTask[1] + 1) == (props.updateTask[2] - 1)) {
              e.currentTarget.blur();
            }
            props.updateTask[0]('+')
          }}
          tabIndex={(props.updateTask[1] < (props.updateTask[2] - 1)) ? 0 : -1}
        >
          Next Task
        </button>
      }
    </div>
  );
}

export default ButtonSet