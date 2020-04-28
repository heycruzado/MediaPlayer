class MediaPlayer {

    media: HTMLMediaElement;
    plugins: Array<any>;
    container: HTMLElement;

    constructor(config) {
        this.media = config.el;
        this.plugins = config.plugins || [];
        this.initPlayer();
        this.initPlugins();
    }

    initPlayer(){
        this.container = document.createElement('div');
        this.container.style.position = 'relative';
        //Movemos media dentro del contenedor
        this.media.parentNode.insertBefore(this.container, this.media);
        this.container.appendChild(this.media);
    }    

    private initPlugins() {
        this.plugins.forEach(plugin => {
            plugin.run(this); //Con player solo tiene acceso a la informacion que se encuentra en dicho objeto
        });
    }

    play() {
        this.media.play();
    }

    pause() {
        this.media.pause();
    }

    togglePlay() {
        if (this.media.paused) {
            this.play();
        }
        else {
            this.pause();
        }
    }

    mute() {
        this.media.muted = true;
    }

    unmute() {
        this.media.muted = false;
    }

    toggleMute() {
        if (this.media.muted == true) {
            this.unmute();
        }
        else {
            this.mute();
        }
    }
}

export default MediaPlayer;