import React, { useState, useEffect } from 'react';
import './AppStyle.scss';

import Grid from './components/grid';
import ButtonSet from './components/buttonSet';
import QuestionBuilder from './components/questionBuilder';

// import * as data from './data/data.json';

function ArrayTool() {

  // Fetching JSON and setting data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        './data/data.json'
      );

      const data = await response.json();
      
      settaskLength(data.questionSet.length);
      settooltitle(data['title']);
      settoolmode(data.questionSet[taskCounter]['mode']);
      setcheckArrBtnEnable(data.questionSet[taskCounter]['checkarray'])
      setseeEquationBtns(data.questionSet[taskCounter]['seeEquationBtns'])
      setenableBuildEqun(data.questionSet[taskCounter]['buildequation'])
      settask(data.questionSet[taskCounter]['task']);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [taskCounter, updateTaskCounter] = useState(0);
  const [taskLength, settaskLength] = useState(0);
  const [tooltitle, settooltitle] = useState('');
  const [toolmode, settoolmode] = useState('');

  const [checkArrBtnEnable, setcheckArrBtnEnable] = useState();
  const [seeEquationBtns, setseeEquationBtns] = useState();
  const [enableBuildEqun, setenableBuildEqun] = useState();
  const [task, settask] = useState();

  const [showDimension, setShowDimension] = useState(false);
  const [queBuilderState, setQuestionBuilder] = useState(false);
  const [finalArray, setFinalArray] = useState({
    "row": 3,
    "column": 3
  });

  const toggleDimension = () => {
    setShowDimension(!showDimension);
  }

  const toggleQueBuilder = () => {
    setQuestionBuilder(!queBuilderState);
  }

  const [checkBtnHit, setCheckBtnHit] = useState(0);
  const checkArrayClicked = () => {
    setCheckBtnHit(checkBtnHit => checkBtnHit + 1);
  }

  const updateTask = (op: string) => {
    if (op === "+") {
      updateTaskCounter(taskCounter => taskCounter + 1)
    } else {
      updateTaskCounter(taskCounter => taskCounter - 1)
    }
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
      />

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
