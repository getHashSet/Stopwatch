// Event listener to identify if DOM has completed loading.
document.addEventListener("DOMContentLoaded", function () {
  console.log("by Matthew Carpenter");
  console.log("LinkedIn: https://linkedin.com/in/matthewcarpenter22");
  console.log("GitHub: https://github.com/getHashSet");
  console.log("Resume: https://prop7.herokuapp.com/matthew");

  // ========================== //
  // === OBJECT CONSTRUCTOR === //
  // ========================== //

  // ================= //
  // === FUNCTIONS === //
  // ================= //
  function addField(el) {
    // console.log(el); // log event to make sure the correct element was selected.

    // 1. Assign the value of the upload field location to a variable.
    const uploadField = document.getElementsByClassName("uploadfield");

    // 2. Build Close button and assign that to a variable
    const closeButton = `<div name="close" class="close_button">&#215;</div>`;

    // 3.
    const stopwatchTimer = `<div class="timer">00:00:00</div>`;

    // 4.
    const stopwatchButtons = `
    <div class="buttons">
      <div name="start_stop" class="button">start</div>
      <div name="stop" class="button">stop</div>
    </div>
    `;

    // 7. Upload a new stopwatch skeleton to the DOM using the uploadField's innerHTML as the destination.
    uploadField[0].innerHTML =
      uploadField[0].innerHTML +
      `<div class="stopwatch">${closeButton}${stopwatchTimer}${stopwatchButtons}</div>`;
  }

  // This will hide elements after the close button is pressed.
  function closeButton(el) {
    let parentElement = el.parentElement;
    parentElement.classList.add("hide");
  }

  // ======================= //
  // === EVENT LISTENERS === //
  // ======================= //
  document.addEventListener("click", function (event) {
    if (
      event.target.attributes.name !== null &&
      event.target.attributes.name !== undefined
    ) {
      console.log(event.target.attributes.name.value);

      switch (event.target.attributes.name.value) {
        case "plus":
          addField(event.target);
          break;
        case "close":
          closeButton(event.target);
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
