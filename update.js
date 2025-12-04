const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  alert("Belə tələbə idsi tapılmadı");
  window.location.href = "index.html";
}

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const fatherInput = document.getElementById("fatherName");
const photoInput = document.getElementById("profilePhotoLink");
const ageInput = document.getElementById("age");
const gradeInput = document.getElementById("grade");
const bioInput = document.getElementById("bio");

fetch(`http://gadimovsabir-001-site9.mtempurl.com/api/students/${id}`)
  .then((res) => {
    if (!res.ok) throw new Error("Belə tələbə tapılmadı");
    return res.json();
  })
  .then((st) => {
    nameInput.value = st.name || "";
    surnameInput.value = st.surname || "";
    fatherInput.value = st.fatherName || "";
    photoInput.value = st.profilePhotoLink || "";
    ageInput.value = st.age || "";
    gradeInput.value = st.grade || "";
    bioInput.value = st.bio || "";
  })
  .catch((err) => {
    console.error("Tələbənin məlumatlarını yükləyərkən xəta:", err);
    alert("Tələbə məlumatları yüklənmədi");
    window.location.href = "index.html";
  });

const updateForm = document.getElementById("updateForm");

if (!updateForm) {
  console.error("'updateForm' id-li form tapılmadı");
}

updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!nameInput.value.trim() || !surnameInput.value.trim()) {
    alert("Ad və Soyad tələb olunur");
    return;
  }

  const updated = {
    name: nameInput.value.trim(),
    surname: surnameInput.value.trim(),
    fatherName: fatherInput.value.trim(),
    profilePhotoLink: photoInput.value.trim(),
    age: +ageInput.value,
    grade: +gradeInput.value,
    bio: bioInput.value.trim(),
  };

   fetch(`http://gadimovsabir-001-site9.mtempurl.com/api/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  })
    .then((data) => {
      console.log("Yenilənmiş məlumat:", data);
      alert("Uğurla yeniləndi!");
      window.location.href = "index.html";
    })
    .catch((err) => {
      console.error("Update zamanı xəta:", err);
      alert("Tələbə məlumatları yenilənmədi!");
    });
});