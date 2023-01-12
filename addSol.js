const csv = req

function pushtoFireBase()
{
    var files = document.getElementById('ch-sol-file').files;
    if(files.length==0){
      alert("Please choose any file...");
      return;
    }
    var filename = files[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension == '.CSV') {
        //Here calling another method to read CSV file into json
        csvFileToJSON(files[0]);
    }else{
        alert("Please select a valid csv file.");
    }
}


function csvFileToJSON(file)
{
    try {
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function(e) {
            var jsonData = [];
            var headers = [];
        
            var rows = e.target.result.split("\n");               
            for (var i = 0; i < rows.length; i++) {
                var cells = rows[i].split(",");
                var rowData = {};
                for(var j=0;j<cells.length;j++){
                    if(i==0){
                        var headerName = cells[j].trim();
                        headers.push(headerName);
                    }else{
                        var key = headers[j];
                        if(key){
                            rowData[key] = cells[j].trim();
                        }
                    }
                }
                //skip the first row (header) data
                if(i!=0){
                    writeTosolDB(rowData)
                    jsonData.push(rowData);
                }
            }
            console.log(headers)
            console.log(jsonData)
            //displaying the json result in string format
            document.getElementById("display_csv_data").innerHTML=JSON.stringify(jsonData);
            }
        }catch(e){
            console.error(e);
        }

        window.alert('All Solutions added');
}



function writeTosolDB(rowData)
{
    var testId = document.getElementById('testId').value;
    var qNo = rowData.qNo;
    var qType = rowData.qType;
    var qOpt = rowData.qOpt;

    firebase.database().ref('pdfQuestion/solution/'+testId+'/'+qNo).update({
        qNo: qNo,
        qType : qType,
        qOpt: qOpt
      });

}