"use strict";

export default class Shows {
  constructor(title, genre, image, runtime, summary, id) {
    this._title = title;
    this._genres = genre;
    this._image = image;
    this._runtime = runtime;
    this._summary = summary;
    this._id = id;
  }

  get htmlString() {
    return `<div class="show" >
    <div class="event" id="${this._id}">
    <a> <img src="${this._image}" /></a> 
    
    <div><h1 id="name">${this._title}</h1></div>
    <p class="genre">${this._genres}</p>
    <p class="runtime">${this._runtime} min</p></div>
    <button class ="addbtn name="addbtn">  <span>  add to your list</span></button>
</div>
  `;
  }
}
