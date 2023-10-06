let model = null;

const INPUT_SIZE = [180, 180];
const IMAGES = [
  'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/d/d5/Retriever_in_water.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/a/af/Golden_retriever_eating_pigs_foot.jpg',

  'https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/9/9b/Gustav_chocolate.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg',

  // Unsplash+ License
  'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80',
  'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
  'https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1501&q=80',
  'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
  'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1392&q=80',
  'https://images.unsplash.com/photo-1536590158209-e9d615d525e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',

  // Unsplash+ License
  'https://plus.unsplash.com/premium_photo-1677542200557-3c6856cc98b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
  'https://images.unsplash.com/photo-1600788284711-5990de63b87f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1601938575577-b4b3f7ca2a59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80',
  'https://images.unsplash.com/photo-1610747144930-b29a6a2b2a17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
  'https://images.unsplash.com/photo-1575412941904-5e3112207df9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
  'https://images.unsplash.com/photo-1577911691951-ceb68631db24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1346&q=80',
  'https://images.unsplash.com/photo-1577427142259-7c9b8e6b3c78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1292&q=80',
  'https://images.unsplash.com/photo-1559220217-7eceb054c317?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
  'https://images.unsplash.com/photo-1561312176-5aedf7172115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1286&q=80',
  'https://images.unsplash.com/photo-1577961076884-0f5f28e48cfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
  'https://images.unsplash.com/photo-1565858426981-d60bfbe93b17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1289&q=80'
];

/**
 * predict whether image is of cat or dog
 * @param {Image} im input image of any size
 * @returns float number, 0 mean cat, 1 means dog
 */
async function predict(im) {
  const tensor = tf.browser.fromPixels(im).resizeBilinear(INPUT_SIZE);
  return (await model.predict(tensor.expandDims(0)).asScalar().data())[0];
}

function displayProbability(p) {
  let color = '#198754';
  if (p < 0.95) {
    color = '#758f27';
  } else if (p < 0.8) {
    color = '#ffc107';
  } else if (p < 0.65) {
    color = '#dc3545';
  }

  const el = document.getElementById('probability');
  el.innerHTML = Math.round(p * 1e6) / 1e4 + '%';
  el.setAttribute('style', 'color:' + color);
}

/**
 * show or hide loading spinner
 * @param {boolean} visible
 */
function setLoadingSpinnerVisible(visible) {
  document.getElementById('loading-spinner').setAttribute('style', visible ? '' : 'display:none');
  document.getElementById('current-image').setAttribute('style', visible ? 'display:none' : '');
}

async function setImageAndPredict(url) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onerror = (ev) => {
    alert('Error during image download! (Probably CORS policy.)');
  };
  img.onload = async() => {
    setLoadingSpinnerVisible(false);

    document.getElementById('current-image').src = img.src;
    const pred = await predict(img);

    const resultText = document.getElementById('result');
    const fmt = 'This image looks like a <span class="badge rounded-pill bg-{bg} text-dark">{category}</span>';
    if (pred < 0.5) {
      resultText.innerHTML = fmt.replace('{category}', 'Cat').replace('{bg}', 'danger');
      displayProbability(1-pred);
    } else {
      resultText.innerHTML = fmt.replace('{category}', 'Dog').replace('{bg}', 'primary');
      displayProbability(pred);
    }
  };
  img.src = url;
}

async function setRandomImage() {
  setLoadingSpinnerVisible(true);
  setImageAndPredict(IMAGES[Math.floor(Math.random() * IMAGES.length)]);
}

(async () => {
  await tf.setBackend('wasm');
  model = await tf.loadGraphModel('model.json');

  document.getElementById('view-btn').addEventListener('click', () => {
    window.open(document.getElementById('current-image').src, '_blank');
  });
  document.getElementById('random-btn').addEventListener('click', () => {
    setRandomImage();
  });

  const dropzone = document.getElementById('current-image-container');
  dropzone.addEventListener('dragenter', (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    dropzone.classList.add('blinky');
  });
  dropzone.addEventListener('dragover', (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
  });
  dropzone.addEventListener('dragleave', (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    if (ev.fromElement.parentElement != dropzone && ev.fromElement != dropzone) {
      dropzone.classList.remove('blinky');
    }
  });
  dropzone.addEventListener('drop', (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    dropzone.classList.remove('blinky');
    const url = ev.dataTransfer.getData('URL');
    setImageAndPredict(url);
  });

  setRandomImage();
})();
