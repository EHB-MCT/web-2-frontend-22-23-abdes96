window.onload = function () {

document.getElementById("signIn").addEventListener("submit", e => {
    e.preventDefault();

    let user = {}
    user.lastname = document.getElementById("inputfirstname").value;
    user.firstname = document.getElementById("inputlastname").value;
    user.email = document.getElementById("inputemail").value;
    user.password = document.getElementById("inputpassword").value;
    user.password2 = document.getElementById("inputpassword2").value;

    console.log(user.password,user.password2);
  

  //check passwords
  if(user.password == user.password2) {
    getData("http://localhost:3000/register","POST", user).then(result => {
        alert(result.message)
        sessionStorage.setItem('user', JSON.stringify(result.data))
        if (result.data == null ) {
          //console.log('missing')
        }
        else {
          window.location.href = "./loginpage.html"
        }

    } )
  }else{
    alert("Passwords do not match")
  }

});

  async function getData(url, method, data) {
    let resp = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(data),
    });
    return await resp.json();
  }

}