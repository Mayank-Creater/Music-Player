let currentMusic = 0;
const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

const search = document.querySelector('.search');
const searchButton = document.querySelector('.searchbtn');
const searchInput = document.querySelector('.search-input');
const searchBox = document.querySelector('.searchbox');

const navbar = document.querySelector('.top-nav');

const trending = document.querySelector('.trending');
const trendingText = document.querySelector('.title');
const trendingButton = document.querySelector('.trendingbtn');

const mainWindow = document.querySelector('.main');

searchButton.addEventListener('click', () => {
    if (search.className.includes('full')) {
        search.classList.remove('full');
        navbar.classList.remove('full');
        mainWindow.style.display = 'inherit';
        searchBox.hidden = true;
        trending.style.display = 'inherit';
        searchButton.innerHTML = `<ion-icon name="search-outline"></ion-icon>`;
    } else {
        search.classList.add('full');
        navbar.classList.add('full');
        mainWindow.style.display = 'none';
        searchBox.hidden = false;
        trending.style.display = 'none';
        searchButton.innerHTML = `<ion-icon name="home-outline"></ion-icon>`;
    }
});

trendingButton.addEventListener('click', () => {
    if (trending.className.includes('full')) {
        trending.classList.remove('full');
        navbar.classList.remove('full');
        mainWindow.style.display = 'inherit';
        trendingText.style.display = 'none'
        search.style.display = 'inherit';
        trendingButton.innerHTML = `<ion-icon name="flash-outline"></ion-icon>`;
    } else {
        trending.classList.add('full');
        navbar.classList.add('full');
        mainWindow.style.display = 'none';
        trendingText.style.display = 'inherit';
        search.style.display = 'none';
        trendingButton.innerHTML = `<ion-icon name="home-outline"></ion-icon>`;
    }
});

playBtn.addEventListener('click', () => {
    if (playBtn.className.includes('pause')){
        music.play()
    } else{
        music.pause();
    };
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
});


const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerText = song.name;
    artistName.innerText = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    setInterval(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 100);
}

setMusic(Math.floor(Math.random() * songs.length));

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
}

setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if (music.ended){
        setMusic(currentMusic + 1);
        playMusic();
    }
}, 500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
});

const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
}

forwardBtn.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1){
        setMusic(0);
    } else{
        setMusic(currentMusic + 1);
    }
    playMusic()
});

backwardBtn.addEventListener('click', () => {
    if (currentMusic <= 0){
        setMusic(songs.length - 1);
    } else{
        setMusic(currentMusic - 1);
    }
    playMusic()
});