(function initVideoPlayer() {
    const video = document.getElementById('win10-video-element');
    const container = document.getElementById('video-content-area');
    const controls = document.getElementById('win10-video-controls');
    
    if (!video || !controls) return;

    const btnPlay = document.getElementById('video-btn-play');
    const iconPlay = document.getElementById('icon-play');
    const iconPause = document.getElementById('icon-pause');
    const btnMute = document.getElementById('video-btn-mute');
    const volumeSlider = document.getElementById('video-volume-slider');
    const btnFullscreen = document.getElementById('video-btn-fullscreen');
    
    const timeCurrent = document.getElementById('video-time-current');
    const timeTotal = document.getElementById('video-time-total');
    const progressContainer = document.getElementById('video-progress-container');
    const progressFill = document.getElementById('video-progress-fill');
    const progressThumb = document.getElementById('video-progress-thumb');

    let controlsTimeout;
    
    function formatTime(seconds) {
        if (isNaN(seconds)) return "00:00";
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function togglePlay() {
        if (video.paused) {
            video.play();
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
        } else {
            video.pause();
            iconPlay.style.display = 'block';
            iconPause.style.display = 'none';
        }
    }

    btnPlay.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
    video.addEventListener('click', togglePlay);

    video.addEventListener('loadedmetadata', () => {
        timeTotal.textContent = formatTime(video.duration);
    });

    video.addEventListener('timeupdate', () => {
        timeCurrent.textContent = formatTime(video.currentTime);
        const progress = (video.currentTime / video.duration) * 100;
        progressFill.style.width = `${progress}%`;
        progressThumb.style.left = `${progress}%`;
    });

    video.addEventListener('ended', () => {
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
        controls.style.opacity = '1';
    });

    progressContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = progressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
    });

    progressContainer.addEventListener('mouseenter', () => {
        progressThumb.style.opacity = '1';
        progressContainer.style.height = '6px';
    });
    progressContainer.addEventListener('mouseleave', () => {
        progressThumb.style.opacity = '0';
        progressContainer.style.height = '4px';
    });

    volumeSlider.addEventListener('input', (e) => {
        e.stopPropagation();
        video.volume = e.target.value;
        video.muted = (video.volume === 0);
    });

    btnMute.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        if (video.muted) {
            volumeSlider.value = 0;
        } else {
            volumeSlider.value = video.volume > 0 ? video.volume : 0.5;
            video.volume = volumeSlider.value;
        }
    });

    btnFullscreen.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => console.log(err));
        } else {
            document.exitFullscreen();
        }
    });

    function showControls() {
        controls.style.opacity = '1';
        container.style.cursor = 'default';
        clearTimeout(controlsTimeout);
        if (!video.paused) {
            controlsTimeout = setTimeout(() => {
                controls.style.opacity = '0';
                container.style.cursor = 'none';
            }, 2500);
        }
    }

    container.addEventListener('mousemove', showControls);
    container.addEventListener('mouseleave', () => {
        if (!video.paused) controls.style.opacity = '0';
    });
    
    document.querySelectorAll('.btn-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-app') === 'videoplayer') {
                video.pause();
            }
        });
    });
})();
