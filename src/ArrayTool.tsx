import React, { useState, useEffect, useRef } from 'react';
import './AppStyle.scss';

import Grid from './components/grid';
import ButtonSet from './components/buttonSet';
import QuestionBuilder from './components/questionBuilder';
import QuestionSet from './components/questionSet';
// import { settings } from 'cluster';

// import * as data from './data/data.json';

function ArrayTool() {

  const [data, setData] = useState(():any => {});
  const [language, setLanguage] = useState("en");
  const [taskCounter, updateTaskCounter] = useState(-1);
  const [taskLength, settaskLength] = useState(0);
  const [pageId, setPageID] = useState('0');
  const [slideId, setSlideID] = useState('0');

  const [toolsTitle, setToolsTitle] = useState('');
  const [toolsSubtitle, setToolsSubTitle] = useState('');
  // const [toolmode, settoolmode] = useState('');
  const [langLabels, setLangLabels] = useState({});

  const [checkArrBtnEnable, setcheckArrBtnEnable] = useState(false);
  const [seeEquationBtns, setseeEquationBtns] = useState(false);
  const [enableBuildEqun, setenableBuildEqun] = useState(false);
  const [task, settask] = useState();

  // Fetching JSON and setting data
  useEffect(() => {
    // let ppath = window.location.toString().split('=')[1];
    const fetchData = async () => {
      const response = await fetch(
        // './data/'+ppath+'.json'
        './data/data.json'
      );
      const jsonData = await response.json();
      
      setData(jsonData);
      setLanguage(jsonData.language);
      updateTaskCounter(0);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Each counter/task update
  useEffect(() => {
    if(data === undefined) return;
    
    
    settaskLength(data.questionSet.length);

    setToolsTitle(data['langLabels'][language]['title']);
    setToolsSubTitle(data['langLabels'][language]['mode'][data.questionSet[taskCounter]['mode']]);
    setLangLabels(data['langLabels'][language])

    // let dir = language === 'ar' ? "rtl" : "ltr"
    // document.documentElement.dir = dir;
    document.documentElement.lang = language;

    // settoolmode(data.questionSet[taskCounter]['mode']);
    setPageID(data.questionSet[taskCounter]['pageid'])
    setSlideID(data.questionSet[taskCounter]['id'])

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
  
  const pageidref = useRef<HTMLDivElement>(null);

  // Event Tracking
  const dispatchEvntTrack = (action:any, value:any) => {

    let pageidelm = pageidref.current;
    let pageid:any = 0;
    let id:any = 0;

    if (pageidelm !== null) {
      let tmp = pageidelm.attributes[1]['nodeValue'];
      if(tmp === null) return;
      
      pageid = tmp.split(" ")[0];
      id = tmp.split(" ")[1];
    }
    
    const postData = {
        "type": "BEH_EVENT",
        "value": {
            "header": {
                "eventType": "content.completed"
            },
            "body": {
                "action": action,
                "object": {
                    "page_id": pageid,
                    "id": id,
                    "type": "arraytool",
                    "name": "arraytool"
                }
            },
            // "context": (action === "arraymanipulate" ? value : { "value": value })
            "context": value
        }
    }
    console.log(postData);
    
    
    // Post Message
    window.parent.postMessage(postData, "*");
  }

  return (
    <div className={"arrayTool " + language}>
      <header>
        <h1>{toolsTitle}</h1>
        <h2>{toolsSubtitle}</h2>
      </header>

      <section id="section">
        {
          (checkArrBtnEnable) &&
          <QuestionSet
            language={language}
            langLabels={langLabels}
            task={task}
            qSetAns={qSetAns}
            et={dispatchEvntTrack}
          />
        }

        <Grid
          language={language}
          langLabels={langLabels}
          dimension={showDimension}
          setFinalArray={setFinalArray}
          checkBtnHit={checkBtnHit}
          task={task}
          checkArrBtnEnable={checkArrBtnEnable}
          seeEqu={seeEquationBtns}
          qSetAns={qSetUserAns}
          et={dispatchEvntTrack}
        />

      {
        (queBuilderState) &&
        <QuestionBuilder toggleQueBuilder={toggleQueBuilder} task={task} array={finalArray} langLabels={langLabels} et={dispatchEvntTrack} />
      }
      </section>

      <>
        <ButtonSet
          language={language}
          langLabels={langLabels}
          toggleDimension={[toggleDimension, showDimension]}
          toggleQueBuilder={[toggleQueBuilder, enableBuildEqun]}
          checkArrBtnEnable={checkArrBtnEnable}
          checkArrayClicked={checkArrayClicked}
          updateTask={[updateTask, taskCounter, taskLength, slideId]}
          et={dispatchEvntTrack}
        />
      </>

      


      <div ref={pageidref} id="pageidref" className={pageId + ' ' + slideId}></div>
      <div id="reflector"></div>
    </div>
  )

}

export default ArrayTool;
