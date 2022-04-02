window.addEventListener("load" , function (){ 

    $("#postcode_search").on("click",function(){ search_postcode(); }); 

}); 
function search_postcode(){

    let postcode    = $("#postcode").val();
    let pattern     = /^\d{7}$/g;

    //未入力の場合は処理しない。
    if (!postcode){
        return false;
    }

    //正規表現で郵便番号であるかを判定
    postcode        = postcode.replace("-","");
    let result      = postcode.match(pattern);

    if (!result){
        console.log("郵便番号ではない"); 
        return false;
    }

    //http://zipcloud.ibsnet.co.jp/doc/api

    $.ajax({
        url: "https://zipcloud.ibsnet.co.jp/api/search?zipcode=" + result[0],
        type: "GET",
    }).done( function(data, status, xhr ) { 
        //このdataは文字列で返ってくるのでまずはJSONに変換させる必要がある。
        json    = JSON.parse(data);

        if (!json["results"]){
            console.log("データなし"); 
            return false;
        }

        //都道府県
        console.log(json["results"][0]["address1"]);

        //〇〇市
        console.log(json["results"][0]["address2"]);

        //〇〇
        console.log(json["results"][0]["address3"]);

        $("#prefecture").val(json["results"][0]["address1"]);
        $("#city").val(json["results"][0]["address2"]);
        $("#address").val(json["results"][0]["address3"]);

    }).fail( function(xhr, status, error) {
        console.log("通信エラー"); 
    });
}   

