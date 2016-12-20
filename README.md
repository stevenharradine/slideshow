# slideshow
Web based slideshow viewer

## Requirements
 * Node
 * Modern web browser (HTML5/CSS3/JS)

# usage
## copy repository to image directory
## generate slideshow playlist
```
node generate-playlist.js > images.js
```
## open the slideshow
```
chromium-browser index.html
```
or for a photoframe
```
chromium-browser --start-fullscreen index.html
```
### URL configuration parameters
 * `delay` (integer) - milliseconds to delay between changing photos (3000 default)
 * `resize` (enumeration) -
  * `shrink-to-fit` - resize large images to fit the screen (default)
  * `to-fit` - resize all images to fit the screen
  * `stretch` - resize image to fill entire screen (distorts image)
 * `type` (enumeration) -
  * `linear` - cycle through all images in order and repeat
  * `random` - cycle through all images randomly (replacing the selected image back into the pool right away)
 * `transition_duration` (integer) - how long the animation between images should run in seconds
 * `transition_timing_function` (enumeration) - the [CSS timing function](https://www.w3.org/TR/css3-transitions/#transition-timing-function) to use for the animation between images 
