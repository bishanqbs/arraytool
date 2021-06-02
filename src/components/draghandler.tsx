import {useRef, useEffect} from 'react';

function DragHandler(props:any) {

  // it's common to initialise refs with null
  const handler = useRef(null);

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
      // stop moving when mouse/touch button is released.
      document.onmouseup = null;
      document.ontouchend = null;
      document.onmousemove = null;
      document.ontouchmove = null;

      elmnt.removeAttribute("style");
    }

  }
  
  // Register
  useEffect(() => {
    dragElement(handler.current);
  }, []);
  
  return (
      <div ref={handler} id="handlerId" className="dragHandler"></div>
  );
}

export default DragHandler