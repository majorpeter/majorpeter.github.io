let model = null;

const INPUT_SIZE = [180, 180];
const IMAGES = [
  'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/d/d5/Retriever_in_water.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/a/af/Golden_retriever_eating_pigs_foot.jpg',

  'https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/9/9b/Gustav_chocolate.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg'
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
    const fmt = 'This image looks like a <span class="badge rounded-pill bg-info text-dark">{category}</span>';
    if (pred < 0.5) {
      resultText.innerHTML = fmt.replace('{category}', 'Cat');
      displayProbability(1-pred);
    } else {
      resultText.innerHTML = fmt.replace('{category}', 'Dog');
      displayProbability(pred);
    }
  };
  img.src = url;
}

(async () => {
  model = await tf.loadGraphModel('model.json');

  document.getElementById('view-btn').addEventListener('click', (ev) => {
    window.open(document.getElementById('current-image').src, '_blank');
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

  setImageAndPredict(IMAGES[Math.floor(Math.random() * IMAGES.length)]);
})();
