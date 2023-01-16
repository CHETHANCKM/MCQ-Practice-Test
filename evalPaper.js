var id = getParameterByName('id');
var storageRef = firebase.storage().ref();
var database = firebase.database();

$('#eval-list').find('div').html('');

document.getElementById('testId').innerHTML = id;

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


database.ref('pdfQuestion/response_temp/'+id).on('value', function(d)
{
    d.forEach((childSnapshot) => {
        result = childSnapshot.val();

        var qid = result.id;
        var ca = result.correctAnswer;
        var points = result.points;
        var sa = result.selectedOpt;

        var param = '\''+qid+'\',\''+id+'\'';

        document.getElementById('eval-list').innerHTML+= '<div class="row border"><div class="col-2 pd-5">'+qid+'</div><div class="col-3 pd-5">'+ca+'</div><div class="col-3 pd-5">'+sa+'</div><div class="col-2 pd-5"> <input type="text" class="form-control" id="up_'+qid+'"value="'+points+'" aria-describedby="basic-addon1"></div><div class="col-2 pd-5"><button type="button" id="updatebut_'+qid+'" onclick="updateMarks('+param+')"class="btn btn-outline-success">Update</button></div></div>';
    });


});


function updateMarks(qid, sessionId)
{
    var textId = 'up_'+qid;
    var updatebut = 'updatebut_'+qid;
    var marks = document.getElementById(textId).value;

    firebase.database().ref('pdfQuestion/response/'+sessionId+'/'+qid).update({
        points :marks
      });

    var marks = document.getElementById(updatebut).innerHTML = 'Updated'
}


function countMarks()
{

    var imarks = 0;
    database.ref('pdfQuestion/response/'+id).on('value', function(d)
    {
        d.forEach((childSnapshot) => {
            result = childSnapshot.val();
            var points = parseInt(result.points);
            imarks += points;
        });

        
        firebase.database().ref('pdfQuestion/evaluvate/'+id).update({
            marks :imarks
        });

    });


}