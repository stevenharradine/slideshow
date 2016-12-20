var delay = getParameterByName("delay", 3000);
var resize = getParameterByName("resize", "shrink-to-fit");
var type = getParameterByName("type", "linear");
var transition_duration = getParameterByName("transition_duration", "1");
var transition_timing_function = getParameterByName("transition_timing_function", "ease-in-out");
var buffered_image = null;
var current_image_index = 0;
var modulus_counter = 0;

document.write ("<style>img { transition: opacity " + transition_duration + "s " + transition_timing_function + "; }</style>");

setCurrentImage ();

function slide () {
	var max_height = window.innerHeight;
	var max_width = window.innerWidth;
	var image_path = buffered_image === null ? images[current_image_index] : buffered_image.src;
	var image = new Image();

	image.name = image_path;
	image.src = image_path;
	image.onload = function () {
		var current_image_style = ""

		if (resize == "to-fit" || resize == "shrink-to-fit") {
			// calculate new hight if we scale it by width
			var calc_height = (max_width * this.height) / this.width;
			var prefix = "";

			if (resize == "shrink-to-fit") {
				prefix = "max-";
			}

			// if the calculated hight would fit within the screen resize based on height
			if (calc_height >= max_height) {
				current_image_style += prefix + "height: 100%;";
			} else {
				current_image_style += prefix + "width: 100%;";
			}
		} else if (resize == "stretch") {
			current_image_style += "height: 100%;";
			current_image_style += "width: 100%;";
		}

		var current_image_element = document.getElementById("img" + modulus_counter);
		var next_image_element = document.getElementById("img" + ((modulus_counter + 1) % 2));
		var next_image_styles_raw = next_image_element.getAttribute ("style");
		var new_next_image_styles = next_image_styles_raw != null ? next_image_styles_raw.replace("opacity: 100;", "") : "";

		// apply the styles and hide/show current/next images
		current_image_element.setAttribute("style", current_image_style + " opacity: 100;");
		next_image_element.setAttribute("style", new_next_image_styles + " opacity: 0;");

		// update the image
		current_image_element.setAttribute ("src", image_path)

		setCurrentImage ();

		// buffer next image
		buffered_image = new Image ();
		buffered_image.src = images[current_image_index];

		// increment modulus counter and reset if its a whole number (prevents overflow of long running instances)
		modulus_counter = modulus_counter++ % 2 == 1 ? 0 : modulus_counter;
	}

	setTimeout( function () {
		slide ()
	}, delay);
}

function getParameterByName(name, default_value, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return default_value;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function setCurrentImage () {
	if (type == "linear") {
		// if the next image is beyond the bounds of the playlist rest
		current_image_index = ++current_image_index >= images.length ? 0 : current_image_index;
	} else if (type == "random") {
		current_image_index = Math.floor(Math.random() * images.length);
	}
}

slide();
