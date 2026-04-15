const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const volumeBtn = document.getElementById("volumeBtn");
const volumeIcon = document.getElementById("volumeIcon");
const volumePanel = document.getElementById("volumePanel");
const volumeSlider = document.getElementById("volumeSlider");

let player = null;
let isPlaying = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    events: {
      onReady: () => {
        player.setVolume(70);
        updateVolumeIcon();
      }
    }
  });
}

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

volumeBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  volumePanel.classList.toggle("show");
});

volumePanel.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.addEventListener("click", () => {
  volumePanel.classList.remove("show");
});

volumeSlider.addEventListener("input", (event) => {
  if (!player) return;

  const vol = Number(event.target.value);
  player.setVolume(vol);

  if (vol <= 0) {
    player.mute();
  } else {
    player.unMute();
  }

  updateVolumeIcon();
});

function updatePlayIcon() {
  playIcon.src = isPlaying ? "assets/pause.png" : "assets/play.png";
}

function updateVolumeIcon() {
  if (!player) return;

  const vol = player.isMuted() ? 0 : player.getVolume();
  volumeIcon.src = vol <= 1 ? "assets/volume-mute.png" : "assets/volume.png";
}
