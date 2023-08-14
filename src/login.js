window.onload = function () {
  document.getElementById("signIn").addEventListener("submit", (e) => {
    e.preventDefault();

    let user = {};
    user.email = document.getElementById("inputemail").value;
    user.password = document.getElementById("inputpassword").value;

    getData("http://web2project.onrender.com/user/login", "POST", user).then((result) => {
      alert(result.message);
      sessionStorage.setItem("user", JSON.stringify(result.data));

      if (result.data == null) {
        console.log("missing");
        document.getElementById("loginwrong").style.display = "block";
      } else {
        let uuid = result.data.uuid;
        window.location.href = `./html/shows.html?id=${uuid}`;
      }
    });
  });

  async function getData(url, method, data) {
    let resp = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await resp.json();
  }
};
