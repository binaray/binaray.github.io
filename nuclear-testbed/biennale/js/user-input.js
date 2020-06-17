'use strict'
let log = console.log.bind(console);

const levels=10;
const sections=3;
const sectionEnum=['Left','Middle','Right'];

$(document).ready(function () {
	
	$( ".bldg" ).hover(function() {
		let index = $( ".bldg" ).index( this );
		let section=index%sections;
		let floor=levels-parseInt(index/sections);
		$('#location').val('Level '+floor.toString()+', '+sectionEnum[section]+' section')
		$( this ).find(".hover_bldg").fadeIn( 100 );
	},function() {
		$( this ).find(".hover_bldg").fadeOut( 100 );
		$('#location').val('"')
	});
	
	$(".bldg").click(function(){
		let index = $( ".bldg" ).index( this );
		let section=index%sections;
		let floor=levels-parseInt(index/sections);
		log(floor);
		$('#input_location').val('Level '+floor.toString()+', '+sectionEnum[section]+' section')
		$('#exampleModal').modal('show');
	});
	
});