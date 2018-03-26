function mapHandler(element) {
	var lat = Number(element.getAttribute("lat"));
	var lng = Number(element.getAttribute("lng"));
	
	if (lat == null || lng == null){
		return;
	}
	
	var myLatLng = {lat: lat, lng: lng};
	var mapOptions = {
		center: myLatLng,
		zoom: 19,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(element, mapOptions);
	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		title: element.getAttribute("markerTitle")
	});
}