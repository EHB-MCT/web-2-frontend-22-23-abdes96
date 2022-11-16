"use strict";
//import Cleave from "cleave.js";
import Shows from "./Shows.js";

const app = {
   showlist: [],

 setup (){ 

    window.onload = () => {
      this.fetchEvents();

};





 },

   fetchEvents() { 
    fetch('https://api.tvmaze.com/shows')
            .then(response => {
                return response.json();
            })
            .then(data => {
                data.forEach(element => {
                    //console.log(element);
                    const title = element.name;
                    const genre = element.genres;
                    const image = element.image.medium;
                    const runtime = element.runtime;
                    const summary = element.summary; 

                    let shows = "";

                    shows = new Shows (title,genre,image,runtime,summary)
                    this.showlist.push(shows);

                    });
                this.render();
                });

},

 render() {
    let htmlEvent = document.getElementById("eventContainer");
    htmlEvent.innerHTML = "";
    let htmlString = "";
    this.showlist.forEach(element => {
        htmlString += element.htmlString;
    });
    htmlEvent.innerHTML = htmlString;
}, 



};

app.setup();