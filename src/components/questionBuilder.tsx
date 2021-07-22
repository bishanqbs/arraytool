import React, { useRef, useState, MutableRefObject, useEffect} from 'react';
import Dropdown from 'react-dropdown-aria';


function QuestionBuilder(props: any) {

  const firstInput = useRef() as MutableRefObject<HTMLInputElement>;
  const secondInput = useRef() as MutableRefObject<HTMLInputElement>;
  const answerInput = useRef() as MutableRefObject<HTMLInputElement>;
  const QuestionBuilderWrapper = useRef() as MutableRefObject<HTMLDivElement>;

  const [operator, setOperator] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [allowToCheck, setAllowToCheck] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  const [possibleAnswer, setpPossibleAnswer] = useState([]);

  /*eslint-disable react-hooks/exhaustive-deps*/

  useEffect(() => {
    setPossibleAnswers(props.array);
  }, [props.array]);
  
  useEffect(() => {
    regOnce()
    // console.log('focused');
    QuestionBuilderWrapper.current.focus()
    QuestionBuilderWrapper.current.scrollIntoView();
  }, [props.task]);

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

    // Event Tracking
    props.et("buildequationsubmit", {
      "result": (tempAnswer ? "correct" : "incorrect"),
      "answer": [fv, sv]
      // answer: fv + (operator === 'm' ? ' × ' : ' ÷ ') + sv + ' = ' + av
    });

  }

  const validateToAllowChecking = () => {
    // setDropdown(false);
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

  // eslint-disable-next-line
  const handleSpace = (e:any, op:string) => {
    if (e.keyCode === 32 || e.keyCode === 13)
    {
      // setDropdown(!dropdown)

      if(op !== 'n') {
        selectOperator(op);
      }
    }
  }

  const options = [
    { value: 'Multiply', className: 'sign_m', op: 'm' },
    { value: 'Divide', className: 'sign_d', op: 'd' }
  ];

  const [interest, setInterest] = useState('')
  const setInterestFun = (selectedOption:any) => {
    // console.log('every change', selectedOption.op);
    // setDropdown(!dropdown)
    setInterest(selectedOption.value);
    selectOperator(selectedOption.op);
  }
  
  const styleChangedCallback = (mutations:any) => {
    mutations.forEach((mutation:any) => {
      if (mutation.attributeName === 'class') {
          console.log(mutations);
          // alert('Ch-ch-ch-changes!')
          setDropdown(dropdown => !dropdown)
        }
    })
  }

  const regOnce = () => {
    const observer = new MutationObserver(styleChangedCallback);
    const elem = document.getElementsByClassName('dropdown-selector-content')[0];
    if(elem) {
      observer.observe(elem, {
        attributes: true,
        attributeFilter: ['class'],
        childList: false, subtree: false
      });
    }
  }

  return (
    <div className="QuestionBuilder" ref={QuestionBuilderWrapper} tabIndex={0} aria-label={props.langLabels['buildequation']}>

      {
        // (userAnswer !== '') &&
        <div className={"feedbackText " + (userAnswer)} role="status">
          {
            (userAnswer === 'correct') &&
              <>{props.langLabels['correct']}</>
          }
          {
            (userAnswer === 'incorrect') &&
              <>{props.langLabels['tryagain']}</>
          }
        </div>
      }

      <div className="innerQB">
        <span aria-live="polite" className="visuallyHidden" role="region" dangerouslySetInnerHTML={{
          __html: (dropdown) ? ('Expended selected ' + (interest === '' ? 'Multiply' : interest)) : "Closed. " + interest
          }}
        ></span>

        <input aria-label="Input field" type="text" ref={firstInput} autoComplete="off" onKeyUp={validateToAllowChecking} />

        <Dropdown
          placeholder=""
          className="dd_QB"
          ariaLabel="Choose an option"
          options={options}
          value={interest}
          openUp={false}
          defaultOpen={false}
          hideArrow={true}
          onChange={setInterestFun}
          searchable={false}
          // theme={styles}
          // width={400}
          // maxContentHeight={150}
          // {...dropdownState}
        />

        {/* <span
          aria-label="Choose an option"
          className="dd_QB"
          onClick={() => setDropdown(!dropdown)}
          onKeyDown={(e) => handleSpace(e, 'n')}
          tabIndex={0}
          aria-haspopup="listbox"
        >
          <span className={"selected sign_"+operator}></span>
          <ul className={dropdown ? 'open' : ''} role="listbox">
            <li role="option" aria-label="Multiply" aria-selected="true" onClick={() => selectOperator('m')} onKeyDown={(e) => handleSpace(e, 'm')} tabIndex={0}><span className="sign_m">Multiply</span></li>
            <li role="option" aria-label="Divide"   aria-selected="true" onClick={() => selectOperator('d')} onKeyDown={(e) => handleSpace(e, 'd')} tabIndex={0}><span className="sign_d">Divide</span></li>
          </ul>
        </span> */}

        <input aria-label="Input field" type="text" ref={secondInput} autoComplete="off" onKeyUp={validateToAllowChecking} />

        <span>=</span>

        <input aria-label="Input field" type="text" ref={answerInput} autoComplete="off" onKeyUp={validateToAllowChecking} className={userAnswer} />

      </div>
      <button
        className={"checkBtn_QB " + (allowToCheck ? '' : 'disable')}
        onClick={checkAnswer}
        tabIndex={allowToCheck ? 0 : -1}
        aria-disabled={(allowToCheck ? "false": "true")}
      >
        {props.langLabels['check']}
      </button>

      <button className="closeQB" onClick={props.toggleQueBuilder} aria-label="Close">×</button>
    </div>
  );

}

export default QuestionBuilder