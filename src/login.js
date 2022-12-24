window.onload = function () {

  document.getElementById("signIn").addEventListener("submit", e => {
    e.preventDefault();

    let user = {}
    user.email = document.getElementById("inputemail").value;
    user.password = document.getElementById("inputpassword").value;


    getData("http://localhost:3000/user/login", "POST", user).then(result => {
      alert(result.message);
      sessionStorage.setItem('user', JSON.stringify(result.data));

      if (result.data == null ) {
        console.log('missing');
        document.getElementById("loginwrong").style.display = "block";

      }
      else {
        window.location.href = "./index.html"
      }

    });

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
