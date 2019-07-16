'use strict'
let log = console.log.bind(console);
const imgBaseUrl = "resources/img/gallery/";

class Image {
	constructor(name, source, tag) {
		this.name = name;
		this.source = source;
		this.tag = tag;
		this.isFirstElement = false;
		this.imageCount = Image.getCount();
		Image.increaseCount();
	}
	
	echoGalleryItem(){
		// let html='<div class="col-6 col-md-4 col-lg-3">'+
				// '<img class="img-fluid" src="'+imgBaseUrl+this.source+'" data-target="#carouselGallery" data-slide-to="'+this.imageCount+'">'+
			// '</div>';
		let html='<div class="card" style="display: inline-block; border-radius: 0;">'+
				'<img class="img-fluid" src="'+imgBaseUrl+this.source+'" alt="'+this.name+'" data-target="#carouselGallery" data-slide-to="'+this.imageCount+'">'+
			  '</div>';
		return html;
	}
	
	echoModalItem(){
		let html='';
		if (this.isFirstElement) html+='<div class="carousel-item active">';
		else html+='<div class="carousel-item">';
		html+='<img class="img-fluid" src="'+imgBaseUrl+this.source+'">'+
				'<div class="carousel-caption d-none d-md-block text-right">'+
					'<h5>'+this.name+'</h5>'+
					'<p class="text-light">'+this.tag+'</p>'+
				'</div>'+
			'</div>';
		return html;
	}
	
	static increaseCount() {
		Image.count += 1;
	}

	static getCount() {
		return Image.count;
	}
}

$(document).ready(function(){
	if ($(window).width()<768)
		$("#gallery").css("column-count", "2");
	else
		$("#gallery").removeAttr("style");
	
	let data=[];
	Image.count=0;
	data.push(new Image('Shaft tilt','shaft_tilt.jpg','original'));
	data.push(new Image('Selvaria','selvaria.jpg','fanwork'));
	data.push(new Image('Magic boy','magic_boy.png','original'));
	data.push(new Image('Stay up till dawn','stay_up_til_dawn.png','original'));
	data.push(new Image('A dinner for more','a_dinner_for_more.jpg','original'));
	data.push(new Image('Nostalgia','nostalgia.jpg','fanwork'));
	data.push(new Image('anchoR','anchoR_c.png','fanwork'));
	data.push(new Image('Daybreak','daybreak.png','original'));
	data.push(new Image('Snap','snap.jpg','original'));
	
	for (let i=0;i<data.length;i++){
		if (i==0) data[i].isFirstElement = true;
		$('#gallery').append(data[i].echoGalleryItem());
		$('#modalGallery').append(data[i].echoModalItem());	
	}
	
	let x=0;
	$(window).resize(function(){
		if ($(window).width()<768)
			$("#gallery").css("column-count", "2");
		else
			$("#gallery").removeAttr("style");
		log($(window).width());
	});
})