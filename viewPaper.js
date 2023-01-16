$('#response-list').find('div').html('');
var storageRef = firebase.storage().ref();
var database = firebase.database();

var sessid = getParameterByName('id');
var sessid = sessid.toString()
var paperid = getParameterByName('paperid');
console.log(sessid)

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

database.ref('pdfQuestion/qList/'+paperid)
.on('value', function(snapshot)
{
    res = snapshot.val()
    pdf = res.pdf;
    instr = res.instructions
    que = res.questions
    title = res.title

    link = pdf+"/preview"
    document.getElementById('pdfFrame').setAttribute("src", link);
});


database.ref('pdfQuestion/response/'+sessid)
.on('value', function(snapshot)
{
    snapshot.forEach((childSnapshot) => {
        var key = childSnapshot.val();
        console.log(key);

        marks = key.points;
        qid = key.id;
        ca = key.correctAnswer;
        sa = key.selectedOpt;

        document.getElementById('response-list').innerHTML+= '<div class="va-'+marks+'"><span class="fw-600">Question No. '+qid+'</span><br><span>Your Answer: '+sa+'</span><br><span>Correct Answer: '+ca+'</span></div>';


    })

});