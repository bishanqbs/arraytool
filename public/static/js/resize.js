// QBS Resizer
var scaleVar = { x: 1, y: 1 },
  zoomFactor = 1,
  stageLeft = 0,
  config = { stageWidth: 579, stageHeight: 579 };

function scaleStage() {

  var e = document.getElementById("griD");
  var reflector = document.getElementById("reflector");
  var section = document.getElementById("section");

  var rwidth = reflector.clientWidth,
      rheight = reflector.clientHeight;

  (scaleVar.x = rwidth / config.stageWidth),
  (scaleVar.y = rheight / config.stageHeight);
let t = scaleVar.x + ", " + scaleVar.y;
scaleVar.x < scaleVar.y
  ? ((zoomFactor = scaleVar.x), (t = scaleVar.x + ", " + scaleVar.x))
  : ((zoomFactor = scaleVar.y), (t = scaleVar.y + ", " + scaleVar.y));
let o = Number(t.split(",")[0]) * config.stageWidth,
  a = (rwidth - o) / 2;
(stageLeft = a), (window.rootLeftElmPos = stageLeft);

if(zoomFactor < 0.5) {
  t = 0.5 + ", " + 0.5;
  zoomFactor = 0.5
}

  var hgtDiff = config.stageHeight*zoomFactor - config.stageHeight;
  var wdtDiff = rwidth - config.stageWidth*zoomFactor;
  var sectionWidth = section.clientWidth/2 - (config.stageWidth*zoomFactor)/2;

  // console.log(sectionWidth);

  var s = {};
  for (var i in (s = {
    "-webkit-transform": "scale(" + t + ")",
    "-moz-transform": "scale(" + t + ")",
    "-ms-transform": "scale(" + t + ")",
    "-o-transform": "scale(" + t + ")",
    transform: "scale(" + t + ")",
    "-webkit-transform-origin": "left top",
    "-moz-transform-origin": "left top",
    "-ms-transform-origin": "left top",
    "-o-transform-origin": "left top",
    "transform-origin": "left top",
    // position: "absolute",
    // top: "0px",
    // left: a + "px",
    left: sectionWidth + "px",
    "margin-bottom": (hgtDiff + 20) + "px",
    width: config.stageWidth + "px",
    height: config.stageHeight + "px"
  }))
    s.hasOwnProperty(i) && (e.style[i] = s[i]);

  window.zoomFactor = zoomFactor;
}
setTimeout(function () {
  scaleStage();
}, 500);
window.addEventListener("resize", scaleStage);

/*pinch-to-zoom + double tap*/
var doubleTouchStartTimestamp = 0;
document.addEventListener("touchstart", touchHandler, { passive: false });
function touchHandler(evt) {
  var event = evt.originalEvent || evt;
  var now = +new Date();
  if (doubleTouchStartTimestamp + 500 > now) {
    event.preventDefault();
  }
  doubleTouchStartTimestamp = now;
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}
/* touch move - overflow */
document.addEventListener(
  "touchmove",
  function (event) {
    event = event.originalEvent || event;
    if (event.target.offsetParent.classList[0] === "recordsSlide") return;
    if (event.scale !== 1) {
      event.preventDefault();
      event.stopPropagation();
    }
  },
  { passive: false }
);
