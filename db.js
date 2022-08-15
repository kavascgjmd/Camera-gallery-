let db;
let openproject = indexedDB.open("myDataBase");
openproject.addEventListener("success",(e) =>{
    console.log("DB Success");
    db = openproject.result;
})
openproject.addEventListener("error", (e)=>{
    console.log("DB error");
})
openproject.addEventListener("upgradeneeded", (e)=> {
    console.log("DB upgraded");
    db = openproject.result;
    console.log(db);

    db.createObjectStore("video", {keyPath : "id" });
    db.createObjectStore("image",{keyPath : "id"});
})