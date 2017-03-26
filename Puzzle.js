function setBoard(){
	var board = document.getElementById('board');
	board.style.display = 'none';
}

function setWin(){
	var win = document.getElementById('win');
	win.style.display = 'none';
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function startGame(){
	document.getElementById('login').style.display='none'
	document.getElementById('id01').style.display='none'
	document.getElementById('game').style.display='block';
	document.getElementById('greet').appendChild(document.createTextNode('GREETINGS ' + document.getElementsByName('uname')[0].value.toUpperCase()));
}

function playCard(target){
	var hand = PlayFrame.hand.childNodes
	var pos = 0;
	var nMinions = Player.minions.length;
	//pos = hand.indexOf(target);
	for (j=0;j<hand.length;j++){
		if (hand[j] == target)
			pos = j;
	}
	// Execute play function
	Player.hand[pos].play();
	// Substract mana
	PlayFrame.mana.innerHTML = '';
	PlayFrame.mana.appendChild(document.createTextNode('' + Player.mana + '/10'));
	// Move to Play Zone [DOM]
	PlayFrame.playZone.innerHTML = '';
	PlayFrame.playZone.appendChild(target);
	// Remove from Player Hand (Object)
	Player.hand.splice(pos,1);
	// Update Enemy's HP
	OpFrame.updateHP();
	
	updateManaCrystals();
	// Did we win?
	checkWin();
}

function updateManaCrystals(){
	PlayFrame.crystals.innerHTML = '';
	for (var m = 1; m <= 10; m++){
		var crystal = new Image(18,18)
		if (m <= Player.mana)
			crystal.src = 'IMAGES/crystal-up.png';
		else
			crystal.src = 'IMAGES/crystal-down.png';
		//console.log(crystal);
		//console.log(PlayFrame.crystals);
		PlayFrame.crystals.appendChild(crystal);
	}
}

function generateBoard(){
	Player.mana = 10;
	updateManaCrystals();
	Player.minions = [];
	setWin();
	PlayFrame.refresh();
	Player.bonusDamage = 0;
	PlayFrame.hp.innerHTML = '';
	PlayFrame.hp.appendChild(document.createTextNode('1'));
	PlayFrame.hp.style.color = 'red';
	OpFrame.init();
	var board = document.getElementById('board');
	var hero = document.getElementById('pre').value
	if (hero == ''){
		board.style.display = 'none';
		return;
	}
	board.style.display = 'block';
	PlayFrame.portrait.style.backgroundImage = "url('IMAGES/" + hero + ".png')";
	
	OpFrame.init();
	
	PlayFrame.playZone.innerHTML = '';
	
	PlayFrame.minions.innerHTML = '';
	
	PlayFrame.armor.style.visibility = 'hidden';
	PlayFrame.atk.style.visibility = 'hidden';
	
	PlayFrame.mana.innerHTML = '';
	PlayFrame.mana.appendChild(document.createTextNode('' + Player.mana + '/10'));
	
	PlayFrame.hand.innerHTML = '';
	
	if (hero == 'mage'){
		Player.hand = shuffle([new Icelance(), new Icelance(), new Fireball(),new Torch(), new Frostbolt(), new EKobold()])
		for (i=0;i<Player.hand.length;i++){
			var card = new Image(200,302)
			card.addEventListener('click',function(){playCard(event.target)});
			card.src = 'IMAGES/CARDS/' + Player.hand[i].name + '.png';
			PlayFrame.hand.appendChild(card);
		}
	}
	
	if (hero == 'shaman'){
		Player.hand = shuffle([new LavaShock(), new LightningBolt(), new LavaBurst(), new LavaBurst(), new LavaShock(), new EKobold(), new LightningBolt()])
		for (i=0;i<Player.hand.length;i++){
			var card = new Image(200,302)
			card.addEventListener('click',function(){playCard(event.target)});
			card.src = 'IMAGES/CARDS/' + Player.hand[i].name + '.png';
			PlayFrame.hand.appendChild(card);
		}
	}
	
	if (hero == 'druid'){
		Player.hand = shuffle([new LivingRoots(), new LivingRoots(), new Moonfire(), new Moonfire(), new Kobold(), new Malygos()]);
		for (i=0;i<Player.hand.length;i++){
			var card = new Image(200,302)
			card.addEventListener('click',function(){playCard(event.target)});
			card.src = 'IMAGES/CARDS/' + Player.hand[i].name + '.png';
			PlayFrame.hand.appendChild(card);
		}
	}
	
	if (hero == 'warrior'){
		Player.hand = shuffle([new RWorgen(), new Faceless, new IRage(), new IRage(), new Rampage(), new Charge()]);
		for (i=0;i<Player.hand.length;i++){
			var card = new Image(200,302)
			card.addEventListener('click',function(){playCard(event.target)});
			card.src = 'IMAGES/CARDS/' + Player.hand[i].name + '.png';
			PlayFrame.hand.appendChild(card);
		}
	}
}

function checkWin(){
	console.log("in checkWin");
	if (opo.hp == 0){
		////console.log('YOU WIN');
		setBoard();	
		var win = document.getElementById('win');
		win.style.display = 'block';
	}
	else if ((Player.hand.length == 0) && (opo.hp > 0)) {
		console.log('YOU LOSE')
		setBoard();
		var lose = document.getElementById('lose');
		lose.style.display = 'block';
	}
}