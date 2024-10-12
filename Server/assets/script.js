const token = "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";
const inputText = document.getElementById("input");
const img = document.getElementById("image");
const btn = document.getElementById("btn");
const clearInput = document.querySelector(".remove_input");

async function query(data) {
  img.src = "./../../Client/assets/giphy.gif";
  const response = await fetch(
    "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: data }),
    }
  );

  const result = await response.blob();
  return result;
}

btn.addEventListener("click", async function () {
  const input = inputText.value; // Lấy giá trị từ inputText
  if (input.length <= 0) {
    alert("Vui lòng nhập mô tả ảnh!");
    return;
  }
  query(input).then((response) => {
    // Truyền giá trị input vào hàm query
    const url = URL.createObjectURL(response);
    img.src = url;
  });
});
document.getElementById("image").addEventListener("click", function () {
  var imageSrc = document.getElementById("image").src;
  document.getElementById("lightboxImage").src = imageSrc;
});

inputText.addEventListener("input", function () {
  if (this.value.length > 0) {
    clearInput.classList.remove("d-none");
  } else {
    clearInput.classList.add("d-none");
  }
});

clearInput.addEventListener("click", function () {
  inputText.value = "";
  clearInput.classList.add("d-none");
});
