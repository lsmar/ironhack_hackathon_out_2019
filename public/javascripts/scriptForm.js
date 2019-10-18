$(document).ready(function() {
  const theName = document.getElementById("InputName1");
  const theCategories = document.getElementsByClassName("the-categories");
  const theEmail = document.getElementById("InputEmail");
  const theAdults = document.getElementById("InputNumberAdults");
  const theChildrens = document.getElementById("InputNumberChildrens");
  InputNumberAdults;
  $("#new-client-form").submit(function(e) {
    e.preventDefault();
    var $this = $("#btn-submit");
    var loadingText = '<i class="fa fa-circle-o-notch fa-spin"></i> Cadastrando...';
    if ($(this).val() !== loadingText) {
      $this.data("original-text", $(this).val());
      $this.html(loadingText);
    }
    const clientInfo = {
      name: theName.value,
      categories: [...theCategories].filter(el => el.checked).map(el => el.value),
      email: theEmail.value,
      adults: theAdults.value,
      childrens: theChildrens.value
    };

    // Make a POST request
    axios
      .post("/client/new", clientInfo)
      .then(response => {
        $this.html("Cadastrar");

        if (response.data.code) {
          console.log("post error is: ", response.data);
          $("#duplicatedMsg").show();
        } else {
          $("#successMsg").show();
          console.log("post successful and the response is: ", response.data);
          theName.value = "";
          theEmail.value = "";
          theChildrens.value = "";
          theAdults.value = "";
          [...theCategories].forEach(el => {
            el.checked = false;
          });
        }
        setTimeout(() => {
          $("#successMsg").hide();
          $("#duplicatedMsg").hide();
        }, 3500);
      })
      .catch(error => {
        $this.html("Cadastrar");
        $("#errorMsg").show();
        setTimeout(() => $("#errorMsg").hide(), 4000);
        alert("Error", error);
        console.log("Oh No! Error is: ", error);
      });
  });
});
