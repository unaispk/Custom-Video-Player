let playBtn = document.getElementById("play-btn");
let video = document.querySelector(".video");
let progressBar = document.querySelector(".progress-bar");

let isVideoPlaying = false;


// Lets play or pause the video
function playOrPauseVideo() {
    if (!isVideoPlaying) {
        video.play();
        isVideoPlaying = true;
        playBtn.classList.replace("fa-play", "fa-pause");
    } else {
        video.pause();
        isVideoPlaying = false;
        playBtn.classList.replace("fa-pause", "fa-play");
    }
}

// Update Progress bar
function updateProgressbar(event) {
    let width = (event.target.currentTime / event.target.duration) * 100;
    progressBar.style.cssText = `width:${width}%`;
}
// Space button for play and pause
function spaceBtnControl(event) {
    if (event.code === "Space") {
        playOrPauseVideo();
    }
}

// Add event lisners
playBtn.addEventListener("click", playOrPauseVideo);
video.addEventListener("click", playOrPauseVideo);
document.addEventListener("keyup", spaceBtnControl);

// document.addEventListener("keyup",  event => {
//     if (event.code === "Space") {
//         playOrPauseVideo();
//     }
// })

video.addEventListener("timeupdate", updateProgressbar)