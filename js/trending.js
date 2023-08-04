var url = 'https://saavn.me/modules?language=hindi';
var request = new Request(url);
var song_list = []
var song_dataList = []
var trendinglist = document.querySelector('.trending-list')

function trend_play(a, musicData = song_dataList) {
    song.textContent = musicData[a]['name'];
    artist.textContent = musicData[a]['artist'];
    disk.style.backgroundImage = `url(${musicData[a]['cover']})`;
    audio.src = musicData[a]['path'];

    if (playBtn.className.includes('pause') == false) {
        playBtn.classList.toggle('pause');
        disk.classList.toggle('play');
    };

    trending.classList.toggle('full')
    navbar.classList.toggle('full')
    mainWindow.style.display = 'inherit';
    trendingText.style.display = 'none'
    search.style.display = 'inherit';
    trendingButton.innerHTML = `<ion-icon name="flash-outline"></ion-icon>`;

    seekBar.value = 0

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = audio.duration;
        musicDuration.innerHTML = formatTime(audio.duration);
    }, 300);
}

function create_data(new_url) {
    const new_req = new Request(new_url);

    fetch(new_req).then(function (new_res) {
        return new_res.json();
    }).then(function (datanew) {
        new_data = datanew['data']
        var trending = new_data['results'][0];
        var title = trending.name.includes("&quot;") ? trending.name.replace(/&quot;/g, '') : trending.name;
        var path = trending.downloadUrl[4].link;
        var artist = trending.primaryArtists;
        var cover = trending.image[1].link;
        var data = `{"name": "${title}", "path": "${path}", "artist": "${artist}", "cover": "${cover}"}`;
        var parsed = JSON.parse(data);
        song_dataList.push(parsed);
    })
}

fetch(request).then(function (response) {
    return response.json();
}).then(function (res) {
    data = res['data']
    var dataList = data['albums']
    var datanum = dataList.length

    for (var i = 0; i < datanum; i++) {
        var title = (dataList[i].name).split(" (")
        song_list.push(title[0])
    }

    for (var j = 0; j < song_list.length; j++) {
        var song = song_list[j]
        var new_url = "https://saavn.me/search/songs?query=" + song
        create_data(new_url)
    }
    window.setTimeout(display_data, 2000);
})

function display_data() {
    var tr_list = document.createElement('ol');
    tr_list.className = 'trendinglist';

    for (var a = 0; a < song_dataList.length; a++) {
        var list = `<li id="l${(a + 1)}" onclick="trend_play(${a})"><img src="${song_dataList[a]['cover']}" width="50" height="50"><b>${song_dataList[a]['name']}</b></li><br>`;
        tr_list.innerHTML += list;
        trendinglist.appendChild(tr_list);
    }
}
