const GAS_URL = "https://script.google.com/macros/s/AKfycbyP9IMp9U2ogwcmhsCOAXax3RpRRR5fuQC8dJORrm663Ib4tFcqh2qgkcs9lo19A04/exec";

document.getElementById("uploadBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const pathInput = document.getElementById("pathInput");
  const result = document.getElementById("result");

  if (!fileInput.files.length || !pathInput.value) {
    alert("ファイルとアップロード先パスを指定してください");
    return;
  }

  const file = fileInput.files[0];
  const base64 = await toBase64(file);

  result.textContent = "アップロード中...";

  try {
    const res = await fetch(GAS_URL + "?route=upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        path: pathInput.value,
        content: base64,
        message: `upload ${file.name}`
      })
    });
    const data = await res.json();
    result.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    result.textContent = "エラー: " + err.message;
  }
});

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
