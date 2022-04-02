window.addEventListener("load" , function (){

    $(document).on("#submit","click", function(){ submit(); });
    $(document).on(".trash","click",  function(){ trash(this); });
});


function submit(){

    let form_elem   = "#form_area";

    let data    = new FormData( $(form_elem).get(0) );
    let url     = $(form_elem).prop("action");
    let method  = $(form_elem).prop("method");

    for (let v of data ){ console.log(v); }


    //参照:http://semooh.jp/jquery/api/ajax/jQuery.ajax/options/

    $.ajax({
        url: url,
        type: method,
        data: data,
        processData: false, //URLエンコードされた文字列ではなくFormData形式なのでfalseを指定
        contentType: false, //URLエンコードされた文字列ではないためfalseを指定
        dataType: 'json' //返り値はjsonを指定
    }).done( function(data, status, xhr ) { 

        if (data.error){
            console.log("ERROR");
        }
        else{
            $("#content_area").html(data.content);
            $("#textarea").val("");
        }

    }).fail( function(xhr, status, error) {
        console.log(status + ":" + error );
    }); 

}

function trash(elem){

    let form_elem   = $(elem).parent("form");
    let url         = $(form_elem).prop("action");

    $.ajax({
        url: url,
        type: "DELETE",
        dataType: 'json'
    }).done( function(data, status, xhr ) { 
        console.log(data);
    }).fail( function(xhr, status, error) {
        console.log(status + ":" + error );
    }); 

}

