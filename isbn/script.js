window.addEventListener("load" , function (){

    $("#search").on("click",function(){ isbn_search(); });

});

function isbn_search(){

    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=isbn:" + $("#isbn").val(),
        type: "GET",
    }).done( function(data, status, xhr ) { 
        
        //取得に失敗した場合は終了
        if (data["totalItems"] !== 1){
            return false;
        }

        console.log(data["items"][0]["volumeInfo"]["title"]);
        console.log(data["items"][0]["volumeInfo"]["publishedDate"]);
        console.log(data["items"][0]["volumeInfo"]["authors"]);
        console.log(data["items"][0]["volumeInfo"]["description"]);
        console.log(data["items"][0]["volumeInfo"]["imageLinks"]["thumbnail"]);

        $("#title").text(data["items"][0]["volumeInfo"]["title"]);
        $("#publish").text(data["items"][0]["volumeInfo"]["publishedDate"]);
        $("#author").text(data["items"][0]["volumeInfo"]["authors"]);
        $("#description").text(data["items"][0]["volumeInfo"]["description"]);
        $("#thumbnail").prop("src",data["items"][0]["volumeInfo"]["imageLinks"]["thumbnail"]);


    }).fail( function(xhr, status, error) {
        console.log("通信エラー")
    }); 




}
