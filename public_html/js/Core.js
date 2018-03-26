function afterLoad() {
	/* Load map elements*/
	var locationElements = document.getElementsByClassName("location-map");
	
	for (var i=0; i < locationElements.length; i++) {
		locationElements[i].addEventListener("onload", mapHandler(locationElements[i]), false);
	}
	
	/* Slideout.js init https://slideout.js.org */
	var slideout = new Slideout({
        'panel': document.getElementById('main-area'),
        'menu': document.getElementById('menu'),
        'padding': 256,
        'tolerance': 70
      });
	
	// Toggle button for slideout
    document.querySelector('#showMenu').addEventListener('click', function() {
		slideout.toggle();
    });
	
	loadDivider();
	loadMobile();
	
	$( window ).resize(function() {
		loadDivider();
		loadMobile();
		if (!window.matchMedia('(max-width: 980px)').matches) {
			//Close menu if desktop detected
			slideout.close();
		}
	});
}

function loadDivider() {
	/*Show divider if no thumbnail for card present*/
	$(".card").each(function(i, obj) {
		var elem = $(obj).find(".card-title-thumbnail");
		if (elem.length) {
			if (elem.is(":visible")) {
				$(obj).find(".divider").hide();
			} else {
				$(obj).find(".divider").show();
			}
		} else {
			$(obj).find(".divider").show();
		}
	});
}

// function checks if mobile window present and loads appropriate listeners
function loadMobile() {
	$(".card-title").off('click');
	$(".mobile-less-info").off('click');
	if (window.matchMedia('(max-width: 980px)').matches) {
		$(".card-title").click(function(){			
			/*$(this).next(".card-content").toggleClass('fade-in');
			$(this).prev(".card-thumbnail-show").toggleClass('fade-in');*/
			$(this).next(".card-content").fadeToggle(200);
			$(this).prev(".card-thumbnail-show").fadeToggle(200);
			loadImage(this, 500);
		});
		$(".mobile-less-info").click(function(){
			$(this).next(".card-content").toggleClass('fade-in');
			$(this).prev(".card-thumbnail-show").toggleClass('fade-in');
		});
		$(".card-title-thumbnail.no-hide").parent().each(function(i, obj) {
			$(obj).parent().find(".card-title").each(function(i, objInn) {
				loadImage(objInn, 0);
			});
		});
	}
}

function loadImage(elem, timeout){
	setTimeout(function(){
		$(elem).parent().find(".card-thumbnail").each(function(i, obj) {
			var background = obj.style["background-image"].replace('url(','').replace(')','').replace(/\"/gi, "");
			var curr_background = $(obj).css('background-image').replace('url(','').replace(')','').replace(/\"/gi, "");
			if (background != null && curr_background.indexOf(background) == -1) {
				background_url = background.replace('url(','').replace(')','').replace(/\"/gi, "");
				$('<img/>').attr('src', background_url).on('load', function() {
					var new_css = 'url(' + background_url + ') !important;';
					if($(obj).hasClass('card-thumbnail-contain')) {
						new_css = new_css + 'background-size: contain;';
					} else {
						new_css = new_css + 'background-size: cover;';
					}
					$(obj).attr('style', 'background-image: ' + new_css);
					$(obj).animate({backgroundColor:'#894B73'}, 200);
				});
			}
		});
	}, timeout);
}