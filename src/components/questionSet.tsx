import React, { useRef, useState, MutableRefObject, useEffect } from 'react';

function QuestionSet(props: any) {

  const firstInput = useRef() as MutableRefObject<HTMLInputElement>;
  const secondInput = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (firstInput.current !== null) {
      firstInput.current.value = '';
      secondInput.current.value = '';
    }
  }, [props.task]);

  const updateValues = () => {
    const fv = parseInt(firstInput.current.value);
    const sv = parseInt(secondInput.current.value);

    props.qSetAns(false);
    if(props.task.row === fv && props.task.column === sv){
      props.qSetAns(true);
    }
  }

  return (
    <div className="QuestionSet">
      <div className="greyBox">
        <span dangerouslySetInnerHTML={{ __html: "Task " + props.task['number'] + ":" }}></span>
        <span dangerouslySetInnerHTML={{ __html: props.task['question'] }}></span>
        {
          (props.task['getuserinput']) &&
          <div className="innerBox">
            <span>
              <label>rows:</label> <input type="text" ref={firstInput} onKeyUp={updateValues} />
            </span>
            <span>
              <label>columns:</label> <input type="text" ref={secondInput} onKeyUp={updateValues} />
            </span>
          </div>
        }
      </div>
      {
        (props.task['outcome']) &&
        <div className="outcomeBox">
          <span>Outcome:</span>
          <span dangerouslySetInnerHTML={{ __html: props.task['outcome'] }}></span>
        </div>
      }
    </div>
  );

}

export default QuestionSet