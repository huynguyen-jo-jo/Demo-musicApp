

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// const $play = $('.play')
// const $playing = $('.playing')
// const $pause = $('.pause')
// $playing.onclick = function(){
//     $play.classList.toggle('hiden')
//     $pause.classList.toggle('hiden')
// }
const song =[
    {
        song: './assets/img/song/ChiLaKhongCungNhau.mp3',
        sing: 'Tang Hoang Phuc',
        name: 'Chi La Khong Cung Nhau',
        img: "./assets/img/songImg/song1.jpg",
    },
    {
        song: './assets/img/song/CoDocVuong.mp3',
        sing: 'Thien Tu',
        name: 'Co Doc Vuong',
        img: "./assets/img/songImg/song1.jpg",
    },
    {
        song: './assets/img/song/Happyn.mp3',
        sing: 'Truong The Vinh',
        name: 'Happyn',
        img: "./assets/img/songImg/song1.jpg",
    },
    {
        song: './assets/img/song/Nang Tho.mp3',
        sing: 'Dinh Dung',
        name: 'Nang Tho',
        img: "./assets/img/songImg/song1.jpg",
    },
    {
        song: './assets/img/song/NguoiTaDauThuongEm.mp3',
        sing: 'Ly Ly',
        name: 'Nguoi Ta Dau Thuong Em',
        img: "./assets/img/songImg/song1.jpg",
    },
    {
        song: './assets/img/song/TrenTinhBanDuoiTinhYeu.mp3',
        sing: 'Min',
        name: 'Tren Tinh Ban DuoiTinhYeu',
        img: "./assets/img/songImg/song1.jpg",
    }
]



    
    const curentSongName = $(".song-name");
    const curentSongSing = $(".song-sing");
    const audioSong = $("#audio");
    var curentIndex = 4;
    const player = $('.app');
    const progess = $('#progress');
    const cdThumb = $('.cd-img')

    // const cdThumbAnimate = cdThumb.animate([
    //     {transform: 'rotate(360deg)'}
    //     ],{
    //     duration: 10000,
    //     iterations: Infinity
    //     })
    //     cdThumbAnimate.pause()   
   
    const app = {
    songs: [
        {
            song: './assets/img/song/ChiLaKhongCungNhau.mp3',
            sing: 'Tang Hoang Phuc',
            name: 'Chi La Khong Cung Nhau',
            img: "./assets/img/songImg/song1.jpg",
        },
        {
            song: './assets/img/song/CoDocVuong.mp3',
            sing: 'Thien Tu',
            name: 'Co Doc Vuong',
            img: "./assets/img/songImg/song1.jpg",
        },
        {
            song: './assets/img/song/Happyn.mp3',
            sing: 'Truong The Vinh',
            name: 'Happyn',
            img: "./assets/img/songImg/song1.jpg",
        },
        {
            song: './assets/img/song/NangTho.mp3',
            sing: 'Dinh Dung',
            name: 'Nang Tho',
            img: "./assets/img/songImg/song1.jpg",
        },
        {
            song: './assets/img/song/NguoiTaDauThuongEm.mp3',
            sing: 'Ly Ly',
            name: 'Nguoi Ta Dau Thuong Em',
            img: "./assets/img/songImg/song1.jpg",
        },
        {
            song: './assets/img/song/TrenTinhBanDuoiTinhYeu.mp3',
            sing: 'Min',
            name: 'Tren Tinh Ban DuoiTinhYeu',
            img: "./assets/img/songImg/song1.jpg",
        }
    ],

    controll: function(){
        const $play = $('.play')
        const $pause = $('.pause')
        const $playing = $('.playing')
        const $repeat = $('.repeat');
        const $prev = $('.fa-forward')
        const $post = $('.fa-backward')
        const $random = $('.fa-random')
        let isRepeat = false
        let isRandom = false
        const _this = this

        // phát nhạc
        $playing.onclick = function(){
        // audioSong.play();
        $play.classList.toggle('hiden')
        $pause.classList.toggle('hiden')
       
       
        if($play.classList.contains('hiden')){
            audioSong.play();
    
        }else{
            audioSong.pause();
        }
        // update time
        audioSong.ontimeupdate = function(){
          const curerntProgess = Math.floor(audioSong.currentTime/audioSong.duration*100)
          progess.value = curerntProgess   
          
        }
        // sự kiện thay đổi thanh trượt
        progess.onchange = function(e){
          const seekPosition = audioSong.duration*e.target.value/100
          audioSong.currentTime = seekPosition
          audioSong.play()
        }

}
    // cdThumbAnimate

    const cdThumbAnimate = cdThumb.animate([
    {transform: 'rotate(360deg)'}
    ],{
    duration: 10000,
    iterations: Infinity
    })
    cdThumbAnimate.pause()   


    audioSong.onplay = function(){
        cdThumbAnimate.play()
        $play.classList.add('hiden')
        $pause.classList.remove('hiden')
    }
    audioSong.onpause = function(){
        cdThumbAnimate.pause()
    }
    

    // chuyển bài trước
    function nextSong(){
      curentIndex++
      if(curentIndex>=_this.songs.length) curentIndex = 0
      _this.loadCurentSong()
      audioSong.play()
    }
    $prev.onclick =  nextSong

    // chuyển bài sau
    function postSong(){
        curentIndex--
        if(curentIndex<0) curentIndex = _this.songs.length-1
        _this.loadCurentSong()
        audioSong.play()
      }
    $post.onclick = postSong

    // repeat song
    $repeat.onclick = function(){
        $repeat.classList.toggle('active')
        isRepeat =  $repeat.classList.contains('active') ? true : false
    }
    // random song
    function randomSong(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * (_this.songs.length-1));   
        }while(curentIndex===newIndex)
        curentIndex=newIndex
        _this.loadCurentSong()
        audioSong.play()  
    }
    $random.onclick = function(){
        $random.classList.toggle('active')
        isRandom =  $random.classList.contains('active') ? true : false
        randomSong()
    }
   // tu chuyen bai
   audioSong.onended = function(){
       if(isRepeat){
           audioSong.play()
       }else{
        isRandom ? randomSong() : nextSong()
       }
   }
    


    },
    // load song
    loadCurentSong: function(){
        
        curentSongName.textContent = this.songs[curentIndex].name;
        curentSongSing.textContent = this.songs[curentIndex].sing;
        audioSong.src = this.songs[curentIndex].song;

    },
    render: function(){
        const htmls = this.songs.map(song=>{
            return`
             <div class=" row">
            <div class="song-img col-3">
             <img src='${song.img}' alt="">
            </div>
            <div class="song-infor col-6">
             <h3>${song.name}</h3>
             <p>${song.sing}</p>
            </div>
        </div>
       `
        })
        $('.playlist').innerHTML = htmls.join('');
    },
    start: function(){
        this.render()
        this.loadCurentSong()
        this.controll()
    }
}
app.start();