'use strict'
let log = console.log.bind(console);
const imgBaseUrl = "resources/img/works/";

class Project {
	constructor(name, date, affiliation, tags, descrip, imgCount, videoUrl = null, links = null, credits = null) {
		this.name = name;
		this.date = date;
		this.affiliation = affiliation;
		this.tags = tags;
		this.descrip = descrip;
		this.imgCount = imgCount;
		this.videoUrl = videoUrl;
		this.links = links;
		this.credits = credits;
		this.isFirstElement = false;
	}
	
	echo(){
		let html = '';
		if(this.isFirstElement)
			html = '<div class="row m-2 pt-4 pb-4">';
		else
			html = '<div class="row m-2 pt-4 pb-4 border-top">';
		
		html += '<div class="col-md-10 text-md-left text-center text-uppercase" style="font-size:1.1rem">'+
			this.name+
			'</div>'+
			'<div class="col-md-2 text-md-right text-center" style="font-size:1.1rem">'+
			this.date+
			'</div>'+
			'<div class="col-12 text-md-left text-center text-light">'+
			this.affiliation+'<br>'+
			'<span class="text-muted">';
		for (let i=0;i<this.tags.length;i++){
			html+=this.tags[i];
			if (i+1!=this.tags.length) html+=' | ';
		}
		html += '</span></div>';
		
		//----carousel start
		html += '<div id="carousel_'+this.name+'" class="carousel slide col-lg-7 py-3 mt-2 mb-auto" data-interval="false">'+
			  '<ol class="carousel-indicators">';
		
		let imgUrl = imgBaseUrl+this.name.replace(/ /g,"_")+'/'
		let sliderCount = this.imgCount;	//imgCount+videoCount(1)
		if(this.videoUrl!=null) sliderCount++;
		
		for(let i = 0;i<sliderCount;i++){
			if(i==0)
				html += '<li data-target="#carousel_'+this.name+'" data-slide-to="0" class="active"></li>';
			else
				html += '<li data-target="#carousel_'+this.name+'" data-slide-to="'+i+'"></li>'
		}
		html+='</ol>'+
			  '<div class="carousel-inner border">';		
		if(this.videoUrl!=null){
			html += '<div class="carousel-item active">'+
					'<div class="embed-responsive embed-responsive-16by9">'+
						'<iframe class="embed-responsive-item" src="'+this.videoUrl+'"></iframe>'+
					'</div>'+
				'</div>';
		}
		for(let i = 0;i<this.imgCount;i++){
			if(i==0)
				if(this.videoUrl!=null){
					html += '<div class="carousel-item">'+
							'<img class="d-block w-100" src="'+imgUrl+i+'.png" alt="0">'+
						'</div>';
				}					
				else{
					html += '<div class="carousel-item active">'+
							'<img class="d-block w-100" src="'+imgUrl+i+'.png" alt="0">'+
						'</div>';
				}
			else
				html += '<div class="carousel-item">'+
						'<img class="d-block w-100" src="'+imgUrl+i+'.png" alt="'+i+'">'+
					'</div>';
		}
		html+='</div>';
		if ((this.imgCount>1)||(this.imgCount==1&&this.videoUrl!=null))
			html+='<a class="carousel-control-prev" href="#carousel_'+this.name+'" role="button" data-slide="prev">'+
					'<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
					'<span class="sr-only">Previous</span>'+
				  '</a>'+
				  '<a class="carousel-control-next" href="#carousel_'+this.name+'" role="button" data-slide="next">'+
					'<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
					'<span class="sr-only">Next</span>'+
				  '</a>';
		html+='</div>';
		//----carousel end
		
		html+='<div class="col-lg-5 my-auto">'+
				'Description'+
				'<div class="text-light">'+
					this.descrip+
				'</div>'+
				'<br>';
		if (this.links!=null){
			html+='Links'+
					'<div>';
				for (let [cover, url] of Object.entries(this.links)) {
					html+='<a href="'+url+'">'+cover+'</a><br>';
				}
				// for(let i=0; i<this.links.length; i++)
					// html+='<a href="'+this.links[i]+'">'+this.links[i]+'</a><br>';
				html+='</div><br>';
		}
		if (this.credits!=null){
			html+='Credits<br>'+
					'<div class="text-light">';
			for(let i=0; i<this.credits.length; i++)
				html+=this.credits[i]+'<br>';
			html+='</div>';
		}
		html+='</div>'+
			'</div>';
		
		return html;
	}
}

$(document).ready(function(){
	//--init display
	let data=[];
	
	data.push(new Project('Sleepless in SG','2022/07/22',
	'ION Orchard Art Gallery',
	['c#','unity','UI/UX design'],
	'Developed a tablet voting app using visceral design principles for a night photography exhibition, featuring Samsung S22 night mode camera.',
	'0','https://player.vimeo.com/video/770571207?h=f8f7f2197e',
	{Information:'https://www.samsung.com/sg/sleeplessinsg/'},
	['Creative Agency: Kult Studio and Gallery']));
	
	data.push(new Project('Mythology Relooked','2022/04/05',
	'Singapore Chinese Cultural Centre',
	['c#','unity','interactive exhibit','image processing'],
	'Developed interactive exhibits for Mythology Relooked, a moving gallery sponsored by the Singapore Chinese Cultural Centre.',
	'0','https://player.vimeo.com/video/757448411?h=882ba9da60',
	null,
	['Creative Agency: Kult Studio and Gallery']));
	
	data.push(new Project('Metajam 2022','2022/04/05',
	'Tekka Place Event Space',
	['c#','unity','interactive exhibit','image processing'],
	'Developed interactive exhibits for Metajam 2022, a Web3/NFT festival in Singapore.',
	'0','https://www.youtube.com/embed/B1tun1BG8oU',
	{Information:'https://metajam.asia'},
	['Event and Hosting: Invade','Creative Agency: Kult Studio and Gallery']));
	
	data.push(new Project('Future Hybrid Highrise Commune','2021/03',
	'Venice Biennale 2020, Singapore Pavilion',
	['c#','unity','ar','exhibition'],
	'Individual users participate as prospective tenants in the launch of a high-rise commune. Expressing wishes regarding their own apartment, together with numerous other future neighbours, these wishes agglomerate on a layout that allows numerous apartment sizes and life-styles to inhabit them.',
	'2','https://www.youtube.com/embed/59b9tjqB4pM',
	null,
	['Direction: Michael Budig, Oliver Heckmann','Programming: Ray Cheng','AR: Clement Lork']));
	
	data.push(new Project('HamuHamu Factory','2019/08/16',
	'Singapore University of Technology and Design',
	['c#','unity','game','project'],
	'Game Design project.<br>In the far outskirts of a town, lies the fallen ruins of a once great factory, HamuHamu Factory. Rebuild HamuHamu to a major hub for production in a world where rodents, critters and household pets stand on two feet and act as a functional capitalistic society.',
	'3','https://www.youtube.com/embed/Rw23uZywoB4',
	{Download:'https://www.dropbox.com/sh/7fvmdzauc73eu4e/AAA0TtI5--aE4BNtD7YeqV-Xa?dl=0'},
	['Creative Director: Ray Cheng','Programming: Lim Yuet Tung','Music: Gu Zhiyao']));
	
	data.push(new Project('Valterego','2019/09/09',
	'Entrepreneurship',
	['c#','unity','startup','ar','machine learning','nlp','web'],
	'An entrepreneurship project which started from a vision to build a better virtual pet. After vetting with industries outside, it evolved to an engagement platform serving as a data collection tool for therapists and administrators.',
	'2',null,
	null,
	['Unity Programming: Lim Yuet Tung, Ray Cheng','Machine Learning: Foo Lin Geng','Assets, UI/UX: Lim Kenjyi','IoT: Samson Choo']));
	
	data.push(new Project('Pipsqueak Marketplace','2019/12/29',
	'Entrepreneurship',
	['e-commerce','startup','web'],
	'Electrical components, semiconductors, project parts and materials are often sought for school projects. Through shipping offshore and bulk purchasing, Pipsqueak marketplace aims to bring these things to students at lower prices.',
	'3',null,
	null,
	['CEO: Chester Tan','CTO: Ray Cheng','COO: Estelle Teo','CMO: Michael Sebastian']));
	
	data.push(new Project('Augmented Reality IoT (ARIOT)','2018/09/30',
	'Singapore University of Technology and Design',
	['c#','unity','ar','hackathon'],
	'A smart AR companion which helps controls IoT devices in your home.',
	'1','https://www.youtube.com/embed/GbTqTy4oVDY',
	{Information:'https://devpost.com/software/ariot-kdvt9m',Sourcecode:'https://github.com/binaray/ARCompa'},
	['Programming: Lim Yuet Tung','Assets: Ray Cheng','Microcontroller: Foo Lin Geng']));
	
	data.push(new Project('Research on the Feasibility of High Resolution 3DCG Models','2018/09/09',
	'Singapore University of Technology and Design',
	['3d printing','3d sculpting','project'],
	'A funded research program at which we explore different methods at 3D printing high resolution 3DCG models sculpted using ZBrush. Test and intermediary prints were done using PLA then selective laser sintering; though the final sculpture ended up too complex to be printed in time.',
	'4',null,
	null,
	null));
	
	data.push(new Project('Career Coach Bot','2018/09/09',
	'NoLimits Asia Pte Ltd',
	['career coaching','chatbot','orchestrator','web'],
	'Meet Alice, a career coaching robot designed to help in career related questions. Built on top of Watson Assistant, the website includes an additional orchestrator which serves useful resources as well.',
	'2',null,
	{Website:'https://nolimitstalent.com/careercoach/bot.php'},
	null));
	
	data.push(new Project('Extreme Pony Escape','2018/07/08',
	'Singapore University of Technology and Design',
	['c#','unity','game','project'],
	'A Unity-based multiplayer survival which players are required to cooperate to survive and reach the end.',
	'1','https://www.youtube.com/embed/MQ-OrJQVeTs',
	null,
	['Creative Director and Programming: Ray Cheng','Networking: Tan Ting Yu','Music: Gu Zhiyao']));
	
	data.push(new Project('Letters4','2018/07/08',
	'Singapore University of Technology and Design',
	['c#','unity','game','project'],
	'Project for Material Things in Social Life.<br>Why do people write letters and for what purposes? To whom, how often and what is conveyed by them; what do people feel when writing or reading letters and what do letters mean to a writer or a reader. the story of an old man through the personification of letters he has received through his life; each recounting their experiences.',
	'2',null,
	{Download:'https://www.dropbox.com/sh/60bj9ocmsqysm9p/AADiGhwt6N_D-aW7rQYNux4da?dl=0'},
	['Creative Director: Ray Cheng','Programming: Dominic Ong','Story: Anirudh, Dalvi']));
	
	data.push(new Project('AP1D Travel Planner','2018/03/03',
	'Singapore University of Technology and Design',
	['android','java','project'],
	'A travel planner android app which calculates and determines the mode of transportation based on destination and budget.',
	'1',null,
	null,
	['UI/UX: Ray Cheng','Algorithm: Yu Jin','Maps: Lim Kenjyi']));
	
	data.push(new Project('Illuminator Exhibit','2017/11/08',
	'SUTD Nightfest',
	['mvmc','installation','exhibit'],
	'A light box installation featuring modified works from our art club, Modern Visual Media Circle',
	'3',null,
	null,
	['Original work: Wu Yufei','Composition: Ray Cheng','Production: Chester Tan, Lim Kenjyi']));
	
	data.push(new Project('Ori','2016/06/09',
	'Game Design Club, Singapore University of Technology and Design',
	['game','gamemaker studio'],
	'One of my very first game projects. A small exploration game created using Gamemaker Studio featuring stop-motion origami photo assets.',
	'2',null,
	null,
	['Creative Director: Ray Cheng','Programming: Lim Yuet Tung']));
	
	data.push(new Project('Dynamic Website Design','2015/04/15',
	'Kumamoto National College of Technology',
	['web','project','wordpress'],
	'One of my very first web projects. A dynamic website template made using wordpress allowing administrators to create and manage pages easily.',
	'3',null,
	{Download : 'https://www.dropbox.com/sh/jndtz5votx6dc9a/AAAeWlu4i9MxYTSdppkfaOa-a?dl=0'},
	null));
	
	//--update container
	for(let i=0;i<data.length;i++){
		if (i==0) data[i].isFirstElement = true;	//echo line break
		$('#worksContainer').append(data[i].echo());
	}	
	
	//--handle filter callbacks
})
