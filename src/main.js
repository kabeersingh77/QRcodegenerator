const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById('url').value;
  const size = document.getElementById('size').value;

  if (url === '') {
    alert('Please enter a URL');
  }else{
    showLoader();

    setTimeout(() => {
      hideLoader();

      generateQRCode(url, size);

      setTimeout(() => { 
        const saveUrl = qr.querySelector('img').src;
        saveTheQR(saveUrl);
      }, 50);
    }, 1000);
  }
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode('qrcode', {
    text: url,
    width: size,
    height: size,
  });
};

const showLoader = () => {
  document.getElementById('loader').style.display = 'block';
};
const hideLoader = () => {
  document.getElementById('loader').style.display = 'none';
};

const clearUI = () => {
  qr.innerHTML = '';
  const saveLink = document.getElementById('save-link');
  if(saveLink) saveLink.remove();
};

const saveTheQR = (saveUrl) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList = 'bg-gray-300 hover:bg-slate-500 text-black font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = saveUrl;
  link.download = 'qrcode';
  link.innerHTML = 'Save Image';
  document.getElementById('generated').appendChild(link);
};

hideLoader();

form.addEventListener('submit', onGenerateSubmit);