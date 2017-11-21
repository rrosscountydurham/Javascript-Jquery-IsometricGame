KEYBOARD = {
BACKSPACE:8,
TAB:9,
ENTER:13,
SHIFT:16,
CTRL:17,
ALT:18,
PAUSE:19,
CAPS:20,
ESCAPE:27,
SPACE:32,
PGUP:33,
PGDWN:34,
END:35,
HOME:36,
LEFT:37,
UP:38,
RIGHT:39,
DOWN:40,
INSERT:45,
DELETE:46,
ZERO:48,
ONE:49,
TWO:50,
THREE:51,
FOUR:52,
FIVE:53,
SIX:54,
SEVEN:55,
EIGHT:56,
NINE:57,
A:65,
B:66,
C:67,
D:68,
E:69,
F:70,
G:71,
H:72,
I:73,
J:74,
K:75,
L:76,
M:77,
N:78,
O:79,
P:80,
Q:81,
R:82,
S:83,
T:84,
U:85,
V:86,
W:87,
X:88,
Y:89,
Z:90,
WINKEYLEFT:91,
WINKEYRIGHT:92,
SELECT:93,
NUMPAD0:96,
NUMPAD1:97,
NUMPAD2:98,
NUMPAD3:99,
NUMPAD4:100,
NUMPAD5:101,
NUMPAD6:102,
NUMPAD7:103,
NUMPAD8:104,
NUMPAD9:105,
MULTIPLY:106,
ADD:107,
SUBTRACT:109,
DECIMAL:110,
DIVIDE:111,
F1:112,
F2:113,
F3:114,
F4:115,
F5:116,
F6:117,
F7:118,
F8:119,
F9:120,
F10:121,
F11:122,
F12:123,
NUMLOCK:144,
SCROLLLOCK:145,
SEMICOLON:186,
EQUALS:187,
COMMA:188,
DASH:189,
PERIOD:190,
FORWARDSLASH:191,
GRAVE:192,
OPENBRACKET:219,
BACKSLASH:220,
CLOSEBRAKET:221,
SINGLEQUOTE:222
}

OCTANTMULTIPLY = [
	{bx: 1, ex: 1, by: 0, ey: 1, ix: 0, iy: 1, dx: 1, dy: 0},
	{bx: 1, ex: 0, by: 1, ey: 1, ix: -1, iy: 0, dx: 1, dy: 0},
	{bx: 0, ex: -1, by: 1, ey: 1, ix: -1, iy: 0},
	{bx: -1, ex: -1, by: 1, ey: 0, ix: 0, iy: -1},
	{bx: -1, ex: -1, by: 0, ey: -1, ix: 0, iy: -1},
	{bx: -1, ex: 0, by: -1, ey: -1, ix: 1, iy: 0},
	{bx: 0, ex: 1, by: -1, ey: -1, ix: 1, iy: 0},
	{bx: 1, ex: 1, by: -1, ey: 0, ix: 0, iy: 1}
]

function runFunction(name, arguments){
    var fn = window[name];
    if(typeof fn !== 'function')
        return;

    fn.apply(window, arguments);
};
var filterArray = [];
for(var i = 0 ; i < 1000 ; i++){
	filterArray.push([]);
	for(var j = 0 ; j < 1000 ; j++){
		filterArray[i].push(false);
	}
}
Array.prototype.clean = function(){
	var cleaned = false;
	while(!cleaned){
		cleaned = true;
		for(var i = 0 ; i < this.length ; i++){
			if(this[i] == undefined){
				this.splice(i,1);
				cleaned = false;
			}
		}
	}
};
Array.prototype.min = function( array ){
    return Math.min.apply( Math, array );
};
Array.prototype.fill = function(value,start,end){
	for(var i = start ; i <= end ; i++){
		this[i] = value;
	}
};
Array.prototype.findIndexByPropertyValue = function(property,searchValue){
	for(var i = 0 ; i < this.length ; i++){
		if(this[i][property] === searchValue)
			return i;
	}
	return -1;
};
Array.prototype.getRandomElement = function(){
	return this[randomRange(0,this.length-1)];
}
function inheritsFrom(parent,child){
	child.prototype = Object.create(parent.prototype);
};
function getXML(filename){
	$.ajax({
		url: "xml/" + filename,
		async : false,
		dataType : "xml",
		success : function(response){
			xml = $(response);
		},
		error: function (xhr,err){ alert(err); }
	});
	return xml;
};
function randomRange(min,max){
	min = Math.floor(min);
	max = Math.floor(max);
	var rand = Math.floor((Math.random() * (max - min + 1)) + min);
	if(rand > max)
		rand = max;
	return rand;
};
function cloneObject(objectInput){
	var tempObject = (JSON.parse(JSON.stringify(objectInput)));
	return tempObject;
}
function cloneArray(arrayInput){
   var out, v, key;
   out = Array.isArray(arrayInput) ? [] : {};
   for (key in arrayInput) {
       v = arrayInput[key];
       out[key] = (typeof v === "object") ? cloneArray(v) : v;
   }
   return out;
}

function button(x,y,width,height,backgroundColor,fontsize,content,data){
	this.buttonObj = new buttonBack(x,y,width,height,backgroundColor,data);
	this.buttonText = text(x,y,width,fontsize,content);
}
button.prototype.display = function(){
	gController.addUI(this.buttonObj,this.buttonText);
}

function buttonBack(x,y,width,height,backgroundColor,data){
	PIXI.Graphics.call(this);
	this.beginFill(backgroundColor);
	this.drawRect(x,y,width,height);
	this.endFill();
	this.pivot.x = width/2;
	this.pivot.y = height/2;
	this.hitArea = new PIXI.Rectangle(x,y,width,height);
	this.interactive = true;
	this.data = data;
}
buttonBack.prototype = Object.create(PIXI.Graphics.prototype);
buttonBack.prototype.constructor = buttonBack;
buttonBack.prototype.setColor = function(color){
	var tempData = this.graphicsData[0];
	var tempPivot = this.pivot;
	var tempHitArea = this.hitArea;
	this.clear();
	this.beginFill(color);
	this.drawRect(tempData.shape.x,tempData.shape.y,tempData.shape.width,tempData.shape.height);
	this.endFill();
	this.pivot = tempPivot;
	this.hitArea = tempHitArea;
}

function statusBar(x,y,width,height,backgroundColor,fontsize,content,data){
	this.statusBarObj = new statusBarBack(x,y,width,height,backgroundColor,data);
	this.statusBarBackground = new rectangle(x,y,width,height,0x00000);
	this.statusBarText = text(x,y,width,fontsize,content);
}
statusBar.prototype.display = function(){
	gController.addUI(this.statusBarBackground,this.statusBarObj,this.statusBarText);
}
statusBar.prototype.setWidth = function(width){
	this.statusBarObj.setBarWidth(width);
}
statusBar.prototype.setText = function(text){
	this.statusBarText.text = text;
}

function statusBarBack(x,y,width,height,backgroundColor,data){
	PIXI.Graphics.call(this);
	this.backgroundColor = backgroundColor;
	this.maxWidth = width;
	this.beginFill(backgroundColor);
	this.drawRect(x,y,width,height);
	this.endFill();
	this.pivot.x = width/2;
	this.pivot.y = height/2;
	this.hitArea = new PIXI.Rectangle(x,y,width,height);
	this.interactive = true;
	this.data = data;	
}
statusBarBack.prototype = Object.create(PIXI.Graphics.prototype);
statusBarBack.prototype.constructor = statusBarBack;
statusBarBack.prototype.setBarWidth = function(width){
	var tempData = this.graphicsData[0];
	var tempPivot = this.pivot;
	var tempHitArea = this.hitArea;
	var tempBackgroundColor = this.backgroundColor;
	this.clear();
	this.beginFill(tempBackgroundColor);
	this.drawRect(tempData.shape.x,tempData.shape.y,this.maxWidth * width,tempData.shape.height);
	this.endFill();
	this.pivot = tempPivot;
	this.hitArea = tempHitArea;
	
}

function rectangle(x,y,width,height,backgroundColor){
	var box = new PIXI.Graphics();
	box.beginFill(backgroundColor);
	box.drawRect(x,y,width,height);
	box.endFill();
	box.pivot.x = width/2;
	box.pivot.y = height/2;
	box.hitArea = new PIXI.Rectangle(x,y,width,height);
	return box;
};

function text(x,y,width,fontsize,content){
	var style = {
		font: 'bold ' + fontsize + 'px Arial',
		fill: "#FFFFFF",
		wordWrap : true,
		wordWrapWidth: width
	}
	var text = new PIXI.Text(content,style);
	text.x = x;
	text.y = y;
	text.anchor = new PIXI.Point(0.5,0.5);
	return text;
}

function point(x,y){
	this.x = x;
	this.y = y;
	this.isIso = false;
}
point.prototype.compare = function(point){
	if(this.x == point.x && this.y == point.y)
		return true;
	else
	return false;
}
point.prototype.set = function(x,y){
	this.x = x;
	this.y = y;
}
point.prototype.move = function(x,y){
	this.x+=x;
	this.y+=y;
}
point.prototype.offset = function(x,y){
	return new point(this.x+x,this.y+y);
}
point.prototype.display = function(){
	return this.x + " " + this.y;
}
point.prototype.randomRotateStart = function(){
	switch(randomRange(0,7)){
		case 0: this.set(0,-1); break; case 1: this.set(1,-1); break; case 2: this.set(1,0); break;
		case 3: this.set(1,1); break; case 4: this.set(0,1); break; case 5: this.set(-1,1); break;
		case 6: this.set(-1,0); break; case 7: this.set(-1,-1); break;
	}
}
point.prototype.distance = function(pointIn){
	return Math.abs(Math.sqrt(Math.pow(this.x - pointIn.x,2) + Math.pow(this.y - pointIn.y,2)));
}
point.prototype.boundarycheck = function(maxX,maxY){
	if(this.x < 0)
		this.x = 0;
	if(this.x > maxX - 1)
		this.x = maxX - 1;
	if(this.y < 0)
		this.y = 0;
	if(this.y > maxY - 1)
		this.y = maxY - 1;
}
point.prototype.bordercheck = function(maxX,maxY){
	if(this.x < 1)
		this.x = 1;
	if(this.x > maxX - 2)
		this.x = maxX - 2;
	if(this.y < 1)
		this.y = 1;
	if(this.y > maxY - 2)
		this.y = maxY - 2;
}
point.prototype.normalize = function(){
	var length = Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
	this.x /= length;
	this.y /= length;
}
point.prototype.dot = function(vertex){
	var product = (this.x * vertex.x) + (this.y * vertex.y);
	return product;
}
point.prototype.length = function(){
	return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
}
point.prototype.getDirection = function(){
	var angle = toDegrees(Math.acos(this.x/this.length()));
	if(this.y < 0)
		return angle;
	else
		return 360 - angle;
}
point.prototype.setVelocity = function(velocity){
	this.normalize();
	this.x *= velocity;
	this.y *= velocity;
}
point.prototype.switchIsoGrid = function(){
	if(!this.isIso){
		var tempX = this.x;
		this.x = this.x - this.y;
		this.y = (tempX + this.y)/2;
		this.isIso = true;
	}else{
		var tempX = this.x;
		this.x = this.x / 2 + this.y;
		this.y = -tempX/2 + this.y;
		this.isIso = false;
	}
}
point.prototype.cross = function(vertex){
	var cross = (this.x * vertex.y) - (this.y * vertex.x);
	return cross;
}
function AABB(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}
AABB.prototype.getRight = function(){
	return this.x + this.width;
}
AABB.prototype.getBottom = function(){
	return this.y + this.height;
}
AABB.prototype.getMinDiff = function(AABBIn){
	var tempX = this.x - AABBIn.getRight();
	var tempY = this.y - AABBIn.getBottom();
	var tempW = this.width + AABBIn.width;
	var tempH = this.height + AABBIn.height;
	
	return new AABB(tempX,tempY,tempW,tempH);
}
AABB.prototype.getOriginCheck = function(){
	if(this.x <= 0 && this.getRight() >= 0 && this.y <= 0 && this.getBottom() >= 0)
		return true;
	else
		return false;
}
AABB.prototype.getShortestDist = function(velocity){
	var minDist = Infinity;
	for(var i = 0 ; i < 4 ; i++){
		switch(i){
			case 0: var vA = new point(this.x,this.y); var vB = new point(this.getRight(),this.y); break;
			case 1: var vA = new point(this.getRight(),this.y); var vB = new point(this.getRight(),this.getBottom()); break;
			case 2: var vA = new point(this.getRight(),this.getBottom()); var vB = new point(this.x,this.getBottom()); break;
			case 3: var vA = new point(this.x,this.getBottom()); var vB = new point(this.x,this.y); break;
		}
		var s = new point(vB.x - vA.x,vB.y - vA.y);
		var t = vA.cross(velocity) / velocity.cross(s);
		if(t < minDist && t > 0)
			minDist = t;
	}
	return minDist;
}
AABB.prototype.drawBox = function(){
	var temp0 = new point(this.x,this.y); temp0.switchIsoGrid(); gController.addItem(new rectangle(temp0.x,temp0.y,3,3,0xFFFFFF));
	var temp1 = new point(this.getRight(),this.y); temp1.switchIsoGrid(); gController.addItem(new rectangle(temp1.x,temp1.y,3,3,0xFFFFFF));
	var temp2 = new point(this.getRight(),this.getBottom()); temp2.switchIsoGrid(); gController.addItem(new rectangle(temp2.x,temp2.y,3,3,0xFFFFFF));
	var temp3 = new point(this.x,this.getBottom()); temp3.switchIsoGrid(); gController.addItem(new rectangle(temp3.x,temp3.y,3,3,0xFFFFFF));
}
function toDegrees (angle) {
  return angle * (180 / Math.PI);
}
function toIso(pointIn){
	var tempPoint = {x: 0, y: 0};
	tempPoint.x = pointIn.x - pointIn.y;
	tempPoint.y = (pointIn.x + pointIn.y)/2;
	
	return tempPoint;
}
function toGrid(pointIn){
	var tempPoint = {x: 0, y:0};
	tempPoint.x = pointIn.x / 2 + pointIn.y;
	tempPoint.y = -pointIn.x / 2 + pointIn.y;
	
	return tempPoint;
}

var swap = function(x){return x};

function getStatXP(level){
	var statCount = level;
	var xpCount = 0;
	while(statCount > 0){
		xpCount += statCount * 100;
		statCount--;
	}
	return xpCount;
}
function getStatByXPValue(xp){
	var statCount = 0;
	while(xp > (statCount + 1) * 100){
		statCount++;
		xp -= statCount * 100;
	}
	return statCount;
}
//https://github.com/kittykatattack/learningPixi#keyboard
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.press = function(){};
  key.release = function(){};
  
  return key;
}

function xmlScript(inputCode){
	var fn = new Function('actor','target',"return " + inputCode);
	return fn;
}
debug = true;

if(!debug){
	$(window).load(function(){		
		gSettings = new settings();
		gController = new controller();;
	});
}else{	
	$(window).load(function(){
		setTimeout(function(){
			gSettings = new settings();
			gController = new controller();
		},500);
	});
}
var settings = function(){
	this.xmlSettings = getXML("settings.xml");
}
settings.prototype.getSetting = function(select){
	return this.xmlSettings.find(select).text();
}

var controller = function(){
	var localObject = this;
	this.cursorIn = true;
	this.canvasWidth = gSettings.getSetting("canvaswidth"); this.canvasWidth = 1336; this.canvasHeight = gSettings.getSetting("canvasheight"); this.renderer = PIXI.autoDetectRenderer(this.canvasWidth,this.canvasHeight);
	this.renderer.backgroundColor = 0x000000;
	$("#main").append(this.renderer.view); $("#main").css('cursor','none');
	$("canvas").mouseleave(function(){
		localObject.cursorIn = false;
	});
	$("canvas").mouseenter(function(){
		localObject.cursorIn = true;
	});
	this.initContainers(); this.initController(); this.setControls(); this.images = []; this.assetLoader = new PIXI.loaders.Loader(); this.loadImages();
	this.mapIDCounter = 0; this.minRegionSize = 10; this.maxRegionSize = 20;
	this.debugCounter = 0;
}
controller.prototype.initContainers = function(){
	this.background = new PIXI.ParticleContainer(300000,{},300000); this.background.setProperties({alpha: "true"});
	this.decalLayerOne = new PIXI.ParticleContainer(300000,{},300000); this.background.setProperties({alpha: "true"});
	this.container = new PIXI.Container();
	this.decalLayerTwo = new PIXI.ParticleContainer(300000,{},300000); this.background.setProperties({alpha: "true"});
	this.ui = new PIXI.Container();
	this.allItems = new PIXI.Container();
	this.allItems.addChild(this.background); this.allItems.addChild(this.decalLayerOne); this.allItems.addChild(this.container); this.allItems.addChild(this.decalLayerTwo); this.allItems.addChild(this.ui);
}
controller.prototype.initController = function(){
	var localObject = this;
	this.keyboardInput = new Array(222);
	this.keyboardInput.fill(0,0,this.keyboardInput.length-1);
	$.each(KEYBOARD,function(index,value){
		localObject.keyboardInput[value] = new keyboard(value);
	});
	this.mouseInput = new Array(3);
	this.mouseInput.fill(false,0,2);
}
controller.prototype.loadImages = function(){
	var localObject = this;
	var graphicsXML = getXML("graphics.xml");
	var graphicsArray = [];
	graphicsXML.find("graphic").each(function(){
		var graphicPath = 'graphics/' + $(this).attr("name");
		graphicsArray.push(graphicPath);
		if($(this).find("type").html() == "Sprite"){
			localObject.images.push({
				ID: graphicsArray.length - 1,
				name: 'graphics/' + $(this).attr("name"),
				type: "sprite"
			});
		}
		if($(this).find("type").html() == "Tiles"){
			localObject.images.push({
				ID: graphicsArray.length - 1,
				name: 'graphics/' + $(this).attr("name"),
				width: parseInt($(this).find("width").html()),
				height: parseInt($(this).find("height").html()),
				columns: parseInt($(this).find("columns").html()),
				type: "sheet",
			});
		}
	});
	this.assetLoader.add(graphicsArray).load(function(loader,resources){
		for(var i = 0 ; i < localObject.images.length ; i++){
			if(localObject.images[i].type == "sprite"){
				localObject.images[i].texture = new PIXI.Texture(resources[localObject.images[i].name].texture);
			}
			if(localObject.images[i].type == "sheet"){
				var texture = resources[localObject.images[i].name].texture;
				var textureArray = [];
				for(var j = 0 ; j < texture.height / localObject.images[i].height ; j++){
					for(var k = 0 ; k < texture.width / localObject.images[i].width ; k++){
						textureArray.push(new PIXI.Texture(texture,new PIXI.Rectangle(k * localObject.images[i].width,j * localObject.images[i].height,localObject.images[i].width,localObject.images[i].height)));
					}
				}
				localObject.images[i].texture = textureArray;
			}
		}
		localObject.beginGame();
	});
}
controller.prototype.getImage = function(filename,frame){
	filename = "graphics/" + filename;
	for(var i = 0 ; i < this.images.length ; i++){
		if (this.images[i].name == filename && this.images[i].type == "sprite")
			return this.images[i].texture;
		else if(this.images[i].name == filename && this.images[i].type == "sheet"){
			return this.images[i].texture[frame];
		}
	}
	return "Texture not found";
}
controller.prototype.genTexture = function(items){
	for(var i = 0 ; i < items.length-1 ; i++){
		this.tempContainer.addChild(items[i]);
	}
	var returnTexture = this.tempContainer.generateTexture(this.renderer);
	this.tempContainer.removeChildren();
	return returnTexture;
}
controller.prototype.addBackground = function(){
	for(var i = 0 ; i < arguments.length; i++){
		this.background.addChild(arguments[i]);
	}
}
controller.prototype.removeBackground = function(){
	for(var i = 0 ; i < arguments.length; i++){
		this.background.removeChild(arguments[i]);
	}
}
controller.prototype.addDecalLayerOne = function(){
	this.debugCounter++;
	for(var i = 0 ; i < arguments.length; i++){
		if(this.decalLayerOne.children.length == 0){
			this.decalLayerOne.addChild(arguments[i]);
			return;
		}
		else{
			if(this.decalLayerOne.children[this.decalLayerOne.children.length-1].y < arguments[i].y){
				this.decalLayerOne.addChild(arguments[i]);
				return;
			}
			for(var j = 0 ; j < this.decalLayerOne.children.length ; j++){
				if(this.decalLayerOne.children[j].y >= arguments[i].y){
					this.decalLayerOne.addChildAt(arguments[i],j);
					return;
				}
			}
		}
		console.log("Cannot find slot");
	}
}
controller.prototype.removeDecalLayerOne = function(){
	for(var i = 0 ; i < arguments.length; i++){
		this.decalLayerOne.removeChild(arguments[i]);
	}
}
controller.prototype.addDecalLayerTwo = function(){
	for(var i = 0 ; i < arguments.length; i++){
		this.decalLayerTwo.addChild(arguments[i]);
	}
}
controller.prototype.removeDecalLayerTwo = function(){
	for(var i = 0 ; i < arguments.length; i++){
		this.decalLayerTwo.removeChild(arguments[i]);
	}
}
controller.prototype.addItem = function(){
	for(var i = 0 ; i < arguments.length ; i++){
		this.container.addChild(arguments[i]);
	}
}
controller.prototype.removeItem = function(){
	for(var i = 0 ; i < arguments.length ; i++){
		this.container.removeChild(arguments[i]);
	}
}
controller.prototype.addUI = function(){
	for(var i = 0 ; i < arguments.length; i++){
		this.ui.addChild(arguments[i]);
	}
}
controller.prototype.removeUI = function(){
	for(var i = 0 ; i < arguments.length; i++){
		this.ui.removeChild(arguments[i]);
	}	
}
controller.prototype.setCursorPos = function(){
	if(this.cursorIn){
		this.cursorSprite.x = this.renderer.plugins.interaction.mouse.global.x;
		this.cursorSprite.y = this.renderer.plugins.interaction.mouse.global.y;
	}
}
controller.prototype.setCameraPos = function(point){
	point.x = -point.x;
	point.y = -point.y;
	point.x += this.canvasWidth / 2;
	point.y += this.canvasHeight / 2;
	for(var i = 0 ; i < this.allItems.children.length - 1 ; i++){
		this.allItems.children[i].x = point.x;
		this.allItems.children[i].y = point.y;
	}
}
controller.prototype.render = function(){
	this.renderer.render(this.allItems);
}
controller.prototype.blankBackground = function(){
	this.background.removeChildren();
	this.container.removeChildren();
	this.spriteBatch.removeChildren();
	this.ui.removeChildren();
}
controller.prototype.genMap = function(mapDimension){
	if(mapDimension == 0){
		var mapX = 100;
		var mapY = 100;
		var mapXSize = randomRange(this.minRegionSize,this.maxRegionSize);
		var mapYSize = randomRange(this.minRegionSize,this.maxRegionSize);
		var tempMap = {mapX: mapX, mapY: mapY, mapXSize: mapXSize, mapYSize: mapYSize};
		if(this.checkChunksAvailable(tempMap)){
			this.maps.push({
				ID: parseInt(this.mapIDCounter),
				name: "Test" + this.mapIDCounter,
				mapX: mapX, 
				mapY: mapY,
				mapXSize: mapXSize,
				mapYSize: mapYSize,
				mapConnections: [],
				linksGen: true
			});
			this.maps[this.maps.length - 1].mapConnections = [];
			this.mapIDCounter++;
			this.genRegion(this.maps[this.maps.length-1],[]);
		}
		this.genMap(this.maps[this.maps.length-1]);
	}else{
		mapDimension.linksGen = true;
		var sanityCheck = 0;
		var runs = 0;
		var sideVal = randomRange(0,3);
		var mapX = 0;
		var mapY = 0;
		var sanityLimit = 10;
		while(sanityCheck < sanityLimit){
			var mapXSize = randomRange(this.minRegionSize,this.maxRegionSize);
			var mapYSize = randomRange(this.minRegionSize,this.maxRegionSize);
			switch(sideVal){
				case 0:
					mapX = mapDimension.mapX - mapXSize;
					mapY = mapDimension.mapY + randomRange(-mapYSize/4,mapYSize/4);
					break;
				case 1: 
					mapX = mapDimension.mapX + randomRange(-mapXSize/4,mapXSize/4);
					mapY = mapDimension.mapY - mapYSize;
					break;
				case 2:
					mapX = mapDimension.mapX + mapDimension.mapXSize;
					mapY = mapDimension.mapY + randomRange(-mapYSize/4,mapXSize/4);
					break;
				case 3:
					mapX = mapDimension.mapX + randomRange(-mapXSize/4,mapXSize/4);
					mapY = mapDimension.mapY + mapDimension.mapYSize;
					break;
			}
			var tempMap = {mapX: mapX, mapY: mapY, mapXSize: mapXSize, mapYSize: mapYSize};
			if(this.checkChunksAvailable(tempMap)){
				this.maps.push({
					ID: parseInt(this.mapIDCounter),
					name: "Test" + this.mapIDCounter,
					mapX: mapX, 
					mapY: mapY,
					mapXSize: mapXSize,
					mapYSize: mapYSize,
					mapConnections: [],
					linksGen: false
				});
				var tempConnections = this.genConnections(this.maps[this.maps.length-1],mapDimension);
				if(this.maps[this.maps.length - 1].mapConnections.length > 0){
					this.mapIDCounter++;
					this.genRegion(this.maps[this.maps.length-1],tempConnections);
					sanityCheck = sanityLimit;
				}else{
					this.maps.splice(this.maps.length-1,1);
				}
			}
			sanityCheck++;
			if(sanityCheck >= sanityLimit){
				sideVal++;
				sideVal > 3 ? sideVal = 0 : sideVal = sideVal;
				runs++;
				runs > 3 ? sanityCheck = sanityLimit : sanityCheck = 0;
			}
		}
	}
}
controller.prototype.genConnections = function(mapFrom,mapTo){
	var xOffset = mapFrom.mapX + mapFrom.mapXSize - 1;
	var yOffset = mapFrom.mapY + mapFrom.mapYSize - 1;
	var xOffsetTo = mapTo.mapX + mapTo.mapXSize - 1;
	var yOffsetTo = mapTo.mapY + mapTo.mapYSize - 1;
	var lowerLimit = 0;
	var upperLimit = 0;
	var connectionPoints = [];
	var connectionAmount = randomRange(1,6);
	var returnConnections = [];
	if(xOffset + 1 == mapTo.mapX){
		if(mapFrom.mapY <= mapTo.mapY)
			lowerLimit = mapTo.mapY + 1;
		else
			lowerLimit = mapFrom.mapY + 1;
		if(yOffset <= yOffsetTo)
			upperLimit = yOffset - 1;
		else
			upperLimit = yOffsetTo - 1;
		connectionPoints.fill(false,lowerLimit,upperLimit);
		for(var i = 0 ; i < connectionAmount ; i++){
			connectionPoints[randomRange(lowerLimit,upperLimit)] = true;
		}
		for(var i = lowerLimit ; i < upperLimit ; i++){
			if(connectionPoints[i]){
				returnConnections.push(new point(xOffset,i));
				mapFrom.mapConnections.push(new point(xOffset,i));
				returnConnections.push(new point(xOffset+1,i));
				mapTo.mapConnections.push(new point(xOffset+1,i));
			}
		}
		return returnConnections;
	}
	if(yOffset + 1 == mapTo.mapY){
		if(mapFrom.mapX <= mapTo.mapX)
			lowerLimit = mapTo.mapX + 1;
		else
			lowerLimit = mapFrom.mapX + 1;
		if(xOffset <= xOffsetTo)
			upperLimit = xOffset - 1;
		else
			upperLimit = xOffsetTo - 1;
		connectionPoints.fill(false,lowerLimit,upperLimit);
		for(var i = 0 ; i < connectionAmount ; i++){
			connectionPoints[randomRange(lowerLimit,upperLimit)] = true;
		}
		for(var i = lowerLimit ; i < upperLimit ; i++){
			if(connectionPoints[i]){
				returnConnections.push(new point(i,yOffset));
				mapFrom.mapConnections.push(new point(i,yOffset));
				mapTo.mapConnections.push(new point(i,yOffset+1));
				returnConnections.push(new point(i,yOffset+1));
			}
		}
		return returnConnections;
	}
	if(mapFrom.mapX == mapTo.mapX + mapTo.mapXSize){
		if(mapFrom.mapY <= mapTo.mapY)
			lowerLimit = mapTo.mapY + 1;
		else
			lowerLimit = mapFrom.mapY + 1;
		if(yOffset <= yOffsetTo)
			upperLimit = yOffset - 1;
		else
			upperLimit = yOffsetTo - 1;
		connectionPoints.fill(false,lowerLimit,upperLimit);
		for(var i = 0 ; i < connectionAmount ; i++){
			connectionPoints[randomRange(lowerLimit,upperLimit)] = true;
		}
		for(var i = lowerLimit ; i < upperLimit ; i++){
			if(connectionPoints[i]){
				returnConnections.push(new point(mapFrom.mapX,i));
				mapFrom.mapConnections.push(new point(mapFrom.mapX,i));
				returnConnections.push(new point(mapFrom.mapX -1,i));
				mapTo.mapConnections.push(new point(mapFrom.mapX - 1,i));
			}
		}
		return returnConnections;
	}
	if(mapFrom.mapY == mapTo.mapY + mapTo.mapYSize){
		if(mapFrom.mapX <= mapTo.mapX)
			lowerLimit = mapTo.mapX + 1;
		else
			lowerLimit = mapFrom.mapX + 1;
		if(xOffset <= xOffsetTo)
			upperLimit = xOffset - 1;
		else
			upperLimit = xOffsetTo - 1;
		connectionPoints.fill(false,lowerLimit,upperLimit);
		for(var i = 0 ; i < connectionAmount ; i++){
			connectionPoints[randomRange(lowerLimit,upperLimit)] = true;
		}
		for(var i = lowerLimit ; i < upperLimit ; i++){
			if(connectionPoints[i]){
				returnConnections.push(new point(i,mapFrom.mapY));
				mapFrom.mapConnections.push(new point(i,mapFrom.mapY));
				returnConnections.push(new point(i,mapFrom.mapY - 1));
				mapTo.mapConnections.push(new point(i,mapFrom.mapY - 1));
			}
		}
		return returnConnections;
	}
	return returnConnections;
}
controller.prototype.genRegion = function(mapDimension,mapConnections){
	var hexCol = "";
		for(var k = 0 ; k < 7 ; k++){
			hexCol += randomRange(0,9);
		}
	hexCol = parseInt(hexCol,16);
	var mapGrid = [];
	for(var i = mapDimension.mapX; i < mapDimension.mapX + mapDimension.mapXSize ; i++){
		mapGrid.push([]);
		for(var j = mapDimension.mapY; j < mapDimension.mapY + mapDimension.mapYSize ; j++){
			if(typeof this.chunks[i] === 'undefined')
				this.chunks[i] = [];
			if(i == mapDimension.mapX || i == mapDimension.mapX + mapDimension.mapXSize - 1 || j == mapDimension.mapY || j == mapDimension.mapY + mapDimension.mapYSize - 1)
				var isSolid = true;
			else
				var isSolid = false;
			this.chunks[i][j] = {
				posX: i * this.chunkDim,
				posY: j * this.chunkDim,
				terrain: [],
				name: mapDimension.name,
				ID: mapDimension.ID,
				hexCol: hexCol,
				isSolid: isSolid
				};
			this.genTerrain(this.chunks[i][j],isSolid ? 0 : 1,isSolid);
			mapGrid[mapGrid.length - 1].push(this.chunks[i][j]);
		}
	}
	for(var i = 0 ; i < mapConnections.length ; i++){
		this.genTerrain(this.chunks[mapConnections[i].x][mapConnections[i].y],0,false);
		this.chunks[mapConnections[i].x][mapConnections[i].y].isSolid = false;
	}
	for(var i = 0 ; i < mapConnections.length ; i++){
		if(mapConnections[i].x < mapDimension.mapX || mapConnections[i].x >= mapDimension.mapX + mapDimension.mapXSize || mapConnections[i].y < mapDimension.mapY || mapConnections[i].y >= mapDimension.mapY + mapDimension.mapYSize){
			for(var j = -1 ; j < 2 ; j++){
				for(var k = -1 ; k < 2 ; k++){
					if(this.chunks[mapConnections[i].x + j][mapConnections[i].y + k].isSolid)
						this.setDecalsByAdjacent(this.chunks[mapConnections[i].x + j][mapConnections[i].y + k].terrain,"decals.png",0);
						
				}
			}
		}
	}
	for(var i = 0 ; i < mapGrid.length ; i++){
		for(var j = 0 ; j < mapGrid[i].length ; j++){
			if(mapGrid[i][j].isSolid){
				this.setDecalsByAdjacent(mapGrid[i][j].terrain,"decals.png",0);			
			}
		}
	}
}
DecalAdjacentOffset = [
{x: 0, y: -1},
{x: -1, y: 0},
{x: 0, y: 1},
{x: 1, y: 0}];
controller.prototype.setDecalsByAdjacent = function(terrainIn,image,frameBegin){
	/*for(var i = 0 ; i < this.chunkSize ; i++){
		for(var j = 0 ; j < this.chunkSize ; j++){
			if(i == 0 || i == this.chunkSize - 1 || j == 0 || j == this.chunkSize - 1){
				var decals = [];
				for(var k = 0 ; k < DecalAdjacentOffset.length ; k++){
					var tempT = this.getTerrain(terrainIn[i][j].position.x + (this.gridSize * DecalAdjacentOffset[k].x),terrainIn[i][j].position.y + (this.gridSize * DecalAdjacentOffset[k].y));
					if(tempT){
						if(!tempT.solid)
								decals.push({side: k, image: "decals.png", frame: 3 + frameBegin - k});
					}
				}
				terrainIn[i][j].setDecals(decals);
			}
		}
	}*/
	for(var i = 0 ; i < this.chunkSize ; i++){
		for(var j = 0 ; j < this.chunkSize ; j++){
			if(i == 0 || i == this.chunkSize - 1 || j == 0 || j == this.chunkSize - 1){
				var decals = [];
				for(var k = 0 ; k < DecalAdjacentOffset.length ; k++){
					var tempT = this.getTerrain(terrainIn[i][j][TERRAIN.POSITION].x + (this.gridSize * DecalAdjacentOffset[k].x),terrainIn[i][j][TERRAIN.POSITION].y + (this.gridSize * DecalAdjacentOffset[k].y));
					if(tempT){
						if(!tempT[TERRAIN.SOLID])
								decals.push({side: k, image: "decals.png", frame: 3 + frameBegin - k});
					}
				}
				setTerrainDecals(decals,terrainIn[i][j]);
			}
		}
	}
}
controller.prototype.getTerrain = function(x,y){
	var currentChunk = this.checkChunk(x,y);
	if(typeof this.chunks[currentChunk.x] !== 'undefined'){
		if(typeof this.chunks[currentChunk.x][currentChunk.y] !== 'undefined'){
			var currentPos = this.checkPosition(x - this.chunks[currentChunk.x][currentChunk.y].posX,y - this.chunks[currentChunk.x][currentChunk.y].posY);
			if(typeof this.chunks[currentChunk.x][currentChunk.y].terrain !== 'undefined'){
				if(typeof(this.chunks[currentChunk.x][currentChunk.y].terrain[currentPos.x] !== 'undefined')){
					if(typeof(this.chunks[currentChunk.x][currentChunk.y].terrain[currentPos.x][currentPos.y] !== 'undefined')){
						return this.chunks[currentChunk.x][currentChunk.y].terrain[currentPos.x][currentPos.y];
					}
				}
			}
		}
	}
	return false;
}
controller.prototype.genTerrain = function(chunkIn,frame,solid){
	chunkIn.terrain = [];
	chunkIn.terrain.length = this.chunkSize;
	for(var i = 0 ; i < this.chunkSize ; i++){
		chunkIn.terrain[i] = [];
		chunkIn.terrain[i].length = this.chunkSize;
		for(var j = 0 ; j < this.chunkSize ; j++){
			chunkIn.terrain[i][j] = genTerrainPiece(chunkIn.posX + (i * this.gridSize),chunkIn.posY + (j * this.gridSize),"tiles.png",solid ? 0 : 1,solid);
			/*chunkIn.terrain[i][j] = new terrainPiece(chunkIn.posX + (i * this.gridSize),chunkIn.posY + (j * this.gridSize),"tiles.png",solid ? 0 : 1);
			chunkIn.terrain[i][j].solid = solid;
			chunkIn.terrain[i][j].setVisible(false);*/
		}
	}
}
controller.prototype.checkChunksAvailable = function(mapDimension){
	for(var i = mapDimension.mapX; i < mapDimension.mapX + mapDimension.mapXSize ; i++){
		for(var j = mapDimension.mapY; j < mapDimension.mapY + mapDimension.mapYSize ; j++){
			if(typeof this.chunks[i] !== 'undefined'){
				if(typeof this.chunks[i][j] !== 'undefined')
					return false;
			}
		}
	}
    return true;
}
controller.prototype.genWorld = function(){
	this.chunkSize = 16; this.gridSize = 64; this.chunkDim = this.chunkSize * this.gridSize; this.chunks = []; this.maps = []; this.displayedChunks = []; var startXChunk = 1000; var startYChunk = 1000;
	this.genMap(0);
	var tempPos = new point(this.chunks[this.maps[0].mapX+1][this.maps[0].mapY+1].posX+100,this.chunks[this.maps[0].mapX+1][this.maps[0].mapY+1].posY+100);
	this.prot = new mainChar(tempPos.x,tempPos.y,"tiles.png",2);
	this.prevChunk = this.checkChunk(this.prot.position.x,this.prot.position.y);
	this.prevChunk.x += 1;
	this.loadUnload();
	this.prot.setVisible(true);
	this.setCameraPos(new point(this.prot.graphic.x,this.prot.graphic.y - 50));
}
controller.prototype.toggleTerrain = function(flag,terrain){
	for(var i = 0 ; i < terrain.length ; i++){
		for(var j = 0 ; j < terrain[i].length ; j++){
			setTerrainVisible(flag,terrain[i][j]);
		}
	}
}
controller.prototype.checkChunk = function(x,y){
	x = Math.floor(x);
	y = Math.floor(y);
	x += this.gridSize / 2;
	y += this.gridSize / 2;
	var currentChunkX = (x - (x % this.chunkDim)) / this.chunkDim;
	var currentChunkY = (y - (y % this.chunkDim)) / this.chunkDim;
	return new point(currentChunkX,currentChunkY);
}
controller.prototype.checkPosition = function(x,y){
	x = Math.floor(x);
	y = Math.floor(y);
	x += this.gridSize / 2;
	y += this.gridSize / 2;
	var currentPosX = (x - (x % this.gridSize)) / this.gridSize;
	var currentPosY = (y - (y % this.gridSize)) / this.gridSize;
	return new point(currentPosX,currentPosY);
}
controller.prototype.checkSolid = function(velocity,entity){
	var x = entity.position.x + velocity.x;
	var y = entity.position.y + velocity.y;
	var entityAABB = new AABB(
		x - entity.radius,
		y - entity.radius,
		entity.radius * 2,entity.radius * 2);
	for(var i = 0 ; i < 4 ; i++){
		var currentChunk = this.checkChunk(x + entity.boundaryBox[i].x,y + entity.boundaryBox[i].y);
		var currentPos = this.checkPosition(
		x + entity.boundaryBox[i].x - this.chunks[currentChunk.x][currentChunk.y].posX,
		y + entity.boundaryBox[i].y - this.chunks[currentChunk.x][currentChunk.y].posY);
		if(this.chunks[currentChunk.x][currentChunk.y].terrain[currentPos.x][currentPos.y][TERRAIN.SOLID]){
			var terrainAABB = new AABB(
				this.chunks[currentChunk.x][currentChunk.y].terrain[currentPos.x][currentPos.y][TERRAIN.POSITION].x - this.gridSize/2,
				this.chunks[currentChunk.x][currentChunk.y].terrain[currentPos.x][currentPos.y][TERRAIN.POSITION].y - this.gridSize/2,
				this.gridSize,this.gridSize);
			var calcAABB = entityAABB.getMinDiff(terrainAABB);
			if(calcAABB.getOriginCheck()){
				return true;
			}
		}
	}
	return false;
}
controller.prototype.checkTerrainCollision = function(entity,destinationPoint){
	var isSolid = this.checkSolid(destinationPoint,entity);
	var testPoints = [];
	if(isSolid){
		var dir = destinationPoint.getDirection();
		var finalVel = entity.velocity;
		var offsetVel = new point(0,0);
		if(dir >= 90 && dir < 180){
			testPoints.push(new point(0,-1));
			testPoints.push(new point(-1,0));
		}
		if(dir >= 0 && dir < 90){
			testPoints.push(new point(1,0));
			testPoints.push(new point(0,-1));
		}
		if(dir >= 180 && dir < 270){
			testPoints.push(new point(-1,0));
			testPoints.push(new point(0,1));
		}
		if(dir > 270 || dir < 0){
			testPoints.push(new point(0,1));
			testPoints.push(new point(1,0));
		}
		for(var i = 0 ; i < 2 ; i++){
			testPoints[i].setVelocity(finalVel);
			var testSolid = this.checkSolid(testPoints[i],entity);
			if(!testSolid)
				return {isSolid: true, alternativeRoute: testPoints[i]};
		}
	}else{
		return {isSolid: false, alternativeRoute: 0};
	}
	return {isSolid: true, alternativeRoute: 0};
}
controller.prototype.loadUnload = function(){
	var currentChunk = this.checkChunk(this.prot.position.x,this.prot.position.y);
	var chunksToLoad = [];
	if(!currentChunk.compare(this.prevChunk)){
		if(typeof this.chunks[currentChunk.x-1] === 'undefined' || typeof this.chunks[currentChunk.x] === 'undefined' || typeof this.chunks[currentChunk.x + 1] === 'undefined'){
			console.log("Chunk not present on x");
			console.log(currentChunk);
			return;
		}
		if(typeof this.chunks[currentChunk.x-1] !== 'undefined'){
			if(typeof this.chunks[currentChunk.x-1][currentChunk.y - 1] === 'undefined' || typeof this.chunks[currentChunk.x-1][currentChunk.y] === 'undefined' || typeof this.chunks[currentChunk.x-1][currentChunk.y+1] === 'undefined'){
				console.log("Chunk not present on y");
				console.log(currentChunk);
				return;
			}
		}
		if(typeof this.chunks[currentChunk.x] !== 'undefined'){
			if(typeof this.chunks[currentChunk.x][currentChunk.y - 1] === 'undefined' || typeof this.chunks[currentChunk.x][currentChunk.y] === 'undefined' || typeof this.chunks[currentChunk.x][currentChunk.y+1] === 'undefined'){
				console.log("Chunk not present on y");
				console.log(currentChunk);
				return;
			}
		}
		if(typeof this.chunks[currentChunk.x+1] !== 'undefined'){
			if(typeof this.chunks[currentChunk.x+1][currentChunk.y - 1] === 'undefined' || typeof this.chunks[currentChunk.x+1][currentChunk.y] === 'undefined' || typeof this.chunks[currentChunk.x+1][currentChunk.y+1] === 'undefined'){
				console.log("Chunk not present on y");
				console.log(currentChunk);
				return;
			}
		}
		if(this.chunks[currentChunk.x][currentChunk.y].ID != this.chunks[this.prevChunk.x][this.prevChunk.y].ID){
			console.log("Entering map ID: " + this.chunks[currentChunk.x][currentChunk.y].ID);
			if(!this.maps[this.chunks[currentChunk.x][currentChunk.y].ID].linksGen){
				this.genMap(this.maps[this.chunks[currentChunk.x][currentChunk.y].ID]);
				//this.debugMap(currentChunk);
			}
		}
		for(var i = this.prevChunk.x - 1; i <= this.prevChunk.x + 1; i++){
			for(var j = this.prevChunk.y - 1; j <= this.prevChunk.y + 1; j++){
				if(i < currentChunk.x - 1 || i > currentChunk.x + 1 || j < currentChunk.y - 1 || j > currentChunk.y + 1){
					this.toggleTerrain(false,this.chunks[i][j].terrain);
				}
			}
		}
		for(var i = currentChunk.x - 1; i <= currentChunk.x + 1; i++){
			for(var j = currentChunk.y - 1; j <= currentChunk.y + 1; j++){
				this.toggleTerrain(true,this.chunks[i][j].terrain);
			}
		}
		if(currentChunk.name != this.prevChunk.name)
			console.log("Entering " + currentChunk.name);
		this.prevChunk = currentChunk;
	}
}
controller.prototype.setControls = function(){
	var localObject = this;
	$("canvas").on("keydown",function(e){
		localObject.keyboardInput[event.which].press();
		e.preventDefault();
	});
	$("canvas").on("keyup",function(e){
		localObject.keyboardInput[event.which].release();
		e.preventDefault();
	});
	$("canvas").on("mousedown",function(e){
		localObject.runMouse("mousedown",e.which);
		e.preventDefault();
	});
	$("canvas").on("mouseup",function(e){
		localObject.runMouse("mouseup",e.which);
		e.preventDefault();
	});
}
controller.prototype.runMouse = function(state,button){
	if(state == "mousedown"){
		this.mouseInput[button - 1] = true;
	}
	if(state == "mouseup"){
		this.mouseInput[button - 1] = false;
	}
}
controller.prototype.beginGame = function(){
	this.cursorSprite = new PIXI.Sprite(this.getImage("cursor.png")); 
	this.addUI(this.cursorSprite);
	fps = 60;
	lastLoop = new Date();
	textFrames = new text(100,100,100,12,"60");
	textInfo = new text(150,200,350,12,"");
	this.addUI(textFrames);
	this.addUI(textInfo);
	this.genWorld();
	this.render();
	fpsLoop = 0;
	gLoop();
}
controller.prototype.debugMap = function(currentChunk){
	var xCount = 0;
	var yCount = 0;
	this.removeUI(this.mapTexture);
	var rectangleArray = [];
	for(var i = 0 ; i < this.chunks.length ; i++){
		if(typeof this.chunks[i] !== 'undefined'){
			for(var j = 0 ; j < this.chunks[i].length ; j++){
				if(typeof this.chunks[i][j] !== 'undefined'){
					if(!this.chunks[i][j].terrain[0][0].solid){
						rectangleArray.push(new rectangle((xCount - currentChunk.x) * 6 + 200,(yCount - currentChunk.y) * 6 + 200,6,6,this.chunks[i][j].hexCol));
					}
				}
				yCount++;
			}
		}
		yCount = 0;
		xCount++;
	}
	this.mapTexture = new PIXI.Sprite(this.genTexture(rectangleArray));
	this.addUI(this.mapTexture);
}
function gLoop(){
	fpsLoop++;
	var thisLoop = new Date();
	var frames = 1000 / (thisLoop - lastLoop);
	lastLoop = thisLoop;
	if(fpsLoop > 50){
		fpsLoop = 0;
		textFrames.text = parseInt(frames);
	}
		gController.setCursorPos();
		gController.render();
		if(gController.mouseInput[0] == true)
			gController.prot.moveTowardMouse();
		setTimeout(function(){
			requestAnimationFrame(gLoop);
		}, parseInt(1000 / (fps*2)));
}

//==============================================================================
var gameEntity = function(x,y,graphic,frame){
	this.position = new point(x,y);
	this.graphic = new PIXI.Sprite(gController.getImage(graphic,frame));
	var tempPos = toIso(this.position);
	var rectDebug = rectangle(tempPos.x,tempPos.y,2,2,0xFFFFFF);
	gController.addItem(rectDebug);
	this.graphic.x = tempPos.x; this.graphic.y = tempPos.y;
	this.graphic.anchor.x = 0.5; this.graphic.anchor.y = 0.5;
	this.frame = frame;
	this.radius = 10;
	this.velocity = 10;
	this.boundaryBox = [];
	this.boundaryBox.push({x: -this.radius, y: -this.radius});
	this.boundaryBox.push({x: this.radius, y: -this.radius});
	this.boundaryBox.push({x: -this.radius, y: this.radius});
	this.boundaryBox.push({x: this.radius, y: this.radius});
}
gameEntity.prototype.setPos = function(x,y){
	this.position.x = x; this.position.y = y;
	var tempPos = toIso(this.position);
	this.graphic.x = tempPos.x; this.graphic.y = tempPos.y;
}
gameEntity.prototype.movePos = function(x,y){
	var destinationPoint = new point(x,y);
	destinationPoint.setVelocity(this.velocity);
	var canMove = gController.checkTerrainCollision(this,destinationPoint);
	if(!canMove.isSolid){
		this.position.x += destinationPoint.x; this.position.y += destinationPoint.y;
		var tempPos = toIso(this.position);
		var tempPos = toIso(this.position);
		this.graphic.x = tempPos.x; this.graphic.y = tempPos.y;
	}else{
		if(canMove.alternativeRoute != 0){
			this.position.x += canMove.alternativeRoute.x; this.position.y += canMove.alternativeRoute.y;
			var tempPos = toIso(this.position);
			this.graphic.x = tempPos.x; this.graphic.y = tempPos.y;	
		}
	}
}
gameEntity.prototype.setVisible = function(input){
	if(input)
		gController.addItem(this.graphic);
	else
		gController.removeItem(this.graphic);
}

var mainChar = function(x,y,graphic,frame){
	gameEntity.call(this,x,y,graphic,frame);
}
inheritsFrom(gameEntity,mainChar);

mainChar.prototype.moveTowardMouse = function(){
	var directionPoint = new point(gController.renderer.plugins.interaction.mouse.global.x - (gController.canvasWidth / 2),gController.renderer.plugins.interaction.mouse.global.y - (gController.canvasHeight / 2));
	directionPoint.isIso = true;
	var length = directionPoint.distance(new point(0,0));
	if(length > this.radius){
		directionPoint.switchIsoGrid();
		this.movePos(directionPoint.x,directionPoint.y);
	}
}
mainChar.prototype.movePos = function(x,y){
	gameEntity.prototype.movePos.call(this,x,y);
	gController.setCameraPos({x: this.graphic.x,y: this.graphic.y});
	gController.loadUnload();
}

terrainDecalOffsets = [
	{x: 0.25, y: -0.5},
	{x: -0.25, y: -0.5},
	{x: -0.25, y: 0},
	{x: 0.25, y: 0}
];
TERRAIN = {
	POSITION : 0,
	IMAGE: 1,
	FRAME: 2,
	GRAPHIC: 3,
	VISIBLE: 4,
	SOLID: 5,
	DECALS: 6
};
function genTerrainPiece(x,y,graphic,frame,solid){
	return [new point(x,y),
	graphic,
	frame,
	0,
	false,
	solid,
	[0,0,0,0]
	];
}
function setTerrainDecals(decals,terrainIn){
	for(var i = 0 ; i < decals.length ; i++){
		terrainIn[TERRAIN.DECALS][decals[i].side] = {
			image: decals[i].image,
			frame: decals[i].frame,
			graphic: 0
		};
	}
}
function setTerrainVisible(flag,terrainIn){
	if(flag && !terrainIn[TERRAIN.VISIBLE]){
		terrainIn[TERRAIN.GRAPHIC] = new PIXI.Sprite(gController.getImage(terrainIn[TERRAIN.IMAGE],terrainIn[TERRAIN.FRAME]));
		var tempPos = toIso(terrainIn[TERRAIN.POSITION]);
		terrainIn[TERRAIN.GRAPHIC].x = tempPos.x; terrainIn[TERRAIN.GRAPHIC].y = tempPos.y;
		terrainIn[TERRAIN.GRAPHIC].anchor = new PIXI.Point(0.5,0.5);
		gController.addBackground(terrainIn[TERRAIN.GRAPHIC]);
		for(var i = 0 ; i < terrainIn[TERRAIN.DECALS].length; i++){
			if(terrainIn[TERRAIN.DECALS][i] != 0){
				terrainIn[TERRAIN.DECALS][i].graphic = new PIXI.Sprite(gController.getImage(terrainIn[TERRAIN.DECALS][i].image,terrainIn[TERRAIN.DECALS][i].frame));
				terrainIn[TERRAIN.DECALS][i].graphic.x = tempPos.x + terrainIn[TERRAIN.GRAPHIC].width * terrainDecalOffsets[i].x; 
				terrainIn[TERRAIN.DECALS][i].graphic.y = tempPos.y + terrainIn[TERRAIN.GRAPHIC].height * terrainDecalOffsets[i].y;
				terrainIn[TERRAIN.DECALS][i].graphic.anchor = new PIXI.Point(0.5,0.5);				
				gController.addDecalLayerOne(terrainIn[TERRAIN.DECALS][i].graphic);
			}
		}
		terrainIn[TERRAIN.VISIBLE] = true;
		return;
	}
	if(!flag && terrainIn[TERRAIN.VISIBLE]){
		gController.removeBackground(terrainIn[TERRAIN.GRAPHIC]);
		terrainIn[TERRAIN.GRAPHIC] = 0;
		for(var i = 0 ; i < terrainIn[TERRAIN.DECALS].length ; i++){
			if(terrainIn[TERRAIN.DECALS][i] != 0){
				if(i < 2)
					gController.removeDecalLayerOne(terrainIn[TERRAIN.DECALS][i].graphic);
				else
					gController.removeDecalLayerTwo(terrainIn[TERRAIN.DECALS][i].graphic);
				terrainIn[TERRAIN.DECALS][i].graphic = 0;
			}
		}
		terrainIn[TERRAIN.VISIBLE] = false;
	}
}
var terrainPiece = function(x,y,graphic,frame){
	this.position = new point(x,y);
	this.image = graphic;
	this.frame = frame;
	this.graphic = 0;
	this.visible = false;
	this.solid = false;
	this.decals = [];
	for(var i = 0 ; i < 4 ; i++){
		this.decals.push(0);
	}
}
terrainPiece.prototype.setDecals = function(decals){
	for(var i = 0 ; i < decals.length ; i++){
		this.decals[decals[i].side] = {
			image: decals[i].image,
			frame: decals[i].frame,
			graphic: 0
		}
	}
}
terrainPiece.prototype.setVisible = function(input){
	if(input && !this.visible){
		this.graphic = new PIXI.Sprite(gController.getImage(this.image,this.frame));
		var tempPos = toIso(this.position);
		this.graphic.x = tempPos.x; this.graphic.y = tempPos.y;
	    this.graphic.anchor.x = 0.5; this.graphic.anchor.y = 0.5;
		gController.addBackground(this.graphic);
		for(var i = 0 ; i < this.decals.length; i++){
			if(this.decals[i] != 0){
				this.decals[i].graphic = new PIXI.Sprite(gController.getImage(this.decals[i].image,this.decals[i].frame));
				this.decals[i].graphic.x = tempPos.x + this.graphic.width * terrainDecalOffsets[i].x; 
				this.decals[i].graphic.y = tempPos.y + this.graphic.height * terrainDecalOffsets[i].y;
				this.decals[i].graphic.anchor = new PIXI.Point(0.5,0.5);				
				gController.addDecalLayerOne(this.decals[i].graphic);
			}
		}
		this.visible = true;
	}
	if(!input && this.visible){
		gController.removeBackground(this.graphic);
		this.graphic = 0;
		for(var i = 0 ; i < this.decals.length ; i++){
			if(this.decals[i] != 0){
				if(i < 2)
					gController.removeDecalLayerOne(this.decals[i].graphic);
				else
					gController.removeDecalLayerTwo(this.decals[i].graphic);
				this.decals[i].graphic = 0;
			}
		}
		this.visible = false;
	}
}