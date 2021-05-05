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
  })

  // Once - Generate
  useEffect(() => {
    generateDefaultGrid()
  }, [])

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

    // Send Update to main component
    props.setFinalArray({
      "row": 12 - rowLimit,
      "column": colLimit + 1
    });
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

      <em>Drag the corner to create the desired number of rows and columns.</em>
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
      </div>
    </div>
  )
}

export default Grid;
