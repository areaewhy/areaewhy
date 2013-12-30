<?php


$q = '';
$url = 'bm.htm';
if (!empty($_POST['q'])){
$url = 'http://www.bullmoose.com';
$url .= '/search?q='.urlencode($_POST['q']);
}
	//$url = 'bm.htm';
	//echo $url;

$request = file($url);


foreach($request as $part){

//echo $part;
@$html .= $part;	// stuff the parts into $html
}
//echo $html;

/*Begin DOM experiment*/

$dom = new DOMDocument;
// remove the "invalid HTML" errors
libxml_use_internal_errors(true);
$dom->loadHTML($html);

/*Attempt to grab Title and Content*/
$xpath = new DOMXPath($dom);
$classname = 'product-list';
$nodes = $xpath->query("//*[@class='$classname']");

foreach($nodes as $node){
	//print_r($node);
	$innerHTML = '';
	
	$children = $node->childNodes;
	foreach ($children as $child){
		$tmp_doc = new DOMDocument();
		if ($child->parentNode){
		$tmp_doc->appendChild($tmp_doc->importNode($child,true));
		$innerHTML .= $tmp_doc->saveHTML();
		}
	}
}
$innerHTML = str_replace('src','_src',$innerHTML);
echo($innerHTML);


/*	
 * Experiment with pulling each element ( picture, artist, title, etc..) 

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

/*	
	$DOM2 = new DOMDocument();
	$DOM2->loadHTML($innerHTML);
	
	$images = $DOM2->getElementsByTagName('img');
	$innerHTML2 = '';
	foreach($images as $img){
		$img->setAttribute('class','item');
//		if (strpos($img->getAttribute('src'),'bullmoose') == 0){
			//echo strpos($img->getAttribute('src'),'http');
//$img->setAttribute('src','http://www.bullmoose.com'.$img->getAttribute('src'));}
		$tmp_doc = new DOMDocument();
		$tmp_doc->appendChild($tmp_doc->importNode($img,true));
		$innerHTML2 .= $tmp_doc->saveHTML();
	}
	
	//var_dump($images);
	
	echo trim($innerHTML2);
}
*/
?>