var delay = getParameterByName("delay") != null ? getParameterByName("delay") : 3000;

function slide () {
	var max_height = window.innerHeight;
	var max_width = window.innerWidth;
	var image_path = images[Math.floor(Math.random() * images.length)];
	var image = new Image();

	image.name = image_path;
	image.src = image_path;
	image.onload = function () {
		var style = ""

		// calculate new hight if we scale it by width
		var calc_height = (max_width * this.height) / this.width;

		// if the calculated hight would fit within the screen resize based on height
		if (calc_height >= max_height) {
			style = "height: 100%;";
		} else {
			style = "width: 100%;";
		}

		// apply the sizing
		document.getElementById("img").setAttribute("style", style);

		// update the image
		document.getElementById("img").setAttribute ("src", image_path)
	}

	setTimeout( function () {
		slide ()
	}, delay);
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

slide();
