
var array1 = ["r", "r", "g", "r", "g", "g"];
var array2 = [];
var buttonClicked;
var isValid = false;
var level;

$("h3").css("visibility", "hidden");



document.querySelector(".startButton").onclick =
() => {
    var array2 = [];
    $("h2").css("visibility", "hidden");
    $("h1").text("Level 1");
    setTimeout( () => {
        setLevel1(1);
    }, 1000);

    setTimeout( () => {
        if(isValid){
            isValid=false;
            setLevel2(2);
        }
        else{
            $("h1").text("Game over");
            $("h3").css("visibility", "visible");
            $("body").css("background-color", "red");
            setTimeout( () => {$("body").css("background-color", "rgba(31, 23, 54, 0.842)")}, 100);
        }

        setTimeout( () => {
            if(isValid){
                isValid = false;
                setLevel3(3);
            }
            else{

                $("h1").text("Game over");
                $("h3").css("visibility", "visible");
                $("body").css("background-color", "red");
                setTimeout( () => {$("body").css("background-color", "rgba(31, 23, 54, 0.842)")}, 100);

            }

            setTimeout( () => {
                if(isValid){
                    isValid = false;
                    setLevel4(4);
                }
                else{
                    $("h1").text("Game over");
                    $("h3").css("visibility", "visible");
                    $("body").css("background-color", "red");
                    setTimeout( () => {$("body").css("background-color", "rgba(31, 23, 54, 0.842)")}, 100);
                }
            }, 6000);


        }, 5000);



    }, 4000);


}


$(".btn").click(function() {
    buttonClicked = $(this).text();
    array2.push(buttonClicked);
    switchAnimate(buttonClicked);
    checkEqual(buttonClicked);
})


function setLevel1(a){
    level = a;
    boxAnimate("r");
}

function setLevel2(a){
    $("h1").text("Level 2");
    level = a;
    boxAnimate("r");
    setTimeout( () => boxAnimate('g'), 1000);
}

function setLevel3(a){
    $("h1").text("Level 3");
    level = a;
    boxAnimate("r");
    setTimeout( () => boxAnimate('g'), 1000);
    setTimeout( () => boxAnimate('g'), 2000);
}

function setLevel4(a){
    $("h1").text("U won");
    $("h3").css("visibility", "visible");
    $("body").css("background-color", "green");
    setTimeout( () => {$("body").css("background-color", "rgba(31, 23, 54, 0.842)")}, 100);
}

function checkEqual(buttonClicked){
    if(level === 1 && array2[0] === array1[0]){
        isValid = true;
    }
    if(level === 2 && array2[1] === array1[1]){

    }
    if (level === 2 && array2[1] === array1[1] && array2[2] === array1[2]){
        isValid =true;
    }
    if (level === 3 && array2[3] === array1[3] ){

    }
    if (level === 3 && array2[3] === array1[3] && array2[4] && array1[4]){

    }
    if (level === 3 && array2[3] === array1[3] && array2[4] && array1[4] && array2[5] && array1[5]){
        isValid = true;
    }

}


function switchAnimate(buttonClicked){
    switch (buttonClicked) {
        case 'g':
            boxAnimate(buttonClicked);
            break;
        case 'r':
            boxAnimate(buttonClicked);
            break;
        case 'y':
            boxAnimate(buttonClicked);
            break;
        case 'b':
            boxAnimate(buttonClicked);
            break;
        default:
            break;
    }
}

function boxAnimate(buttonClicked) {
    $("." + buttonClicked).toggleClass("animation");


    setTimeout( function(){
        $("." + buttonClicked).toggleClass("animation");
    }, 150);
}
