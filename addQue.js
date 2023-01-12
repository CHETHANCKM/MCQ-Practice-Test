function addQues()
{
    var paperid = document.getElementById('paperid').value;
    var title = document.getElementById('title').value;
    var no = document.getElementById('no').value;
    var time = document.getElementById('time').value;
    var link = document.getElementById('link').value;
    var inst = document.getElementById('inst').value;

    firebase.database().ref('pdfQuestion/qList/'+paperid).update({
        id: paperid,
        instructions: inst,
        pdf : link,
        questions: no,
        time: time,
        title: title
      });

}