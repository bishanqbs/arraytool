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
    
    for (let index = 0; index < possibleAnswer.length; index++) {
      const eachAnswer = possibleAnswer[index];

      if(eachAnswer === userSubAnswer) {
        setUserAnswer('correct');
        break;
      }
      setUserAnswer('incorrect');
    }

  }

  const validateToAllowChecking = () => {
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

  return (
    <div className="QuestionBuilder">
      <span className="closeQB" onClick={props.toggleQueBuilder}>Close</span>

      <span className={"feedbackText " + (userAnswer)}>
        {
          (userAnswer === 'correct') &&
            <>Correct!</>
        }
        {
          (userAnswer === 'incorrect') &&
            <>Try again.</>
        }
      </span>

      <div className="innerQB">
        <input type="text" ref={firstInput} onKeyUp={validateToAllowChecking} />
        <span className="dd_QB" onClick={() => setDropdown(!dropdown)}>
          <span className={"selected sign_"+operator}></span>
          <ul className={dropdown ? 'open' : ''}>
            <li><span className="sign_m" onClick={() => selectOperator('m')}>Multiply</span></li>
            <li><span className="sign_d" onClick={() => selectOperator('d')}>Divide</span></li>
          </ul>
        </span>
        <input type="text" ref={secondInput} onKeyUp={validateToAllowChecking} />
        <span>=</span>
        <input type="text" ref={answerInput} onKeyUp={validateToAllowChecking} className={userAnswer} />
      </div>
      <div className={"checkBtn_QB " + (allowToCheck ? '' : 'disable')} onClick={checkAnswer}>Check</div>
    </div>
  );

}

export default QuestionBuilder