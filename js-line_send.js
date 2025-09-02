var url = "https://script.google.com/macros/s/AKfycbxjWVbr7uxCMrVrk2obh8QhDocetFj7IxTm4f5UYvW3DKhlSR4pkLMELeHJb2R98e5f/exec"; //なまえとIDデータ
var url_log = "https://script.google.com/macros/s/AKfycbyMO0vgv9oaTtWZNtPADQGuOpOKyqkCsDm9GAFykqCa6wQHDZGtB40CE4rk583S2B1Q/exec";
var add_name = [];
var all_status = 0;
var names_ids_datas = "";
var number = 0;
var div_name = "guide1";
var b ="run";
function start(){

/*var urll = new URL(window.location.href);
try{
var param = urll.searchParams;
param = param.get('url');
if(param.length > 0){

}
}catch(e){

}*/

document.getElementById("center").style.display = "none";
document.getElementById("t").innerHTML = "ー準備中ー";
document.getElementById("t").style.color = "black";
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
document.getElementById("t").style.color = "rgb(0, 223, 11)";
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
    div_name = "guide2";
    document.getElementById("guide1").style.border = "none";
    document.getElementById("guide2").style.border = "5px solid rgb(0, 0, 0)";
    
    grade = grade.target.value;
    if(add_name.length > 0 && grade.indexOf("全員") > 0 && past_grade == grade.substring(0,1)){
        document.getElementById("names2").remove();
        document.getElementById("add_names2").remove();
        document.getElementById("names").insertAdjacentHTML("beforeend",'<div id="names2"></div>');
        document.getElementById("add_names").insertAdjacentHTML("beforeend",'<div id="add_names2"></div>');
        add_name = [];

    }else if(add_name.length == 0){
        try{
    document.getElementById("names2").remove();
        }catch(e){

        }
    }else{
        alert("学年を跨いで送信することはできません");
        return;
    }
    if(grade.indexOf("全員") > 0){
        grade = grade.substring(0,1);
        past_grade = grade;
        var count = -1;
        for(var n of names_ids_datas[0][grade]){
            count++;
            if(count == 0){

            }else{
        var text2 = '<p class="b1" id="'+n+'"onclick=del("'+n+'")>'+n+'</p>';
        document.getElementById("add_names2").insertAdjacentHTML("beforeend",text2);
        add_name.push(n);
            }
        }
    document.getElementById("guide2").style.border = "none";
    document.getElementById("guide3").style.border = "5px solid rgb(0, 0, 0)";
    
    div_name = "guide3";
    guide2();
    }else{
    grade = grade.substring(0,1);
    past_grade = grade;
    var count = -1;
    document.getElementById("names").insertAdjacentHTML("beforeend",'<div id="names2"></div>');
    for(var n of names_ids_datas[0][grade]){
        count++;
        if(count == 0){

        }else{
        var text2 = '<p class="b1" id="'+n+'" onclick=add("'+n+'")>'+n+'</p>';
        document.getElementById("names2").insertAdjacentHTML("beforeend",text2);
        }
    }
}
}

function add(text){
    document.getElementById("guide2").style.border = "none";
    document.getElementById("guide3").style.border = "5px solid rgb(0, 0, 0)";    
    
    div_name = "guide3";
    guide2();
        if(names_ids_datas.length > 0){
        document.getElementById(text).remove();
        var text2 = '<p class="b1" id="'+text+'" onclick=del("'+text+'")>'+text+'</p>';
        document.getElementById("add_names2").insertAdjacentHTML("beforeend",text2);
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

function send2(){
    document.getElementById("guide4").style.border = "none";
    if(add_name.length == 0){
        alert("配信該当者がいません");
        return;
    }else if(document.getElementById("texts").value.length == 0 && number == 0){
        alert("メッセージも画像もありません");
        return;
    }   
 document.getElementById("send_button").innerHTML = "送信中";
var url2 = "https://script.google.com/macros/s/AKfycbyk_i14NGTraFc4_gFBnXLwuA1vGktlAhdCL0hKEYSJEgjk4RfSUo6XOonZuqYpYbRK-g/exec";
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
    console.log(json[0]);
    if(json[0][0] == number && json[0][1].length > 0){
        document.getElementById("al").innerHTML ="GitHubで画像を公開中です。しばらくお待ちください。"
        try{
            fetch("https://east-go-fujisawa.github.io/datas/photos/"+json[0][1],{
                "method":"HEAD"
            })
            .then(response=>{
                if(response.ok){
                    send(json[0][1]);
                }else{
                    setTimeout(()=>{
                        console.log("rget");
                        send2();
                    },5000)
                }
            })
            .catch(e=>{
                console.log(e);
                alert("データ取得時にエラーが発生しました\nエラーコード8");
            })
        }catch(e){
                console.log(e);
                alert("データ取得時にエラーが発生しました\nエラーコード8");
        }
    }else if(json[0][0] == number && json[0][1].length == 0){
        var result = window.confirm("画像がアップロードされていません\n忘れていませんか？");
        if(result){
            document.getElementById("send_button").innerHTML = "送信する";
            return;
        }else{
            if(document.getElementById("texts").value.length == 0){
                alert("メッセージも空欄です");
                document.getElementById("send_button").innerHTML = "送信する";
                return;
            }else{
                send("none");
            }
            
        }
    }else{
        send("none");
    }
    
})
.catch(e =>{
    console.log(e);
    alert("データ取得時にエラーが発生しました\nエラーコード7");       
})
}
function send(path){
    //document.getElementById("send_button").innerHTML = "送信中";
    var texts = document.getElementById("texts").value;
    //texts = texts.replace(/\n/g,"\"+'n');
    console.log(texts);
    if(all_status == 1){
        var datas = [{
            "message":texts,
            "usernames":[1],
            "branch":"send_all"
        }]
    }else if(all_status == 2){
        var datas = [{
            "message":texts,
            "usernames":[2],
            "branch":"send_all"
        }]
    }else if(all_status == 3){
        var datas = [{
            "message":texts,
            "usernames":[3],
            "branch":"send_all"
        }]
    }else{

    var datas = [{
        "message":texts,
        "usernames":add_name,
        "data_num":path,
        "branch":"send"
    }];
    }

    var params = {
        "method":"post",
        "mode":"no-cors",
        "Content-Type":"application/json",
        "body":JSON.stringify(datas)
    }
    fetch(url,params)
    .then(response=>{
        b = "stop";
        document.getElementById("send_button").innerHTML = "送信完了";
        document.getElementById("al").innerHTML ="";
        setTimeout(()=>{
            document.getElementById("send_button").innerHTML = "送信する";
        },3000);
    })
    .catch(err=>{
        console.log(err);
        alert("データ送信中にエラーが発生しました\nエラーコード：5");
    })
    
}


function file_up(){
    document.getElementById("if").style.display = "block";
    document.getElementById("open").style.display = "none";
    document.getElementById("guide4").style.border = "none";
    var url2 = "https://script.google.com/macros/s/AKfycbyk_i14NGTraFc4_gFBnXLwuA1vGktlAhdCL0hKEYSJEgjk4RfSUo6XOonZuqYpYbRK-g/exec";
    number = Math.random()*100000;
    number = parseInt(number);
    var datas = [{
        "branch":"time",
        "message":number
    }]
    var params = {
        "method":"post",
        "mode":"no-cors",
        "Content-Type":"application/json",
        "body":JSON.stringify(datas)
    }
    fetch(url2,params);
}

function jump2(){
    window.open("intro1.html","_blank");
}

function ani(){
    b = "run";
    var count =  0;
    var inte = setInterval(()=>{
        if(b == "run"){
        count++;
        if(count == 1){
            document.getElementById("send_button").innerHTML = "送信中";
        }else if(count == 2){
            document.getElementById("send_button").innerHTML = "送信中.";
        }else if(count == 3){
            document.getElementById("send_button").innerHTML = "送信中..";
        }else if(count == 4){
            document.getElementById("send_button").innerHTML = "送信中...";
            count = 0;
        }
        }else{
            clearInterval(inte);
            return;
        }
        
    },1000);
}

function guide(){
    var count = 0;
    document.getElementById("p").style.display = 'block';
    document.getElementById("p1").style.display = 'block';
    document.getElementById("p2").style.display = 'block';
    document.getElementById("p3").style.display = 'block';
    document.getElementById("guide1").style.border = '5px solid rgb(0, 0, 0)';
    var c = setInterval(()=>{
        count++;
        if(count == 1){
            document.getElementById(div_name).style.borderColor = "rgb(230,230,230)";
        }else{
            count = 0;
            document.getElementById(div_name).style.borderColor = "rgb(0, 0, 0)";
        }
    },1000)

}

function guide2(){
    setTimeout(()=>{
    document.getElementById("guide3").style.border = "none";
    document.getElementById("guide4").style.border = "5px solid rgb(0, 0, 0)";    
    
    div_name = "guide4";
    },5000)

}