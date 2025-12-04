const form = document.getElementById("createForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const surname = document.getElementById("surname").value.trim();
  const fatherName = document.getElementById("fatherName").value.trim();
  const profilePhoto = document.getElementById("profilePhotoLink").value.trim();
  const age = Number(document.getElementById("age").value);
  const grade = Number(document.getElementById("grade").value);
  const bio = document.getElementById("bio").value.trim();


  if (name.length < 3) {
    alert("Name minimum 3 simvol olmalıdır!");
    return;
  }

  if (surname.length < 3) {
    alert("Surname minimum 3 simvol olmalıdır!");
    return;
  }

  if (age < 0) {
    alert("Age 0-dan kiçik ola bilməz!");
    return;
  }

  if (grade<0 || grade >100) {
    alert("Grade 0 və 100 arasında olmalıdır!")
    return;
  }


  const student = {
    name,
    surname,
    fatherName,
    profilePhoto,
    age,
    grade,
    bio,
  };


  fetch("http://gadimovsabir-001-site9.mtempurl.com/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  }).then((res) => {
    if (res.ok) {
      alert("Student created!");
      window.location.href = "index.html";
    } else {
      alert("Xəta baş verdi!");
    }
  });
});
