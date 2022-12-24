window.onload = function () {
    getshows();

function getshows() {
    let container = document.getElementById("shows");
    let htmlString = ""
   
    let show = sessionStorage.getItem("show");


     getData("http://localhost:3000/show", "GET", show).then( (result) => {
        
    let data = JSON.parse(show);

    console.log(data);
 
             

        
                htmlString = `
                    <div class="showsect">
                    <div class="show">
                    <img class="img" src="${data.showImg}" alt="" style="">

                    <p class="showt "><b class="showssid" id="${data.showId}"><button></b>delete</button></p>
                    </div>
                </div>
                   `
            
            container.insertAdjacentHTML("beforeend", htmlString)

         });
}


async function getData(url, method, data) {
    let resp = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    return await resp.json();
  }
}