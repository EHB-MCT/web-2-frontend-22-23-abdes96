window.onload=function(){document.getElementById("signIn").addEventListener("submit",(e=>{e.preventDefault();let t={};t.email=document.getElementById("inputemail").value,t.password=document.getElementById("inputpassword").value,async function(e,t,n){let o=await fetch("https://web2project.onrender.com/user/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});return await o.json()}(0,0,t).then((e=>{alert(e.message),sessionStorage.setItem("user",JSON.stringify(e.data)),null==e.data?(console.log("missing"),document.getElementById("loginwrong").style.display="block"):window.location.href="./html/shows.html"}))}))};     