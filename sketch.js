// design by myself
// 2024.11.05 version

let font; // 載入字型文字。
let points = []; // 轉乘點狀文字。
let ita = 0; // 初始化角度數值。

function preload(){ // 先執行此函數載入字型。
  // 載入 fonts/JasonHandwriting3.ttf 字型檔案。
  font = loadFont("fonts/JasonHandwriting3.ttf");
}

function setup(){ 
  createCanvas(windowWidth, windowHeight); // 創建一符合螢幕尺寸之畫布。
  rectMode(CENTER); // 切換rect之起始點模式，改為以中心為基準。
  points = font.textToPoints("Rinka ReiRiu", -650, 100, 350, {
    sampleFactor:0.1
  })
  angleMode(DEGREES); // 角度單位設為度。
  translate(0,0); // 改變原點至最初始位置。
}

function draw(){
  background("#170033"); // 每幀將畫面全部塗成顏色#170033。
  noFill(); // 下列不需要填色。
  // 在 y < height 的條件下，y從0做等差，公差為100。
  for(let y = 0; y < height; y += 100){ 
    // 在 x < width 的條件下，x從0做等差，公差為100。
    for(let x = 0; x < width; x += 100){
      // 設定圓顏色及尺寸。
      strokeWeight(mouseX%2+1); // 設定框線顏色。
      stroke(128, 213, 226+mouseX%50); // 設定框線粗細。
      // 從(50+x,50+y)為圓心，做直徑為226+mouseX%50的圓。
      ellipse(50+x, 50+y, 100+mouseX/6); 
      // 設定正方形顏色及尺寸。
      strokeWeight(1);
      stroke(0, 120+mouseY%50, 204+mouseX/3);
      // 從(25+x,50+y)為中心點，做邊長為204+mouseX/3的正方形。
      rect(25+x, 50+y, 50+mouseY/6);
      // 設定三角形顏色及尺寸。
      strokeWeight(3);
      stroke(mouseX%256-mouseY%256, mouseX%256+mouseY%256, mouseX%256/mouseY%256);
      // 將(0+x,100+y)(50+x,0+y)(100+x,100+y)三點連線，形成三角形。
      triangle(0+x, 100+y, 50+x, 0+y, 100+x, 100+y);
      stroke(mouseY%256-mouseX%256, mouseX%256+mouseY%256, mouseX/5+mouseY/3);
      triangle(0+x, 50+y, 50+x, 150+y, 100+x, 50+y);
    }
  }
  translate(width/2, height/2); // 改變原點至螢幕中心。
  for (let i=0; i<points.length-1; i++) {
    stroke(256); // 線條顏色。
    strokeWeight(10); // 線條粗細。
    // 將點化字連線。
    line(
    points[i].x+10*sin(ita+10*i),
    points[i].y+10*sin(ita+10*i),
    points[i+1].x+10*sin(ita+10*i),
    points[i+1].y+10*sin(ita+10*i)
  );
  }
  translate(0, 0); // 改變原點至最初始位置。
  ita = ita+10 // 每運行一次，角度數值增加10單位。
}