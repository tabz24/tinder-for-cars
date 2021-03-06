(function(){
	function getId() {
		var parameters = window.location.search.split('?')[1];
		var params = parameters.split('&');
		var id = null;
		for(var i = 0; i < params.length; i++) {
			if(params[i].split('=')[0] == "id") {
				id = params[i].split('=')[1];
			}
		}
		return parseInt(id)-1;
	}

	function init_data() {
		var id = getId();
		if(id != null) {
			document.body.querySelector('.image').src = data[id].src;
			document.getElementById('name').querySelector('h2').innerHTML = data[id].name;
			document.getElementById('price').innerHTML = data[id].price;
			document.getElementById('about').innerHTML = data[id].desc;
		}
	}
	init_data();
})();
