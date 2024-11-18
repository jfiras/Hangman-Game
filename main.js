const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const hangmanData = [
    { hint: "A popular fruit that is yellow", answer: "BANANA" },
    { hint: "A famous wizarding school", answer: "HOGWARTS" },
    { hint: "The largest planet in our solar system", answer: "JUPITER" },
    { hint: "A sport played with a ball and a hoop", answer: "BASKETBALL" },
    { hint: "A country known for its Eiffel Tower", answer: "FRANCE" },
    { hint: "A famous superhero who wears a cape", answer: "SUPERMAN" },
    { hint: "A type of tree that produces acorns", answer: "OAK" },
    { hint: "The color of the sky on a clear day", answer: "BLUE" },
    { hint: "A language spoken in Brazil", answer: "PORTUGUESE" },
    { hint: "The name of a famous board game with properties", answer: "MONOPOLY" },
    { hint: "A type of animal known for being a loyal companion", answer: "DOG" },
    { hint: "A beverage made from beans", answer: "COFFEE" },
    { hint: "The capital city of Japan", answer: "TOKYO" },
    { hint: "The process of water turning into vapor", answer: "EVAPORATION" },
    { hint: "A season that comes after summer", answer: "FALL" },
    { hint: "A famous scientist who developed the theory of relativity", answer: "EINSTEIN" },
    { hint: "A piece of equipment used for drawing", answer: "PENCIL" },
    { hint: "A type of dance often seen in ballet", answer: "PIROUETTE" },
    { hint: "A large, powerful animal with a trunk", answer: "ELEPHANT" },
    { hint: "A famous singer known for 'Thriller'", answer: "MICHAEL JACKSON" }
];
//console.log(hangmanData);
let hint = "";
let answer = "";
let inputLetter = "";
let scr = 0;
let remain = 4;


$("document").ready(function () {

    // Function to show the input letters
    function showLetters() {
        for (let i = 0; i < letters.length; i++) {
            $("#letters").append("<span class='inputLetters'>" + letters[i] + "</span>");
        }
    }
    showLetters();
    const inputLetters = $(".inputLetters");

    function getHintAndAnswer() {
        // Generate a random number between 0 and 19
        index = Math.floor(Math.random() * hangmanData.length);
        // Store hint and display it
        hint = hangmanData[index].hint;
        $("#hint").text(hint);
        // Store answer and display the places of its letters
        answer = hangmanData[index].answer;
        for (let i = 0; i < answer.length; i++) {
            $("#word").append("<span class='outputLetters'>" + "_ " + "</span>");
        }
        //console.log(answer);
    }
    getHintAndAnswer();
    let outputLetters = $(".outputLetters");

    function checkWin() {
        $("#result").text(scr);
        if (scr === answer.length) {
            $("#score").text("You Win ! Your score is " + scr);
        }
        if (remain === 0) {
            $("#attempts").text("You lose, Game Over !");
            inputLetters.off("click");
            inputLetters.addClass("disabledLetter");
        }
    }

    function checkUserInputs(answer, inputLetter) {
        //console.log(answer, inputLetter);
        let counterOcc = 0;
        for (let i = 0; i < answer.length; i++) {
            if (answer[i] === inputLetter) {
                counterOcc++;
                $(outputLetters[i]).text(inputLetter);
            }
        }
        if (counterOcc === 0) {
            remain--;
            $("#remain").text(remain);
        }
        scr += counterOcc;
        checkWin();
    }

    // Adding click listener to the input letters
    function getLetters() {
        for (let i = 0; i < letters.length; i++) {
            $(inputLetters[i]).click(function () {
                inputLetter = $(this).text();
                checkUserInputs(answer, inputLetter);
                // Removing these letters from the input answer
                $(this).off("click");
                $(this).addClass("disabledLetter");
            });
        }
    }
    getLetters();


});


