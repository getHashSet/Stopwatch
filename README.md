# Stopwatch Exercise 
 
*by Matthew Carpenter* 
 
See the published site [here](https://gethashset.github.io/Stopwatch/) 
 
## About 
 
Using only HTML, CSS and plain Javascript, create a Stopwatch application that meets *at least* the following criteria:

• Supports a start button/feature, which begins the clock.

• Supports a pause button/feature, which pauses the clock.

• Supports a resume button/feature, which resumes a paused clock.

• Supports a reset button/feature, which resets the time.

• Supports being insert on a page multiple times, i.e. 3 or more separate clocks should be able to run independently at once.

• Make sure it is responsive. 

## Index 
 
[How It Works](#How-It-Works) 
 
[Bug / Issue](#Bug-/-Issue) 
 
[Architecture ](#Architecture) 
 
## How It Works
 
After launching the application a stopwatch will display on the screen.

`press START` to start the counter.

`press STOP` to stop the counter.

`press RESET` to reset the counter to 00:00.

### Add more Stopwatches

By pressing the `+` button on the screen you can add more stop watches. Each stopwatch runs independent from each other. 

### Max number of stopwatches.

A user is restricted to having 10 watches on screen at any given time. *This was not in response to an edge case but just felt like a good limit.*
 
## Bug / Issue
 
One of the *bugs* / *issues* I ran into was using the `this` keyword inside an object constructor method. One inside that method the `this` keyword referenced `window` and not the **new** object's methods.

I overcame this issue by using a mix of methods assigned to functions and arrow functions.

*this could have also been resolved using the .bind(this) method of the object method constructor, but arrow functions are cleaner.
 
```javascript 
// ========================== //
  // === OBJECT CONSTRUCTOR === //
  // ========================== //
  function Stopwatch() {
    this.index = stopwatchIndex; // this is the stopwatch objects location in the Array.
    this.clockRunning = false;
    this.time = 0;

    this.reset = function () {
      let timerHTML = document.getElementsByClassName(`timer_${this.index}`)[0];

      timerHTML.innerHTML =
        '<div class="minutes">00</div>:<div class="seconds">00</div>';
      this.time = 0;
    };

    this.start = function () {
      this.intervalId = setInterval(this.count, 1000);
      this.clockRunning = !this.clockRunning;
    };

    this.stop = function () {
      clearInterval(this.intervalId);
      this.clockRunning = !this.clockRunning;
    };

    this.count = () => {
      this.time++;
      let cleanTimeHTML = this.timeConverter(this.time);
      let timerHTML = document.getElementsByClassName(`timer_${this.index}`)[0];
      timerHTML.innerHTML = cleanTimeHTML;
    };

    this.timeConverter = (t) => {
      let minutes = Math.floor(t / 60);
      let seconds = t - minutes * 60;

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      if (minutes === 0) {
        minutes = "00";
      } else if (minutes < 10) {
        minutes = "0" + minutes;
      }

      return `<div class="minutes">${minutes}</div>:<div class="seconds">${seconds}</div>`;
    };
  }
 ```
 
## Architecture 
 
This app has been broken into parts

* HTML
    * container 
    * footer
* CSS
    * styles of components by class only. *No ID's were used or needed*
* Javascript
    * Global Variables
    * Object constructor
    * Functions
    * Event Listeners by event.target
 

 [Back to top](#)