const HEART_LINK = "https://www.youtube.com/@brokenplaysevil";

const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const volumeBtn = document.getElementById("volumeBtn");
const volumeIcon = document.getElementById("volumeIcon");
const volumePanel = document.getElementById("volumePanel");
const volumeSlider = document.getElementById("volumeSlider");
const heartBtn = document.getElementById("heartBtn");

heartBtn.href = HEART_LINK;

let player;
let isPlaying = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    events: {
      onReady: () => {
        player.setVolume(70);
      }
    }
  });
}

// PLAY / PAUSE
playBtn.addEventListener("click", () => {
  if (!player) return;

  const state = player.getPlayerState();

  if (state !== YT.PlayerState.PLAYING) {
    player.playVideo();
    isPlaying = true;
  } else {
    player.pauseVideo();
    isPlaying = false;
  }

  updatePlayIcon();
});

// VOLUME
volumeSlider.addEventListener("input", (e) => {
  if (!player) return;

  const vol = Math.round(e.target.value * 100);
  player.setVolume(vol);

  if (vol === 0) {
    player.mute();
  } else {
    player.unMute();
  }

  updateVolumeIcon();
});

volumeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  volumePanel.classList.toggle("show");
});

document.addEventListener("click", () => {
  volumePanel.classList.remove("show");
});

function updatePlayIcon() {
  playIcon.src = isPlaying ? "assets/pause.png" : "assets/play.png";
}

function updateVolumeIcon() {
  if (!player) return;

  const vol = player.isMuted() ? 0 : player.getVolume();
  volumeIcon.src =
    vol <= 1 ? "assets/volume-mute.png" : "assets/volume.png";
}
