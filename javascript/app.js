$(document).ready(function () {

  var animals = ["anteater", "bear", "crocodile", "dog", "elephant", "fox", "gerbil", "horse", "impala", "jaguar", "kangaroo", "lemur", "macaw", "narwal", "octupus", "pelican", "quetzal", "tapir", "rabbit", "salamander"];
  var giphyKey = "V2ukfjieo5ByBZawIwgKsYOiKXXaYfrK";
  var buttons = $("#buttons");
  var button = "";
  var stillActive = false;
  //adding all the animal buttons on document ready
  animals.forEach(element => {
    addButton(element);
  });
  //adding a new button from the input value by calling the function
  $("#submit").on("click", function () {
    addButton($("#newAnimal").val());
    $("#newAnimal").val("");
  });

  //Function to add new button to the html body
  function addButton(element) {
    button = $("<button>");
    button.addClass("btn btn-info btn-lg btn-md btn-sm btn-Animal")
      .text(element)
      .attr("type", "submit")
      .css({ "margin": "4px", "font-size": "2vw" });
    buttons.append(button);
  }
  //displaying the giftys
  buttons.on("click", ".btn-Animal", function () {

    var btnAnimal = $(this).text();
    var imgContainer = $("#imgContainer");
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=animal+${btnAnimal}&api_key=${giphyKey}&limit=10`;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      //only populate the images if the response is not null
      if (response !== null) {
        imgContainer.html("")
        var imgArr = response["data"];
        var images = [];
        //gets each of the objects from the array extracted from the response
        for (let i = 0; i < imgArr.length; i++) {
          images[i] = imgArr[i]["images"];
        }
        //fill the image grid
        var img = "";
        var still = "";
        var active = "";
        for (let index = 0; index < images.length; index++) {
          img = $("<img>");
          still = images[index]["480w_still"]["url"];
          active = images[index]["downsized"]["url"];
          img.attr({ "src": still, "still": still, "active": active, "id": "img-" + index });
          img.addClass("img-responsive img-thumbnail btn col-lg-4 col-md-4 col-sm-3 col-xs-3 image");
          img.css({ "max-width": "300px", "max-heigth": "300px", "min-width": "150px" });
          imgContainer.append(img);
        }

      } else {
        alert("Perhaps it was not an animal!");
      }
    });
  });//end of button click

  $("#imgContainer").on("click", ".image", function () {
    var img = $(this);
    var still = img.attr("still");
    var active = img.attr("active");
    if (stillActive) {
      img.attr("src", still);
      stillActive = false;
    } else {
      img.attr("src", active);
      stillActive = true;
    }
  });//end of onclick of the image to play/pause

});//end of document ready
