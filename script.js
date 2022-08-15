let video = document.querySelector("video");
let constraints = {
    video : true,
    audio : true,
}
let transparentcolor = "none";
let recorder;
let recordbtncont  =  document.querySelector(".record-btn-cont");
let recordbtn  =  document.querySelector(".record-btn");
let capturebtncont  =  document.querySelector(".capture-btn-cont");
let capturebtn  =  document.querySelector(".capture-btn");
let recordflag = false;
let captureflag = false;
let chunks = [];
navigator.mediaDevices.getUserMedia(constraints)
.then((stream)=>{
     video.srcObject = stream;
     recorder = new MediaRecorder(stream);
     recorder.addEventListener("start", (e) => { 
     chunks = [];
     })
     recorder.addEventListener("dataavailable", (e) => {
     chunks.push(e.data); 
     })
     recorder.addEventListener("stop", (e)=>{
     let blob = new Blob(chunks, { type : "video/mp4"});
     let vedioURL = URL.createObjectURL(blob);
    
      if(db){
        let videoID = shortid();
        let dbTransaction = db.transaction("video","readwrite");
        let vediostore = dbTransaction.objectStore("video");
        let vedioEntry = {
          id : `vid${videoID}`,
          blobData : blob
        }
        vediostore.add(vedioEntry);
 
      } 
      let a = document.createElement("a");
     a.href = vedioURL;
     a.download = "stream.mp4";
     a.click();
     })
     
})

recordbtncont.addEventListener("click",(e)=>{
  if(!recorder){
    return;
  }
  recordflag = !recordflag;
  if(recordflag){
    recordbtn.classList.add("scale-record");
    recorder.start();
    starttimer();
  }
  else{
    recordbtn.classList.remove("scale-record")
    recorder.stop();
    stoptimer();
  }
})
let timerid ;
let timer = document.querySelector(".timer");
function starttimer(){
     let count = 0;
    timerid =  setInterval((e) => {
        count++;
        let hours = parseInt(count/3600);
        let minutes = parseInt((count%3600)/60);
        let seconds = (count%3600)%60;
        if(hours<10){
             hours = `0${hours}`;
        }
        if(minutes < 10){
            minutes = `0${minutes}`;
        }
        if(seconds < 10){
           seconds = `0${seconds}`;
        }
        timer.innerHTML  = `${hours}:${minutes}:${seconds}`;
    } , 1000)
}
function stoptimer(){
     clearInterval(timerid);
     timer.innerHTML = `00:00:00`; 
}

capturebtncont.addEventListener("click" , (e) => {
     capturebtn.classList.add("scale-capture");
     setTimeout(()=>{capturebtn.classList.remove("scale-capture")},1000);
    let canvas = document.createElement("canvas");
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    let c = canvas.getContext('2d');
    c.drawImage(video, 0,0, canvas.width, canvas.height);
    c.fillStyle = transparentcolor;
    c.fillRect(0,0,window.innerWidth, window.innerHeight);

    let imageURL = canvas.toDataURL();
    if(db){
      let imageid = shortid();
      let dbTransaction = db.transaction("image","readwrite");
      let imagestore = dbTransaction.objectStore("image");
      let imageEntry = {
        id : `ima${imageid}`,
        URL : imageURL,
      }
      imagestore.add(imageEntry);

    }

    // let a = document.createElement("a");
    // a.href = imageURL;
    // a.download = "capture.jpg";
    // a.click();
})

let effects = document.querySelectorAll(".effects");
for(let i = 0; i<effects.length; i++){
   effects[i].addEventListener("click", ()=>{
  
   
   let colo = window.getComputedStyle(effects[i]).backgroundColor;
   console.log(colo);
   transparentcolor = colo;
   document.querySelector(".filter-layer").style.backgroundColor = colo;
   })
}