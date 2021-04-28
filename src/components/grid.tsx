import React from 'react';

type MyProps = {
  // using `interface` is also ok
  message: string;
};
type MyState = {
  count: number; // like this
};

class Grid extends React.Component {
  
  // Default grid
  state = {
    grid : [
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3]
    ]
  }

  updateGrid = (side: string) => {
    
    switch (side) {
      case "row":
        this.PlusMinusRow()
        break;
      case "Column":
        this.PlusMinusColm()
        break;
      default:
        break;
    }
    // this.setState({ "grid": this.state.grid})
  }

  /**
   * PlusMinusRow
   * Adding Subtracting Row
   * + - => need to pass
   */
  PlusMinusRow = () => {
    let gridArr = this.state.grid;

    if(gridArr.length == 12) return; // Stop while row FULL

    let lastRow = gridArr[gridArr.length - 1];
    gridArr.push(lastRow);

    this.setState({ "grid": gridArr})  // Set []    
  }

  /**
   * PlusMinusColm
   * Adding Subtracting Column
   * + - => need to pass
   */
  PlusMinusColm = () => {
    var aarowArr = JSON.stringify(this.state.grid);
    var rowArr = JSON.parse(aarowArr);
    
    for (let index = 0; index < rowArr.length; index++) {
      var trowArr = rowArr[index];

      if(trowArr.length == 12) return; // Stop while colomn FULL

      var lastValue = trowArr[trowArr.length - 1] + 1;
      trowArr.push(lastValue)
    }

    this.setState({ "grid": rowArr}) // Set []
  }

  render() {
    return (
      <div className="griD">
        {
          this.state.grid.map((row, i) => {
            return (
              <div className="row" key={"r_"+i}>
                {
                  row.map((colm, n) => {
                    return (
                      <div key={"c_"+n} className="cellS">{colm}</div>
                    )
                  })
                }
              </div>
            )
          })
        }

        <button onClick={() => this.updateGrid('row')}>Update Row</button>
        <button onClick={() => this.updateGrid('Column')}>Update Column</button>
      </div>
    )
  }
}


export default Grid
// ReactDOM.render(<Grid />, document.getElementById('root'));

