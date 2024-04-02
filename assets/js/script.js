var bgSetting = 0;

function toggleBg() {
  bgSetting++
  if (bgSetting > 2) bgSetting = 0;
  for (let img of document.getElementsByTagName("img")) {
    img.className = `bg-${bgSetting}`;
  }
}

function search() {
  let query = document.getElementById('finder').value.trim().toLowerCase()
  if (query.length <= 0) {
    for (let imgbox of document.getElementsByClassName("imgbox")) {
      imgbox.style.display = "inline-block"
    }
  }
  for (let imgbox of document.getElementsByClassName("imgbox")) {
    imgbox.style.display = "inline-block"
    if (!imgbox.id.includes(query)) {
      imgbox.style.display = "none"
    }
  }
}

function download(f, e) {
  if (document.getElementById("copycheck").checked) {
    var data = getBase64Image(e);
    // var data = "data:image/png;base64," + data;
    navigator.clipboard.write([new ClipboardItem({ "image/png": data })])
  } else {
    if (document.getElementById("pngcheck").checked) {
      var data = getBase64Image(e);
      let a = document.createElement('a')
      a.href = "data:application/octet-stream;base64," + data
      a.download = f.replace('.svg', '.png')
      a.click()
    } else {
      let a = document.createElement('a')
      a.href = f
      a.download = f
      a.click()
    }

  }
}


// Actual magic
function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  console.log(canvas.width, canvas.height)
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}