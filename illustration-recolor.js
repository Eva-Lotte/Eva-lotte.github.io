(function () {
  let THRESHOLD = 240;

  function recolor(img) {
    let canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.className = img.className;

    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    let imageData;
    try {
      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    } catch (e) {
      return;
    }

    let data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] >= THRESHOLD && data[i + 1] >= THRESHOLD && data[i + 2] >= THRESHOLD) {
        data[i + 3] = 0;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    img.replaceWith(canvas);
  }

  function handle(img) {
    if (img.complete && img.naturalWidth) {
      recolor(img);
    } else {
      img.addEventListener('load', function () {
        recolor(img);
      });
    }
  }

  document.querySelectorAll('img.illustration').forEach(handle);
})();
