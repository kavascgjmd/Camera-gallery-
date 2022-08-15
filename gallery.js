setTimeout(() => {
    if(db){
        let dbvedioTransaction = db.transaction("video","readonly");
        let videostore = dbvedioTransaction.objectStore("video");
        let videorequest = videostore.getAll();
        videorequest.onsuccess = (e)=>{
            let videoResult = videorequest.result;
            for(let i = 0; i<videoResult.length ; i++){
                let galleryElem = document.createElement("div");
                let url = URL.createObjectURL(videoResult[i].blobData) ;
               
                galleryElem.setAttribute("class" , "galleryElem");
                galleryElem.setAttribute("id", videoResult[i].id);
                galleryElem.innerHTML = ` <div class="media" >
                <a href = ${url} >
                <video autoplay loop src = ${url} ></video></a>
                </div>
                <div class="delete action-btn">
                 DELETE
                </div>
                <div class="download action-btn">Download</div>
                `
                let galleryCont = document.querySelector(".gallery-cont");
                galleryCont.appendChild(galleryElem);
                let delet = galleryElem.querySelector(".delete");
                let download = galleryElem.querySelector(".download");
                delet.addEventListener("click",function(e){
                    let dbvedioTransaction = db.transaction("video","readwrite");
        let videostore = dbvedioTransaction.objectStore("video");
                    let id = galleryElem.getAttribute("id");
                    videostore.delete(id);
                    galleryElem.remove();

                })
                download.addEventListener("click", function(){
                    let id = galleryElem.getAttribute("id");
                    let dbvideotransaction = db.transaction("video", "readwrite");
                    let vediostore = dbvideotransaction.objectStore("video");
                    let vediorequest = vediostore.get(id);
                vediorequest.onsuccess = (e)=>{
                    let vedioresult = vediorequest.result;
                    let a = document.createElement("a");
                    a.href = URL.createObjectURL(vedioresult.blobData);
                    a.download ="stream.mp4";
                    a.click();
                }
                })

            }
        }
    
       let dbimagetransaction = db.transaction("image", "readonly");
       let imagestore = dbimagetransaction.objectStore("image");
       let imagerequest = imagestore.getAll();
       imagerequest.onsuccess = (e)=>{
        let imageresult = imagerequest.result;
        for(let i = 0; i<imageresult.length; i++){
            let galleryElem = document.createElement("div");
            let url = imageresult[i].URL;
            galleryElem.setAttribute("class" , "galleryElem");
            galleryElem.setAttribute("id", imageresult[i].id);
            galleryElem.innerHTML = ` <div class="media">
           
            <image class ="click" src = ${url}></image>
            </div>
            <div class="delete action-btn">
             DELETE
            </div>
            <div class="download action-btn">Download</div>
            `
            let galleryCont = document.querySelector(".gallery-cont");
            galleryCont.appendChild(galleryElem);
             let delet = galleryElem.querySelector(".delete");
             let download = galleryElem.querySelector(".download");
             delet.addEventListener("click",function(){
                let dbimagetransaction = db.transaction("image", "readwrite");
                let imagestore = dbimagetransaction.objectStore("image"); let id = galleryElem.getAttribute("id");
                imagestore.delete(id);
                galleryElem.remove();
             })
             download.addEventListener("click",function(){
                let id = galleryElem.getAttribute("id");
                let imagedbtransaction = db.transaction("image","readwrite");
                let imagestore = imagedbtransaction.objectStore("image");
                let imagerequest =  imagestore.get(id);
                imagerequest.onsuccess = (e)=>{
                   let imageresult =  imagerequest.result;
                   let a = document.createElement("a");
                   a.href = imageresult.URL;
                   a.download = "capture.jpg";
                   a.click();
                }
             })
        }
       }

    }
}, (200));
