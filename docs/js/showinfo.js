({setup(){window.onload=()=>{!async function(){const n=window.location.search,t=new URLSearchParams(n).get("id");(await fetch(`https://api.tvmaze.com/shows/${t}`)).json().then((n=>{console.log(n);let t=n.name;const i=n.image.original,e=n.runtime,a=n.summary;let o="";o+=`   \n                         <div class="Show">\n                         <div> \n                                <img src="${i}">\n                                <h1>${t}</h1>\n                       </div>\n                       <div class="info">\n                       <p id="rating">rating : ${n.rating.average}</p>\n                             ${a}\n                       <p id="runtime">${e} min</p>\n                          <button>  <span href="">  add to to-see list</span></button>\n                            </div>\n                            </div>\n                            `,document.getElementById("show").innerHTML=o}))}()}}}).setup();