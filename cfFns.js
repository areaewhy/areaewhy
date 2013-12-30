// This should be all the coverFlow instantiation and population functions
var cfFns = {
		build : function(arr){
				// "arr" is array of objects
				for (var i = 0; i < arr.length; i++){
					// add items to flow *if* object has "image" element
					if (arr[i]['image']){
						var el = $('<div class="item"></div>')
									.html($(document.createElement('img'))
									.attr('src',arr[i].image)
									.attr('class','content') ); // "content" class is necessary for ContentFlow to work
						$('.flow').append(el); 			// tack this onto the contentflow's "flow" div
					}
				}
		},
		init : function(arr){
				// "arr" is array of "items" (objects)
			
				// assign array of objects to "items" for details processing	
				this.items = arr;
				
				// if css/dom elements haven't been loaded, load 'em!
				if (!this.settings.resourcesLoaded){
					this.loadResources();
				}
				
				// instantiate ContentFlow
				var newFlow = new ContentFlow(this.settings.flowDiv);
				
				// push arr to the imageloader function
				this.loadImages(arr);
	
			},
		items : [], // holder for items array
		loadDetails : function(x){
			/*
			 * Grabs the item details to display in 'showContent' div.
			 * "x" is the index of the currently active item in coverFlow.
			 * Called from  ContentFlowAddOn.js's "onMakeActive" function.
			*/
			
				// create container
				var container = $(document.createElement('div')); 
				container.attr('class','container');
				
				// loop though array[item] properties to generate elements
				for (var o in this.items[x]) {
					
						// 'item' is for building link buttons, so needed different logic.
						if (o == 'item'){
							container.append($('<a>')
									 .attr('href',this.items[x][o])
									 .attr('class','details')
									 .attr('target','_blank')
									 .html("Details"));
						}

						else if (o !== 'image'){
							// image is just the src path, no need to display that
							container.append($('<div>')
									 .attr('class',o)
									 .html(this.items[x][o]));
							}
					}
				
				// little animation for loading the details section.
				$(this.settings.detailsDiv).animate({
					opacity: 0
				},200,function(){
					$(cfFns.settings.detailsDiv).html(container).animate({
						opacity:1
					},200);
				});
				
			},
		loadImages : function(arr){
				// breaks objects into array of img src's,
				// then passes that to the "_loadAllImages" function for timing
			
				var src = [];
				for (var i = 0; i < arr.length; i++){
					// ignore item if there's no image
					if (arr[i].image){
						src.push(arr[i].image);
					}
				}
				// if it's a real src... 
				if (src.length > 1) {
					help._loadimages(src,function(){
						// populate the div
						cfFns.build(cfFns.items);
						
						// once div is populated, initialize ContentFlow object
						ContentFlowGlobal.Flows[0]._init();
					});
				}
				else {
					// the "nothing found" function
					this.noResults();
				}
		},
		loadResources : function() {
				// just to load DOM elements.
			
				// this is the CSS
				$('<link>').attr('href','cfStyles.css').attr('rel','stylesheet').attr('type','text/css').appendTo('head');
				
				// ContentFlow divs
				var f = $('<div>').attr('class','flow'); // "flow" holder
				var l = $('<div>').attr('class','loader')
								  .append($('<img>').attr('src',this.settings.loaderIcon));
				var s = $('<div class="scrollbar"><div class="slider"><div class="position"></div></div></div>'); // scrollbar
				
				// attach elements
				$('#'+this.settings.flowDiv).append(f,l,s);
	
				// set the bool so we know that they've loaded.
				this.settings.resourcesLoaded = true;
		},
		noResults : function(){
				// if there's nothing to load 
				$('.loader').html(this.settings.noResultsText);
				
				// set focus back to search bar
				$('#q').focus(); 
		},
		settings : {
				// Basic settings for cfFns
				
				// jQuery selector for div to show Details in
				detailsDiv : '#showContent',
				
				// id for div to attach ContentFlow to.
				flowDiv : 'contentflow', 	
				
				loaderIcon : 'ContentFlow/img/loader.gif' ,
				noResultsText : 'Nothing found! <br />Search for something else!',
				
				// bool to track if resources have been loaded yet
				resourcesLoaded : false		 
		}		
};

var help = {
		// nabbed from rickvhoeij (https://forum.jquery.com/topic/wait-until-all-images-are-loaded)
		_loadimages : 
				function (imgArr,callback) {
					//Keep track of the images that are loaded
					var imagesLoaded = 0;
					function _loadAllImages(callback){
						//Create an temp image and load the url
						var img = new Image();
						$(img).attr('src',imgArr[imagesLoaded]);
						if (img.complete || img.readyState === 4) {
							// image is cached
							imagesLoaded++;
							//Check if all images are loaded
							if(imagesLoaded == imgArr.length) {
								//If all images loaded do the callback
								callback();
							} else {
								//If not all images are loaded call own function again
								_loadAllImages(callback);
							}
						} else {
							$(img).load(function(){
								//Increment the images loaded variable
								imagesLoaded++;
								//Check if all images are loaded
								if(imagesLoaded == imgArr.length) {
									//If all images loaded do the callback
									callback();
								} else {
									//If not all images are loaded call own function again
									_loadAllImages(callback);
								}
							});
						}
					};		
					_loadAllImages(callback);
				}
};