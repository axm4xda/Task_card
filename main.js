const tableBody = document.getElementById("tableBody");

function loadStudents() {
  fetch("http://gadimovsabir-001-site9.mtempurl.com/api/students")
    .then((res) => res.json())
    .then((data) => {
      tableBody.innerHTML = "";

      data.forEach((st) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${st.id}</td>
          <td>${st.name}</td>
          <td>${st.surname}</td>
          <td>${st.fatherName}</td>
          <td><img src="${st.profilePhotoLink}" width="60"></td>
          <td>${st.age}</td>
          <td>${st.grade}</td>
          <td>${st.bio}</td>

          <td>
            <a href="update.html?id=${st.id}" class="btn btn-warning btn-sm">Update</a>
          </td>

          <td>
            <button class="btn btn-danger delete-btn" data-id="${st.id}">
              Delete
            </button>
          </td>
        `;

        tableBody.appendChild(tr);
      });
    });
}

loadStudents();

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.getAttribute("data-id");

    Swal.fire({
      title: "Are you sure?",
      text: "yuz faiz silirsen?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vallah silirem",
      cancelButtonText: "Silesi olmadim"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://gadimovsabir-001-site9.mtempurl.com/api/students/${id}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
            Swal.fire({
              title: "Silindi!",
              text: "Sildim kef ele.",
              icon: "success",
            }).then(() => {
              window.location.reload();
            });
          } else {
            Swal.fire("Error!", "Silemmedim yaziqdi!", "error");
          }
        });
      }
    });
  }
});

