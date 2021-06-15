import React, { useRef, useState, MutableRefObject, useEffect} from 'react';

function QuestionBuilder(props: any) {

  const firstInput = useRef() as MutableRefObject<HTMLInputElement>;
  const secondInput = useRef() as MutableRefObject<HTMLInputElement>;
  const answerInput = useRef() as MutableRefObject<HTMLInputElement>;

  const [operator, setOperator] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [allowToCheck, setAllowToCheck] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  const [possibleAnswer, setpPossibleAnswer] = useState([]);

  useEffect(() => {
    setPossibleAnswers(props.array);
  }, [props.array]);

  const setPossibleAnswers = (arr:any) => {
    let tempArr:any = [];

    tempArr.push(arr['row'] + 'x' + arr['column'] + '=' + (arr['row'] * arr['column']));
    tempArr.push(arr['column'] + 'x' + arr['row'] + '=' + (arr['row'] * arr['column']));

    tempArr.push((arr['row'] * arr['column']) + '/' + arr['column'] + '=' + arr['row']);
    tempArr.push((arr['row'] * arr['column']) + '/' + arr['row'] + '=' + arr['column'] );

    setpPossibleAnswer(tempArr);
  }

  const selectOperator = (op:string) => {
    setOperator(op);
    validateToAllowChecking();
  }

  const checkAnswer = () => {
    const fv = parseInt(firstInput.current.value);
    const sv = parseInt(secondInput.current.value);
    const av = parseInt(answerInput.current.value);

    let userSubAnswer:any;
    if(operator === 'm') {
      userSubAnswer = fv + 'x' + sv + '=' + av;
    } else {
      userSubAnswer = fv + '/' + sv + '=' + av;
    }

    let tempAnswer = false;
    
    for (let index = 0; index < possibleAnswer.length; index++) {
      const eachAnswer = possibleAnswer[index];

      if(eachAnswer === userSubAnswer) {
        setUserAnswer('correct');
        tempAnswer = true;
        break;
      }
      setUserAnswer('incorrect');
      tempAnswer = false;
    }

    if(tempAnswer) {
      props.et("buildequationsubmit", "Correct");
    }
    else
    {
      props.et("buildequationsubmit", "Incorrect")
    }

  }

  const validateToAllowChecking = () => {
    setDropdown(false);
    setUserAnswer('');
    
    const fv = firstInput.current.value;
    const sv = secondInput.current.value;
    const av = answerInput.current.value;

    if(fv !== '' && sv !== '' && av !== '' && operator !== '') {
      setAllowToCheck(true);
    } else {
      setAllowToCheck(false);
    }
  }

  const handleSpace = (e:any, op:string) => {
    if (e.keyCode === 32 || e.keyCode === 13)
    {
      setDropdown(!dropdown)

      if(op != 'n') {
        selectOperator(op);
      }
    }
  }

  return (
    <div className="QuestionBuilder">
      <span className={"feedbackText " + (userAnswer)}>
        {
          (userAnswer === 'correct') &&
            <>{props.langLabels['correct']}</>
        }
        {
          (userAnswer === 'incorrect') &&
            <>{props.langLabels['tryagain']}</>
        }
      </span>

      <div className="innerQB">
        <input type="text" ref={firstInput} onKeyUp={validateToAllowChecking} />
        <span className="dd_QB" onClick={() => setDropdown(!dropdown)} onKeyDown={(e) => handleSpace(e, 'n')} tabIndex={0}>
          <span className={"selected sign_"+operator}></span>
          <ul className={dropdown ? 'open' : ''}>
            <li><span className="sign_m" onClick={() => selectOperator('m')} onKeyDown={(e) => handleSpace(e, 'm')} tabIndex={0}>Multiply</span></li>
            <li><span className="sign_d" onClick={() => selectOperator('d')} onKeyDown={(e) => handleSpace(e, 'd')} tabIndex={0}>Divide</span></li>
          </ul>
        </span>
        <input type="text" ref={secondInput} onKeyUp={validateToAllowChecking} />
        <span>=</span>
        <input type="text" ref={answerInput} onKeyUp={validateToAllowChecking} className={userAnswer} />
      </div>
      <button
        className={"checkBtn_QB " + (allowToCheck ? '' : 'disable')}
        onClick={checkAnswer}
        tabIndex={allowToCheck ? 0 : -1}
        aria-disabled={(allowToCheck ? "false": "true")}
      >
        {props.langLabels['check']}
      </button>

      <button className="closeQB" onClick={props.toggleQueBuilder}>Close</button>
    </div>
  );

}

export default QuestionBuilder