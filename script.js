const musicContainer=document.getElementById('music-container');
const playbtn=document.getElementById('play');
const prevbtn=document.getElementById('prev');
const nextbtn=document.getElementById('next');
const audio=document.getElementById('audio');
const progress_bar=document.querySelector('.progress');
const progressContainer=document.querySelector('.progress-container');
const title=document.getElementById('title');
const cover=document.getElementById('cover');

const songs=['lover','summer','ukulele'];
let songIndex=2;
//load song details into the page
function loadSong(song){
    title.innerText=song;
    audio.src=`music/${song}.mp3`;
    cover.src=`images/${song}.jpg`;

}
function playSong(){
    musicContainer.classList.add('play');
    playbtn.querySelector('i.fa').classList.remove('fa-play');
    playbtn.querySelector('i.fa').classList.add('fa-pause');
    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    playbtn.querySelector('i.fa').classList.remove('fa-pause');
    playbtn.querySelector('i.fa').classList.add('fa-play');
    audio.pause();
}

function updateProgress(e){
    const {duration,currentTime}=e.srcElement;
    //calculate the value of progress bar
    let progress=(currentTime/duration)*100;
    //update the value of progress bar
    progress_bar.style.width=`${progress}%`  ;


}

function setProgress(e){
    const clickX=e.offsetX;
    const width=this.clientWidth;
    const duration=audio.duration;
    // calculate the time equal to that percent
    const seekTo=(clickX/width)*duration;
    //set the currenttime to that value
    audio.currentTime=seekTo;
}
loadSong(songs[songIndex]);
playbtn.addEventListener('click',()=>{
    const isPlaying=musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
});

prevbtn.addEventListener('click',()=>{
    if(songIndex==0){
        songIndex=songs.length-1;
    }
    else{
        songIndex--;
    }
    loadSong(songs[songIndex]);
    playSong();
})

nextbtn.addEventListener('click',()=>{
    if(songIndex==songs.length-1){
        songIndex=0;
    }
    else{
        songIndex++;
    }
    loadSong(songs[songIndex]);
    playSong();
})

audio.addEventListener('timeupdate',updateProgress);
progressContainer.addEventListener('click',setProgress);