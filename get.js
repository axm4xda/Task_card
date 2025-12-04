const table = document.querySelector(".table");

fetch("http://gadimovsabir-001-site9.mtempurl.com/api/students")
  .then((res) => res.json())
  .then((data) => {
    let tbody = "<tbody>";

    data.forEach((student) => {
      tbody += `
        <tr>
          <th scope="row">${student.id}</th>
          <td>${student.name}</td>
          <td>${student.surname}</td>
          <td>${student.fatherName}</td>
          <td>${student.age}</td>
          <td>${student.grade}</td>
          <td>${student.bio}</td>
          <td><button type="button" class="btn btn-warning" studentid="${student.id}">Update</button></td>
          <td><button type="button" class="btn btn-danger" studentid="${student.id}">Delete</button></td>
        </tr>
      `;
    });

    tbody += "</tbody>";
    table.innerHTML += tbody;

    const updateButtons = document.querySelectorAll(".btn-warning");
    const deleteButtons = document.querySelectorAll(".btn-danger");

    deleteButtons.forEach((btn) => {
      let id = btn.getAttribute("studentid");
      btn.addEventListener("click", (e) => {
        fetch(`http://gadimovsabir-001-site9.mtempurl.com/api/students/${id}`, {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
        }).then((res) => {
          if (res.ok) {
            window.location.reload();
          }
        });
      });
    });

    updateButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        let id = btn.getAttribute("studentid");
        window.location.href = `update.html?id=${id}`;
      });
    });
  });
