#!/bin/node
const testFolder = './';
const fs = require('fs');
const file_extentions = [
	"jpg",
	"jpeg"
];

String.prototype.endsWith = function(suffix) {
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

// walkSync taken from https://gist.github.com/kethinov/6658166 at 14:32 EST 20161218
// List all files in a directory in Node.js recursively in a synchronous fashion
var walkSync = function(dir, filelist) {
	var fs = fs || require('fs');
	var files = fs.readdirSync(dir);
	var filelist = filelist || [];
	files.forEach(function(file) {
		if (fs.statSync(dir + '/' + file).isDirectory()) {
			filelist = walkSync(dir + '/' + file, filelist);
		} else {
			filelist.push(dir + '/' + file);
		}
	});

	return filelist;
};

console.log ();

files = walkSync("./");

var number_of_files = files.length;
var filtered_files = [];
var buffered_output = "var images = [";

for (var i = 0; i < number_of_files - 1; i++) {
	var file = files[i];
	var number_of_file_extentions = file_extentions.length;

	for (var j = 0; j < number_of_file_extentions; j++) {
		var extention = file_extentions[j];

		if (file.endsWith("." + extention)) {
			filtered_files.push(file);
		}
	}
}

for (var i = 0; i < filtered_files.length; i++) {
	buffered_output += "\"" + filtered_files[i] + "\"";

	if (i < filtered_files.length - 1) {
		buffered_output += ",";
	}
}

buffered_output += "]";

console.log (buffered_output);
