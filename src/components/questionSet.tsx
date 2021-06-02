import React, { useRef, useState, MutableRefObject, useEffect } from 'react';

function QuestionSet(props: any) {

  const firstInput = useRef() as MutableRefObject<HTMLInputElement>;
  const secondInput = useRef() as MutableRefObject<HTMLInputElement>;
  
  const [allowToCheck, setAllowToCheck] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    if (firstInput.current !== null) {
      firstInput.current.value = '';
      secondInput.current.value = '';
    }
    setUserAnswer('');
    setAllowToCheck(false);
  }, [props.task]);

  const checkAnswer = () => {
    const fv = parseInt(firstInput.current.value);
    const sv = parseInt(secondInput.current.value);

    setUserAnswer('');
    if(props.task.row === fv && props.task.column === sv){
      setUserAnswer('correct');
    }
    else {
      setUserAnswer('incorrect');
    }
  }

  const validateToAllowChecking = () => {
    const fv = firstInput.current.value;
    const sv = secondInput.current.value;
    setUserAnswer('');

    if(fv !== '' && sv !== '') {
      setAllowToCheck(true);
    } else {
      setAllowToCheck(false);
    }
  }

  return (
    <div className="QuestionSet">
      <div className="greyBox">
        <span dangerouslySetInnerHTML={{ __html: props.task['label'][props.language] }}></span>
        <span dangerouslySetInnerHTML={{ __html: props.task['question'][props.language] }}></span>
        {
          (props.task['getuserinput']) &&
          <>
            <div className="innerBox">
              <span>
                <label>{props.langLabels['rows']}:</label> <input type="text" ref={firstInput} onKeyUp={validateToAllowChecking} />
              </span>
              <span>
                <label>{props.langLabels['columns']}:</label> <input type="text" ref={secondInput} onKeyUp={validateToAllowChecking} />
              </span>
            </div>
            <button
              className={"checkBtn_QS " + (allowToCheck ? '' : 'disable')}
              onClick={checkAnswer}
              tabIndex={allowToCheck ? 0: -1}
            >
              {props.langLabels['check']}
            </button>
            <span className={"feedbackText " + (userAnswer)}>
            {
              (userAnswer === 'correct') &&
                <>{props.langLabels['correct']}!</>
            }
            {
              (userAnswer === 'incorrect') &&
                <>{props.langLabels['tryagain']}</>
            }
          </span>
          </>
        }
      </div>
      {
        // (props.task['outcome']) &&
        // <div className="outcomeBox">
        //   <span>Outcome:</span>
        //   <span dangerouslySetInnerHTML={{ __html: props.task['outcome'] }}></span>
        // </div>
      }
    </div>
  );

}

export default QuestionSet