
// equal to the height of the blocks
$(document).ready(function () {
       var mh = 0;
       $(".col-3.category_item").each(function () {
           var h_block = parseInt($(this).height());
           if(h_block > mh) {
              mh = h_block;
           };
       });
       $(".col-3.text-center").height(mh);
});

// sandwich
$(document).ready(function(){
	$(".nav_btn").click(function() {
	    $(".sandwich").toggleClass("active");

	    if ($(".top_mnu").is(":visible")) {
			$(".top_mnu").fadeOut(600);
		} else {
			$(".top_mnu").fadeIn(600);
			$(".top_mnu li a").addClass("fadeInUp animated");
		};
	});


	$(".top_mnu ul li a").click(function() {
	    $(".sandwich").removeClass("active");
	    $(".top_mnu").fadeOut(600);
	 
	});
});

//script for popups
$(function () {
	$('a.show_popup').click(function () {
		$('div.'+$(this).attr("rel")).fadeIn(500);
		$("body").append("<div id='overlay'></div>");
		$('#overlay').show().css({'filter' : 'alpha(opacity=80)'});
		return false;				
	});	
	$('a.close').click(function () {
		$(this).parent().fadeOut(100);
		$('#overlay').remove('#overlay');
		return false;
	});
	
	//script for tabs
	$("div.selectTabs").each(function () {
		var tmp = $(this);
		$(tmp).find(".lineTabs li").each(function (i) {
			$(tmp).find(".lineTabs li:eq("+i+") a").click(function(){
				var tab_id=i+1;
				$(tmp).find(".lineTabs li").removeClass("active");
				$(this).parent().addClass("active");
				$(tmp).find(".tab_content div").stop(false,false).hide();
				$(tmp).find(".tab"+tab_id).stop(false,false).fadeIn(300);
				return false;
			});
		});
	});
});	
