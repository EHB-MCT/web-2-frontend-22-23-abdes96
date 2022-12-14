"use strict";

export default class Shows {
constructor (title,genre,image,runtime,summary,id){
this._title = title;
this._genres= genre;
this._image =image;
this._runtime = runtime;
this._summary = summary;
this._id = id; 
}



get htmlString()   {          
    
    return `<div class="event" id="${this._id}">
    <img src="${this._image}" />
    <h1>${this._title}</h1>
    <p class="genre">${this._genres}</p>
    <p class="runtime">${this._runtime} min</p>
    <button>  <a href="">  add to to-see list</a></button>

  </div>`;
 }
}