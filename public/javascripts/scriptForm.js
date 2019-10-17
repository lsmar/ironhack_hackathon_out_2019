$(document).ready(function() {
  const theName = document.getElementsByClassName("the-name");
  const theCategories = document.getElementsByClassName("the-categories");
  const theEmail = document.getElementsByClassName("the-email");
  $("#new-client-form").submit(function(e) {
    e.preventDefault();
    var $this = $("#btn-submit");
    var loadingText = '<i class="fa fa-circle-o-notch fa-spin"></i> loading...';
    if ($(this).val() !== loadingText) {
      $this.data("original-text", $(this).val());
      $this.html(loadingText);
    }
    const clientInfo = {
      name: theName[0].value,
      categories: [...theCategories].filter(el => el.checked).map(el => el.value),
      email: theEmail[0].value
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
          theName[0].value = "";
          theEmail[0].value = "";
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
