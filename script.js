const CHANNEL_ID = "UCaggKtTEj2YdaToJjCV9vQw";
const HEART_LINK = "https://www.vk.com/casillerorpg";

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

// cria player com LIVE do canal
function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    videoId: "",

    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
    },

    events: {
      onReady: () => {
        // carrega live do canal automaticamente
        player.loadVideoByUrl(
          `https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}`
        );
      },
    },
  });
}

// play
playBtn.addEventListener("click", () => {
  if (!player) return;

  if (!isPlaying) {
    player.playVideo();
    isPlaying = true;
  } else {
    player.pauseVideo();
    isPlaying = false;
  }

  updatePlayIcon();
});

// volume
volumeSlider.addEventListener("input", (e) => {
  const vol = e.target.value * 100;
  if (player) player.setVolume(vol);
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

  const vol = player.getVolume();
  volumeIcon.src =
    vol <= 1 ? "assets/volume-mute.png" : "assets/volume.png";
}
