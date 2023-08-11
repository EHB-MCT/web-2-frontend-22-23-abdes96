const app = {
  setup() {
    window.onload = () => {
      fetchMoreInfo();

      async function fetchMoreInfo() {
        // parameter van url(id api) nemen om die in api te zetten voor render//
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const ShowId = urlParams.get("id");
        //console.log(ShowId);

        const response = await fetch(`https://api.tvmaze.com/shows/${ShowId}`);
        const shows = response.json();

        shows.then((element) => {
          console.log(element);

          let ShowName = element.name;
          const image = element.image.original;
          const runtime = element.runtime;
          const summary = element.summary;
          const rating = element.rating.average;
          
          let container = document.getElementById("showinfo");
          let htmlString = "";

          htmlString += `   
                        
                       <div class="info">
                        <div id='title'> 
                                <h1>${ShowName}</h1>
                                <h2 id="rating">rating : ${rating}</h2>
                       </div>
                       
                       <div>
                       <img src="${image}">

                               <div id='infot'>  

                                 ${summary}
                       <p id="runtime">${runtime} min</p>
                          <button class='addbtn'>  <span href="">  add to to-see list</span></button>
                          
                            </div>
                             </div>

                           
                            `;

          container.innerHTML = htmlString;
                    SendToList(ShowName , image);

        });
      }
      
    };
  },
  
};
function SendToList(showName , showImg) {
  const buttonshtml = document.getElementsByClassName("addbtn");

  let buttons = Array.from(buttonshtml);
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      let userId = sessionStorage.getItem("user");
      let uuid = JSON.parse(userId).uuid;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const showId = urlParams.get("id");



      let show = {
        userId: userId,
        showId: showId,
        showName: showName,
        uuid: uuid,
        showImg: showImg,
      };

      getData("http://localhost:4000/show", "POST", show).then(
        (result) => {
          let message = result.message;
  
          let messagePopup = document.createElement("h2");
          messagePopup.innerText = message;
          messagePopup.id = "message-popup";
          messagePopup.style.backgroundColor = "black";

          document.body.appendChild(messagePopup);
          messagePopup.style.display = "block";


          setTimeout(() => {
            messagePopup.remove();
          }, 3000);

          sessionStorage.setItem("show", JSON.stringify(result.data));
        }
      );
    });
  });
  async function getData(url, method, data) {
    let resp = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await resp.json();
  }
}
app.setup();
