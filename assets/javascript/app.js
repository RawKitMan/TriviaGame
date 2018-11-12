$(document).ready(function () {

    var questions = {
        1: { question: "What Letter is after A?", answers: ["G", "B", "Z", "H"] },
        2: { question: "What Letter is after F?", answers: ["G", "Y", "Q", "H"] }
    };

    var guessedRight = 0;
    var guessedWrong = 0;
    var didNotAnswer = 0;

    var questionCounter = 1;
    var questionTimer = 10;
    var timerInterval;

    $("#start-button").html("<button>Click to Start</button>");

    $("#start-button").click(function () {
        $("#start-button button").remove();
        $("#countdown").html("<h2>You have: " + questionTimer + "  seconds</h2>");
        run();
    });


    function run() {

        questionTimer = 10;
        clearInterval(timerInterval);
        $("#countdown").html("<h2>You have: " + questionTimer + "  seconds</h2>");
        $("#correct-incorrect").empty();
        $("#times-up").empty();
        timerInterval = setInterval(decrement, 1000);
        $("#question").html(questions[questionCounter].question);

        for (var i = 0; i < 4; i++) {
            var answerText;
            var answer = questions[questionCounter].answers[i]
            if (questionCounter === 1 && i === 1) {
                answerText = "<button id = 'right'>" + answer + "</button>";
                $("#answers").append(answerText);
            }
            else if (questionCounter === 2 && i === 0) {
                answerText = "<button id = 'right'>" + answer + "</button>";
                $("#answers").append(answerText);
            }
            else {
                answerText = "<button id = 'wrong'>" + answer + "</button>";
                $("#answers").append(answerText);
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

            if (questionCounter < 3) {
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
        $("#countdown").empty();
        $("#question").empty();
        $("#answers").empty();
        if (questionCounter < 3) {

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
        if (questionCounter < 3) {


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