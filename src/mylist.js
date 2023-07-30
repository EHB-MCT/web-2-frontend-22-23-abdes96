window.onload = function () {
  getShows();

  async function getShows() {
    try {
      let container = document.getElementById("shows");
      container.innerHTML = "";

      let params = new URLSearchParams(window.location.search);
      let uuid = params.get("uuid");

      let data = await getData(
        `http://localhost:4000/show/listshows/${uuid}`,
        "GET"
      );
showLoading();
      if (!data.shows) {
        container.innerHTML = "The shows you have added to your list are empty. Add shows to remember what you have to watch.";
        hideLoading();
        return;
      }

      

      for (let i = 0; i < data.shows.length; i++) {
        let show = data.shows[i];
        let showImg = data.shows[i].showImg;
        let htmlString = `
          <div class="showsect">
            <div class="show">
              <img class="img" src="${showImg}" alt="">
              <p class="showt"><b class="showssid" id="${show.showId}"><button class="delete-btn">Delete</button></b></p>
            </div>
          </div>
        `;
        container.insertAdjacentHTML("beforeend", htmlString);
      }

      hideLoading();

      // Attach click event listener to delete button
      let deleteButtons = document.querySelectorAll(".delete-btn");
      for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function () {
          let showId = this.closest(".showssid").id;
          deleteShow(uuid, showId);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteShow(uuid, showId) {
    try {
      showLoading();

      const response = await fetch(`http://localhost:4000/show/${uuid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ showId }),
      });

      const data = await response.json();

      hideLoading();

      if (response.ok) {
        alert(data.message);
        getShows();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function showLoading() {
    let container = document.createElement("div");
    container.className = "loading-container";
    container.style.position = "fixed";
    container.style.top = 0;
    container.style.left = 0;
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    container.style.backdropFilter = "blur(10px)";
    document.body.appendChild(container);
  
    let loading = document.createElement("h2");
    loading.textContent = "Loading...";
    container.appendChild(loading);
  }
  
  function hideLoading() {
    let container = document.querySelector(".loading-container");
    if (container) {
      container.remove();
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