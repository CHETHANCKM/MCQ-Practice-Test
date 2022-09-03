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
  
        if(status == "COMPLETED")
        {
          database.ref('oldQP/'+testID)
          .on('value', function(snapshot) {
            snapshot.forEach((childSnapshot) => {
              var childData = childSnapshot.val();
            
              var questionURL = childData.questionURL;
              var questionID = childData.questionId;
              var correctOption = childData.correctOption;
              var selectdOption = childData.selectedOpt;
              var points = childData.points;
              var param = '\''+questionID+'\',\''+correctOption+'\',\''+testID+'\'';
              document.getElementById("question-list").innerHTML += 
              '<div class="question-frame"> <p>Question ID: "'+questionID+
              '"</p> <img class="question_img" src="'+questionURL+
              '"/><div class="container text-center"><div class="row"><div class="col"><p class="sel-ans">Selected Opt: '+selectdOption+
              '</p></div><div class="col"><p class="correct-ans">Correct Opt: '+correctOption+'</p></div></div></div></div>';
            });
          });
  
          document.getElementById('testID-topic').innerHTML = "Test ID: "+testID;
          // startTime(countDownDate);
        }
    });
  
    
    console.log(testID);
  
  });