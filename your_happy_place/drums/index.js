 var noDrumBtns = document.querySelectorAll(".btn").length;

 for(var i = 0; i < noDrumBtns; i++)
 {
     document.querySelectorAll(".btn")[i].addEventListener("click", function(){
         var btnHtml = this.innerHTML;

         console.log(btnHtml);
        soundd(btnHtml);
        buttonAnimation(btnHtml);
     })
 }

 document.addEventListener("keypress", function(event){
     var key = event.key.toUpperCase();
     soundd(key);
     buttonAnimation(key);

 })



 function soundd(buttonClicked) {

    switch (buttonClicked) {
        case "W":
            new Audio("tom-1.mp3").play();
            break;
        case "A":
            new Audio("tom-2.wav").play();
            break;
        case "S":
            new Audio("tom-3.wav").play();
            break;
        case "D":
            new Audio("tom-4.mp3").play();
            break;
        case "J":
            new Audio("tom-5.mp3").play();
            break;
        case "K":
            new Audio("tom-6.mp3").play();
            break;
        case "L":
            new Audio("tom-7.mp3").play();
            break;
    }
}


function buttonAnimation(currentkey) {
    var activeButton = document.querySelector("." + currentkey);
    activeButton.classList.add("pressed");
    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100);
}
