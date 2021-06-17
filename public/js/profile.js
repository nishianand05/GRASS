// if($("window").width() > 1040){
//     var shopWidth = $(".shop").width();
//     $(".shop .productImage").height(shopWidth-(shopWidth*0.2));
// } else {
//     var shopWidth = $(".shop").width();
//     $(".shop .productImage").height(shopWidth-(shopWidth*0.4));
// }



// $("window").resize(function(){
//     if($("window").width() > 1040){
//         var shopWidth = $(".shop").width();
//         $(".shop .productImage").height(shopWidth-(shopWidth*0.2));
//     } else {
//         var shopWidth = $(".shop").width();
//         $(".shop .productImage").height(shopWidth-(shopWidth*0.4));
//     }    
// })

$(".crossBtn").click(function(){
    $(".newRewardDiv").removeClass("show");
    $(".newRewardDiv").addClass("hide");
    // window.location.reload();
})