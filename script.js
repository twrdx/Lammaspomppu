lammaslista = [];
pisteet = 0;
hearts = 5;

function preload() {
  taustakuva = loadImage('parallax-mountain.png');
  lammaskuva = loadImage('shep.png');
}

function setup() {
  createCanvas(600, 330);
  //huomaa näytön koko ennenkuin vaihdetaan tätä!!
  luo_lampaita();
  textSize(28);
}

function draw() {
  background(taustakuva);
  liikuta_lauttaa();
	fill("white");
	stroke("#653656");
	textSize(18);
  text("Points: "+ pisteet, 10, 30);
  text("Hearts: " + hearts, 10, 60);

  lammaslista.forEach(function(lammasolio,monesko){
    lammasolio.liikuta();

    if(lammasolio.X > 600){
      lammaslista.splice(monesko,1);
      pisteet = pisteet + 1
    }

    if(lammasolio.Y > 330){
      lammaslista.splice(monesko,1);
      hearts = hearts -1
    }

		if(hearts < 0){
			fill("white");
			stroke("#653656");
			textSize(64);
			textAlign(CENTER);
  		text("GAME OVER!!", 300, 120);
			textSize(26);
			text("Points: "+ pisteet, 300, 180);
			noLoop();

		}

  });
}

function liikuta_lauttaa(){
  fill("#d47984");
  stroke("#653656");
  rect(mouseX, 310, 100, 20, 20, 20, 0, 0);
}

function luo_lampaita(){
   var uusi_lammas = new Lammas();
   lammaslista.unshift(uusi_lammas);
   setTimeout(luo_lampaita,2000);
}

class Lammas{
   constructor(){
     this.X = 0;
     this.Y = 125;
     this.Xnopeus = random(1, 2);
     this.Ynopeus = random(-1, -2);
     this.korkeus = 20;
     this.leveys = 30;
     }

     piirra(){
        image(lammaskuva, this.X , this.Y, this.leveys,this.korkeus );
     }

     liikuta(){
       //Tämä liikuttaa lintua vaakasuoraan
       this.X = this.X + this.Xnopeus;

       //Tämä Liikuttaa painovoiman verran lintua alaspäin
       this.Ynopeus = this.Ynopeus + 0.04;

       //Tämä tarkistaa osutaanko lauttaan
       if(this.X + this.leveys > mouseX && this.X < mouseX + 100){
           if(this.Y + this.korkeus > 310 && this.Y < 310){
               //Tämä muuttaa linnun suunnan ylöspäin
               this.Ynopeus = -abs(this.Ynopeus)
           }
       }

       //Tämä todella liikuttaa vasta lintua
       this.Y = this.Y + this.Ynopeus;

       this.piirra();
     }
}