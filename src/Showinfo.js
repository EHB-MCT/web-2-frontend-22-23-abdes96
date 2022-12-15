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

          let container = document.getElementById("show");
          let htmlString = "";

          htmlString += `   
                         <div class="Show">
                         <div> 
                                <img src="${image}">
                                <h1>${ShowName}</h1>
                       </div>
                       <div class="info">
                       <p id="rating">rating : ${rating}</p>
                             ${summary}
                       <p id="runtime">${runtime} min</p>
                          <button>  <span href="">  add to to-see list</span></button>
                            </div>
                            </div>
                            `;

          container.innerHTML = htmlString;
        });
      }
    };
  },
};

app.setup();
