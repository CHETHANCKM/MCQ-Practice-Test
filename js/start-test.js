var storageRef = firebase.storage().ref();
var database = firebase.database();


var countDownDate = new Date().getTime()+3600*1000;

console.log(countDownDate);


function startTime(cocountDownDateunt)
{
  
}




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
            document.getElementById("question-list").innerHTML += '<div class="question-frame"> <p> Question ID: '+questionID+
            '</p> <img class="question_img" src="'+questionURL+
            '" /> <div class="form-check"> <div class="container text-center"> <div class="row"> <div class="col"> <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" /> <label class="form-check-label" for="flexRadioDefault1"> A </label> </div> <div class="col"> <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" /> <label class="form-check-label" for="flexRadioDefault1"> B </label> </div> <div class="col"> <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" /> <label class="form-check-label" for="flexRadioDefault1"> C </label> </div> <div class="col"> <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" /> <label class="form-check-label" for="flexRadioDefault1"> D </label> </div> </div> </div> </div> <button type="button" class="btn btn-outline-success">Success</button> </div>';
            

            console.log(childData);
          });


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
        startTime(countDownDate);
      }
      else if(status == "COMPLETED")
      {
        console.log("Test already completed");
      }
  });

  
  console.log(testID);

});