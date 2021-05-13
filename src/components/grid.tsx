import React, { useState, useEffect } from 'react';
import DragHandler from './draghandler';

function Grid(props: any) {

  const [grid, newState] = useState({
    // Default flexiGrid
    flexiGrid: [
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3]
    ],
    defaultGrid: [],
    size: {
      "row": 3,
      "column": 3
    }
  });

  const osMulDivBtns = props.seeEqu;
  const [osMultiplication, setOSMultiplication] = useState(false);
  const [osDivision, setOSDivision] = useState(false);
  const [printEquation, setPrintEquation] = useState(():any => [
    '3 &times; 3 = 9',
    '9 &divide; 3 = 3'
  ]);
  const [userCorrect, setUserCorrect] = useState(():any => '')

  // Once - Generate default gird
  useEffect(() => {
    generateDefaultGrid()
  }, [])

  // Check on every check Buttont Hit
  useEffect(() => {
    if(props.checkBtnHit > 0) {
      checkArrayFunction(props.task);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.checkBtnHit]);

  // Update grid while switching between task(s)
  useEffect(() => {
    newState(prevState => {
      return {
        ...prevState,
        flexiGrid: [
          [1, 2, 3],
          [1, 2, 3],
          [1, 2, 3]
        ],
        size: {
          "row": 3,
          "column": 3
        }
      }
    });
    updateFlexiGrid(9,2);
    setOSMultiplication(false);
    setOSDivision(false)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.task]);

  // Validating User answer
  const checkArrayFunction = (obj:any) => {
    // Expected Equation
    let possibleEquns:any = [];
    if(obj.operator === 'multiply') {
      possibleEquns.push(obj['row'] + ' &times; ' + obj['column'] + ' = ' + (obj['column'] * obj['row']))

      // If validation for two possibilities
      if(obj['twoWayValidation']) {
        possibleEquns.push(obj['column'] + ' &times; ' + obj['row'] + ' = ' + (obj['column'] * obj['row']))
      }
    } else {
      possibleEquns.push((obj['column'] * obj['row']) + ' &divide; ' + obj['column'] + ' = ' + obj['row'] + "<br>" + (obj['column'] * obj['row']) + ' &divide; ' + obj['row'] + ' = ' + obj['column']);
      if(obj['twoWayValidation']) {
        possibleEquns.push((obj['column'] * obj['row']) + ' &divide; ' + obj['row'] + ' = ' + obj['column'] + "<br>" + (obj['column'] * obj['row']) + ' &divide; ' + obj['column'] + ' = ' + obj['row']);
      }
      // possibleEquns.push((obj['column'] * obj['row']) + ' &divide; ' + obj['row'] + ' = ' + obj['column'])
    }

    setUserCorrect(false);
    
    for (let index = 0; index < possibleEquns.length; index++) {
      const tempEq = possibleEquns[index];
      
      if(obj.operator === 'multiply'){
        if (printEquation[0] === tempEq) {

          setUserCorrect(true);
          // if(obj.getuserinput && props.qSetAns) {
          //   setUserCorrect(true);
          // }
          // if(!obj.getuserinput) {
          //   setUserCorrect(true);
          // }
          break;
        }
      }
      if(obj.operator === 'devide'){
        console.log(printEquation[1]);
        console.log(tempEq);
        if (printEquation[1] === tempEq) {

          setUserCorrect(true);
          // if(obj.getuserinput && props.qSetAns) {
          //   setUserCorrect(true);
          // }
          // if(!obj.getuserinput) {
          //   setUserCorrect(true);
          // }
          break;
        }
      }
    }

    // console.log(props.qSetAns);
    

    setTimeout(() => {
      setUserCorrect('')
    }, 2500); 
  }

  // Update Grid based on Row Column
  const updateFlexiGrid = (rowLimit: number, colLimit: number) => {
    let table: any = [];
    for (let index = 0; index < (12 - rowLimit); index++) {
      let row = [];
      for (let index = 0; index <= colLimit; index++) {
        let col = 'c';
        row.push(col);
      }
      table.push(row)
    }

    // Update grid OnScreen
    newState(prevState => {
      return {
        ...prevState,
        "flexiGrid": table,
        "size": {
          "row": 12 - rowLimit,
          "column": colLimit + 1
        }
      }
    });

    // Send Update to main/parent component
    props.setFinalArray({
      "row": 12 - rowLimit,
      "column": colLimit + 1
    });

    // Preset Equation(s)
    let cRow = 12 - rowLimit;
    let cColm = colLimit + 1;
    const meq = cRow + ' &times; ' + cColm + ' = ' +  cRow*cColm;
    const deq = 
      cRow*cColm + ' &divide; ' + cColm + ' = ' + cRow + '<br>' +
      cRow*cColm + ' &divide; ' + cRow + ' = ' + cColm
    ;
    setPrintEquation([ meq, deq ]);

    // Reset feedback
    setUserCorrect('');
  }

  // Generate Default Grid
  const generateDefaultGrid = () => {
    let table: any = [];
    for (let index = 0; index < 12; index++) {
      let row = [];
      for (let index = 0; index < 12; index++) {
        let col = 'c';
        row.push(col);
      }
      table.push(row)
    }
    newState(prevState => {
      return {
        ...prevState,
        "defaultGrid": table
      }
    })
  }

  return (
    <div className="griD">

      <em>Drag the corner to make rows and columns.</em>
      <span className={"checkingFeedback " + (userCorrect ? 'correct' : 'incorrect')}>
        {
          (userCorrect && userCorrect !== '') ? 'Array is correct!' : (!userCorrect && userCorrect !== '') ? 'Try again.' : ''
        }
      </span>

      <div className="defaultGrid">
        {
          grid.defaultGrid.map((drow: any, i) => {
            return (
              <div className="row" key={"dr_" + i}>
                {
                  drow.map((colm: any, n: number) => {
                    return (
                      <div id={(i) + '_' + (n)} key={"dc_" + n} className="cellS blank">&nbsp;</div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
      <div className="flexGrid">
        <DragHandler update={updateFlexiGrid} />

        {
          grid.flexiGrid.map((row, i) => {
            return (
              <div className="row" key={"r_" + i}>
                {
                  row.map((colm, n) => {
                    return (
                      <div key={"c_" + n} className="cellS">&nbsp;</div>
                    )
                  })
                }
              </div>
            )
          })
        }

        <span className="size_col">{props.dimension ? grid.size.column : ''}</span>
        <span className="size_row">{props.dimension ? grid.size.row : ''}</span>

        {
          (osMultiplication || osDivision) &&
            <span className="equation" dangerouslySetInnerHTML={{__html: (osMultiplication) ? printEquation[0] : printEquation[1]}}></span>
        }
      </div>

      {
        // On screem multiply and division button
        (osMulDivBtns) &&
        <>
          <span
            className={"showEqn m " + (osMultiplication ? 'active' : '')}
            onClick={() => {
              setOSMultiplication(!osMultiplication);
              setOSDivision(false);
            }}
          >
            Show multiplication
          </span>
          <span
            className={"showEqn d " + (osDivision ? 'active' : '')}
            onClick={() => {
              setOSDivision(!osDivision);
              setOSMultiplication(false);
            }}
          >
            Show division
          </span>
        </>
      }
    </div>
  )
}

export default Grid;
