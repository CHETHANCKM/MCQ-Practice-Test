$('#response-list').find('div').html('');
var storageRef = firebase.storage().ref();
var database = firebase.database();



// database.ref('pdfQuestion/evaluvate/')
// .on('value', function(snap)
// {
//     js = snap.val()
//     solut(js)
// });

// function solut(resp)
// {
//     window.prJson = resp
// }


database.ref('pdfQuestion/evaluvate').on('value', function(d)
{
    d.forEach((childSnapshot) => {
        var key = childSnapshot.val();
        console.log(key);
        var noOfQuestions = key.noOfQuestions;
        var marks = key.marks+"/"+noOfQuestions;
        var marks1 = key.marks;
        var sessionId = key.sessionId;
        var time = key.time;
        var paperid = key.paperid
        var title = key.title;
        console.log(paperid)

        if (marks1 != 'PENDING')
        {
            document.getElementById('response-list').innerHTML+= '<div class="row border"><div class="col-3 heading">'+time+'</div><div class="col-3 heading">'+title+'</div><div class="col-3 heading">'+marks+'</div><div class="col-3 heading"><a href="viewPaper.html?id='+sessionId+'&paperid='+paperid+'">View</a></div></div>';
        }
       

    })

});