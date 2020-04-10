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
    const uploadField = document.getElementsByClassName('uploadfield');

    // 3. Upload a new stopwatch skeleton to the DOM using the uploadField's innerHTML as the destination. 
    uploadField[0].innerHTML = uploadField[0].innerHTML + `<div class="stopwatch"></div>`;
  };

  // ======================= //
  // === EVENT LISTENERS === //
  // ======================= //
  document.addEventListener("click", function (event) {
    if (
      event.target.attributes.name !== null &&
      event.target.attributes.name !== undefined
    ) {
      addField(event.target);
    }
  });
});
