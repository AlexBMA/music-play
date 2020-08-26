const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seveb Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Seveb Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];

let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

let currentSong = 0;

function prevSong() {
  currentSong === 0 ? (currentSong = songs.length - 1) : currentSong--;
  updatePlayer();
}

function nextSong() {
  currentSong === songs.length - 1 ? (currentSong = 0) : currentSong++;
  updatePlayer();
}

function updatePlayer() {
  pauseSong();
  loadSong(songs[currentSong]);
  playSong();
}

loadSong(songs[currentSong]);

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    setProgressBarHtmlElement(currentTime, duration);
    calculateDuration(duration);
    calulateCurrentTime(currentTime);
  }
}

function setProgressBarHtmlElement(currentTime, duration) {
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function calculateDuration(duration) {
  const durationMinutes = Math.floor(duration / 60);
  let durationSecounds = Math.floor(duration % 60);
  if (durationSecounds < 10) durationSecounds = '0' + durationSecounds;
  if (durationSecounds) {
    durationEl.textContent = `${durationMinutes}:${durationSecounds}`;
  }
}

function calulateCurrentTime(currentTime) {
  const currentMinutes = Math.floor(currentTime / 60);
  let currentSecounds = Math.floor(currentTime % 60);
  if (currentSecounds < 10) currentSecounds = '0' + currentSecounds;
  if (currentSecounds) {
    currentTimeEl.textContent = `${currentMinutes}:${currentSecounds}`;
  }
}

function setProgressBar(e) {
  const width = e.srcElement.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
