$(".submit").on("click", function(event) {
    event.preventDefault();
    // Validate the form
    function validateForm() {
        var isValid = true;
        // Check if any of the answers are blank
        $('.form-control').each(function() {
            if($(this).val() === "0") {
                isValid = false;
            };
        });
        return isValid;
    };
    // If the form is filled out (validateForm is true)
    // Add the answers into an object to post to data
    if (validateForm()) {
        // Create an object for the user"s data
        var userData = {
          name: $("#name").val(),
          photo: $("#photo").val(),
          scores: [
            $("#q1").val(),
            $("#q2").val(),
            $("#q3").val(),
            $("#q4").val(),
            $("#q5").val(),
            $("#q6").val(),
            $("#q7").val(),
            $("#q8").val(),
            $("#q9").val(),
            $("#q10").val()
          ]
        };
        // function to know the total scores and added it as a value:key in userData
        function sumScore(scoresArr) {
            var total = 0;
                for (i of scoresArr) {
                    total += parseInt(i);
                }
            return total;
        }
        // add totalScore to userData object as a parameter (this will be used to compare the best match)
        userData.totalScore = sumScore(userData.scores);
        // console.log('userScore', userData.scores)
        
        // console.log("totalScore",userData.totalScore)
        // Get all of the friends from API to find the closest totalScore to match with user's totalScore
        $.get("/api/friends").then(function(friendData) {
            var friendScores = [];
            // Loop through each of the friend and push their scores into friendScores
            for (i of friendData){
                friendScores.push(parseInt(i.totalScore))
            };
            // Find the closest totalScore to user's totalScore
            function findClosest(num,arr) {
                var diffArr = [];
                for (i of arr) {
                    diffArr.push(Math.abs(num-i))
                };
                return diffArr.indexOf(Math.min(...diffArr));
            };
            var closestFriendIndex = findClosest(userData.totalScore, friendScores);
            // find the best matched with the closest totalScore
            function findBestMatched(score){
                for (i of friendData) {
                    if(i.totalScore === score) {
                        return [i.name, i.photo, i.totalScore]
                    }
                }
            };
            var bestMatch = friendData[closestFriendIndex];
            
            // Show the photos of best match in modal
            $(".result-name").text(bestMatch.name);
            $(".result-img").attr("src", bestMatch.photo);
            // Show the modal with the best match
            $("#result-modal").modal("toggle");
            // testing and debugging
            console.log("all of friends scores", friendScores);
            console.log("user score", userData.totalScore)
            console.log("best match index", closestFriendIndex);
            console.log("this is the best match: ",bestMatch);
        });
        $.post("/api/friends", userData, function(data) {
            console.log("post successful")
        });
    } else {
        // console.log("incomplete form")
        $(".result-name").text("Incomplete form");
        $(".result-img").attr("src", "https://i.pinimg.com/originals/32/3e/3b/323e3b47f07fa1fb0a4b2ecb03b2c965.png");
        // Show the modal with the best match
        $("#result-modal").modal("toggle");
    }
});