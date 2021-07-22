import {useRef, useEffect} from 'react';

function DragHandler(props:any) {

  // it's common to initialise refs with null
  const handler = useRef(null);
  let lastElemId:any = "9_1";

  function dragElement(elmnt:any) {

    if(elmnt == null) return;

    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragMouseDown;

    // Drag Start
    function dragMouseDown(e:any) {
      e = e || window.event;
      e.preventDefault();
      if(e.type === "touchmove"){
        e = e.touches[0]
      }
      
      // call a function whenever the cursor up/touchend:
      document.onmouseup = closeDragElement;
      document.ontouchend = closeDragElement;

      // call a function whenever the cursor moves/touchstart:
      document.onmousemove = elementDrag;
      document.ontouchmove = elementDrag;
    }
  
    // Drag move
    function elementDrag(e:any) {
      e = e || window.event;
      // e.preventDefault();

      if(e.type === "touchmove"){
        e = e.touches[0]
      }

      var x = e.clientX, y = e.clientY;
      var dd = getDropingElement(document.elementsFromPoint(x, y));

      if(dd !== undefined && dd.id !== lastElemId){
        
        let id:any = (dd.id).split('_');
        props.update(parseInt(id[0]), parseInt(id[1]));

        lastElemId = dd.id;
      }
      
    }

    // Get and find exact cell
    function getDropingElement(array:any) {
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.classList.contains("cellS")) {
          return element
        }
      }
    }
  
    // Reset
    function closeDragElement(e:any) {
      // stop moving when mouse/touch button is released.
      document.onmouseup = null;
      document.ontouchend = null;
      document.onmousemove = null;
      document.ontouchmove = null;

      elmnt.removeAttribute("style");
    }
  }

  const handleKeyPress = (e:any) => {
    // left: 37
    // up: 38
    // right: 39
    // down: 40
    let keys:any = {"37": 1, "38": 1, "39": 1, "40": 1};
    if (keys[e.keyCode] !== 1) { return false; }

    e.preventDefault(); // Purpose - Prevent scrolling
    props.ariatoggle(true);

    let row = 12 - props.grid['row'];
    let column = props.grid['column'] - 1; 

    switch (e.keyCode) {
      case 37: if(column !== 0) column = column - 1; break;
      case 38: if(row !== 0) row = row - 1; break;
      case 39: if(column !== 11) column = column + 1; break;
      case 40: if(row !== 11) row = row + 1; break;
      default: break;
    }
    
    // console.log(row, column);
    props.update(row, column); 
  }
  
  // Register
  useEffect(() => {
    dragElement(handler.current);
    // eslint-disable-next-line
  }, []);
  
  return (
      <div
        ref={handler} id="handlerId" className="dragHandler"
        aria-label={props.label} tabIndex={0}
        onKeyDown={handleKeyPress}
        onBlur={() => props.ariatoggle(false)}
      ></div>
  );
}

export default DragHandler