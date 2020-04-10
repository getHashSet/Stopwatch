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
    console.log(el);
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
