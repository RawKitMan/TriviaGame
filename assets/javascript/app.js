//Javascript will not run until the page is fully loaded
$(document).ready(function () {

    //Need an object to hold our questions and answers
    var questions = {
        1: { question: "Who is the son of King Varian Wrynn?", answers: ["Thrall", "Anduin Wrynn", "Magni Bronzebeard", "Cho'gall"] },
        2: { question: "What is the name of Thrall's hammer", answers: ["Doomhammer", "Frostmourne", "Ashbringer", "Shalamayne"] },
        3: { question: "Who was the appointed jailor of Illidan Stormrage?", answers: ["Malfurion Stormrage", "Maiev Shadowsong", "Kel'Thuzad", "Onyxia"] },
        4: { question: "Which mage opened the Dark Portal allowing the Orc Invasion of Azeroth?", answers: ["Aegwynn", "Krasus", "Antonidas", "Medivh"] },
        5: { question: "What race is the creature Hogger?", answers: ["Dragon", "Orc", "Gnoll", "Murloc"] },
        6: { question: "Which Dragon Aspect leads the green dragons?", answers: ["Ysera", "Alexstrasza", "Malygos", "Chromie"] },
        7: { question: "Which is not a currency in World of Warcraft?", answers: ["Silver", "Copper", "Platinum", "Gold"] },
        8: { question: "What is the name of the Zombie Army in service to the Lich King?", answers: ["Desolate", "Scourge", "Horde", "Alliance"] },
        9: { question: "Who leads the Draenei people?", answers: ["Gul'Dan", "Sylvanas Windrunner", "Varian Wrynn", "Velen"] },
        10: { question: "What Fallen Titan leads the demonic Burning Legion?", answers: ["Azeroth", "Argus", "Sargeras", "Eonar"] },
        
    };

    /*We need to keep track of how many questions the user, got right, got wrong, didn't answer, our timer, which question we are on,
     and something to help our timer count down the seconds*/
    
    var guessedRight = 0;
    var guessedWrong = 0;
    var didNotAnswer = 0;
    var questionCounter = 1;
    var questionTimer = 10;
    var timerInterval;

    //When the user clicks the start button, the game will begin and the button goes away.

    $("#start-button").html("<button>Click to Start</button>");

    $("#start-button").click(function () {
        $("#start-button").remove();
        $("#countdown").html("<h2>You have: " + questionTimer + "  seconds</h2>");
        run();
    });


    //This function pulls up each question and gets rid of any excess text/buttons/gifs.
    function run() {

        //Every time we get a new question, the timer needs to be reset
        questionTimer = 10;
        clearInterval(timerInterval);

        //We show the answers as a list of buttons to click on.
        var buttonList = $("<ul>");
        $("#answers").append(buttonList);

        //Our question timer display
        $("#countdown").html("<h2>You have: " + questionTimer + "  seconds</h2>");

        //All we want to show is the question, the timer, and the available answer choices
        $("#correct-incorrect").empty();
        $("#right-wrong-gif").empty();
        $("#times-up").empty();
        $("#times-up-gif").empty();

        //Sets our timer to decrease by one every second
        timerInterval = setInterval(decrement, 1000);

        //Here's our question
        $("#question").html(questions[questionCounter].question);


        //This is how we generate our list of answers. We be sure to give the id for the right answer and the wrong answers
        //for later functions.
        for (var i = 0; i < 4; i++) {
            var answerText;
            var answer = questions[questionCounter].answers[i];
            if (questionCounter === 1 && i === 1) {
                answerText = "<li><button id = 'right'>" + answer + "</button></li>";
                $("#answers ul").append(answerText);
            }
            else if (questionCounter === 2 && i === 0) {
                answerText = "<li><button id = 'right'>" + answer + "</button></li>";
                $("#answers ul").append(answerText);
            }
            else if (questionCounter === 3 && i === 1) {
                answerText = "<li><button id = 'right'>" + answer + "</button></li>";
                $("#answers ul").append(answerText);
            }
            else if (questionCounter === 4 && i === 3) {
                answerText = "<li><button id = 'right'>" + answer + "</button></li>";
                $("#answers ul").append(answerText);
            }
            else if (questionCounter === 5 && i === 2) {
                answerText = "<li><button id = 'right'>" + answer + "</button></li>";
                $("#answers ul").append(answerText);
            }
            else if (questionCounter === 6 && i === 0) {
                answerText = "<li><button id = 'right'>" + answer + "</button></li>";
                $("#answers ul").append(answerText);
            }
            else if (questionCounter === 7 && i === 2) {
                answerText = "<li><button id = 'right'>" + answer + "</button></li>";
                $("#answers ul").append(answerText);
            }
            else if (questionCounter === 8 && i === 1) {
                answerText = "<li><button id = 'right'>" + answer + "</button></li>";
                $("#answers ul").append(answerText);
            }
            else if (questionCounter === 9 && i === 3) {
                answerText = "<li><button id = 'right'>" + answer + "</button></li>";
                $("#answers ul").append(answerText);
            }
            else if (questionCounter === 10 && i === 2) {
                answerText = "<li><button id = 'right'>" + answer + "</button></li>";
                $("#answers ul").append(answerText);
            }
            else {
                answerText = "<li><button id = 'wrong'>" + answer + "</button></li>";
                $("#answers ul").append(answerText);
            }
        }
    }

    //This function helps decrease our timer value
    function decrement() {

        questionTimer--;

        $("#countdown").html("<h2>You have: " + questionTimer + "  seconds</h2>");

        //If the timer gets to 0, then the timer is stopped, the user is informed the time is up, is shown the correct answer.
        
        if (questionTimer === 0) {
            stop();
            didNotAnswer++;
            questionCounter++;
            var correctAnswer = $('#right').html();
            $("#countdown").empty();
            $("#question").empty();
            $("#answers").empty();
            $("#correct-incorrect").empty();
            $("#times-up").html("<p>Time's up. The correct answer is " + correctAnswer);
            $("#times-up-gif").html("<img src = 'assets/images/Times-up.gif' alt = 'General confusion meme gif' />");

            //If there are more questions to ask, then after 4 seconds, the next question will pop up
            if (questionCounter < 11) {
                setTimeout(run, 4000);
            }

            //If there are no more questions, then after 4 seconds, the game over screen appears.
            else {
                setTimeout(gameOver, 4000);
            }
        }
    }


    //Just need to stop the timer if a question is answered or if the timer runs out. Otherwise, the timer value just keeps going.
    function stop() {

        clearInterval(timerInterval);

    }


    //If the user clicks on the right answer or wrong answer, he/she will be notified with a message and a gif. Then after 4 seconds
    //Either the next question pops up or the game over screen appears.
    $("#answers").on("click", "#right", function () {
        guessedRight++;
        questionCounter++;
        stop();
        $("#correct-incorrect").html("You are correct!");
        $("#right-wrong-gif").html("<img src = 'assets/images/Thumbs_up.gif' alt = 'Chuck Norris Thumbs Up Gif' />");
        $("#countdown").empty();
        $("#question").empty();
        $("#answers").empty();
        if (questionCounter < 11) {

            setTimeout(run, 4000);
        }
        else {
            setTimeout(gameOver, 4000);
        }
    });

    $("#answers").on("click", "#wrong", function () {
        guessedWrong++;
        questionCounter++;
        var correctAnswer = $("#right").html();
        $("#countdown").empty();
        $("#question").empty();
        $("#answers").empty();
        stop();
        $("#correct-incorrect").html("Wrong! The correct answer was: " + correctAnswer);
        $("#right-wrong-gif").html("<img src = 'assets/images/Sad.gif' alt = 'Sad Andre Gif' />");
        if (questionCounter < 11) {

            setTimeout(run, 4000);
        }
        else {
            setTimeout(gameOver, 4000);
        }
    });

    //This shows the game over screen where the user sees how many they got right, wrong, or didn't answer. 
    function gameOver() {
        
        $("#countdown").empty();
        $("#question").empty();
        $("#answers").empty();
        $("#correct-incorrect").empty();
        $("#right-wrong-gif").empty();
        $("#times-up").empty();
        $("#times-up-gif").empty();
        $("#game-over").append("<p>Game Over</p>");
        $("#game-over").append("<p>Correct Answers: " + guessedRight + "</p>");
        $("#game-over").append("<p>Incorrect Answers: " + guessedWrong + "</p>");
        $("#game-over").append("<p>Unanswered: " + didNotAnswer + "</p>");

        //Does the user wanna play again?
        $("#new-game").html("<button id>Reset</button>")
    }

    //If the user wants to play again, they click the button which resets everything and starts the game again at the first question.
    $("#new-game").click(function(){
        $("#game-over").empty();
        questionCounter = 1;
        guessedRight = 0;
        guessedWrong = 0;
        didNotAnswer = 0;
        $("#new-game button").remove();
        $("#countdown").html("<h2>You have: " + questionTimer + "  seconds</h2>");
        run();
    });


});