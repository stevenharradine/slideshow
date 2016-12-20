var delay = getParameterByName("delay") != null ? getParameterByName("delay") : 3000;
var resize = getParameterByName("resize") != null ? getParameterByName("resize") : "shrink-to-fit";
var type = getParameterByName("type") != null ? getParameterByName("type") : "linear";
var buffered_image = null;
var current_image_index = 0;

function slide () {
	var max_height = window.innerHeight;
	var max_width = window.innerWidth;
	var image_path = buffered_image === null ? images[current_image_index] : buffered_image.src;
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

		if (type == "linear") {
			// if the next image is beyond the bounds of the playlist rest
			current_image_index = ++current_image_index >= images.length ? 0 : current_image_index;
		} else if (type == "random") {
			current_image_index = Math.floor(Math.random() * images.length);
		}

		// buffer next image
		buffered_image = new Image ();
		buffered_image.src = images[current_image_index];
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
