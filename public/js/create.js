$(function() {
    $(".create-user").on("submit", function(event) {
        event.preventDefault();

        var newUser = {
            name: $("#name").val().trim(),
            email: $("#email").val().trim(),
            password: $("#password").val().trim()
        };

        $.ajax("/api/createUser", {
            type: "POST",
            data: newUser
        }).then(
            function() {
                console.log("created a new user!");
                location.reload();
            }
        );
    });
});