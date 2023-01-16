$('#question-list').find('div').html('');

var storageRef = firebase.storage().ref();
var database = firebase.database();

database.ref('pdfQuestion/qList')
.on('value', function(snapshot)
{
    snapshot.forEach((childSnapshot) => {
        var key = childSnapshot.key
        
        database.ref('pdfQuestion/qList/'+key).on('value', function(d)
        {
            result = d.val()
            id = result.id
            pdf = result.pdf
            tilte = result.title + " ("+ result.questions +" Questions)"

            document.getElementById("question-list").innerHTML +=  '<div class="row border"><div class="col-8">'+tilte+'</div><div class="col-4"><a href="quiz.html?id='+id+'"><button type="button" class="btn btn-primary">Start Test</button></a></div></div>';
        });


    })




});