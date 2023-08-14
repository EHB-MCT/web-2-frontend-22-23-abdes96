window.onload = function () {
  getShows();
  async function getShows() {
    try {
      let container = document.getElementById("shows");
      container.innerHTML = "";

      let userId = sessionStorage.getItem("user");
      let uuid = JSON.parse(userId).uuid;

      let data = await getData(
        `https://web2project.onrender.com/show/listshows/${uuid}`,
        "GET"
      );
showLoading();
      if (!data.shows) {
        let emptyShowsMessage = document.createElement("p");
        container.style.margin = "100px";   

        emptyShowsMessage.textContent = "(The shows you have added to your list are empty. Add shows to remember what you have to watch.)";
        container.appendChild(emptyShowsMessage);
          hideLoading();
        return;
      }

      data.shows.reverse();


      for (let i = 0; i < data.shows.length; i++) {
        let show = data.shows[i];
        let showImg = data.shows[i].showImg;
        let showName = data.shows[i].showName;

        let htmlString = `
          <div class="showsect">
            <div class="show">
              <img class="img" src="${showImg}" alt="">
              <div><h1 id="name">${showName}</h1></div>

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
      InfoPage();

    } catch (error) {
      console.log(error);
    }
  }

  async function deleteShow(uuid, showId) {
    try {
      showLoading();

      let response = await getData(`https://web2project.onrender.com/show/${uuid}`, "DELETE", { showId });


      hideLoading();

      if (response.message) {
        let message = response.message;
  
        let messagePopup = document.createElement("h2");
        messagePopup.innerText = message;
        messagePopup.id = "message-popup";
        messagePopup.style.color = "rgb(126, 40, 40)";
        messagePopup.style.backgroundColor = "black";

        document.body.appendChild(messagePopup);
        messagePopup.style.display = "block";

        setTimeout(() => {
          messagePopup.remove();
        }, 3000);        getShows();
      } else {

        alert(`Error: ${response.error}`);
      
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

  function InfoPage() {
    let imgElements = document.querySelectorAll(".img");
    imgElements.forEach((img) => {
      img.addEventListener("click", function () {
        let showId = this.closest(".show").querySelector(".showssid").id;
        window.location.href = `./showinfo.html?id=${showId}`;
      });
    });
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