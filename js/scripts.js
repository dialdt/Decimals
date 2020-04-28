//var canvas = document.getElementById('canvas');
var cWidth = 500;
var cHeight = 5000;
//canvas.width = cWidth;
//canvas.height = cHeight;
var d = document.getElementsByTagName('html');
var run = 0;
var bHeight = 100;
//var ctx = canvas.getContext('2d');
//var l = 100;
var elements = [];
var colors = ['#e84393', '#6c5ce7', '#0984e3', '#fdcb6e', '#00cec9'];
var selectedColor = '#e84393';
var blankColor = 'rgba(85, 239, 196, 0)';
var printBtn = document.getElementById('ptint');
var ind = 0;
var strokeColor = '#00b894';
var lineText;
var error = document.getElementById('error');
var input = document.getElementById('mainSection');
var userInput = document.getElementById('userInput');
var darkModeState = 0;
var icons = ['fa-moon', 'fa-lightbulb'];
let root = document.documentElement;
let stage = document.getElementById('stage');
var l = 0;
let params = [];
let cont = document.getElementById('cont');

function init() {
  userInput.value = '';
}

init();

function newDraw(u, y) {
  //l = 100;
  var r = Math.floor(Math.random() * colors.length);
  var bWidth = (cWidth - 125)/u
  //if(canvas.getContext) {
    var n = u;
    var x = 75;
    var i;
    var p;
    //New functionality = Draw with pure HTML5
    l++;
    $('.cont').append('<div class="stage" id="line-' + l + '"></div>');
    //$('.cont').append('<div class="info" id="info-line-' + l + '"></div>');
    var line = $('#line-' + l);
    //var infoLine = $('#info-line-' + l);
    //get % width
    p = 100/u;


    for (i = 0; i < n; i++) {

      //New functionality - Draw with pure HTML5
      line.append('<div class="element" min-height: 50px;"><sup>1</sup> &#8260; <sub>' + n + '</sub> </div>');
    }

    //ctx.fillStyle = '#00b894';
    //ctx.font = '15px Raleway';
    //ctx.fillText(lineText, 0, y + 55);
  //}
  //capture state
  run++;

  //console.log(l);
}

function addLine() {
  var errMsg;
  var val = document.getElementById('userInput').value;
  var p = 25 + (bHeight * run);
  console.log(val);
  if(val > 25 || val == '' || val < 1) {
    if(val > 25) {
      errMsg = 'Don\'t type in more than 25, or else it will crash the system!';
    } else {
      errMsg = 'Please enter a valid value';
    }
    error.innerHTML = errMsg;
  } else {
    error.innerHTML = '';
    newDraw(val, p);
  }
  smoothScroll();
  init();
  //console.log(run);
}

function getClick(mouseEvent) {
  var x = mouseEvent.screenX;
  var y = mouseEvent.screenY;
  console.log(x + ', ' + y);
}

function clear() {

}

/*$('#canvas').click(function(e) {
    var pos = findPos(this);
    var x = e.pageX - pos.x;
    var y = e.pageY - pos.y;
    var coord = "x=" + x + ", y=" + y;
    var c = this.getContext('2d');
    var p = c.getImageData(x, y, 1, 1).data;
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    //$('#status').html(coord + "<br>" + hex);
    elements.forEach(function(element) {
            if (findElement(x, y, element) != undefined) {
              //console.log(findElement(x, y, element)[0].in);
              if(element.color === blankColor) {
                ctx.fillStyle = selectedColor;
                ctx.strokeStyle = element.stroke;
                ctx.fillRect(element.left, element.top, element.width, element.height);
                ctx.strokeRect(element.left, element.top, element.width, element.height);
                element.color = selectedColor;
              } else if (element.color === selectedColor) {
                ctx.fillStyle = blankColor;
                ctx.clearRect(element.left, element.top, element.width, element.height);
                ctx.strokeRect(element.left, element.top, element.width, element.height);
                element.color = blankColor;
              }
              console.log(elements);
            }
            if (y > element.top && y < element.top + element.height
                && x > element.left && x < element.left + element.width) {

            }
            //console.log(elements);
    });
    //console.log(hex + ' ' + x + ' ' + y);
});*/

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

elements.forEach(function(element) {
        if (y > element.top && y < element.top + element.height
            && x > element.left && x < element.left + element.width) {
            alert('clicked an element');
        }
});

function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function addElement(c, s, i, x, y, h, w) {
  elements.push({
    color: c,
    stroke: s,
    i: i,
    left: x,
    top: y,
    height: h,
    width: w
  });
}

$('#clear').click(function() {
  $('.cont').empty();
  reset();
});

function reset() {
  run = 0;
}

function smoothScroll() {
  var scroll = $(input).offset().top - 90;
  $('html, body').animate({
    scrollTop: scroll
  }, 400);
}

const debounce = (fn) => {

  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame;

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {

    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) {
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {

      // Call our function and pass any params we received
      fn(...params);
    });

  }
};

// Reads out the scroll position and stores it in the data attribute
// so we can use it in our stylesheets
const storeScroll = () => {
  document.documentElement.dataset.scroll = window.scrollY;
}

// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', debounce(storeScroll), { passive: true });

// Update scroll position for first time
storeScroll();

function print() {
    var divContents = document.getElementById("cont").innerHTML;
    var a = window.open('', '', 'height=500, width=500');
    a.document.write('<html><head>');
    a.document.write('<link rel="stylesheet" href="css/print.css" type="text/css" />');
    a.document.write('</head>');
    a.document.write('<body>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
    a.print();
}

//Enable/disable dark mode
function darkMode() {
  if(darkModeState === 0) {
    root.style.setProperty('--mainBgColor', '#2c3e50');
    $('h1').css({
      'text-shadow' : 'none'
    });
    root.style.setProperty('--shadowColor', '#fff');
    root.style.setProperty('--heartColor', '#16a085');
    $('.element').css({
      'box-shadow' : '2px 2px 0px ' + getComputedStyle(document.documentElement).getPropertyValue('--shadowColor')
    });
    //remove moon class
    $('.darkMode').removeClass(icons[0]);
    //add class sun
    $('.darkMode').addClass(icons[1]);
    //change darkModeState to on
    darkModeState = 1;
  } else {
    root.style.setProperty('--mainBgColor', '#55efc4');
    $('h1').css({
      'text-shadow' : '3px 3px 0px #000, 6px 6px 0px #00b894'
    });

    root.style.setProperty('--shadowColor', '#00b894');
    root.style.setProperty('--heartColor', '#e84393');
    $('.element').css({
      'box-shadow' : '2px 2px 0px ' + getComputedStyle(document.documentElement).getPropertyValue('--shadowColor')
    });
    //remove sun class
    $('.darkMode').removeClass(icons[1]);
    //add class moon
    $('.darkMode').addClass(icons[0]);
    //change darkModeState to off
    darkModeState = 0;
  }
}

//Select box
$('body').on('click', '.element', function(){
  if($(this).hasClass('clicked')) {
    $(this).removeClass('clicked');
    $(this).css({
      'background-color' : '#e84393',
      'box-shadow' : '2px 2px 0px ' + getComputedStyle(document.documentElement).getPropertyValue('--shadowColor')
    });
  } else {
    $(this).addClass('clicked');
    $(this).css({
      'background-color' : '#8e44ad',
      'box-shadow' : 'none'
    });
  }

});
