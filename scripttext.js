$(document).ready(function(){
	var fontSize = 16;

	/* Increase Text */
	$("#increase-text").click(function(){

		if(fontSize >= 24) {
			return false;
		 }else {
		 fontSize = fontSize + 1;
		 $(".main-content").css("font-size", fontSize + "px");

		 console.log('+ ' + fontSize);
		 }
	});

	/* Decrease Text */
	$("#decrease-text").click(function(){

		if(fontSize <= 10) {
		  return false;
		 }else {
			fontSize = fontSize - 1;
		 $(".main-content").css("font-size", fontSize + "px");
		 console.log('+ ' + fontSize);
		 }
	});

	/* Default */
	$("#normal-text").click(function(){
		var fontSize = 16;

		$(".main-content").css("font-size", fontSize + "px");
		$('body').removeClass("contrast-white");
		$('body').removeClass("contrast-black");
	});

	/* Contrast Black */
	$("#contrast-b").click(function(){
		$('body').addClass("contrast-black");
		$('body').removeClass("contrast-white");
	});

	/* Contrast White */
	$("#contrast-w").click(function(){
		$('body').addClass("contrast-white");
		$('body').removeClass("contrast-black");
	});
});