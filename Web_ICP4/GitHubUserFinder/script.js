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

function showUser(user) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    $("#container2").css("display", "block");
    $("#user").text(user.id);

    $("#avat").attr("src", user.avatar_url);
    $("#joinedDate").text(user.created_at);
    $("#followers").text(user.followers);
    $("#following").text(user.following);
    $("#link").attr("href", user.html_url);
    $("#button").removeClass("btn-primary");
    $("#button").addClass("btn-danger");

    $("#profile").css("display", "block");
    $("#button").text("Check Another User!");
}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    $("#user").text("GitHub does not have the user with the following name: " + username);

}

function getCurrentTime() {
    var today = new Date();
    var cHour = today.getHours();
    var cMin = today.getMinutes();
    var cSec = today.getSeconds();
    return cHour+ ":" + cMin+ ":" +cSec;
}
function clearOutput(){
    $("#container2").css("display", "none");
}
$(document).ready(function () {
    $("#button").on("click", function () {
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
                $("#error").text("time: " + getCurrentTime() + " Username searched: " + $('#username').val()+" NOT FOUND!");
                $("#error_message").clone().appendTo("#history_container").fadeIn();
                $('#history_container div a').fadeIn();
                clearOutput();
            }
        });
    });
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            username = $(this).val();
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
                    $("#error").text("time: " + getCurrentTime() + " Username searched: " + username+" NOT FOUND!");
                    $("#error_message").clone().appendTo("#history_container").fadeIn();
                    $('#history_container div a').fadeIn();
                    clearOutput();
                }
            });
        }
    })
});
