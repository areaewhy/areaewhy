<!DOCTYPE html>
<html>
<head>
<script src = "//code.jquery.com/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="./ContentFlow/contentflow.js" load="BM"></script>
<script src="cfFns.js"></script>
<style>
body {
	font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
	margin: 0px;
	background: #DBD0B7;
}
#searchForm{
	width: 435px;
	margin: 0 auto;
	margin-top: 40px;
}
#go{
	background: #F1c;
	padding: 8px;
	padding-left: 30px;
	padding-right: 30px;
	border-radius: 8px;
	border: 1px solid #B90;
	font-size: 1.7em;
	color: #FFF;
	text-decoration: none;
	transition: all 300ms;
	-moz-transition: all 300ms;
	-o-transition: all 300ms;
	-webkit-transition: all 300ms;
}

#go:hover {
	background: #FF0;
	padding: 12px;
	padding-left: 30px;
	padding-right: 30px;
	color: #000;
}
#current {
    display: inline-block;
    text-align: center;
    width: 100%;
}
#q{
	height: 45px;
	width: 300px;
	padding: 8px;
	font-size: 1.8em;
}
</style>
</head>

<body>
<form action="" method="GET" id="searchForm">
<input type="text" name="q" id="q" placeholder="locate awesomeness?">
<a href="javascript:void(0)" id="go">Go!</a>
<label id="current"></label>
</form>
<div id="cfContainer">
<div id="contentflow"></div>
<div id="showContent"></div>
</div>

        
<script>
var get = "<?php if (isset($_GET['q'])){echo $_GET['q'];} ?>";
$('#current').html('Showing results for: <b>' + (get.length > 0 ? get : 'Metallica!') + '</b>');
var parse = {
		go : function() {
			$.ajax({
				url: 'prox.php',
				type: 'POST',
				data: {q:get}
			}).done(function(data){
				parse.process($(data));
				});
		},
		process : function(doc){
			var collection = [];
			for (var i = 0; i < doc.length; i++){
					var http = 'http://www.bullmoose.com';
					var title = $.trim(doc.find('.description a').eq(i).html());
					var item = $.trim(doc.find('.description a').eq(i).attr('href'));
					var image = $.trim(doc.find('.picture img').eq(i).attr('_src'));
					var artist = $.trim(doc.find('.product-artist').eq(i).html());
					var price = doc.find('.product-variant-price-list').eq(i).find('.price-condition');
					if (image.indexOf('bullmoose.com') < 1 && image.indexOf('bm_files') < 1) {
							image = http+image;
						}
					if (item) {
						item = http+item;
						collection.push(new Item(item,image,artist,title,price));
						//console.log(image);
					};
			}
			//cfFns.items = collection;
			cfFns.init(collection); // pass array of objects to "contentflowFunctions" initialization
		}
};

cfFns.loadResources();
parse.go(); // load html snippet, parse, initialize coverflow
$('#go').click(function(){
	$('#searchForm').submit();
});

/*Class to house items*/
function Item (item, image, artist, title, price){
	this.item = item || null,
	this.image = image || null,
	this.artist = artist || null,
	this.title = title || null,
	this.price = price || null
}
</script>

</body>
</html>