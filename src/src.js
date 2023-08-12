"use strict";
import Shows from "./Shows.js";

const app = {

  showlist: [],
  filteredEventList: [],
  searchTerm: "",
  itemsPerPage: 21, 
  currentPage: 1,
  setup() {
    window.onload = () => {
      this.showLoading();

      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get("page");
      this.currentPage = parseInt(pageParam) || 1;

      this.fetchEvents();

      document.getElementById("searchForm").addEventListener("keyup", () => {
        let value = document.getElementById("searchInput").value;
        this.applyFilter(value.toLowerCase());
        //  console.log(value);
      });

      document.getElementById("genre").addEventListener("click", () => {
        let genre = document.getElementById("genre").value;

        this.genreFilter(genre);
      
      });
        document.getElementById("prevPageBtn").addEventListener("click", () => {
          console.log('tet');
          this.changePage(this.currentPage - 1);
        });
  
        document.getElementById("nextPageBtn").addEventListener("click", () => {
          this.changePage(this.currentPage + 1);
        });
     
    };
  },

   showLoading() {
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
  },
   hideLoading() {
    let container = document.querySelector(".loading-container");
    if (container) {
      container.remove();
    }
  },

  fetchEvents() {
    fetch("https://api.tvmaze.com/shows")
      .then((response) => {
        this.hideLoading();
        return response.json();
      })
      .then((data) => {
        data.forEach((element) => {
          //console.log(data);
          const title = element.name;
          const genre = element.genres;
          const image = element.image.medium;
          const runtime = element.runtime;
          const summary = element.summary;
          const id = element.id;

          let shows = "";

          shows = new Shows(title, genre, image, runtime, summary, id);
          this.showlist.push(shows);
          this.filteredEventList = this.showlist;
        });
        this.render();
        this.InfoPage();
        this.SendToList();
      })
      .catch((error) => {
        console.log(error);
        this.hideLoading();
        const errorEl = document.createElement("h2");
        errorEl.textContent = "Failed to fetch the data";
        document.getElementById("eventContainer").appendChild(errorEl);
      });
  },

  render() {
    let startIndex = (this.currentPage - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    let currentPageShows = this.showlist.slice(startIndex, endIndex);

    let htmlEvent = document.getElementById("eventContainer");
    htmlEvent.innerHTML = "";

    currentPageShows.forEach((element) => {
      htmlEvent.innerHTML += element.htmlString;
    });
  },

  changePage(newPage) {
    if (newPage < 1 || newPage > Math.ceil(this.showlist.length / this.itemsPerPage)) {
      return; 
    }

    this.currentPage = newPage;
    this.render();
    this.updateUrlWithPage(this.currentPage);

  },

  updateUrlWithPage(pageNumber) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", pageNumber);

    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState(null, null, newUrl);
  },

  applyFilter(value) {
    this.searchTerm = value;

    document.getElementById("genre").value = "";
    
    const filter = this.filteredEventList.filter((element) => {
      if (element._title.toLowerCase().includes(value)) {
        return true;
      }
    });
    this.showlist = filter;
    this.currentPage = 1;
    this.updateUrlWithPage(this.currentPage);

    this.render();
    this.InfoPage();
  },

  genreFilter(genre) {

    if (genre == "") {
      this.showlist = this.filteredEventList;
      
    }
    else {

      const filterGenre = this.filteredEventList.filter((element) => {
      if (element._genres.includes(genre)) {
        return true;
      }
    });

    this.showlist = filterGenre;
    }
    this.currentPage = 1;
    this.updateUrlWithPage(this.currentPage);

    this.render();
    this.InfoPage();
  },

  InfoPage() {
    const show = document.getElementsByClassName("event");
    let ShowsArray = [].slice.call(show);

    ShowsArray.forEach((show) => {
      show.addEventListener("click", function (e) {
        setTimeout(500);
        e.preventDefault();

        let showName = show.id;
        console.log(showName);

        window.location.href = `./showinfo.html?id=${showName}`;
      });
    });
  },

  SendToList() {
    const buttonshtml = document.getElementsByClassName("addbtn");
  
    let buttons = Array.from(buttonshtml);
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        let userId = sessionStorage.getItem("user");
        let uuid = JSON.parse(userId).uuid;
        let showId = button.parentNode.firstElementChild.id; //
        let showName = button.parentNode.firstElementChild.querySelector("#name").innerText;
  
        let showImg =
          button.parentNode.firstElementChild.firstElementChild
            .firstElementChild.src;
        let show = {
          userId: userId,
          showId: showId,
          showName: showName,
          uuid: uuid,
          showImg: showImg,
        };
  
        this.getData("http://localhost:4000/show", "POST", show).then(
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
  },

  async getData(url, method, data) {
    let resp = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await resp.json();
  },
};

app.setup();