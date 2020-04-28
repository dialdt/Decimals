let d = document.getElementsByTagName('html'),
    colors = ['#e84393', '#6c5ce7', '#0984e3', '#fdcb6e', '#00cec9'],
    error = document.getElementById('error'),
    input = document.getElementById('mainSection'),
    userInput = document.getElementById('userInput'),
    darkModeState = 0,
    icons = ['fa-moon', 'fa-lightbulb'],
    root = document.documentElement,
    stage = document.getElementById('stage'),
    l = 0,
    params = [],
    cont = document.getElementById('cont')

//initialize page
init();

//Startup
function init() {
  userInput.value = '';
}

//draw box
function newDraw(u) {
  //l = 100;
    //var r = Math.floor(Math.random() * colors.length);
    var i;
    //New functionality = Draw with pure HTML5
    l++;
    $('.cont').append('<div class="stage" id="line-' + l + '"></div>');
    var line = $('#line-' + l);

    for (i = 0; i < u; i++) {
      line.append('<div class="element" min-height: 50px;"><sup>1</sup> &#8260; <sub>' + u + '</sub> </div>');
    }
}

//add new line
function addLine() {
  var errMsg;
  var val = document.getElementById('userInput').value;
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
    newDraw(val);
  }
  smoothScroll();
  init();
}

function getClick(mouseEvent) {
  var x = mouseEvent.screenX;
  var y = mouseEvent.screenY;
  console.log(x + ', ' + y);
}

$('#clear').click(function() {
  $('.cont').empty();
});

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

//Select box functionality
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
