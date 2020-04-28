import MediaPlayer from './MediaPlayer';
import AutoPlay from './plugins/AutoPlay';
import AutoPause from './plugins/AutoPause';
import Ads from './plugins/Ads';

const video = document.querySelector("video");
const player = new MediaPlayer({ 
    el: video, 
    plugins: [new AutoPlay(), new AutoPause(), new Ads()], 
});

const playButton: HTMLMediaElement = document.querySelector("#playButton")
playButton.onclick = () => player.togglePlay();

const muteButton: HTMLMediaElement = document.querySelector("#muteButton")
muteButton.onclick = () => player.toggleMute();

//Detectamos que el navegador tenga service workers //Para trabajar offline
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js').catch(error =>{
        console.error(error.message);
    })
}
