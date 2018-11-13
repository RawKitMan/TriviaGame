$(document).ready(function () {

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

    var guessedRight = 0;
    var guessedWrong = 0;
    var didNotAnswer = 0;

    var questionCounter = 1;
    var questionTimer = 10;
    var timerInterval;

    $("#start-button").html("<button>Click to Start</button>");

    $("#start-button").click(function () {
        $("#start-button").remove();
        $("#countdown").html("<h2>You have: " + questionTimer + "  seconds</h2>");
        run();
    });


    function run() {

        questionTimer = 10;
        clearInterval(timerInterval);

        var buttonList = $("<ul>");
        $("#answers").append(buttonList);
        $("#countdown").html("<h2>You have: " + questionTimer + "  seconds</h2>");
        $("#correct-incorrect").empty();
        $("#right-wrong-gif").empty();
        $("#times-up").empty();
        timerInterval = setInterval(decrement, 1000);
        $("#question").html(questions[questionCounter].question);

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

    function decrement() {

        questionTimer--;

        $("#countdown").html("<h2>You have: " + questionTimer + "  seconds</h2>");

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

            if (questionCounter < 11) {
                setTimeout(run, 4000);
            }
            else {
                setTimeout(gameOver, 4000);
            }
        }
    }

    function stop() {

        clearInterval(timerInterval);

    }

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

    function gameOver() {
        $("#countdown").empty();
        $("#question").empty();
        $("#answers").empty();
        $("#correct-incorrect").empty();
        $("#right-wrong-gif").empty();
        $("#game-over").append("<p>Game Over</p>");
        $("#game-over").append("<p>Correct Answers: " + guessedRight + "</p>");
        $("#game-over").append("<p>Incorrect Answers: " + guessedWrong + "</p>");
        $("#game-over").append("<p>Unanswered: " + didNotAnswer + "</p>");

        $("#new-game").html("<button id>Reset</button>")
    }

    $("#new-game").click(function(){
        $("#game-over").empty();
        questionCounter = 1;
        $("#new-game button").remove();
        $("#countdown").html("<h2>You have: " + questionTimer + "  seconds</h2>");
        run();
    });


});