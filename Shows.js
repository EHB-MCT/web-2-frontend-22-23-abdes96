"use strict";

export default class Shows {
constructor (title,genre,image,runtime,summary){
this._title = title;
this._genre= genre;
this._image =image;
this._runtime = runtime;
this._summary = summary; 
}



get htmlString()   {          
    
    return `<div class="event">
    <img src="${this._image}" />
    <h1>${this._title}</h1>
    <p class="genre">${this._genre}</p>
    <p class="runtime">${this._runtime} min</p>
    <button>  <a href="">  add to to-see list</a></button>

  </div>`;
 }
}