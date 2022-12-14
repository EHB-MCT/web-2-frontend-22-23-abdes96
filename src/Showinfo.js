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
          const genre = element.genres;
          const image = element.image.original;
          const runtime = element.runtime;
          const summary = element.summary;

          let container = document.getElementById("show");
          let htmlString = "";

          htmlString += `   
                            <div class="nameandscore">
                                <img src="${image}"> 
                            </div>
                            `;

          container.innerHTML = htmlString;
        });
      }
    };
  },
};

app.setup();
