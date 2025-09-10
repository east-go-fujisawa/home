var json_data = "";
var change_name = "";
function start(){
    var url = "";
    fetch(url,{
        "method":"get",
        "mode":"no-cors"//ワンちゃん違うかも
    })
    .then(response =>{
        if(response.ok){
            return  response.json()
        }
    })
    .then(json =>{
        json_data = json;
        //適宜処理を記述する
    })
    .catch(err =>{
        console.log(err);
        alert("データ取得中にエラーが発生しました");
    })
}

function names_write(){
    for(var n of json_data[0]){
        var text = '<p class="names" id="'+n+'"onclick="add('+n+')">'+n+'</p>';
        var text2 = '<p class="names" id="'+n+'"onclick="del('+n+')">'+n+'</p>';
        document.getElementById("n1").insertAdjacentHTML("beforeend",text);
        document.getElementById("n11").insertAdjacentHTML("beforeend",text2);
    }
}

function del(text){
    var result = confirm(text+"を削除します\nよろしいですか？");
    if(result){

    }else{
        alert("中断しました");
        return;
    }
    var data = [{
        "branch":"delete",
        "name":text
    }]
    var params = {
        "method":"post",
        "mode":"cors",
        "Content-Type":"application/json",
        "body":JSON.stringify(data)
    }
    fetch(url,params)
}

function add(text){
    change_name = text;
    document.getElementById(text).remove();
    document.getElementById("n2").insertAdjacentHTML("beforeend",'<p>'+text+'</p>');
}
function name_change(){
    var new_name = document.getElementById("c_name").value;
    if(new_name.length == 0){
        alert("空欄です")
        return
    }
    var result = confirm("名前を"+new_name+"に変更します\nよろしいですか？");
    if(result){

    }else{
        alert("中断しました")
        return;
    }
    var data = [{
        "branch":"change_name",
        "pre_name":change_name,
        "new_name":new_name
    }]
    var params = {
        "method":"post",
        "mode":"cors",
        "Content-Type":"application/json",
        "body":JSON.stringify(data)
    }
    fetch(url,params)
}