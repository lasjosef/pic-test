function getCurrentMonth() {
  const now = new Date();
  return now.toLocaleString('default', { month: 'long', year: 'numeric' });
}

document.getElementById('monthLabel').innerText =
  'Gallery for ' + getCurrentMonth();

function uploadPic() {
  const input = document.getElementById('fileInput');
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      document.getElementById('gallery').appendChild(img);
    };
    reader.readAsDataURL(file);
  }
}
