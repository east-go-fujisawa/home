var url = "https://script.google.com/macros/s/AKfycbxjWVbr7uxCMrVrk2obh8QhDocetFj7IxTm4f5UYvW3DKhlSR4pkLMELeHJb2R98e5f/exec"; //なまえとIDデータ
var add_name = [];
var names_ids_datas = "";
function start(){
document.getElementById("center").style.display = "none";
document.getElementById("t").innerHTML = "ー準備中ー";
var url2 = url+"?branch=username_get";
fetch(url2,{
    "method":"get",
    "mode":"cors"
})
.then(response =>{
    if(response.ok){
        return response.json()
    }
})
.then(json=>{
    names_ids_datas = json
    document.getElementById("center").style.display = "block";
document.getElementById("t").innerHTML = "LINE";
})
.catch(e =>{
    console.log(e);
    alert("データ取得時にエラーが発生しました\nエラーコード：4");
})
}
/*
var datas = [{"1":[{"name":[],"id":[]}],"2":[{"name":[],"id":[]}],"3":[{"name":[],"id":[]}],}];
for(var i = 1; i<5; i+=2){
var last = sheet.getActiveSheet().getRange(1,i).getNextDataCell(SpreadsheetApp.Direction.DOWN).getLastRow();
var names = sheet.getActiveSheet().getRange(2,i,last,1).getValues();
//var ids = sheet.getActiveSheet().getRange(2,i+1,last,1).getValues();
for(var n of names){
datas[0][i][0]["name"].push(n);
//datas[0][i][0]["id"].push(ids[count]);
}
}
*/

document.getElementById("grade").onchange = change;
function change(grade){
    document.getElementById("names2").remove();
    grade = grade.target.value;
    if(grade.indexOf("全員") > 0){
        grade = grade.substring(0,1);
        for(var n of names_ids_datas[0][grade]){
        var text2 = '<p class="b1" id="'+n+'"onclick=del("'+n+'")>'+n+'</p>';
        document.getElementById("add_names").insertAdjacentHTML("beforeend",text2);
        add_name.push(text);
        }
    }else{
    grade = grade.substring(0,1);
    var count = -1;
    document.getElementById("names").insertAdjacentHTML("beforeend",'<div id="names2"></div>');
    for(var n of names_ids_datas[0][grade]){
        count++;
        var text2 = '<p class="b1" id="'+n+'" onclick=add("'+n+'")>'+n+'</p>';
        document.getElementById("names2").insertAdjacentHTML("beforeend",text2);
    }
}
}

function add(text){
        if(names_ids_datas.length > 0){
        document.getElementById(text).remove();
        var text2 = '<p class="b1" id="'+text+'" onclick=del("'+text+'")>'+text+'</p>';
        document.getElementById("add_names").insertAdjacentHTML("beforeend",text2);
        add_name.push(text);
        }else{
            alert("データ取得中です\nしばらくお待ちください\n2秒後自動で処理を行います");
            setTimeout(()=>{
                add(text);
            },2000);
        }
}

function del(text){
        document.getElementById(text).remove();
        var text2 = '<p class="b1" id="'+text+'"onclick=add("'+text+'")>'+text+'</p>';
        document.getElementById("names2").insertAdjacentHTML("beforeend",text2);
        var count = -1;
        for(var n of add_name){
            count++;
            if(n == text){
                add_name = add_name.splice(count,1);//若干怪しい定義を確認した方が良き
            }
        }
}


function send(){
    document.getElementById("send_button").innerHTML = "送信中";
    var texts = document.getElementById("texts").value;
    var datas = [{
        "message":texts,
        "usernames":add_name,
        "branch":"send"
    }];
    var params = {
        "method":"post",
        "mode":"no-cors",
        "Content-Type":"application/json",
        "body":JSON.stringify(datas)
    }
    fetch(url,params)
    .then(response=>{
        document.getElementById("send_button").innerHTML = "送信完了";
    })
    .catch(err=>{
        console.log(err);
        alert("データ送信中にエラーが発生しました\nエラーコード：5");
    })
    
}