import React, { useState } from 'react';
import './AppStyle.scss';

import Grid from './components/grid';
import ButtonSet from './components/buttonSet';
import QuestionBuilder from './components/questionBuilder';

function ArrayTool() {

  const [showDimension, setShowDimension] = useState(false);
  const [queBuilderState, setQuestionBuilder] = useState(false);
  const [checkArrayBtn, setcheckArrayBtn] = useState(false);
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
  
  
  return (
    <div className="arrayTool">
      <Grid dimension={showDimension} setFinalArray={setFinalArray} />
      
      <ButtonSet
        toggleDimension={[toggleDimension, showDimension]}
        toggleQueBuilder={toggleQueBuilder}
        checkArrayBtn={checkArrayBtn}
      />

      {
        (queBuilderState) &&
          <QuestionBuilder toggleQueBuilder={toggleQueBuilder} array={finalArray} />
      }
    </div>
  )
  
}

export default ArrayTool;
