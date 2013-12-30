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
				/*
				 * Init: takes array of objects ("items"), 
				 * creates ContentFlow html,
				 * adds items to div (passes "arr" to "build" fn),
				 * initializes ContentFlow 
				*/
				this.items = arr; // assign array of objects to "items" for details processing
				if (!this.settings.resourcesLoaded){
					this.loadResources();
				}
				var newFlow = new ContentFlow(this.settings.flowDiv);
				this.loadImages(arr);
	
			},
		items : [], // holder for items array
		loadDetails : function(x){
			/*
			 * Grabs the item details to display in 'showContent' div.
			 * "x" is the index of the currently active item in coverFlow.
			 * Called from  ContentFlowAddOn.js's "onMakeActive" function.
			*/
				var container = $(document.createElement('div')); // create container
				container.attr('class','container');
				for (var o in this.items[x]) {
						if (o == 'item'){
							container.append($('<a>').attr('href',this.items[x][o]).attr('class','details').attr('target','_blank').html("Details"));
							//container.append($('<a>').attr('class','details').append($('<a></a>').attr('href',this.items[x][o])));
						}
						else if (o !== 'image'){ // image is just the src path, no need to display that
							container.append($('<div>').attr('class',o).html(this.items[x][o]));
							}
					}
				$(this.settings.detailsDiv).animate({
					opacity: 0
				},200,function(){
					$(cfFns.settings.detailsDiv).html(container).animate({
						opacity:1
					},200);
				});
				
			},
		loadImages : function(arr){
				var src = [];
				for (var i = 0; i < arr.length; i++){
					if (arr[i].image){
					src.push(arr[i].image);
					}
				}
				if (src.length > 1) {
				help._loadimages(src,function(){
					cfFns.build(cfFns.items);
					ContentFlowGlobal.Flows[0]._init();
				});
				}
				else {
					this.noResults();
				}
		},
		loadResources : function() {
			console.log('loading resources');
				$('<link>').attr('href','cfStyles.css').attr('rel','stylesheet').attr('type','text/css').appendTo('head');
				var f = $('<div>').attr('class','flow'); // "flow" holder
				var l = $('<div>').attr('class','loader')
								  .append($('<img>').attr('src',this.settings.loaderIcon));
				var s = $('<div class="scrollbar"><div class="slider"><div class="position"></div></div></div>'); // scrollbar
				
				
				
				$('#'+this.settings.flowDiv).append(f,l,s);
	
				
				this.settings.resourcesLoaded = true;

		},
		noResults : function(){
				console.log('empty array -- no results!');
				$('.loader').html(this.settings.noResultsText);
				$('#q').focus();
		},
		settings : {
				detailsDiv : '#showContent', // jQuery selector for div to show Details in
				flowDiv : 'contentflow', 	// id for div to attach ContentFlow to.
				loaderIcon : 'ContentFlow/img/loader.gif' ,
				noResultsText : 'Nothing found! <br />Search for something else!',
				resourcesLoaded : false		// bool to track if resources have been loaded yet 
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