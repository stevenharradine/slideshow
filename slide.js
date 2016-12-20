var delay = getParameterByName("delay") != null ? getParameterByName("delay") : 3000;
var resize = getParameterByName("resize") != null ? getParameterByName("resize") : "shrink-to-fit";
var buffered_image = null;

function slide () {
	var max_height = window.innerHeight;
	var max_width = window.innerWidth;
	var image_path = buffered_image === null ? images[Math.floor(Math.random() * images.length)] : buffered_image.src;
	var image = new Image();

	image.name = image_path;
	image.src = image_path;
	image.onload = function () {
		var style = ""

		if (resize == "to-fit" || resize == "shrink-to-fit") {
			// calculate new hight if we scale it by width
			var calc_height = (max_width * this.height) / this.width;
			var prefix = "";

			if (resize == "shrink-to-fit") {
				prefix = "max-";
			}

			// if the calculated hight would fit within the screen resize based on height
			if (calc_height >= max_height) {
				style += prefix + "height: 100%;";
			} else {
				style += prefix + "width: 100%;";
			}
		} else if (resize == "stretch") {
			style += "height: 100%;";
			style += "width: 100%;";
		}

		// apply the sizing
		document.getElementById("img").setAttribute("style", style);

		// update the image
		document.getElementById("img").setAttribute ("src", image_path)

		// buffer next image
		buffered_image = new Image ();
		buffered_image.src = images[Math.floor(Math.random() * images.length)];
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
