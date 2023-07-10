window.onload = function () {
  getShows();

  async function getShows() {
    try {
      let container = document.getElementById("shows");
      container.innerHTML = "";

      let userId = sessionStorage.getItem("user");
      let shows = await getData(
        `http://localhost:4000/show/listshows/${userId}`,
        "GET"
      );

      for (let i = 0; i < shows.length; i++) {
        let show = shows[i];
        let htmlString = `
          <div class="showsect">
            <div class="show">
              <img class="img" src="${show.showImg}" alt="" style="">
              <p class="showt "><b class="showssid" id="${show.showId}"><button></b>delete</button></p>
            </div>
          </div>
        `;
        container.insertAdjacentHTML("beforeend", htmlString);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
};