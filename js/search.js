var input = document.getElementsByClassName('search-input')[0];
var audio = document.querySelector('audio');
var song = document.querySelector('.music-name');
var artist = document.querySelector('.artist-name');

var prev = document.querySelector('.prevBtn');
var next = document.querySelector('.nextBtn');

var listArea = document.querySelector('.song-list')
var page = 1;
var limit = 1;
var dataList = [];
var total_tracks = 0

function play(i, musicData = dataList) {
    song.textContent = musicData[i]['name'];
    artist.textContent = musicData[i]['primaryArtists'];
    disk.style.backgroundImage = `url(${musicData[i]['image'][1]['link']})`;
    audio.src = musicData[i]['downloadUrl'][4]['link'];

    if (playBtn.className.includes('pause') == false) {
        playBtn.classList.toggle('pause');
        disk.classList.toggle('play');
    };

    navbar.classList.toggle('full')
    search.classList.toggle('full')
    mainWindow.style.display = 'inherit';
    searchBox.hidden = true;
    trending.style.display = 'inherit';
    searchButton.innerHTML = `<ion-icon name="search-outline"></ion-icon>`;

    seekBar.value = 0

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = audio.duration;
        musicDuration.innerHTML = formatTime(audio.duration);
    }, 300);
}


function search_and_play(search, page, limit) {
    var request = new Request(`https://saavn.me/search/songs?query=${search}&page=${page}&limit=${limit}`);
    fetch(request).then(function (response) {
        return response.json();
    }).then(function (res) {
        data = res['data']
        total_tracks = data['total']
        dataList = data['results']

        numData = data['results'].length;

        if (document.contains(document.querySelector('.songlist'))) {
            var ol = document.querySelector('.songlist')
            ol.remove();
        }
        var list = document.createElement('ol');
        list.className = 'songlist';
        for (var i = 0; i < numData; i++) {
            var html = `<li id="l${i + 1}" onclick="play(${i})"><img src="${dataList[i]['image'][1]['link']}" width="50" height="50"><b>${dataList[i]['name']}</b></li><br>`
            list.innerHTML += html;
            listArea.appendChild(list);
        }
    })
}

input.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        var search = input.value;
        page = 1;
        limit = 10;
        search_and_play(search, page, limit)
    }
})

prev.addEventListener('click', (e) => {
    e.preventDefault();
    var search = input.value;
    if (page !== 1){
        page -= 1
    }
    search_and_play(search, page, limit)
});

next.addEventListener('click', (e) => {
    e.preventDefault();
    var search = input.value;
    if (page*10 < total_tracks){
        page += 1
    }
    search_and_play(search, page, limit)
});
