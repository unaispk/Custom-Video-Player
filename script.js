let playBtn = document.getElementById("play-btn");
let video = document.querySelector(".video");
let progressBar = document.querySelector(".progress-bar");
let progressRange = document.querySelector(".progress-range");
const timeElapsed = document.querySelector('.time-elapsed');
const timeDuration = document.querySelector('.time-duration');

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
    if (event.code === "Space" || event.code === "KeyK") {
        playOrPauseVideo();
    }
}

function updateSeekbar(event) {
    console.log(this);
    let currentPoint = event.offsetX;
    let progressBarWidth = this.clientWidth;
    let currentRange = (currentPoint / progressBarWidth) * video.duration;
    video.currentTime = currentRange;
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

video.addEventListener("timeupdate", updateProgressbar);
progressRange.addEventListener("click", updateSeekbar);




// Function to adjust playback speed
function changePlaybackSpeed(speedChange) {
    // Get the current playback rate
    let currentSpeed = video.playbackRate;

    // Calculate the new playback rate
    let newSpeed = currentSpeed + speedChange;

    // Ensure the playback rate is within a reasonable range (e.g., between 0.5x and 4x)
    if (newSpeed >= 0.5 && newSpeed <= 4) {
        video.playbackRate = newSpeed;
    }
}

// Event listener for the right arrow key(increase speed)
document.addEventListener("keydown", (event) => {
    console.log(event);
    if (event.code === "ArrowUp") {
        event.preventDefault(); // Prevent the default behavior of arrow keys (e.g., scrolling)
        changePlaybackSpeed(0.25); // Increase speed by 0.25x
    }
});

// Event listener for the left arrow key (decrease speed)
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
        event.preventDefault(); // Prevent the default behavior of arrow keys (e.g., scrolling)
        changePlaybackSpeed(-0.25);
    }
});

//-----------------------------------------------------

// Get the select element
const playbackRateSelect = document.querySelector('.player-speed');

// Get the video element
const Video = document.querySelector('.video');

// Add an event listener to the select element
playbackRateSelect.addEventListener('change', () => {
    // Get the selected option's value (e.g., "0.5", "0.75", "1", etc.)
    const selectedPlaybackRate = playbackRateSelect.value;

    // Set the video's playback rate to the selected value
    Video.playbackRate = parseFloat(selectedPlaybackRate);
});


// Update the time displays
function updateTimeDisplays() {
    const currentTime = formatTime(video.currentTime);
    const totalDuration = formatTime(video.duration);
  
    timeElapsed.textContent = currentTime;
    timeDuration.textContent = totalDuration;
  }
  
  // Format time in "mm:ss" format
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }
  
  // Add an event listener to update time displays on video time updates
  video.addEventListener('timeupdate', updateTimeDisplays);