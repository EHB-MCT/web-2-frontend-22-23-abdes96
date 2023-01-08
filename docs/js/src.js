(()=>{"use strict";var e,t={200:(e,t,s)=>{s.d(t,{Z:()=>n});class n{constructor(e,t,s,n,i,r){this._title=e,this._genres=t,this._image=s,this._runtime=n,this._summary=i,this._id=r}get htmlString(){return`<div class="show" >\n    <div class="event" id="${this._id}">\n    <a> <img src="${this._image}" /></a> \n    \n    <div><h1 id="name">${this._title}</h1></div>\n    <p class="genre">${this._genres}</p>\n    <p class="runtime">${this._runtime} min</p></div>\n    <button class ="addbtn name="addbtn">  <span>  add to to-see list</span></button>\n</div>\n  `}}}},s={};function n(e){var i=s[e];if(void 0!==i)return i.exports;var r=s[e]={exports:{}};return t[e](r,r.exports,n),r.exports}n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e=n(200),{showlist:[],filteredEventList:[],searchTerm:"",setup(){window.onload=()=>{this.fetchEvents(),document.getElementById("searchForm").addEventListener("keyup",(()=>{let e=document.getElementById("searchInput").value;this.applyFilter(e.toLowerCase())})),document.getElementById("genre").addEventListener("click",(()=>{let e=document.getElementById("genre").value;this.genreFilter(e)}))}},fetchEvents(){fetch("https://api.tvmaze.com/shows").then((e=>e.json())).then((t=>{t.forEach((t=>{const s=t.name,n=t.genres,i=t.image.medium,r=t.runtime,o=t.summary,a=t.id;let l="";l=new e.Z(s,n,i,r,o,a),this.showlist.push(l),this.filteredEventList=this.showlist})),this.render(),this.InfoPage(),this.SendToList()}))},render(){let e=document.getElementById("eventContainer");e.innerHTML="";let t="";this.showlist.forEach((e=>{t+=e.htmlString})),e.innerHTML=t},applyFilter(e){this.searchTerm=e;const t=this.filteredEventList.filter((t=>{if(t._title.toLowerCase().includes(e))return!0}));this.showlist=t,this.render(),this.InfoPage()},genreFilter(e){const t=this.filteredEventList.filter((t=>{if(t._genres.includes(e))return!0}));this.showlist=t,this.render(),this.InfoPage()},InfoPage(){const e=document.getElementsByClassName("event");[].slice.call(e).forEach((e=>{e.addEventListener("click",(function(t){setTimeout(500),t.preventDefault();let s=e.id;console.log(s),window.location.href=`./showinfo.html?id=${s}`}))}))},SendToList(){const e=document.getElementsByClassName("addbtn");Array.from(e).forEach((e=>{e.addEventListener("click",(()=>{let t=sessionStorage.getItem("user"),s=e.parentNode.firstElementChild.id,n=(e.parentNode.firstElementChild,{userId:t,showId:s,showImg:e.parentNode.firstElementChild.firstElementChild.firstElementChild.src});this.getData("https://web2project.onrender.com/show","POST",n).then((e=>{alert(e.message),sessionStorage.setItem("show",JSON.stringify(e.data))}))}))}))},async getData(e,t,s){let n=await fetch(e,{method:t,headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});return await n.json()}}.setup()})();