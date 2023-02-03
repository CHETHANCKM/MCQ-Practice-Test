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
    min = res.time;

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
        paperid: id,
        title : title,
        time: nowDate,
        noOfQuestions : que,
        marks : 'PENDING'

      });

    
    
database.ref('pdfQuestion/solution/'+id).on('value', function(d)
{
    var i = 1
    console.log(d.val());
    d.forEach((childSnapshot) => {
        var key = childSnapshot.val();
        console.log(key);
        var qNo = key.qNo;

        var param = '\''+id+'\',\''+sessionId+'\',\''+qNo+'\'';
        document.getElementById("option-list").innerHTML += 
        '<label for="basic-url" class="form-label">Question No '+qNo+'</label><div class="input-group mb-3"><input type="text" class="form-control"id="answer_'+i+'"aria-describedby="button-addon2"><button class="btn btn-outline-secondary" type="button" id="submitButton_'+i+'" onClick="submitAnswer('+param+')">Submit</button></div>';
        i = i+1;
    })
});

timer(min);

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

function timer(min)
{

var countDownDate = new Date().getTime()+(min*60000);
console.log(countDownDate);

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("timer").innerHTML = hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
    window.location.replace("/index.html");
  }
}, 1000);


}