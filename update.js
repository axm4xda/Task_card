const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const fatherNameInput = document.getElementById("fatherName");
const profileInput = document.getElementById("profilePhotoLink");
const ageInput = document.getElementById("age");
const gradeInput = document.getElementById("grade");
const bioInput = document.getElementById("bio");

fetch(`http://gadimovsabir-001-site9.mtempurl.com/api/students/${id}`)
  .then(res => res.json())
  .then(student => {
    nameInput.value = student.name;
    surnameInput.value = student.surname;
    fatherNameInput.value = student.fatherName;
    profileInput.value = student.profilePhotoLink;
    ageInput.value = student.age;
    gradeInput.value = student.grade;
    bioInput.value = student.bio;
  });

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const updatedStudent = {
    name: nameInput.value,
    surname: surnameInput.value,
    fatherName: fatherNameInput.value,
    profilePhotoLink: profileInput.value,
    age: +ageInput.value,
    grade: +gradeInput.value,
    bio: bioInput.value
  };

  fetch(`http://gadimovsabir-001-site9.mtempurl.com/api/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedStudent)
  }).then(res => {
    if (res.ok) {
      alert("Student updated!");
      window.location.href = "index.html";
    }
  });
});
