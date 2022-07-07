const imageToBlobToBase64 = async (imageEndpoint) => {
  const response = await fetch("http://localhost:3333/" + imageEndpoint);
  const blob = await response.blob();

  const reader = new FileReader();
  const fileReaderLoadPromise = new Promise(resolve => {
    reader.addEventListener("load", () => resolve(reader.result));
  });

  reader.readAsDataURL(blob);
  const base64Img = await fileReaderLoadPromise;

  return base64Img;
};

export default imageToBlobToBase64;