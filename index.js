class KmVideoPlayer {
  constructor({
    id,
    videoUrl,
    videoTitle,
    videoDescription,
    videoThumbnail,
    width,
    height,
  }) {
    this.id = id;
    this.videoUrl = videoUrl;
    this.videoTitle = videoTitle;
    this.videoDescription = videoDescription;
    this.videoThumbnail = videoThumbnail;
    this.element = document.querySelector(`#${id}`);
    this.width = width;
    this.height = height;
    this.video = null;
  }

  init() {
    this.loadCss();
    this.element.innerHTML = this.render();
    this.element.innerHTML += this.renderControls();
    this.afterRender();
    this.addEventListeners();
    
    this.video.addEventListener("timeupdate", () => {
      this.updateProgressBar();
    });
  }
  afterRender() {
    this.video = document.querySelector(`#${this.id} .km-video__video`);
    this.btnPlay = document.querySelector(
      `#${this.id} .km-video__controls__play`
    );
    this.btnPause = document.querySelector(
      `#${this.id} .km-video__controls__pause`
    );
  }

  // update progress bar
  updateProgressBar() {
    let progress = document.getElementById("km-video__controls__progress__bar");
    let percentage = Math.floor(
      (100 / this.video.duration) * this.video.currentTime
    );
    progress.style.width = `${percentage}%`;
  }

  addEventListeners() {
    this.btnPlay.addEventListener("click", () => {
      console.log(this);
      this.video.play();
    });
    this.btnPause.addEventListener("click", () => {
      this.video.pause();
    });
  }
  loadCss() {
    let css = `
      #${this.id} {
        width: ${this.width}px;
        height: ${this.height}px;
      }
      #${this.id} .km-video__container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        position: relative;

      #${this.id} .km-video__player {
        width: 100%;
        height: 100%;
      }

      #${this.id} .km-video__video {
        width: 100%;
        height: 100%;
      }

      #${this.id} .km-video__controls {
        width: 100%;
        height: 50px;
        background-color: gray;
        height: 50px;
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;

      }

      #${this.id} .km-video__controls__play {
        width: 50px;
        height: 50px;
        background-color: red;
        display: inline-block;
      }

      #${this.id}. km-video__controls__pause {
        width: 50px;
        height: 50px;
        background-color: blue;
        display: inline-block;
      }

      #${this.id} .km-video__controls__progress {
        width: 100%;
        height: 10px;
        background-color: black;
      }

      #${this.id} .km-video__controls__progress__bar {
        width: 0%;
        height: 100%;
        background-color: red;
      }

      // Global styles
      #${this.id} .icon {
        width: 24px;
        height: 24px;
        display: inline-block;
        background-color: black;
      }


    `;
    let style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
  }

  render() {
    return `
      <div class="km-video__container">
        <div class="km-video__player">
          <video class="km-video__video">
            <source src="${this.videoUrl}" type="video/mp4">
          </video>
        </div>
      </div>
    `;
  }
  renderControls() {
    return `
      <div class="km-video__controls">
        <div class="icon km-video__controls__play">
          <svg viewBox="0 0 24 24">
            <path d="M3,22V2L21,12L3,22Z" />
          </svg>
        </div>
        <div class="icon km-video__controls__pause">
          <svg viewBox="0 0 24 24">
            <path d="M4,21H10V3H4V21Z" />
            <path d="M14,21H20V3H14V21Z" />
          </svg>
        </div>
        <div class="icon km-video__controls__progress">
          <div class="km-video__controls__progress__bar"></div>
        </div>
      </div>
    `;
  }
}
