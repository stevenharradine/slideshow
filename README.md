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
