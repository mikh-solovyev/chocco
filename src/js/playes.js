let interval;

const player = {
    parent: document.querySelector(".player"),
    video: document.querySelector("#player"),
    playBtn: document.querySelector(".controls__play"),
    volumeBtn: document.querySelector(".controls__volume"),
    layerBtn : document.querySelector(".player__layer"),
    progressBar: document.querySelector(`input[name=range]`),
    volumeBar: document.querySelector(`input[name=volume]`),
    lastVolume: 1,
    play() {
        this.video.play();
        this.parent.classList.add("played");
    },
    pause() {
        this.video.pause();
        this.parent.classList.remove("played");
    },
    togglePlayer() {
        if(interval) clearInterval(interval);

        this.durationSec = this.video.duration;
        this.progressBar.max = parseInt(this.durationSec);

        if( this.video.paused ) {
            this.play();
            interval = setInterval(() => {
                this.changeProgress();

                if(this.video.ended) {
                    this.pause();
                    this.progressBar.value = 0;
                    clearInterval(interval);
                }

            } ,1000);
        } else {
            this.pause();
        }
    },
    changeProgress() {
        const curTime = parseInt(this.video.currentTime);
        const value = parseInt(this.progressBar.value) + 1;
        this.progressBar.value = value;
    },
    seekTo() {
        this.video.currentTime = this.progressBar.value;
    },
    toggleVolume() {
        if(player.video.volume > 0) {
            this.lastVolume = this.volumeBar.value;
            this.volumeBar.value = 0;
        } else {
            this.volumeBar.value = this.lastVolume;
        }

        this.changeVolume();
        this.changeIcon();

    },
    changeVolume() {
        const curVolume = parseFloat(this.volumeBar.value);
        player.video.volume = curVolume;
        this.changeIcon();
    },
    changeIcon() {
        if(player.video.volume > 0) {
            this.volumeBtn.classList.remove("muted");
        } else {
            this.volumeBtn.classList.add("muted");
        }
    }
};


// Обработчики событий
player.playBtn.addEventListener("click", (e) => {
    e.preventDefault();
    player.togglePlayer();
});

player.layerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    player.togglePlayer();
});

player.progressBar.addEventListener("change", (e) => {
    player.seekTo();
});

player.volumeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    player.toggleVolume();
});

player.volumeBar.addEventListener("change", (e) => {
    player.changeVolume();
});





