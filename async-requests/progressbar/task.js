document.getElementById("form").onsubmit = async (event) => {
  event.preventDefault();
  uploadFile();
};

function uploadFile() {
  const response = new XMLHttpRequest();

  response.upload.onprogress = (event) => {
    document.getElementById("progress").value = `${event.loaded / event.total}`;
  };

  response.upload.onerror = function () {
    alert(`Произошла ошибка во время отправки: ${response.status}`);
  };

  response.onloadend = () => {
    if (response.status === 201) {
      alert("Файл загружен успешно");
    } else {
      alert("Ошибка " + this.status);
    }
  };

  response.open(
    "POST",
    "https://students.netoservices.ru/nestjs-backend/upload"
  );
  response.send(new FormData(document.forms.form));
}
