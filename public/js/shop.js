if($("window").width() > 1040){
    var shopWidth = $(".shop").width();
    $(".shop .productImage").height(shopWidth-(shopWidth*0.2));
} else {
    var shopWidth = $(".shop").width();
    $(".shop .productImage").height(shopWidth-(shopWidth*0.4));
}



$("window").resize(function(){
    if($("window").width() > 1040){
        var shopWidth = $(".shop").width();
        $(".shop .productImage").height(shopWidth-(shopWidth*0.2));
    } else {
        var shopWidth = $(".shop").width();
        $(".shop .productImage").height(shopWidth-(shopWidth*0.4));
    }    
})