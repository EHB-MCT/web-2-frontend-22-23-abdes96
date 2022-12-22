window.onload = function () {
  //all data
  profiledata();

  //delete
  document.getElementById("deleteprofile").addEventListener("click", () => {
    document.getElementById("confirm").style.display = "block";
    deletProfile();
  });

  //update emaile
  document.getElementById("changeEmail").addEventListener("click", () => {
    document.getElementById("emailInput").style.display = "block";
    update();
  });

  //logout
  document.getElementById("Logout").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "./loginpage.html";
  });
};

function profiledata() {
  //https://stackoverflow.com/questions/63300478/how-to-get-value-from-session-storage

  let userId = sessionStorage.getItem("user");
  let data = JSON.parse(userId);
  let email = data.email;
  let firstname = data.firstname;
  let lastname = data.lastname;

  let htmlString = "";

  htmlString += ` <h2 class="profildata" id=" textprofil">First name : ${firstname} </h2>
    <h3 class="firstname" id="firstname"></h3>
    <h2 class="profildata">Last Name : ${lastname} </h2>
   
  
    <h2>Email :  ${email} </h2>
    <div class="changeEmail">
   <button><h3> Change mail <i class="material-icons updateacc" id="changeEmail">create</i></h3></button>
    </div>
    <div class="emailInput" style="display: none;" id="emailInput">
    <input type="text"  id="emailInputForm" name="email" placeholder="New email">
    <button type="submit"  id="submitNewEmail">Change email</button>

    </div>
    <h2>Password : <h2 type ="password"> </h2></h2>
    <div class="Passwordchange">
    <button><h3><a id="passwordShow">Change password <i class="material-icons updatepassword" id="updatepassword">create</i></a></h3></button>
    </div>
    <div class="passwordInput" style="display: none;" id="passwordInput">
    <form class="passwordChangeForm" id="passwordChangeForm">
    <input type="text" class="passwordInputForm" id="passwordInputForm" name="password" placeholder="New password">
    <button type="submit" class="submitpasswordChange" id="submitpasswordChange">Change password</button>

    </form>
    </div>
    `;

  let profileData = document.getElementById("profiledata");

  profileData.insertAdjacentHTML("afterbegin", htmlString);
}

function deletProfile() {
  let userId = sessionStorage.getItem("user");
  let user = JSON.parse(userId);

  // confirm button
  document.getElementById("confirm").addEventListener("click", () => {
    getData("http://localhost:3000/ID", "DELETE", user).then((result) => {
      alert(result.message);
      sessionStorage.clear();
      window.location.href = "./loginpage.html";
    });
  });
}

function update() {
  document.getElementById("submitNewEmail").addEventListener("click", (e) => {
    e.preventDefault();
    let userId = sessionStorage.getItem("user");

    let user = JSON.parse(userId);
    let email = document.getElementById('emailInputForm').value
const Update = {
        "email" : email,
        "firstname" : user.firstname,
        "lastname" : user.lastname,
        "password" : user.password,
        "uuid" : user.uuid
      };
    getData("http://localhost:3000/ID", "PUT", Update).then(result => {
      
      sessionStorage.setItem("user", JSON.stringify(Update));
      alert(result.data);

    });
  });
}

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
