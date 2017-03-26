function Opponent(heroclass,hp,armor,minions) {
	this.heroclass = heroclass;
	this.hp = hp;
	this.armor = armor;
	this.minions = minions;
	this.heropower = 'unused';
	this.mana = 10;
	this.frozen = false;
}

Opponent.prototype.restart = function() {
	this.heroclass = 
	this.hp = 30;
	this.armor = 0;
	this.minions = [];
	this.mana = 10;
	this.frozen = false;
}

var opo = new Opponent('warrior',30,0,[]);

var Player = {
	class: '',
	hp: 1,
	armor: 0,
	atk: 0,
	heropower: 'used',
	mana: 10,
	minions: [],
	hand: [],
	bonusDamage: 0
}

// ---- CARDS ----
// Fireball (4 - 1)
// Roaring Torch (3 - 1)
// Frostbolt (2 - 1)
// Ice Lance (1 - 1) x2
// Evolved Kobold (4 - 1)
// ----------------- 33 (9)

// Lightning Bolt (1 - 1) x2
// Lava Shock (2 - 1) x2
// Lava Burst (3 - 1) x2
// Evolved Kobold (4-1) 
// ----------------- 32 (9)

// Malygos (9 - 1)
// Moonfire (0) x2
// Living Roots (1) x2
// Kobold Geomancer (2)
// ----------------- 30 (10)

// Raging Worgen (3 - 1)
// Faceless Manipulator (5 - 1)
// Inner Rage (0)
// Charge (3 - 1)
// Rampage (2)
// ----------------- 44 (10)

// 

// FREEEZE

function Fireball(){
	this.manacost = 3;
	this.spelldamage = 6;
	this.name = 'fireball';
}

Fireball.prototype.play = function(){
	if (Player.mana >= this.manacost)
		Player.mana -= this.manacost
	else
		return;
	if (opo.hp >= this.spelldamage + Player.bonusDamage)
		opo.hp -= this.spelldamage + Player.bonusDamage;
	else
		opo.hp = 0;
}

function Torch(){
	this.manacost = 2;
	this.spelldamage = 6;
	this.name = 'roaringtorch';
}

Torch.prototype.play = function(){
	if (Player.mana >= this.manacost)
		Player.mana -= this.manacost
	else
		return;
	if (opo.hp >= this.spelldamage + Player.bonusDamage)
		opo.hp -= this.spelldamage + Player.bonusDamage;
	else
		opo.hp = 0;
}

function Frostbolt(){
	this.manacost = 1;
	this.spelldamage =3;
	this.name = 'frostbolt';
}

Frostbolt.prototype.play = function() {
	//console.log('playing Frostbolt');
	if (Player.mana >= this.manacost)
		Player.mana -= this.manacost
	else{
		//console.log("can't play card")
		return;
	}
	if (opo.hp >= this.spelldamage + Player.bonusDamage)
		opo.hp -= this.spelldamage + Player.bonusDamage;
	else
		opo.hp = 0;
	opo.frozen = true;
}

function Icelance(){
	this.manacost = 0;
	this.spelldamage = 4;
	this.name = 'icelance';
}

Icelance.prototype.play = function() {
	//console.log(this.manacost);
	if (opo.frozen) {
	if (opo.hp >= this.spelldamage + Player.bonusDamage)
		opo.hp -= this.spelldamage + Player.bonusDamage;
	else
		opo.hp = 0;
	}
	else 
		opo.frozen = true;
}

function EKobold(){
	this.manacost = 3;
	this.attack = 2;
	this.health = 2;
	this.name = 'evolvedkobold';
}

EKobold.prototype.play = function() {
	if (Player.mana >= this.manacost)
		Player.mana -= this.manacost
	else
		return;
	
	Player.minions.push(this);
	var mini = new Image(78,100)
	mini.src = 'IMAGES/MINIONS/' + this.name + '.png';
	PlayFrame.minions.appendChild(mini);
	
	Player.bonusDamage = 2;
}

// SPELL SHAMAN

function LightningBolt(){
	this.manacost = 0;
	this.spelldamage = 3;
	this.name = 'lightningbolt';
}

LightningBolt.prototype.play = function(){
	if (Player.mana >= this.manacost)
		Player.mana -= this.manacost
	else
		return;
	if (opo.hp >= this.spelldamage + Player.bonusDamage)
		opo.hp -= this.spelldamage + Player.bonusDamage;
	else
		opo.hp = 0;
}

function LavaShock(){
	this.manacost = 1;
	this.spelldamage = 2;
	this.name = 'lavashock';
}

LavaShock.prototype.play = function(){
	if (Player.mana >= this.manacost)
		Player.mana -= this.manacost
	else
		return;
	if (opo.hp >= this.spelldamage + Player.bonusDamage)
		opo.hp -= this.spelldamage + Player.bonusDamage;
	else
		opo.hp = 0;
}

function LavaBurst(){
	this.manacost = 2;
	this.spelldamage = 5;
	this.name = 'lavaburst';
}

LavaBurst.prototype.play = function(){
	if (Player.mana >= this.manacost)
		Player.mana -= this.manacost
	else
		return;
	if (opo.hp >= this.spelldamage + Player.bonusDamage)
		opo.hp -= this.spelldamage + Player.bonusDamage;
	else
		opo.hp = 0;
}

// MALYGOS

function Malygos (){
	this.manacost = 8;
	this.attack = 4;
	this.health = 12;
	this.name = 'malygos';
}

Malygos.prototype.play = function(){
	if (Player.mana >= this.manacost)
		Player.mana -= this.manacost
	else
		return;
	
	Player.minions.push(this);
	var mini = new Image(78,100)
	mini.src = 'IMAGES/MINIONS/' + this.name + '.png';
	PlayFrame.minions.appendChild(mini);
	
	Player.bonusDamage += 5;
}

function Kobold (){
	this.manacost = 2;
	this.attack = 1;
	this.health = 1;
	this.name = 'koboldgeomancer';
}

Kobold.prototype.play = function(){
	if (Player.mana >= this.manacost)
		Player.mana -= this.manacost
	else
		return;
	
	Player.minions.push(this);
	var mini = new Image(78,100)
	mini.src = 'IMAGES/MINIONS/' + this.name + '.png';
	PlayFrame.minions.appendChild(mini);
	
	Player.bonusDamage += 1;
}

function LivingRoots(){
	this.manacost = 0;
	this.spelldamage = 2;
	this.name = 'livingroots';
}

LivingRoots.prototype.play = function(){
	if (Player.mana >= this.manacost)
		Player.mana -= this.manacost
	else
		return;
	if (opo.hp >= this.spelldamage + Player.bonusDamage)
		opo.hp -= this.spelldamage + Player.bonusDamage;
	else
		opo.hp = 0;
}

function Moonfire(){
	this.manacost = 0;
	this.spelldamage = 1;
	this.name = 'moonfire';
}

Moonfire.prototype.play = function(){
	if (Player.mana >= this.manacost)
		Player.mana -= this.manacost
	else
		return;
	if (opo.hp >= this.spelldamage + Player.bonusDamage)
		opo.hp -= this.spelldamage + Player.bonusDamage;
	else
		opo.hp = 0;
}

// RAGING Worgen

function RWorgen(){
	this.manacost = 2;
	this.attack = 3;
	this.health = 3;
	this.name = 'rworgen';
	this.charge = false;
	this.windfury = false;
	this.damaged = false;
}

RWorgen.prototype.play = function (){
	if (Player.mana >= this.manacost)
		Player.mana -= this.manacost
	else
		return;
	
	Player.minions.push(this);
	var mini = new Image(78,100)
	mini.src = 'IMAGES/MINIONS/' + this.name + '.png';
	mini.addEventListener('click',this.goIn());
	PlayFrame.minions.appendChild(mini);
}

var controlWorgen;

RWorgen.prototype.enrage = function(){
	this.attack += 1;
	this.windfury = true;
	this.enrage = undefined;
}

RWorgen.prototype.goIn = function(){
	if (!this.charge)
		return;
	if (opo.hp >= this.attack)
		opo.hp -= this.attack;
	else
		opo.hp = 0;
	if (!this.windfury)
		this.goIn = function(){};
	else
		this.windfury = false;
}

function IRage(){
	this.manacost = 0;
	this.spelldamage = 1;
	this.target = null;
	this.name = 'irage';
}

IRage.prototype.play = function (){
	if (Player.mana >= this.manacost)
		Player.mana -= this.manacost
	else
		return;
	this.target = Player.minions[0];
	console.log(this.target)
	if (!this.target.damaged)
		this.target.enrage();
	this.target.attack += 2;
	this.target.health -= 1;
	this.target.damaged = true;
	controlWorgen = this.target;
}

function Charge(){
	this.manacost = 2;
	this.target = null;
	this.name = 'charge';
}

Charge.prototype.play = function(){
	if (Player.mana >= this.manacost)
		Player.mana -= this.manacost
	else
		return;
	this.target = Player.minions[0];
	this.target.charge = true;
	this.target.attack += 2;
	controlWorgen = this.target;
}

function Rampage(){
	this.manacost = 1;
	this.target = null;
	this.name = 'rampage';
}

Rampage.prototype.play = function(){
	if (Player.mana >= this.manacost)
		Player.mana -= this.manacost
	else
		return;
	this.target = Player.minions[0];
	if (this.target.damaged){
		this.target.attack += 3;
		this.target.health += 3;
	}
	controlWorgen = this.target;
}

function Faceless(){
	this.manacost = 4;
	this.attack = 3;
	this.health = 3;
	this.name = 'faceless';
	this.charge = false;
	this.windfury = false;
	this.damaged = false;
	this.target = undefined;
}

Faceless.prototype.play = function(){
	if (Player.mana >= this.manacost)
		Player.mana -= this.manacost
	else
		return;
	this.target = Player.minions[0];
	Player.minions.push(this.target);
	var mini = new Image(78,100)
	mini.src = 'IMAGES/MINIONS/' + this.target.name + '.png';
	PlayFrame.minions.appendChild(mini);
	PlayFrame.minions.childNodes[0].addEventListener('click',this.target.goIn);
}

// DOM Elements

function OpponentFrames() {
	this.portrait = document.getElementsByClassName('enemy portrait')[0];
	this.hp = document.getElementsByClassName('enemy health')[0];
	this.armor = document.getElementsByClassName('enemy armor')[0];
	this.atk = document.getElementsByClassName('enemy attack')[0];
	this.heropower = document.getElementsByClassName('enemy heropower')[0];
	this.mana = document.getElementsByClassName('enemy mana')[0];
	this.minions = document.getElementsByClassName('enemy minionzone')[0];
};

OpponentFrames.prototype.updateHP = function (){
	this.hp.innerHTML = '';
	this.hp.appendChild(document.createTextNode(opo.hp));
	if (opo.hp < 30)
		this.hp.style.color = 'red';
	else
		this.hp.style.color = 'white';
	if (opo.frozen && this.portrait.innerHTML == ''){
		var frz = new Image(80,90);
		frz.src = 'IMAGES/frozen.png';
		frz.style.top = '30';
		this.portrait.appendChild(frz);
	}
}

OpponentFrames.prototype.init = function(){
	opo.restart();
	this.portrait.innerHTML = '';
	this.portrait.style.backgroundImage = "url('IMAGES/warrior.png')";
	this.hp.style.color = 'white';
	this.hp.innerHTML = '';
	this.hp.appendChild(document.createTextNode(opo.hp));
	
	this.armor.style.visibility = 'hidden';
	this.atk.style.visibility = 'hidden';
	
	this.minions.innerHTML = '';
	
}

OpFrame = new OpponentFrames();

function PlayerFrame(){
	this.portrait = document.getElementsByClassName('self portrait')[0];
	this.hp = document.getElementsByClassName('self health')[0];
	this.armor = document.getElementsByClassName('self armor')[0];
	this.atk = document.getElementsByClassName('self attack')[0];
	this.heropower = document.getElementsByClassName('self heropower')[0];
	this.mana = document.getElementsByClassName('self mana')[0];
	this.crystals = document.getElementsByClassName('manadiv')[0];
	this.minions = document.getElementsByClassName('self minionzone')[0];
	this.hand = document.getElementsByClassName('hand')[0];
	this.playZone = document.getElementsByClassName('submit')[0];
};

PlayerFrame.prototype.refresh = function(){
	this.portrait = document.getElementsByClassName('self portrait')[0];
	this.hp = document.getElementsByClassName('self health')[0];
	this.armor = document.getElementsByClassName('self armor')[0];
	this.atk = document.getElementsByClassName('self attack')[0];
	this.heropower = document.getElementsByClassName('self heropower')[0];
	this.mana = document.getElementsByClassName('self mana')[0];
	this.minions = document.getElementsByClassName('self minionzone')[0];
	this.hand = document.getElementsByClassName('hand')[0];
	this.playZone = document.getElementsByClassName('submit')[0];
}

PlayFrame = new PlayerFrame();