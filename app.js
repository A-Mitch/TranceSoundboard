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
	sounds.forEach(sound => {
		const soundDiv = document.createElement('div');
		soundDiv.className = 'sound';

		// Append h2 --> div, then div --> page
		const soundTitle = document.createElement('h2');
		soundTitle.textContent = sound.title;
		soundDiv.appendChild(soundTitle);

		// This creates my button and applies it to each sound
		const playButton = document.createElement('button');
		playButton.textContent = '🌊';
		soundDiv.appendChild(playButton);

		// This gets the actual sound and applies it to the cell with the same name
		const player = document.createElement('audio');
		player.setAttribute('src', `sounds/${sound.src}`);
		soundDiv.appendChild(player);

		// This will play the sound when the button is clicked
		playButton.addEventListener('click', () => {
			// This will allow me to start the sound over if clicked more than once
			player.currentTime = 0;
			player.play();
		});

		soundsElement.appendChild(soundDiv);
	});
}