"use strict";
//import Cleave from "cleave.js";
import Shows from "./Shows.js";

const app = {
   showlist: [],
   filteredEventList :  [],
   searchTerm: "",
 setup (){ 

    window.onload = () => {
      this.fetchEvents();

      
      document.getElementById("searchForm").addEventListener('keyup', () => {
        let value = document.getElementById("searchInput").value;
        this.applyFilter(value.toLowerCase()); 
        console.log(value);
         });
};





 },

   fetchEvents() { 
    fetch('https://api.tvmaze.com/shows')
            .then(response => {
                return response.json();
            })
            .then(data => {
                data.forEach(element => {
                    //console.log(data);
                    const title = element.name;
                    const genre = element.genres;
                    const image = element.image.medium;
                    const runtime = element.runtime;
                    const summary = element.summary; 

                    let shows = "";

                    shows = new Shows (title,genre,image,runtime,summary)
                    this.showlist.push(shows);
                    this.filteredEventList = this.showlist;


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

applyFilter(value) {
    this.searchTerm = value;
    const filter = this.filteredEventList.filter(element => 
        {
        if (element._title.toLowerCase().includes(value)) {
          return true;
      }

       });
       this.showlist = filter;
       this.render();

},

};

app.setup();