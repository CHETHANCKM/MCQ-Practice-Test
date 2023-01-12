$('#response-list').find('div').html('');
var storageRef = firebase.storage().ref();
var database = firebase.database();


database.ref('pdfQuestion/evaluvate').on('value', function(d)
{
    d.forEach((childSnapshot) => {
        var key = childSnapshot.val();
        var id = key.sessionId
        var date = key.time
        var title = key.title
        var marks =  key.marks

        if (marks=='PENDING')
        {
            document.getElementById('response-list').innerHTML+= '<div class="row border"><div class="col-3">'+date+'</div><div class="col-4">'+title+'</div><div class="col-4"><a href="evalPapaer.html?id='+id+'"><button type="button" class="btn btn-primary">Evaluvate</button></a></div></div>';
        }
    })
    
     
});