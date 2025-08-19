var url = ""; //なまえとIDデータ
var names_ids_datas = "";
fetch(url,{
    "method":"get",
    "mode":"cors"
})
.then(response =>{
    if(response.ok){
        return response.json()
    }
})
.then(json=>{
    names_ids_datas = json;
})
.catch(e =>{
    console.log(e);
    alert("データ取得時にエラーが発生しました");
})
/*
var datas = [{"1":[{"name":[],"id":[]}],"2":[{"name":[],"id":[]}],"3":[{"name":[],"id":[]}],}];
for(var i = 1; i<5; i+=2){
var last = sheet.getActiveSheet().getRange(1,i).getNextDataCell(SpreadsheetApp.Direction.DOWN).getLastRow();
var names = sheet.getActiveSheet().getRange(2,i,last,1).getValues();
var ids = sheet.getActiveSheet().getRange(2,i+1,last,1).getValues();
var count = -1;
for(var n of names){
count++;
datas[0][i][0]["name"].push(n);
datas[0][i][0]["id"].push(ids[count]);
}
}
*/

document.getElementById("grade").addEventListener("change",change);
function change(){
    document.getElementById("names2").remove();
    var grade = document.getElementById("grade").value;
    grade = grade.substring(0,1);
    var count = -1;
    document.getElementById("names").insertAdjacentHTML("beforeend",'<div id="names2"></div>');
    for(var n of datas[0][grade][0]["name"]){
        count++;
        var text2 = '<p class="b1" id="'+n+'"onclick=add('+n+')>'+n+'</p>';
        document.getElementById("names2").insertAdjacentHTML("beforeend",text2);
    }
}

