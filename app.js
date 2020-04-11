// Event listener to identify if DOM has completed loading.
document.addEventListener("DOMContentLoaded", function () {
  console.log("by Matthew Carpenter");
  console.log("LinkedIn: https://linkedin.com/in/matthewcarpenter22");
  console.log("GitHub: https://github.com/getHashSet");
  console.log("Resume: https://prop7.herokuapp.com/matthew");

  // ======================== //
  // === GLOBAL VARIABLES === //
  // ======================== //
  let stopwatchIndex = 0;
  let totalNumberOfActiveWatches = 0;
  const watches = [];

  // ========================== //
  // === OBJECT CONSTRUCTOR === //
  // ========================== //

  // NOTE: The stopwatches will be made up of objects so that each one can handle thier own logic and variables.
  function Stopwatch() {
    this.index = stopwatchIndex; // this is the stopwatch objects location in the Array.
    this.clockRunning = false; // flag for start/stop.
    this.time = 0; // timer starts at this number.

    this.reset = function () {
      let timerHTML = document.getElementsByClassName(`timer_${this.index}`)[0];

      // NOTE: all innerHTML strings include HTML tags in them. This would not be a required step in React or jQuery. This is a vanilla javascript edge case.
      timerHTML.innerHTML =
        '<div class="minutes">00</div>:<div class="seconds">00</div>';
      this.time = 0;
    };

    // NOTE: methods are used instead of prototypes to make reading the code easier.
    this.start = function () {
      this.intervalId = setInterval(this.count, 1000);
      this.clockRunning = !this.clockRunning;
    };

    this.stop = function () {
      clearInterval(this.intervalId);
      this.clockRunning = !this.clockRunning;
    };

    // NOTE: Arrow function is required for methods to use the 'this' keyword. functions() default to window.
    this.count = () => {
      this.time++;
      let cleanTimeHTML = this.timeConverter(this.time);
      let timerHTML = document.getElementsByClassName(`timer_${this.index}`)[0];
      timerHTML.innerHTML = cleanTimeHTML;
    };

    this.timeConverter = (t) => {
      // NOTE: time rounded down and then devided by 60 result in the ammount of minutes to display.
      let minutes = Math.floor(t / 60);
      let seconds = t - minutes * 60; // NOTE: time - the total ammount of minuts multipled by 60 returns the remaining seconds.

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      // NOTE: This is not strict and should not be used with typescript as this converts strings to numbers and back again using javascript defaults.
      if (minutes === 0) {
        minutes = "00";
      } else if (minutes < 10) {
        minutes = "0" + minutes;
      }

      // NOTE: return the cleaned time to be placed into HTML
      return `<div class="minutes">${minutes}</div>:<div class="seconds">${seconds}</div>`;
    };
  }

  // ================= //
  // === FUNCTIONS === //
  // ================= //

  // NOTE: addField() gets passed an element to build a new object and inject it into the DOM. Injection point is hard coded.
  function addField(el) {
    if (totalNumberOfActiveWatches >= 10) {
      return alert("Max number of Stopwatches reached.");
    }
    // console.log(el); // log event to make sure the correct element was selected.

    // 1. Assign the value of the upload field location to a variable.
    const uploadField = document.getElementsByClassName("uploadfield");

    // 2. Build Close button and assign that to a variable
    const closeButton = `<div name="close" index="${stopwatchIndex}" class="close_button">&#215;</div>`;

    // 3. Build the counter HTML
    const stopwatchTimer = `<div name="timer" class="timer timer_${stopwatchIndex}"><div class="minutes">00</div>:<div class="seconds">00</div></div>`;

    // 4. Build the Buttons HTML
    const stopwatchButtons = `
    <div class="buttons">
      <div name="start_stop" index="${stopwatchIndex}" class="button start_stop_${stopwatchIndex}">start</div>
      <div name="reset" index="${stopwatchIndex}" class="button">reset</div>
    </div>
    `;

    // 5. Create new watch object to handle the rules for this stopwatch
    const newWatch = new Stopwatch();

    // 6. Collect it into the watches array.
    watches.push(newWatch);
    // console.log(watches);

    // 7. Upload a new stopwatch skeleton to the DOM using the uploadField's innerHTML as the destination.
    uploadField[0].innerHTML =
      uploadField[0].innerHTML +
      `<div index="${stopwatchIndex}" class="stopwatch">${closeButton}${stopwatchTimer}${stopwatchButtons}</div>`;

    // 8. Increase both values keeping track of the total number of watches and active objects.
    totalNumberOfActiveWatches++;
    stopwatchIndex++;
  }

  // This will hide elements after the close button is pressed.
  function closeButton(el) {
    const parentElement = el.parentElement;
    const indexNumber = el.attributes.index.value;
    if (watches[indexNumber].clockRunning){
      watches[indexNumber].stop();
    };
    parentElement.classList.add("hide");
    totalNumberOfActiveWatches--;
  }

  function startStopButton(el) {
    const elementIndex = +el.attributes.index.value;
    const thisWatch = watches[elementIndex];
    let startStopHTML = document.getElementsByClassName(
      `start_stop_${elementIndex}`
    )[0];

    // NOTE: Change HTML to identify if the button will be running the start or the stop functions.
    if (thisWatch.clockRunning) {
      thisWatch.stop();
      startStopHTML.innerHTML = "start";
    } else {
      thisWatch.start();
      startStopHTML.innerHTML = "stop";
    }
  }

  // NOTE: Take the element and find the watch's index. Then reset that object.
  function resetButton(el) {
    const elementIndex = +el.attributes.index.value;
    const thisWatch = watches[elementIndex];
    thisWatch.reset();
  }

  // =============== //
  // === ON LOAD === //
  // =============== //
  // NOTE: On load will fire a single field to be constructed without needing to press the plus button.
  addField();

  // ======================= //
  // === EVENT LISTENERS === //
  // ======================= //
  document.addEventListener("click", function (event) {
    // NOTE: identify if the clicked item has been assined a name. Elements without names can be ignored.
    if (
      event.target.attributes.name !== null &&
      event.target.attributes.name !== undefined
    ) {
      // NOTE: Switch statment is to identify what functions should be exicuted based on the name of the object selected.
      // NOTE: See functions section.
      switch (event.target.attributes.name.value) {
        case "plus":
          addField(event.target);
          break;
        case "close":
          closeButton(event.target);
          break;
        case "start_stop":
          startStopButton(event.target);
          break;
        case "reset":
          resetButton(event.target);
          break;
        default:
          console.error(
            `1701: Unknown name in logs. ${event.target.attributes.name.value}`
          );
          break;
      }
    }
  });
});
