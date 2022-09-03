var storageRef = firebase.storage().ref();
var database = firebase.database();


//getResults

$('#list').find('div').html('');

database.ref('results/')
  .on('value', function(snapshot) {
    snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        // ...

        var marks = childData.marks;
        var topic = childData.topic;
        var starttime = childData.starttime;
        var status = childData.status;
        var testID = childData.testID;

        console.log(childData);

        document.getElementById("list").innerHTML += 
        '<tr><td class="tg-0lax">'+testID+
        '</td><td class="tg-0lax">'+topic+
        // '</td><td class="tg-0lax">'+starttime+
        '</td><td class="tg-0lax">'+marks+
        '</td><td class="tg-0lax">'+status+'</td></tr>';
      });
  });
