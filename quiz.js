$('#option-list').find('div').html('');
var storageRef = firebase.storage().ref();
var database = firebase.database();

var id = getParameterByName('id');
var id = id.toString()


database.ref('pdfQuestion/solution/'+id)
.on('value', function(snap)
{
    js = snap.val()
    solut(js)
});

function solut(resp)
{
    window.jsolu = resp
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


database.ref('pdfQuestion/qList/'+id)
.on('value', function(snapshot)
{
    res = snapshot.val()
    id = res.id;
    pdf = res.pdf;
    instr = res.instructions
    que = res.questions
    title = res.title

    link = pdf+"/preview"
    document.getElementById('pdfFrame').setAttribute("src", link)
    document.getElementById('inst').innerHTML = instr;

    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    let sessionId = Date.now()+"_"+id
    let d = new Date()
    nowDate = d.getDate() + "/" + month[d.getMonth()] + "/" + d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()
    console.log(nowDate)
    firebase.database().ref('pdfQuestion/evaluvate/'+sessionId).update({
        sessionId: sessionId,
        title : title,
        time: nowDate,
        noOfQuestions : que,
        marks : 'PENDING'

      });

    

    for (var i=1; i<=que; i++)
    {
        var param = '\''+id+'\',\''+sessionId+'\',\''+i+'\'';
        document.getElementById("option-list").innerHTML += 
        '<label for="basic-url" class="form-label">Question No '+i+'</label><div class="input-group mb-3"><input type="text" class="form-control"id="answer_'+i+'"aria-describedby="button-addon2"><button class="btn btn-outline-secondary" type="button" id="submitButton_'+i+'" onClick="submitAnswer('+param+')">Submit</button></div>';
    }

});



function submitAnswer(testID, sessionID, qid)
{
    console.log(window.jsolu[qid])
    correctAns = window.jsolu[qid]['qOpt']
    inp = 'answer_'+qid.toString();
    sub = 'submitButton_'+qid.toString();
    var answer = document.getElementById(inp).value;
    window.poi = null
    console.log(answer)
    console.log(correctAns)
    if (correctAns.localeCompare(answer.toUpperCase()))
    {
        window.poi = 0
    }
    else
    {
        window.poi = 1
    }


    firebase.database().ref('pdfQuestion/response_temp/'+sessionID+'/'+qid).update({
        id: qid,
        selectedOpt : answer.toUpperCase(),
        correctAnswer : correctAns,
        points : window.poi

      });


      firebase.database().ref('pdfQuestion/response/'+sessionID+'/'+qid).update({
        id: qid,
        selectedOpt : answer.toUpperCase(),
        correctAnswer : correctAns,
        points : window.poi

      });

    document.getElementById(inp).disabled = true;
    document.getElementById(sub).disabled = true;
    document.getElementById(sub).innerHTML = 'Submitted';

}


