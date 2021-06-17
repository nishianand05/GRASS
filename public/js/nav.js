if($(window).width() <= 750){
	$("#navButton").removeClass("hide");
    $("#navLinks").addClass("hide");
}

$("#navButton").click(function(){
      $("#navLinks").toggleClass("hide");
      $("body").toggleClass("boxShadowTog");

});

$(window).resize(function(){
if($(window).width() <= 750){
	$("#navButton").removeClass("hide");
    $("#navLinks").addClass("hide");
} else {
	$("#navButton").addClass("hide");
    $("#navLinks").removeClass("hide");
    $("body").removeClass("boxShadowTog");
}
})

