var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");

if (isLogin === null || isLogin === false) {
  location.href = `${location.origin}/login.html`;
}else {
  if (role !== "Admin") {
    location.href = `${location.origin}/huyen.html`;
  }
}



let tbody = document.getElementById("tbody");

fetch("https://touring.glitch.me/user")
  .then((res) => res.json())
  .then((json) => {
    json.map((data) => {
      tbody.append(td_fun(data));
    });
  });
var modal = document.getElementById("id01");
var modalUpdate = document.getElementById("id02");
var modalDelete = document.getElementById("id03");

function checkLogin() {
  if (isLogin === null || isLogin === false) {
    modal.style.display = "block";
  } else {
    alert("Hello Huyen!");
  }
}
var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
  modalUpdate.style.display = "none";
  modalDelete.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modalUpdate.style.display = "none";
    modalDelete.style.display = "none";
  }
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modalUpdate.style.display = "none";
    modalDelete.style.display = "none";
  }
};

function td_fun({ id, name, email, phone, status, role }) {
  let td = document.createElement("tr");
  td.setAttribute("id", `child-${id}`);
  td.innerHTML = `
  <th scope="row">${id}</th>
  <td>${name}</td>
  <td>${email}</td>
  <td>${phone}</td>
  <td>${role}</td>
  <td class="color-primary">${status}</td>
  <td>
  <span class="color-dark ti-home cursor" onclick="checkLogin()"></span>
    <span class="color-dark ti-pencil-alt cursor" id="updateBtn" onclick="handleGetDetail(${id})"></span>
    <span class="ti-trash color-danger cursor" id="deleteBtn" onclick="handleOpenModalDelete(${id})"></span>
  </td>
    `;
  return td;
}
var idUserDelete = "";
async function handleOpenModalDelete(id) {
  idUserDelete = id;
  modalDelete.style.display = "block";
}

async function handleDelete() {
  event.preventDefault();
  await axios
    .delete(`https://touring.glitch.me/user/${idUserDelete}`)
    .then((response) => {
      document.getElementById(`child-${idUserDelete}`).remove();
      modalDelete.style.display = "none";
      idUserDelete = "";
      toastr.success("Delete user successfully", "Message", {
        timeOut: 5000,
        closeButton: true,
        debug: false,
        newestOnTop: true,
        progressBar: true,
        positionClass: "toast-top-right",
        preventDuplicates: true,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
        tapToDismiss: false,
      });
    });
}
var idUserUpdate = "";

async function handleGetDetail(id) {
  event.preventDefault();
  await axios.get(`https://touring.glitch.me/user/${id}`).then((response) => {
    idUserUpdate = response.data.id;
    document.getElementById("name-update").value = response.data.name
      ? response.data.name
      : "";
    document.getElementById("email-update").value = response.data.email
      ? response.data.email
      : "";
    document.getElementById("phone-update").value = response.data.phone
      ? response.data.phone
      : "";
    document.getElementById("role-update").value = response.data.role
      ? response.data.role
      : "";
    document.getElementById("status").value = response.data.status;
    var modal = document.getElementById("id02");
    modal.style.display = "block";
  });
}

async function handleSubmit(event) {
  event.preventDefault();
  var name = document.querySelector('input[name="name"]').value;
  var email = document.querySelector('input[name="email"]').value;
  var phone = document.querySelector('input[name="phone"]').value;
  var role = document.querySelector('input[name="role"]').value;
  await axios
    .post("https://touring.glitch.me/user", {
      name: name,
      email: email,
      phone: phone,
      status: "Active",
      role: role,
    })
    .then((response) => {
      var modal = document.getElementById("id01");
      modal.style.display = "none";
      tbody.append(td_fun(response.data));
      toastr.success("Add user successfully", "Message", {
        timeOut: 5000,
        closeButton: true,
        debug: false,
        newestOnTop: true,
        progressBar: true,
        positionClass: "toast-top-right",
        preventDuplicates: true,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
        tapToDismiss: false,
      });
    });
  event.target.reset();
}

async function handleUpdate(event) {
  event.preventDefault();
  var name = document.querySelector('input[name="name-update"]').value;
  var email = document.querySelector('input[name="email-update"]').value;
  var phone = document.querySelector('input[name="phone-update"]').value;
  var role = document.querySelector('input[name="role-update"]').value;
  var status = document.querySelector('select[name="status"]').value;

  await axios
    .put(`https://touring.glitch.me/user/${idUserUpdate}`, {
      name: name,
      email: email,
      phone: phone,
      status: status,
      role: role,
    })
    .then((response) => {
      var modal = document.getElementById("id02");
      idUserUpdate = "";
      toastr.success("Update user successfully", "Message", {
        timeOut: 2000,
        closeButton: true,
        debug: false,
        newestOnTop: true,
        progressBar: true,
        positionClass: "toast-top-right",
        preventDuplicates: true,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
        tapToDismiss: false,
      });
      setTimeout(function () {
        location.reload();
      }, 1000);
    });
}
function sendEmail(name, email, subject, message) {
  const data = JSON.stringify({
    "Messages": [{
      "From": {"Email": "phamvanquy1306@gmail.com", "Name": "Van Quy"},
      "To": [{"Email": "zznhatphilong@gmail.com", "Name": "Nhat Phi Long"}],
      "Subject": 'Hello',
      "TextPart": "Nhat Phi Long"
    }]
  });

  const config = {
    method: 'post',
    url: 'https://api.mailjet.com/v3.1/send',
    data: data,
    headers: {'Content-Type': 'application/json'},
    auth: {username: '67a767abc536470d547531b44ce75d5a', password: '44ad8d2d093dcd1a1de5e6a16f71ddb5'},
  };

  try {
    const response = axios(config);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
}