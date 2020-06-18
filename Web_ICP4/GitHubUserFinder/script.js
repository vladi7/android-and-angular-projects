//this method is left for reference on how to do the task with synchronous call
    function getGithubInfo(user) {
        //1. Create an instance of XMLHttpRequest class and send a GET request using it.
        // The function should finally return the object(it now contains the response!)
    //var object = $.get("https://api.github.com/users/" +user);
    //console.log(object);
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', "https://api.github.com/users/" + user, false);
        xhttp.send();
        var json = xhttp.responseText;
        console.log(xhttp);
        return xhttp;
    }
//this method is used to populate all the contents when the user was found
function showUser(user) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    $('#errorDisplay').hide();
    $("#container2").css("display", "block");
    $("#user").text(user.id);

    $("#avat").attr("src", user.avatar_url);
    $("#joinedDate").text(user.created_at);
    $("#followers").text(user.followers);
    $("#following").text(user.following);
    if(user.name===null){
        $("#name").text("Not Available");
    }
    else{
        $("#name").text(user.name);
    }
    $("#publicRepos").text(user.public_repos);
    $("#link").attr("href", user.html_url);
    $("#button").removeClass("btn-primary");
    $("#button").addClass("btn-danger");

    $("#profile").css("display", "block");
    $("#button").text("Check Another User!");
}
//the method is used to show the message when the user was not found
function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    $("#error").text("time: " + getCurrentTime() + " Username searched: " + username+" NOT FOUND!");
    $("#error_message").clone().appendTo("#history_container").fadeIn();
    $('#history_container div a').fadeIn();
    $('#errorDisplay').fadeIn();
}
//the method is used to get the current time for the log
    function getCurrentTime() {
        var today = new Date();
        var cHour = today.getHours();
        var cMin = today.getMinutes();
        var cSec = today.getSeconds();
        return cHour+ ":" + cMin+ ":" +cSec;
    }
//the method is used to clear the output
function clearOutput(){
    $("#container2").css("display", "none");
}

$(document).ready(function () {
    //the method is called when the button is pressed
    $("#button").on("click", function () {
        //ajax call that retrieves the info in json format and has separate actions in the case of success or any error
        $.ajax({
            url: "https://api.github.com/users/" + $('#username').val(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "GET", /* or type:"GET" or type:"PUT" */
            dataType: "json",
            data: {},
            success: function (result) {
                console.log(result);
                showUser(result);
                $("#success").text("time: " + getCurrentTime() + " Username searched: " + $('#username').val());
                $("#success_message").clone().appendTo("#history_container").fadeIn();
                $('#history_container div a').fadeIn();
            },
            error: function () {
                noSuchUser($('#username').val());
                clearOutput();
            }
        });
    });
    //the method is called when the "enter" pressed on the keyboard
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            username = $(this).val();
            //ajax call that retrieves the info in json format and has separate actions in the case of success or any error
            $.ajax({
                url: "https://api.github.com/users/" + username,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                type: "GET", /* or type:"GET" or type:"PUT" */
                dataType: "json",
                data: {},
                success: function (result) {
                    console.log(result);
                    showUser(result);
                    $('#history_container div a').fadeIn();
                    $("#success").text("time: " + getCurrentTime() + " Username searched: " + username);
                    $("#success_message").clone().appendTo("#history_container").fadeIn();
                    $('#history_container div a').fadeIn();

                },
                error: function () {
                    noSuchUser($('#username').val());
                    clearOutput();
                }
            });
        }
    })
});
