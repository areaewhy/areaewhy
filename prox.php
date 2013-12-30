<?php

$q = '';
// if no query, load the "cached" page
$url = 'bm.htm';

// else
if (!empty($_POST['q'])){
$url = 'http://www.bullmoose.com';
$url .= '/search?q='.urlencode($_POST['q']);
}

// grab the whole html page
$request = file($url);

foreach($request as $part){
// stuff the parts into $html
@$html .= $part;
}

$dom = new DOMDocument;

// remove the "invalid HTML" errors
libxml_use_internal_errors(true);

$dom->loadHTML($html);

$xpath = new DOMXPath($dom);

// 'product-list' contains the list of retrieved items
$classname = 'product-list';
$nodes = $xpath->query("//*[@class='$classname']");

foreach($nodes as $node){
	$innerHTML = ''; // var for storing html
	
	$children = $node->childNodes;
	foreach ($children as $child){
		$tmp_doc = new DOMDocument();
		if ($child->parentNode){
		$tmp_doc->appendChild($tmp_doc->importNode($child,true));
		$innerHTML .= $tmp_doc->saveHTML();
		}
	}
}

/*
 * !! When converting the string to html in jQuery,
 * the "src" attribute was attempting to load all images before
 * I had a chance to change the local src to the correct domain.
 * All I need is the src path anyway, so changing "src" to "_src".
 */
$innerHTML = str_replace('src','_src',$innerHTML);

// gimme that html.
echo($innerHTML);


/*	
 * Experiment with pulling each element ( picture, artist, title, etc..)
 * This is how I would go to get prox.php to return a json collection, instead
 * of having the jQuery parse through HTML. Leaving it for future reference. 

$pic = $xpath->query("//*[@class='picture']/a/img/@src",$node);
 foreach($pic as $p){
echo $p->value;
echo "__NEXT__ <br>";
}
*//*
$div = $xpath->query("div",$node);
foreach ($div as $d){

$product = array();
// image src
$pic = $xpath->query("*[@class='picture']/a/img/@src",$d);
foreach($pic as $p){
//echo $p->value;
array_push($product,$p->value);
}
// title
$title = $xpath->query("*[@class='description']/h2/a",$d);
foreach($title as $t){
echo $t->textContent;
}
$artist = $xpath->query("*[@class='description']/div[@class='product-artist']",$d);
foreach($artist as $a){
echo $a->textContent;
}
$price = $xpath->query("*[@class='product-variant-price-list']//td",$d);
foreach($price as $p){
echo $p->textContent;
}
echo "<br>";
}
*/
