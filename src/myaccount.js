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
  });

  //update password
  document.getElementById("updatepassword").addEventListener("click", () => {
    document.getElementById("passwordInput").style.display = "block";
  });

  //logout
  document.getElementById("Logout").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "./index.html";
  });
};

function profiledata() {
  //https://stackoverflow.com/questions/63300478/how-to-get-value-from-session-storage

  let userId = sessionStorage.getItem("user");
  let data = JSON.parse(userId);
  let email = data.email;
  let firstname = data.firstname;
  let password = data.password;
  let lastname = data.lastname;
  let id = data.uuid;

  let htmlString = "";

  htmlString += ` <h2 class="profildata" id=" textprofil">First name : ${firstname} </h2>
    <h3 class="firstname" id="firstname"></h3>
    <h2 class="profildata">Last Name : ${lastname} </h2>
   
  
    <h2>Email :  ${email} </h2>
    <div class="changeEmail">
   <button id="changeEmail"><h3> Change mail <i class="material-icons updateacc" >create</i></h3></button>
    </div>
    <div class="emailInput" style="display: none;" id="emailInput">
    <input type="text"  id="emailInputForm" name="email" placeholder="New email">
    <button type="submit"  id="submitNewEmail">Change email</button>

    </div>
    <h2>Password : <h2 type ="password"> </h2></h2>
    <div class="Passwordchange">
    <button id="updatepassword"><h3><a>Change password <i class="material-icons updatepassword" >create</i></a></h3></button>
    </div>
    <div class="passwordInput" style="display: none;" id="passwordInput">
    <form class="passwordChangeForm" id="passwordChangeForm">
    <input type="text"  id="Newpassword" name="password" placeholder="New password">

    <button type="submit" class="submitpassword" id="submitpassword">Change password</button>

    </form>
    </div>
    `;
  let profileData = document.getElementById("profiledata");

  profileData.insertAdjacentHTML("afterbegin", htmlString);

  updatemail(firstname, lastname, password, id);
  updatepassword(email, firstname, lastname, id);
}

// DELETE PROFILE
function deletProfile() {
  let userId = sessionStorage.getItem("user");
  let user = JSON.parse(userId);

  // confirm button
  document.getElementById("confirm").addEventListener("click", () => {
    getData("https://web2project.onrender.com/user/ID", "DELETE", user).then((result) => {
      alert(result.message);
      sessionStorage.clear();
      window.location.href = "./loginpage.html";
    });
  });
}

//CHANGEMAIL
function updatemail(firstname, lastname, password, id) {
  document.getElementById("submitNewEmail").addEventListener("click", (e) => {
    e.preventDefault();

    let email = document.getElementById("emailInputForm").value;
    const Update = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      uuid: id,
    };
    getData("https://web2project.onrender.com/user/ID", "PUT", Update).then((data) => {
      sessionStorage.setItem("user", JSON.stringify(Update));

      if (data.succes == "Successfully update!") {
        alert(JSON.stringify(data.succes));

        location.reload();
      } else {
        alert(JSON.stringify(data));
      }
    });
  });
}

// CHANGEPASSWORD

function updatepassword(email, firstname, lastname, id) {
  document.getElementById("submitpassword").addEventListener("click", (e) => {
    e.preventDefault();

    let password = document.getElementById("Newpassword").value;
    console.log(password);
    const UpdatePassword = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      uuid: id,
    };
    getData("https://web2project.onrender.com/user/ID", "PUT", UpdatePassword).then(
      (data) => {
        sessionStorage.setItem("user", JSON.stringify(UpdatePassword));

        if (data.succes == "Successfully update!") {
          alert(JSON.stringify(data.succes));

          location.reload();
        } else {
          alert(JSON.stringify(data));
        }
      }
    );
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
