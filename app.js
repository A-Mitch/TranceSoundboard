// Append my sounds to the webpage
const soundsElement = document.querySelector('#sounds');

(async () => {
  // Get the sounds when the page loads and add them to the page.
  const sounds = await getSounds();
  addSoundsToPage(sounds);
})();




// 1. Get the sounds
async function getSounds() {

	const response = await fetch('./sounds.json');
	const json = await response.json();
	return json
}


// 2. Add the sounds to the page after getting them (1.).
function addSoundsToPage(sounds) {

	const players = [];

	sounds.forEach(sound => {
		const soundDiv = document.createElement('div');
		soundDiv.className = 'sound';

		// Append h2 --> div, then div --> page
		const soundTitle = document.createElement('h2');
		soundTitle.textContent = sound.title;
		soundDiv.appendChild(soundTitle);

		// This gets the actual sound and applies it to the cell with the same name
		const player = document.createElement('audio');
		player.setAttribute('src', `sounds/${sound.src}`);
		soundDiv.appendChild(player);
		players.push({player, soundDiv});

		// This will play the sound when the button is clicked
		soundDiv.addEventListener('mousedown', () => {
			soundDiv.style.background = '#284B63';
			// This will allow me to start the sound over if clicked more than once
			player.currentTime = 0;
			player.play();
		});

		soundDiv.addEventListener('mouseup', () => {
			soundDiv.style.background = '';
		});

		soundsElement.appendChild(soundDiv);
	});

	document.querySelector('#stopButton').addEventListener('click',stopAllSounds);

	// Stores my key codes for my key mapping
	const keyCodes = {
		65: 0,
 		83: 1,
 		68: 2,
 		70: 3,
 		71: 4,
 		72: 5,
 		74: 6,
 		75: 7,
 		76: 8,
 		90: 9,
 		88: 10,
 		67: 11
	}

	
	// Key mapping (keycode: index in array)
	document.addEventListener('keydown', (event) => {
		const playerIndex = keyCodes[event.keyCode];
		const playerAndDiv = players[playerIndex];

		if(playerAndDiv){
			playerAndDiv.soundDiv.style.background = '#284B63';
			playerAndDiv.player.currentTime = 0;
			playerAndDiv.player.play();
		}
	});

	document.addEventListener('keyup', (event) => {
		const playerIndex = keyCodes[event.keyCode];
		const playerAndDiv = players[playerIndex];

		if(playerAndDiv){
			playerAndDiv.soundDiv.style.background = '';
		}
	});

	// Stops all the sounds
	function stopAllSounds() {
		players.forEach(({player})=> {
			player.pause();
		});
	}
}