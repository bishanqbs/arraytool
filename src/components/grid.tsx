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
    // updateFlexiGrid(9,2);
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

      // While validating for two possibilities
      if(obj['twoWayValidation']) {
        possibleEquns.push(obj['column'] + ' &times; ' + obj['row'] + ' = ' + (obj['column'] * obj['row']))
      }
    } else {
      possibleEquns.push((obj['column'] * obj['row']) + ' &divide; ' + obj['column'] + ' = ' + obj['row'] + "<br>" + (obj['column'] * obj['row']) + ' &divide; ' + obj['row'] + ' = ' + obj['column']);
      if(obj['twoWayValidation']) {
        possibleEquns.push((obj['column'] * obj['row']) + ' &divide; ' + obj['row'] + ' = ' + obj['column'] + "<br>" + (obj['column'] * obj['row']) + ' &divide; ' + obj['column'] + ' = ' + obj['row']);
      }
    }

    setUserCorrect(false);
    let userCorrectTemp = false;
    
    for (let index = 0; index < possibleEquns.length; index++) {
      const tempEq = possibleEquns[index];
      
      if(obj.operator === 'multiply'){
        if (printEquation[0].split('<br>')[0] === tempEq) {

          setUserCorrect(true);
          userCorrectTemp = true;
          break;
        }
      }
      if(obj.operator === 'devide'){
        if (printEquation[1] === tempEq) {
          
          setUserCorrect(true);
          userCorrectTemp = true;
          break;
        }
      }
    }

    if(userCorrectTemp) {
      props.et("checkarray", "Correct");
    }
    else {
      props.et("checkarray", "Incorrect");
    }

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
        let col = '';
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

    props.et(
      "arraymanipulate",
      {
        "row": 12 - rowLimit,
        "column": colLimit + 1
      }
    );

    // Preset Equation(s)
    let cRow = 12 - rowLimit;
    let cColm = colLimit + 1;
    const meq =
      cRow + ' &times; ' + cColm + ' = ' +  cRow*cColm + 
      (cRow !== cColm ? ('<br>' + cColm + ' &times; ' + cRow + ' = ' +  cRow*cColm) : '')
    ;
    const deq = 
      cRow*cColm + ' &divide; ' + cColm + ' = ' + cRow + 
      (cRow !== cColm ? ('<br>' + cRow*cColm + ' &divide; ' + cRow + ' = ' + cColm) : '')
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

  
  const [gridValueChange, setGridValueChange] = useState(false);
  const ariatoggle =  (val:boolean) => {
    setGridValueChange(val)
  }

  return (
    <>
    <div className={"griD "+ (props.checkArrBtnEnable ? '_qset' : '')} id="griD" dir={props.language === "ar" ? "ltr" : 'auto'}>

      <em id="toolsInstruction" dir={props.language === "ar" ? "rtl" : 'auto'}>{props.langLabels['instruction']}</em>
      <span id="toolsFeedback" className={"checkingFeedback " + (userCorrect ? 'correct' : 'incorrect')}
        aria-live="polite" role="region">
        {
          (userCorrect && userCorrect !== '') ? props.langLabels['correct'] : (!userCorrect && userCorrect !== '') ? props.langLabels['tryagain'] : ''
        }
      </span>

      <div className="defaultGrid" role="presentation">
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
      <div className="flexGrid" role="presentation">
        <DragHandler update={updateFlexiGrid} grid={grid['size']} label={props.langLabels['instruction']} ariatoggle={ariatoggle} />

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

        {
          (props.dimension) &&
          <>
            <span aria-hidden="true" className={"size_col " + (((grid.size.row === 12) && (grid.size.column > 6)) ? '_fix' : '')}>{props.dimension ? grid.size.column : ''}</span>
            <span aria-hidden="true" className="size_row">{props.dimension ? grid.size.row : ''}</span>
          </>
        }

        
        <div aria-live="polite" role="region" className="visuallyHidden"
          dangerouslySetInnerHTML={{__html:
            (props.dimension || gridValueChange) ? (grid.size.row + "rows by" + grid.size.column + "columns")
            :
            " "
          }}
        > 
        </div>

        {
          // (osMultiplication || osDivision) &&
            <span
              className={"equation " + ((osMultiplication || osDivision) ? "" : "hide")}
              dangerouslySetInnerHTML={{__html:
                (osMultiplication || osDivision) ?
                (osMultiplication) ? printEquation[0] : printEquation[1]
                :
                " "
              }}
              role="region"
              aria-live="polite"
            >
            </span>
        }
      </div>

    </div>
      {
        // On screem multiply and division button
        (osMulDivBtns) &&
        <div className="sh_btns">
          <button
            className={"showEqn m " + (osMultiplication ? 'active' : '')}
            onClick={() => {
              setOSMultiplication(!osMultiplication);
              setOSDivision(false);

              props.et("showmultiplication", (osMultiplication ? "Hide Multiplication" : "Show Multiplication"));
            }}
            aria-label={props.langLabels['showmultiplication']}
          >
            {props.langLabels['showmultiplication']}
          </button>
          <button
            className={"showEqn d " + (osDivision ? 'active' : '')}
            onClick={() => {
              setOSDivision(!osDivision);
              setOSMultiplication(false);
              props.et("showdivision", (osDivision ? "Hide Division" : "Show Division"));
            }}
          >
            {props.langLabels['showdivision']}
          </button>
        </div>
      }
    </>
  )
}

export default Grid;
