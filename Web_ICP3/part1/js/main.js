var scoreHuman = 0;
var scoreComputer = 0;
const numberOfGames = 3;


$(document).ready(function () {

//compare move and determine the winner
    $.fn.compareMoves = function (computerTurn, humanTurn) {
        $("#computerPick").text(computerTurn);
        $(".computerPick").fadeIn();
        if (computerTurn === humanTurn) {
            //$("#draw_message").fadeIn();
            $("#draw_message").clone().appendTo("#history_container").fadeIn();
            return;
        }
        if (computerTurn === "rock" && humanTurn === "paper") {
            //$("#win_message").fadeIn();
            $("#win_message").clone().appendTo("#history_container").fadeIn();
            scoreHuman += 1;
            $("#scoreHuman").text(scoreHuman);
            return;
        }
        if (computerTurn === "scissors" && humanTurn === "rock") {
            //$("#win_message").fadeIn();
            $("#win_message").clone().appendTo("#history_container").fadeIn();
            scoreHuman += 1;
            $("#scoreHuman").text(scoreHuman);
            return;
        }
        if (computerTurn === "paper" && humanTurn === "scissors") {
            //$("#win_message").fadeIn();
            $("#win_message").clone().appendTo("#history_container").fadeIn();
            scoreHuman += 1;
            $("#scoreHuman").text(scoreHuman);
            return;
        } else {
            //$("#loss_message").fadeIn();
            $("#loss_message").clone().appendTo("#history_container").fadeIn();
            scoreComputer += 1;
            $("#scoreComputer").text(scoreComputer);
            return;
        }
    }
    //get random integer
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    $.fn.getRandomInt = function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    //get computer turn randomly
    $.fn.computerTurn = function () {
        var range = 3;
        var result = $.fn.getRandomInt(range);
        if (result == 0) {
            return "rock";
        }
        if (result == 1) {
            return "paper";
        }
        if (result == 2) {
            return "scissors";
        }
    }
    //enable start button after the match is done
    $.fn.enableStart = function () {
        $('#start').prop('disabled', false);
        $('#start').show();
    }
    //disable rock, paper, and scissors buttons
    $.fn.disableButtons = function () {
        $('#rock').prop('disabled', true);
        $.fn.hoveringOut('rock');
        $('#paper').prop('disabled', true);
        $.fn.hoveringOut('paper');
        $('#scissors').prop('disabled', true);
        $.fn.hoveringOut('scissors');
    }
    //clear all the history and the score board
    $.fn.clearHistory = function () {
        $('#history_container').empty();
        $("#message").fadeOut();
        $(".score1").fadeOut();
        $(".score2").fadeOut();
        $(".computerPick").fadeOut();
    }
    //describes event when any of rock, paper, and scissors button are clicked
    $(".choice").click(function () {
        $("#message").fadeIn();
        $(".score1").fadeIn();
        $(".score2").fadeIn();
        var computerChoice = $.fn.computerTurn();
        $.fn.compareMoves(computerChoice, this.id);
        if (scoreHuman == numberOfGames || scoreComputer == numberOfGames) {
            $.fn.disableButtons();
            $.fn.enableStart();
            if (scoreComputer == numberOfGames) {
                $("#loss_match_message").clone().appendTo("#history_container").fadeIn();
            } else {
                $("#win_match_message").clone().appendTo("#history_container").fadeIn();
            }
        }
    });


    //game start
    $.fn.startTheGame = function (id) {
        $.fn.clearHistory();
        $('#' + id).prop('disabled', true);
        $('#' + id).hide();
        scoreHuman = 0;
        $("#scoreHuman").text(scoreHuman);
        scoreComputer = 0;
        $("#scoreComputer").text(scoreComputer);
        $('#rock').prop('disabled', false);
        $('#paper').prop('disabled', false);
        $('#scissors').prop('disabled', false);

    }
    //describes the event when the start button is clicked
    $("#start").click(function () {
        $.fn.startTheGame(this.id);
    });

    //describe the events when hovering in and out for buttons happens
    $.fn.hoveringIn = function (id) {
        $('#' + id).addClass("select_element");
    }
    $.fn.hoveringOut = function (id) {
        $('#' + id).removeClass("select_element");
    }
    $(".choice").mouseenter(function () {
        $.fn.hoveringIn(this.id);
    });
    $(".choice").mouseleave(function () {
        $.fn.hoveringOut(this.id);
    });
});