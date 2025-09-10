var json_data = "";

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
    
}