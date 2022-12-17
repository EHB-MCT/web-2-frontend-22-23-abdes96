  document.getElementById("signIn").addEventListener("submit", e => {
    e.preventDefault();

    let user = {}
    user.email = document.getElementById("inputemail").value;
    user.password = document.getElementById("inputpassword").value;

    console.log(user.email, user.password);

    getData("https://localhost:4000/login", "POST", user).then(data => {
      console.log(data);
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

