const audio = document.getElementById('valkyries'); // or your audio element's ID

const sounds = {
  cheer: new Audio('cheer.mp3'),
};

function playMusicAndReveal(speed, totalReveals, revealCallback) {
  const duration = (speed * totalReveals) / 1000; // seconds
  const revealInterval = speed / 1000; // seconds

  audio.volume = 1.0;
  audio.play();

  for (let i = 0; i < totalReveals; i++) {
    setTimeout(() => {
      if (typeof revealCallback === 'function') {
        revealCallback(i); // reveal step i
      }
    }, i * speed);
  }

  // Fade out music at the end, and play cheer sound 1s after fade starts
  setTimeout(() => fadeOutAudio(audio, sounds.cheer), totalReveals * speed - 2000); // start fade 2s before end
}

// Fade out, trigger cheer after 1 second
function fadeOutAudio(audio, cheerSound) {
  // Play cheer sound 1 second after fade starts
  if (cheerSound) setTimeout(() => cheerSound.play(), 1000);

  const fadeTime = 7.0; // seconds
  const fadeSteps = 70;
  let step = 0;
  let fadeInterval = setInterval(() => {
    step++;
    audio.volume = Math.max(0, 1 - step / fadeSteps);
    if (step >= fadeSteps) {
      clearInterval(fadeInterval);
      audio.pause();
      audio.currentTime = 0;
    }
  }, fadeTime * 1000 / fadeSteps);
}