const TWITCH_CHANNEL = "radiocasillero";
const HEART_LINK = "https://vk.com/casillerorpg";

const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const volumeBtn = document.getElementById("volumeBtn");
const volumeIcon = document.getElementById("volumeIcon");
const volumePanel = document.getElementById("volumePanel");
const volumeSlider = document.getElementById("volumeSlider");
const heartBtn = document.getElementById("heartBtn");

heartBtn.href = HEART_LINK;

let player = null;
let isReady = false;
let isPlaying = false;
let volume = 0.7;

const parentHost = window.location.hostname;

player = new Twitch.Player("twitch-player", {
  width: 400,
  height: 300,
  channel: TWITCH_CHANNEL,
  parent: [parentHost],
  muted: true,
  controls: true,
  autoplay: false,
});

player.addEventListener(Twitch.Player.READY, () => {
  isReady = true;

  try {
    player.setVolume(volume);
  } catch (error) {
    console.error("Erro ao definir volume inicial:", error);
  }
});

function updatePlayIcon() {
  playIcon.src = isPlaying ? "assets/pause.png" : "assets/play.png";
}

function updateVolumeIcon() {
  volumeIcon.src =
    volume <= 0.01 ? "assets/volume-mute.png" : "assets/volume.png";
}

async function startRadio() {
  if (!isReady) return;

  try {
    player.setMuted(true);
    player.play();

    setTimeout(() => {
      try {
        player.setVolume(volume);
        player.setMuted(false);
      } catch (error) {
        console.error("Erro ao liberar áudio:", error);
      }
    }, 300);

    isPlaying = true;
    updatePlayIcon();
  } catch (error) {
    console.error("Não foi possível iniciar a rádio:", error);
  }
}

function pauseRadio() {
  if (!isReady) return;

  try {
    player.pause();
    isPlaying = false;
    updatePlayIcon();
  } catch (error) {
    console.error("Não foi possível pausar a rádio:", error);
  }
}

playBtn.addEventListener("click", async () => {
  if (!isPlaying) {
    await startRadio();
  } else {
    pauseRadio();
  }
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
  volume = Number(event.target.value);
  updateVolumeIcon();

  if (!isReady) return;

  try {
    player.setVolume(volume);

    if (volume <= 0.01) {
      player.setMuted(true);
    } else {
      player.setMuted(false);
    }
  } catch (error) {
    console.error("Erro ao ajustar volume:", error);
  }
});

updatePlayIcon();
updateVolumeIcon();
