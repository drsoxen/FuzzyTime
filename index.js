const CFonts = require('cfonts');
var hideCursor = require("hide-terminal-cursor")

let previousTimeString = "";

hideCursor();

function getTime() {
  const date = new Date();

  return {
    hour: date.getHours() >= 12 ? parseInt(date.getHours()-12) : parseInt(date.getHours()),
    minute: parseInt(date.getMinutes()),
    second: parseInt(date.getSeconds())
  };
}

var hours = {
  0 : "twelve",
  1 : "one",
  2 : "two",
  3 : "three",
  4 : "four",
  5 : "five",
  6 : "six",
  7 : "seven",
  8 : "eight",
  9 : "nine",
  10 : "ten",
  11 : "eleven",
  12 : "twelve"
};

var prefixes = {
  1 : "five past",
  2 : "ten past",
  3 : "quarter past",
  4 : "twenty past",
  5 : "twenty-five past",
  6 : "half past",
  7 : "twenty-five to",
  8 : "twenty to",
  9 : "quarter to",
  10 : "ten to",
  11 : "five to",
  12 : "o\'clock"
}

function getFraction(min, sec)
{
  return min + sec/60;
}

function fuzzer(time) {
  const { hour, minute, second } = time;

  let swapPreAndPost = false;

  let prefix = "";
  let postfix = "";

  let currentFractionalMinute = getFraction(minute, second);

  if(currentFractionalMinute > 0 && currentFractionalMinute < 2.5 )
  {
    swapPreAndPost = true;
    prefix = prefixes[12];
    postfix = hours[hour];
  }
  else if(currentFractionalMinute > 2.5 && currentFractionalMinute < 7.5 )
  {
    swapPreAndPost = false;
    prefix = prefixes[1];
    postfix = hours[hour];
  }
  else if(currentFractionalMinute > 7.5 && currentFractionalMinute < 12.5 )
  {
    swapPreAndPost = false;
    prefix = prefixes[2];
    postfix = hours[hour];
  }
  else if(currentFractionalMinute > 12.5 && currentFractionalMinute < 17.5 )
  {
    swapPreAndPost = false;
    prefix = prefixes[3];
    postfix = hours[hour];
  }
  else if(currentFractionalMinute > 17.5 && currentFractionalMinute < 22.5 )
  {
    swapPreAndPost = false;
    prefix = prefixes[4];
    postfix = hours[hour];
  }
  else if(currentFractionalMinute > 22.5 && currentFractionalMinute < 27.5 )
  {
    swapPreAndPost = false;
    prefix = prefixes[5];
    postfix = hours[hour];
  }
  else if(currentFractionalMinute > 27.5 && currentFractionalMinute < 32.5 )
  {
    swapPreAndPost = false;
    prefix = prefixes[6];
    postfix = hours[hour];
  }
  else if(currentFractionalMinute > 32.5 && currentFractionalMinute < 37.5 )
  {
    swapPreAndPost = false;
    prefix = prefixes[7];
    postfix = hours[hour + 1];
  }
  else if(currentFractionalMinute > 37.5 && currentFractionalMinute < 42.5 )
  {
    swapPreAndPost = false;
    prefix = prefixes[8];
    postfix = hours[hour + 1];
  }
  else if(currentFractionalMinute > 42.5 && currentFractionalMinute < 47.5 )
  {
    swapPreAndPost = false;
    prefix = prefixes[9];
    postfix = hours[hour + 1];
  }
  else if(currentFractionalMinute > 47.5 && currentFractionalMinute < 52.5 )
  {
    swapPreAndPost = false;
    prefix = prefixes[10];
    postfix = hours[hour + 1];
  }
  else if(currentFractionalMinute > 52.5 && currentFractionalMinute < 57.5 )
  {
    swapPreAndPost = false;
    prefix = prefixes[11];
    postfix = hours[hour + 1];
  }
  else if(currentFractionalMinute > 57.5 && currentFractionalMinute < 61 )
  {
    swapPreAndPost = true;
    prefix = prefixes[12];
    postfix = hours[hour + 1];
  }

  return swapPreAndPost ? postfix + " " + prefix : prefix + " " + postfix;
}

setInterval(() => {

  const currentTimeString = fuzzer(getTime());

  if(currentTimeString != previousTimeString)
  {
    CFonts.say(currentTimeString, {
      font: 'block',              // define the font face
      align: 'center',            // define text alignment
      colors: ['system'],         // define all colors
      background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
      letterSpacing: 1,           // define letter spacing
      lineHeight: 1,              // define the line height
      space: false,                // define if the output text should have empty lines on top and on the bottom
      maxLength: '0',             // define how many character can be on one line
    });

    previousTimeString = currentTimeString;
  }

}, 250);