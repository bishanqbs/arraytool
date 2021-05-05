import {useRef} from 'react';

function DragHandler(props:any) {

  // it's common to initialise refs with null
  const handler = useRef(null);

  function dragElement(elmnt:any) {
    // var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

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
      // get the mouse cursor position at startup:
      // pos3 = e.clientX;
      // pos4 = e.clientY;
      
      document.onmouseup = closeDragElement;
      document.ontouchend = closeDragElement;
      // call a function whenever the cursor moves:
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

      // calculate the new cursor position:
      // pos1 = pos3 - e.clientX;
      // pos2 = pos4 - e.clientY;
      // pos3 = e.clientX;
      // pos4 = e.clientY;

      // set the element's new position:
      // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

      var x = e.clientX, y = e.clientY;
      var dd = getDropingElement(document.elementsFromPoint(x, y));

      if(dd !== undefined){
        let id:any = (dd.id).split('_');
        props.update(parseInt(id[0]), parseInt(id[1]))
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
      /* stop moving when mouse/touch button is released:*/
      document.onmouseup = null;
      document.ontouchend = null;
      document.onmousemove = null;
      document.ontouchmove = null;

      elmnt.removeAttribute("style");
    }

  }
  
  // Register
  dragElement(handler.current);
  
  return (
      <div ref={handler} id="handlerId" className="dragHandler"></div>
  );
}

export default DragHandler