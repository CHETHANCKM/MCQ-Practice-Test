var storageRef = firebase.storage().ref();
var database = firebase.database();

$('#question-list').find('div').html('');

var validTest = document.getElementById('validTestID');

validTest.addEventListener('click', function(e) {

  var testID = document.getElementById('test-id').value;
  
  database.ref('results/'+testID)
  .on('value', function(snapshot) {
      var status = snapshot.val().status;
      console.log(status);

      if(status == "NOT STARTED")
      {
        database.ref('questions/'+testID)
        .on('value', function(snapshot) {
          snapshot.forEach((childSnapshot) => {
            var childData = childSnapshot.val();
            var questionURL = childData.questionURL;
            var questionID = childData.questionId;
            var correctOption = childData.correctOption;
            var points = childData.points;
            var param = '\''+questionID+'\',\''+correctOption+'\',\''+testID+'\'';
            document.getElementById("question-list").innerHTML += '<div class="question-frame"> <p>Question ID: "'+questionID+
            '"</p> <img class="question_img" src="'+questionURL+
            '"/> <div class="form-check"> <div class="container text-center"> <div class="row" id="options_'+questionID+
            '"> <div class="col"> <input class="form-check-input" type="radio" value="A" name="flexRadioDefault_'+questionID+
            '" id="flexRadioDefault1" /> <label class="form-check-label" for="flexRadioDefault1"> A </label> </div> <div class="col"> <input class="form-check-input" type="radio" value="B" name="flexRadioDefault_'+questionID+
            '" id="flexRadioDefault1" /> <label class="form-check-label" for="flexRadioDefault1"> B </label> </div> <div class="col"> <input class="form-check-input" type="radio" value="C" name="flexRadioDefault_'+questionID+
            '" id="flexRadioDefault1" /> <label class="form-check-label" for="flexRadioDefault1"> C </label> </div> <div class="col"> <input class="form-check-input" type="radio" value="D" name="flexRadioDefault_'+questionID+
            '" id="flexRadioDefault1" /> <label class="form-check-label" for="flexRadioDefault1"> D </label> </div> </div> </div> </div> <button type="button" class="btn btn-outline-success" id="submit_'+questionID+
            '" onClick="submitAnswer('+param+')">Submit</button> </div>';
          });

          var countDownDate = new Date().getTime()+3600*1000;
          var x = setInterval(function() {

            var now = new Date().getTime();
          
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
          
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
            // Display the result in the element with id="demo"
            document.getElementById("time-limit").innerHTML = "Time remaining: " + hours + "h "
            + minutes + "m " + seconds + "s ";
          
            // If the count down is finished, write some text
            if (distance < 0) {
              clearInterval(x);
              document.getElementById("time-limit").innerHTML = "TIME OUT";
            }
           
          }, 1000);

        });

        document.getElementById('testID-topic').innerHTML = "Test ID: "+testID;
        // startTime(countDownDate);

      }
      else if(status == "COMPLETED")
      {
        console.log("Test Completed");
      }
      else
      {
        window.alert("Invalid Test ID");
      }

      firebase.database().ref('results/'+testID+'/').update({
        status: "COMPLETED"
      });
  });

  
  console.log(testID);

});




function submitAnswer(id, value, testID)
{
  console.log(id);
  console.log(value);
  console.log(testID);

  var options = document.getElementsByName('options_'+id);

  var selectdOpt = document.querySelector('input[name="flexRadioDefault_'+id+'"]:checked').value;
  var marks= 0;
  if (value==selectdOpt)
  {
    marks = 1;
    console.log("Correct");
  }
  
  firebase.database().ref('oldQP/'+testID+'/'+id+'/').update({
    points: marks,
    selectedOpt : selectdOpt
  });

  document.getElementById('submit_'+id).innerHTML = "Option "+selectdOpt+ " selected.";
  document.getElementById('submit_'+id).disabled = true;


}