import React, { useState, useEffect } from 'react';
import './AppStyle.scss';

import Grid from './components/grid';
import ButtonSet from './components/buttonSet';
import QuestionBuilder from './components/questionBuilder';
import QuestionSet from './components/questionSet';

// import * as data from './data/data.json';

function ArrayTool() {

  const [data, setData] = useState(():any => {});
  const [taskCounter, updateTaskCounter] = useState(-1);
  const [taskLength, settaskLength] = useState(0);
  const [tooltitle, settooltitle] = useState('');
  const [toolmode, settoolmode] = useState('');

  const [checkArrBtnEnable, setcheckArrBtnEnable] = useState(false);
  const [seeEquationBtns, setseeEquationBtns] = useState(false);
  const [enableBuildEqun, setenableBuildEqun] = useState(false);
  const [task, settask] = useState();

  // Fetching JSON and setting data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        './data/data.json'
      );
      const jsonData = await response.json();
      
      setData(jsonData);
      updateTaskCounter(0);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Each counter/task update
  useEffect(() => {
    if(data === undefined) return;
    
    settaskLength(data.questionSet.length);
    settooltitle(data['title']);
    settoolmode(data.questionSet[taskCounter]['mode']);
    setcheckArrBtnEnable(data.questionSet[taskCounter]['checkarray'])
    setseeEquationBtns(data.questionSet[taskCounter]['seeEquationBtns'])
    setenableBuildEqun(data.questionSet[taskCounter]['buildequation'])
    settask(data.questionSet[taskCounter]['task']);
    setqSetUserAns(false);
    setShowDimension(false);
    setQuestionBuilder(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskCounter])

  const [showDimension, setShowDimension] = useState(false); // How hide dimension state
  const toggleDimension = () => {
    setShowDimension(!showDimension);
  }
  
  const [queBuilderState, setQuestionBuilder] = useState(false); // Enable/Disable Question Builder
  const toggleQueBuilder = () => {
    setQuestionBuilder(!queBuilderState);
  }

  // Update Final Array
  const [finalArray, setFinalArray] = useState({
    "row": 3,
    "column": 3
  });

  // Check Button
  const [checkBtnHit, setCheckBtnHit] = useState(0);
  const checkArrayClicked = () => {
    setCheckBtnHit(checkBtnHit => checkBtnHit + 1);
  }

  // Next/Previous Task Navigation
  const updateTask = (op: string) => {
    if (op === "+") {
      updateTaskCounter(taskCounter => taskCounter + 1)
    } else {
      updateTaskCounter(taskCounter => taskCounter - 1)
    }
  }

  // Question Set - User Answer
  const [qSetUserAns, setqSetUserAns] = useState(false);
  const qSetAns = (ans:any) => {
    setqSetUserAns(ans)
  }

  return (
    <div className="arrayTool">
      <header>
        <h1>{tooltitle}</h1>
        <h2>{(toolmode === 'explore') ? 'Explore Mode' : 'Question Mode'}</h2>
      </header>

      <Grid
        dimension={showDimension}
        setFinalArray={setFinalArray}
        checkBtnHit={checkBtnHit}
        task={task}
        seeEqu={seeEquationBtns}
        qSetAns={qSetUserAns}
      />

      {
        (checkArrBtnEnable) &&
        <QuestionSet
          task={task}
          qSetAns={qSetAns}
        />
      }

      <ButtonSet
        toggleDimension={[toggleDimension, showDimension]}
        toggleQueBuilder={[toggleQueBuilder, enableBuildEqun]}
        checkArrBtnEnable={checkArrBtnEnable}
        checkArrayClicked={checkArrayClicked}
        updateTask={[updateTask, taskCounter, taskLength]}
      />

      {
        (queBuilderState) &&
        <QuestionBuilder toggleQueBuilder={toggleQueBuilder} array={finalArray} />
      }
    </div>
  )

}

export default ArrayTool;
