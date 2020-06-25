'use strict';
let log = console.log.bind(console);

// list of image URLs
//far												.near
const imageURL = [
  'parbg.png',
  'bubble_left.png',
  'bubble_right.png',
  'parfg.png',
  '0.png',
  '1.png',
  '2.png',
  '3.png',
  '4.png',
  '5.png',
  '6.png',
  '7.png',
  '8.png',
  'work.png',
  '100.png',
  '101.png',
  '102.png',
  '103.png',
  '104.png',
  '105.png',
  '106.png',
  '107.png',
  '108.png',
  '109.png',
  '110.png',
  '111.png',
  '112.png',
  '113.png',
  '114.png',
  '115.png',
];
const p_image_offset = 4;
const ss_image_offset = 10 + p_image_offset;
const images = []; /// array to hold images.
let imageCount = 0; // number of loaded images;
let loaded = false;

//image loader which runs on start
imageURL.forEach((src) => {
  // for each image url
  const image = new Image();
  image.src = 'images/parcelation_assets/' + src;
  image.onload = () => {
    imageCount += 1;
    if (imageCount === imageURL.length) {
      // have all loaded????
      loaded = true; // call function to start rendering
    }
  };
  images.push(image); // add loading image to images array
});

function randomFloat(min, max) {
  return min + (max - min) * Math.random();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//difference between this and let/var in function:
//-let allows a new this scope inside the variable
//-this inside a this refers to the parent scope only
//some internal functions create a new scope so (eg forEach) so let/var global reference is needed
let BuildingBackground = function () {
  this.image = images[0];
  this.fg = images[3];
  this.draw = function (ctx, tX, tY, scale) {
    ctx.drawImage(
      this.image,
      tX,
      tY,
      this.image.width * scale,
      this.image.height * scale
    );
  };
  this.drawFg = function (ctx, tX, tY, scale) {
    ctx.drawImage(
      this.fg,
      tX,
      tY,
      this.image.width * scale,
      this.image.height * scale
    );
  };
};

let showOccupants = true;
let showSharedSpaces = true;
let ParcelSys = function (offsetX, offsetY, rW, rH, dy) {
  //parcelation rects
  this.scale = 1;
  this.offset_x = offsetX; //initial x offset from image top left corner
  this.offset_y = offsetY; //initial y offset from image top left corner
  this.r_w = rW; //room width
  this.r_h = rH; //room height
  this.dy = dy; //height space between floors
  this.unit_property = [];
  this.unit_property['Single'] = {
    color: '#D2E39D',
    outline: '#D89ABA',
    sprites: [0],
  };
  this.unit_property['CoupleWoChildren'] = {
    color: '#FFB0D0',
    outline: '#CEAE8E',
    sprites: [0, 1],
  };
  this.unit_property['SingleParent'] = {
    color: '#FECB1A',
    outline: '#D39B1C',
    sprites: [0, 2, 3],
  };
  this.unit_property['Nuclear'] = {
    color: '#85E2B5',
    outline: '#B4BF8C',
    sprites: [7, 2, 3],
  };
  this.unit_property['Assisted'] = {
    color: '#E1F6FB',
    outline: '#74C198',
    sprites: [4, 8],
  };
  this.unit_property['Flatshare'] = {
    color: '#0073CC',
    outline: '#B1C1C4',
    sprites: [0, 1, 5, 6, 7],
  };
  this.unit_property['Multi'] = {
    color: '#B4ABD6',
    outline: '#899CA5',
    sprites: [4, 5, 6, 7, 8],
  };
  this.ss_property = [];
  this.ss_property['Cafeteria'] = {
    color: '#FFFFFF',
    outline: '#D3D3D3',
    sprites: [0],
  };
  this.ss_property['CommunityFarm'] = {
    color: '#FFFFFF',
    outline: '#D3D3D3',
    sprites: [1],
  };
  this.ss_property['FitnessCentre'] = {
    color: '#FFFFFF',
    outline: '#D3D3D3',
    sprites: [2],
  };
  this.ss_property['SportsHall'] = {
    color: '#FFFFFF',
    outline: '#D3D3D3',
    sprites: [3],
  };
  this.ss_property['Lounge'] = {
    color: '#FFFFFF',
    outline: '#D3D3D3',
    sprites: [4],
  };
  this.ss_property['Salon'] = {
    color: '#FFFFFF',
    outline: '#D3D3D3',
    sprites: [5],
  };
  this.ss_property['Library'] = {
    color: '#FFFFFF',
    outline: '#D3D3D3',
    sprites: [6],
  };
  this.ss_property['Tailor'] = {
    color: '#FFFFFF',
    outline: '#D3D3D3',
    sprites: [7],
  };
  this.ss_property['Market'] = {
    color: '#FFFFFF',
    outline: '#D3D3D3',
    sprites: [8],
  };
  this.ss_property['Playscape'] = {
    color: '#FFFFFF',
    outline: '#D3D3D3',
    sprites: [9],
  };
  this.ss_property['PlayRoom'] = {
    color: '#FFFFFF',
    outline: '#D3D3D3',
    sprites: [10],
  };
  this.ss_property['Restaurant'] = {
    color: '#FFFFFF',
    outline: '#D3D3D3',
    sprites: [11],
  };
  this.ss_property['MultiGenCenter'] = {
    color: '#FFFFFF',
    outline: '#D3D3D3',
    sprites: [12],
  };
  this.ss_property['HealthcareClinic'] = {
    color: '#FFFFFF',
    outline: '#D3D3D3',
    sprites: [13],
  };
  this.ss_property['Makerspace'] = {
    color: '#FFFFFF',
    outline: '#D3D3D3',
    sprites: [14],
  };
  this.ss_property['Childcare'] = {
    color: '#FFFFFF',
    outline: '#D3D3D3',
    sprites: [15],
  };

  this.units = [];
  this.updateUnits = function (newUnits) {
    //log(newUnits);
    if (newUnits.length == this.units.length) {
      let isSame = true;
      for (let i = 0; i < newUnits.length; i++) {
        if (this.units[i].user_id != newUnits[i].user_id) {
          isSame = false;
          break;
        }
      }
      if (isSame) return;
    }
    this.units = newUnits;
    //add new sprite property into this.units for draw positions
    for (let u = 0; u < newUnits.length; u++) {
      let sprites = [];
      //if is unit
      if (this.unit_property.hasOwnProperty(newUnits[u].type)) {
        let col = [
          ...Array(newUnits[u].loc[1] - newUnits[u].loc[0] + 1).keys(),
        ];
        shuffle(col);

        let spriteRef = this.unit_property[newUnits[u].type].sprites;
        let study = newUnits[u].user_input.requiredRooms.Study;
        let spIndex = 0;
        for (let i = 0; i < col.length; i++) {
          let roomIndex = newUnits[u].loc[0] + col[i];
          //ignore recesses
          if (
            (roomIndex > 1 && roomIndex < 4) ||
            (roomIndex > 6 && roomIndex < 9) ||
            (roomIndex > 11 && roomIndex < 14)
          ) {
            sprites[col[i]] = -1;
            continue;
          } else if (study > 0) {
            sprites[col[i]] = 100;
            study--;
            continue;
          }
          if (spIndex < spriteRef.length) {
            sprites[col[i]] = spriteRef[spIndex];
            spIndex++;
          } else sprites[col[i]] = -1;
        }
        //log(col);
        //log(sprites);
      }
      //else handle shared space
      else if (this.ss_property.hasOwnProperty(newUnits[u].type)) {
        sprites = this.ss_property[newUnits[u].type].sprites;
      }
      this.units[u].sprites = sprites;
    }
  };
  this.draw = function (ctx, tX, tY, scale) {
    this.scale = scale;
    let r_w = this.r_w * scale;
    let r_h = this.r_h * scale;
    let offset_x = this.offset_x * scale + tX;
    let offset_y = this.offset_y * scale + tY;
    let dy = (this.r_h + this.dy) * scale;

    for (let u = 0; u < this.units.length; u++) {
      let indexOffset = this.units[u].loc[0];
      let ptX,
        ptY,
        uW = 0,
        uC;
      let isSharedSpace = !this.unit_property.hasOwnProperty(
        this.units[u].type
      );
      let centerCol = null;
      if (isSharedSpace) {
        centerCol = Math.floor(
          (this.units[u].loc[0] + this.units[u].loc[1]) / 2
        );
        if (centerCol == 3 || centerCol == 8 || centerCol == 13) centerCol += 1;
        else if (centerCol == 2 || centerCol == 7 || centerCol == 12)
          centerCol -= 1;
        //log(centerCol);
      }
      for (let x = indexOffset; x <= this.units[u].loc[1]; x++) {
        let col = x;
        let rw = r_w;
        let rx;
        let ry = (33 - this.units[u].floor) * dy + offset_y;
        switch (col) {
          case 0:
          case 1:
            rx = col * r_w + offset_x;
            break;
          case 2:
            rw = r_w / 2;
            rx = col * r_w + offset_x;
            break;
          case 3:
            rw = r_w / 2;
            rx = 2 * r_w + rw + offset_x;
            break;
          case 4:
          case 5:
          case 6:
            col -= 1;
            rx = col * r_w + offset_x;
            break;
          case 7:
            rw = r_w / 2;
            rx = 6 * r_w + offset_x;
            break;
          case 8:
            rw = r_w / 2;
            rx = 6 * r_w + rw + offset_x;
            break;
          case 9:
          case 10:
          case 11:
            col -= 2;
            rx = col * r_w + offset_x;
            break;
          case 12:
            rw = r_w / 2;
            rx = 10 * r_w + offset_x;
            break;
          case 13:
            rw = r_w / 2;
            rx = 10 * r_w + rw + offset_x;
            break;
          case 14:
          case 15:
            col -= 3;
            rx = col * r_w + offset_x;
            break;
          default:
            continue;
        }
        //store unit anchor, width and height
        if (x == indexOffset) {
          ptX = rx;
          ptY = ry;
        }
        uW += rw;

        //draw room
        if (isSharedSpace) {
          ctx.fillStyle = this.ss_property[this.units[u].type].color;
          ctx.fillRect(rx, ry, rw, r_h);
          uC = this.ss_property[this.units[u].type].outline;
          if (x == centerCol && showSharedSpaces) {
            let spriteImg = images[ss_image_offset + this.units[u].sprites[0]];
            ctx.drawImage(spriteImg, rx, ry, rw, r_h);
          }
          continue;
        }
        ctx.fillStyle = this.unit_property[this.units[u].type].color;
        ctx.fillRect(rx, ry, rw, r_h);
        ctx.strokeStyle = '#E90006';
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineWidth = 2 * scale;
        ctx.lineTo(rx, ry + r_h);
        ctx.stroke();
        uC = this.unit_property[this.units[u].type].outline;
        //draw sprites
        if (!showOccupants) continue;
        let spriteRefIndex = this.units[u].sprites[x - indexOffset];
        let spriteImg;
        switch (spriteRefIndex) {
          default:
            //normal cohabitation image
            spriteImg = images[p_image_offset + spriteRefIndex];
            break;
          case 100: //study image
            spriteImg = images[p_image_offset + 9];
            break;
          case -1:
            continue;
        }
        ctx.drawImage(spriteImg, rx, ry, rw, r_h);
      }
      ctx.lineWidth = 2.5 * scale;
      ctx.strokeStyle = uC;
      ctx.strokeRect(ptX, ptY, uW, r_h);
    }

    // //callibration
    // for (let i=0; i<34; i++){
    // for (let j=0; j<13; j++){
    // if (j==2||j==6||j==10)
    // continue;
    // if (i%2==0){
    // ctx.fillStyle = 'rgba( 0, 0, 0, 0.8)';
    // if (j%2==0)
    // ctx.fillStyle = 'rgba( 255, 255, 255, 0.8)';
    // }
    // else{
    // ctx.fillStyle = 'rgba( 255, 255, 255, 0.8)';
    // if (j%2==0)
    // ctx.fillStyle = 'rgba( 0, 0, 0, 0.8)';
    // }

    // //ctx.fillStyle = 'rgba(' + Math.floor(255 - 255 * i/33) + ', ' +Math.floor(255 - 255 * j/15) + ', 0, 0.8)';
    // ctx.fillRect(j*r_w+offset_x,
    // i*dy+offset_y,
    // r_w, r_h);
    // }
    // }
  };
};

let showMessages = true;
let BubbleSys = function (ctx, canvas, offset) {
  this.img_l = images[1];
  this.img_r = images[2];
  this.bubble_w = 200 * window.devicePixelRatio; //fixed width size of 200px
  this.bubbleScale = 1 / (this.img_l.width / this.bubble_w);
  this.bubble_h = 50 * window.devicePixelRatio * scale;; //this.img_l.height * this.bubbleScale;
  this.padding = 15;
  this.maxWidth = this.bubble_w - 2 * this.padding;
  this.btn_w = 60 * window.devicePixelRatio;
  this.btn_h = 20 * window.devicePixelRatio;
  this.tailXoffset = 80 * this.bubbleScale; //anchor offset for the bubble right; left calculated as width-offset// unused
  this.offset = offset;
  this.maxBubbleCount = 6;
  this.topicColors=[
	{color:'#FFFFFF',bg:'#FDE5E6'},
	{color:'#34A8FF',bg:'#E6F1FA'},
	{color:'#FFB0D1',bg:'#FFF5D1'},
	{color:'#B4ABD6',bg:'#FFEFF6'},
	{color:'#FFCC19',bg:'#E9E6F3'},
	{color:'#85E2B5',bg:'#DAF6E9'},
	{color:'#A5BBC8',bg:'#E4EBEF'},
	{color:'#D1E39D',bg:'#00000'},	
	];
  this.posSwitch=false;
  let leftPos=0, rightPos=15;
  let allFloorDisps=[1,3,6,8,11,13,16,18,21,23,26,28,31];
  let odd=[1,6,11,16,21,26,31], even=[3,8,13,18,23,28];
  let bubbleTx = [];
  let bubbleTy = [];
  //for handler scope access, dynamic data needs to be either var/let
  let btnPaths = [];
  let txtData = [];
  let topicIndex = 0;
  let messageTopics = {};
  this.updateMessages = function (messageData) {
    messageTopics = messageData;
    //log(this.messageTopics);
  };
  this.nextTopic = function (parcelizedUnits) {
    if (Object.keys(messageTopics).length === 0)
      return;
    bubbleTx = [];
    bubbleTy = [];
    btnPaths = [];
    txtData = [];
    topicIndex = (topicIndex + 1) % messageTopics.length;
    // let jumbledIndex = [...Array(parcelizedUnits.length).keys()];
    let jumbledIndex = [...Array(allFloorDisps.length).keys()];
    //log(jumbledIndex);
    shuffle(jumbledIndex);
    for (
      let i = 0;
      (i < allFloorDisps.length &&
      i < messageTopics[topicIndex].messages.length) &&
	  i < this.maxBubbleCount;
      i++
    ) {
      txtData[i] = messageTopics[topicIndex].messages[i].message;
      // bubbleTx[i] = Math.floor(
        // randomFloat(
          // parcelizedUnits[jumbledIndex[i]].loc[0],
          // parcelizedUnits[jumbledIndex[i]].loc[1] + 1
        // )
      // );
	  if (this.posSwitch){
		  if (odd.includes(allFloorDisps[jumbledIndex[i]]))
			bubbleTx[i] = leftPos;
		  else
			bubbleTx[i] = rightPos;
	  }
	  else{
		  if (odd.includes(allFloorDisps[jumbledIndex[i]]))
			bubbleTx[i] = rightPos;
		  else
			bubbleTx[i] = leftPos;
	  }
			  
      switch (bubbleTx[i]) {
        default:
        case 0:
        case 1:
          break;
        case 2:
        case 3:
          bubbleTx[i] = 2;
          break;
        case 4:
        case 5:
        case 6:
          bubbleTx[i] -= 1;
          break;
        case 7:
        case 8:
          bubbleTx[i] = 6;
          break;
        case 9:
        case 10:
        case 11:
          bubbleTx[i] -= 2;
          break;
        case 12:
        case 13:
          bubbleTx[i] = 10;
          break;
        case 14:
        case 15:
          bubbleTx[i] -= 3;
          break;
      }
      //bubbleTy[i] = 33 - parcelizedUnits[jumbledIndex[i]].floor;
	  bubbleTy[i] = 33 - allFloorDisps[jumbledIndex[i]];
    }
  };
  //register all reply buttons to their respective messages
  canvas.addEventListener('click', function (event) {
    btnPaths.forEach(function (reply_btn, i, arr) {
      if (ctx.isPointInPath(reply_btn, event.offsetX, event.offsetY)) {
        log('Topic: ' + messageTopics[topicIndex].topic);
        log('Message:' + messageTopics[topicIndex].messages[i].message);
        let ts = dayjs
          .unix(messageTopics[topicIndex].messages[i].timestamp)
          .format(); //more format options at https://day.js.org/docs/en/display/format
        //let ts = new Date(messageTopics[topicIndex].messages[i].timestamp).toLocaleTimeString();
        log('Timestamp: ' + ts);
        log('Unix: ' + messageTopics[topicIndex].messages[i].timestamp);
		//opens modal
        setModalState('comment', {
          topicId: topicIndex,
          replyId: messageTopics[topicIndex].messages[i].messageId,
        });
      }
    });
  });
  this.updateScale = function (scale) {
    this.centerX = tX + (scale * images[0].width) / 2; //WARNING: global reference here (tX)
    this.bubble_w = 300 * window.devicePixelRatio * scale; //fixed width size of 200px
    this.bubbleScale = 1 / (this.img_l.width / this.bubble_w);
    this.bubble_h = 100 * window.devicePixelRatio * scale;//this.img_l.height * this.bubbleScale;
    this.padding = 15 * window.devicePixelRatio * scale;;
    this.maxWidth = this.bubble_w - 2 * this.padding;
    this.btn_w = 60 * window.devicePixelRatio * scale;
    this.btn_h = 20 * window.devicePixelRatio * scale;
    this.tailXoffset = 80 * this.bubbleScale; //anchor offset for the bubble right; left calculated as width-offset
  };
  this.drawBubble = function (
    ctx,
    canvasTxt,
    tX,
    tY,
    txt,
    index,
    scale,
    gTx,
    gTy
  ) {
    //TODO- check pos then draw left or right accordingly
    tY = tY - this.bubble_h/2;
    if (bubbleTx[index] < 8) {
      //tX = tX-(this.bubble_w-this.tailXoffset);
      tX = this.centerX - this.offset * scale - this.bubble_w;
      //ctx.drawImage(this.img_l, tX, tY, this.bubble_w, this.bubble_h);
    } else {
      //tX = tX-this.tailXoffset;
      tX = this.centerX + this.offset * scale;
      //ctx.drawImage(this.img_r, tX, tY, this.bubble_w, this.bubble_h);
    }
    

    btnPaths[index] = new Path2D();
    btnPaths[index].rect(
      tX, //+ this.bubble_w - this.btn_w - 1,
      tY, //+ 500 * this.bubbleScale - this.btn_h,
      this.bubble_w, //this.btn_w,
      this.bubble_h //this.btn_h
    );
	ctx.lineJoin = 'bevel';
	ctx.lineWidth = 2 * window.devicePixelRatio * scale;
	ctx.strokeStyle = this.topicColors[topicIndex].bg;
	// ctx.fillStyle = 'grey';
    ctx.stroke(btnPaths[index]);
	
    // canvasTxt.fontSize = 10 * window.devicePixelRatio * scale;
    // ctx.fillStyle = 'white';
    // canvasTxt.drawText(
      // ctx,
      // 'Reply',
      // tX + this.bubble_w - this.btn_w - 1,
      // tY + 500 * this.bubbleScale - this.btn_h,
      // this.btn_w,
      // this.btn_h
    // );
	
	canvasTxt.fontSize = 12 * window.devicePixelRatio * scale;
    ctx.fillStyle = 'white';
    canvasTxt.drawText(
      ctx,
      txt,
      this.padding + tX,
      tY,
      this.maxWidth,
      this.bubble_h - 2 * this.padding
    );
  };
  this.draw = function (ctx, canvasTxt, parcelSys, tX, tY) {
    if (!showMessages) return;
    let r_w = parcelSys.r_w * parcelSys.scale;
    let r_h = parcelSys.r_h * parcelSys.scale;
    let offset_x = parcelSys.offset_x * parcelSys.scale + tX + r_w / 2;
    let offset_y = parcelSys.offset_y * parcelSys.scale + tY + r_h / 2;
    let dy = (parcelSys.r_h + parcelSys.dy) * parcelSys.scale;
    for (let i = 0; i < txtData.length; i++) {
      let tXi = bubbleTx[i] * r_w + offset_x;
      let tYi = bubbleTy[i] * dy + offset_y;
      this.drawBubble(
        ctx,
        canvasTxt,
        tXi,
        tYi,
        txtData[i],
        i,
        parcelSys.scale,
        tX,
        tY
      );
    }
  };
};

function scaleToScreenSize() {
  ww = window.innerWidth;
  wh = window.innerHeight;
  canvas.setAttribute('width', '100%');
  canvas.setAttribute('height', '100%');
  // ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  canvas.width = ww;
  canvas.height = wh;
  if (wh < 600) $('.modal_container').css('height', '100%');
  else $('.modal_container').css('height', '95%');
  log(window.devicePixelRatio);
}
function buildingZoom(dz) {
  dolly_y = 0;
  zoom += dz;
  // Restrict scale
  zoom = Math.min(Math.max(1, zoom), 5);
  // if (zoom > 1.15) building.image = images[3];	//mipmapping- unused
  // else building.image = images[0];
}
function toggleMessages(checkboxId) {
  if (document.getElementById(checkboxId).checked) showMessages = true;
  else showMessages = false;
}
function toggleOccupants(checkboxId) {
  if (document.getElementById(checkboxId).checked) showOccupants = true;
  else showOccupants = false;
}
function toggleSharedSpaces(checkboxId) {
  if (document.getElementById(checkboxId).checked) showSharedSpaces = true;
  else showSharedSpaces = false;
}
function toggleUnitParcel(checkboxId) {
  if (document.getElementById(checkboxId).checked) showUnitParcel = true;
  else showUnitParcel = false;
}

const rightSidebarSize = 260;
const navButtonOffset = 50;
function navSetEnabled(enabled = true) {
  if (enabled) {
    document.getElementById('right-sidebar').style.right = '0';
    document.getElementById('nav_controls').style.right =
      rightSidebarSize + 10 + 'px';
  } else {
    document.getElementById('right-sidebar').style.right =
      -rightSidebarSize + 'px';
    document.getElementById('nav_controls').style.right = '10px';
  }
}
function toggleMenu(menuButtonId, forceState = null) {
  let menuButton = document.getElementById(menuButtonId);
  if (forceState != null) {
    if (forceState == 'close') {
      menuButton.href = '#closed';
      menuButton.children[0].style.transform = 'rotate(0deg)';
      navSetEnabled(false);
    } else {
      menuButton.href = '#open';
      menuButton.children[0].style.transform = 'rotate(180deg)';
      navSetEnabled(true);
    }
  } else {
    if (menuButton.getAttribute('href') == '#open') {
      menuButton.href = '#closed';
      menuButton.children[0].style.transform = 'rotate(0deg)';
      navSetEnabled(false);
    } else {
      menuButton.href = '#open';
      menuButton.children[0].style.transform = 'rotate(180deg)';
      navSetEnabled(true);
    }
  }
}

let canvas = document.getElementById('vis');
let ctx = canvas.getContext('2d');
let canvasTxt = window.canvasTxt.default;
let building;
//	offsetX,offsetY,rW,rH,dy
let parcelSys = new ParcelSys(1402, 403, 54, 41.1, 4);
let bubbleSys;
let zoom = 1;
let dolly_y = 0;
let ww = window.innerWidth;
let wh = window.innerHeight;
function start() {
  if (!loaded) setTimeout(start, 500);
  else {
    //hide loading screen
    scaleToScreenSize();
    building = new BuildingBackground();
    bubbleSys = new BubbleSys(ctx, canvas, 400);
    pullParcelation();
    pullMessages();
    bubbleSys.nextTopic(parcelSys.units);
    draw();
    let toggle = true;

    setInterval(function () {
	  bubbleSys.posSwitch=!bubbleSys.posSwitch;
      bubbleSys.nextTopic(parcelSys.units);
    }, 8000);

    setInterval(function () {
      pullParcelation();
      pullMessages();
    }, 2000);

    document.getElementById('gmt').innerHTML = dayjs()
      .utc()
      .local()
      .format('Z');
    setInterval(function () {
      document.getElementById(
        'utcTime'
      ).innerHTML = dayjs().utc().local().format('HH:mm:ss');
    }, 1000);
  }
}

let scale;
let tX;
let tY;
let showUnitParcel = true;
function draw() {
  ctx.fillStyle = '#E90006';
  ctx.fillRect(0, 0, ww, wh);

  //scale and center according to 80% height of screen
  //building background

  scale = (1 / (images[0].height / wh)) * zoom; //scale w/ respect to screen size
  tX = ww / 2 - (images[0].width * scale) / 2; //x translation to center image
  tY = wh / 2 - ((images[0].height + dolly_y) * scale) / 2; //y translation to center image

  building.draw(ctx, tX, tY, scale);
  if (showUnitParcel) parcelSys.draw(ctx, tX, tY, scale);
  building.drawFg(ctx, tX, tY, scale);
  bubbleSys.updateScale(scale);
  bubbleSys.draw(ctx, canvasTxt, parcelSys, tX, tY);

  window.requestAnimationFrame(draw);
}

// ---------event listener functions------
let isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

window.onresize = function onWindowResize() {
  if (!isMobile.any()) {
    //log("window resized");
    scaleToScreenSize();
    //log(window.devicePixelRatio);
    //draw();
    toggleMenu('menu_button', 'open');
    //document.getElementById('right-sidebar').style.left = (ww-rightSidebarSize)+"px";
    //document.getElementById('nav_controls').style.left = (ww-rightSidebarSize-navButtonOffset)+"px";
  }
};

function scrollEvent() {
  //log("tY: "+tY);
  if (event.deltaY < 0) {
    log('scroll up');
    // scrolling up moves building down the canvas
    //if ((tY+(images[0].height+100)*scale) <= wh)
    if (tY + 100 * scale <= 0) dolly_y -= 100;
  } else {
    log('scroll down');
    // scrolling down moves building up the canvas
    if (tY + (images[0].height - 100) * scale >= wh) dolly_y += 100;
  }
}
//document.getElementById('vis-container').onscroll = function(event) { scrollEvent(event); };
document.getElementById('vis-container').onwheel = function (event) {
  //event.preventDefault();
  scrollEvent(event);
};
