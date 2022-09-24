database.ref("results/" + testID).on("value", function (snapshot) {
        var status = snapshot.val().status;

        if (status == "NOT STARTED") {
          database.ref("questions/" + testID).on("value", function (snapshot) {
            snapshot.forEach((childSnapshot) => {
              var childData = childSnapshot.val();
              var questionURL = childData.questionURL;
              var questionID = childData.questionId;
              var correctOption = childData.correctOption;
              var points = childData.points;
              var param =
                "'" + questionID + "','" + correctOption + "','" + testID + "'";
              document.getElementById("question-list").innerHTML +=
                '<div class="question-frame"> <p>Question ID: "' +
                questionID +
                '"</p> <img class="question_img" src="' +
                questionURL +
                '"/> <div class="form-check"> <div class="container text-center"> <div class="row" id="options_' +
                questionID +
                '"> <div class="col"> <input class="form-check-input" type="radio" value="A" name="flexRadioDefault_' +
                questionID +
                '" id="flexRadioDefault1" /> <label class="form-check-label" for="flexRadioDefault1"> A </label> </div> <div class="col"> <input class="form-check-input" type="radio" value="B" name="flexRadioDefault_' +
                questionID +
                '" id="flexRadioDefault1" /> <label class="form-check-label" for="flexRadioDefault1"> B </label> </div> <div class="col"> <input class="form-check-input" type="radio" value="C" name="flexRadioDefault_' +
                questionID +
                '" id="flexRadioDefault1" /> <label class="form-check-label" for="flexRadioDefault1"> C </label> </div> <div class="col"> <input class="form-check-input" type="radio" value="D" name="flexRadioDefault_' +
                questionID +
                '" id="flexRadioDefault1" /> <label class="form-check-label" for="flexRadioDefault1"> D </label> </div> </div> </div> </div> <button type="button" class="btn btn-outline-success" id="submit_' +
                questionID +
                '" onClick="submitAnswer(' +
                param +
                ')">Submit</button> </div>';
            });
          });
        } else if (status == "COMPLETED") {
          console.log("Test Completed");
        } else {
          window.alert("Invalid Test ID");
        }
      });

      console.log("hello");