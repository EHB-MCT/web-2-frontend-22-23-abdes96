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
        //console.log(value);
         });

     document.getElementById("genre").addEventListener('click', () => { 
        let genre = document.getElementById('genre').value;
        
        this.genreFilter(genre);
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
                    const id =  element.id;

                    let shows = "";

                    shows = new Shows (title,genre,image,runtime,summary,id)
                    this.showlist.push(shows);
                    this.filteredEventList = this.showlist;


                    });
                this.render();
                this.InfoPage();
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
       this.InfoPage();


},

 genreFilter(genre) {

    const filterGenre = this.filteredEventList.filter(element => 
        {
        if (element._genres.includes(genre)   ) {

            return true;
            
        }

    });
    
     this.showlist = filterGenre ;
      this.render();
      this.InfoPage();
      

},



 InfoPage() {
    const show = document.getElementsByClassName("event");
    let ShowsArray = [].slice.call(show);

    ShowsArray.forEach(show => {
        show.addEventListener("click", function (e) {
            setTimeout(500)
            e.preventDefault(); 
            
            let showName = show.id;
            console.log(showName)
             //https://www.w3schools.com/js/js_window_location.asp

           window.location.href = `./showinfo.html?id=${showName}`;
        })
    })
},

};

app.setup();