import { useEffect, useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

function ViewImage(setFile, file) {
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);

  const changeHandler = (e) => {
    const { files } = e.target;
    const validImageFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file);
      }
    }
    if (validImageFiles.length) {
      setImageFiles(validImageFiles);
      return;
    }
    alert("Selected images are not of valid type!");
  };

  useEffect(() => {
    const images = [], fileReaders = [];
    let isCancel = false;
    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result)
          }
          if (images.length === imageFiles.length && !isCancel) {
            setImages(images);
          }
        }
        fileReader.readAsDataURL(file);
      })
    };
    setFile(imageFiles);
    return () => {
      isCancel = true;
      fileReaders.forEach(fileReader => {
        if (fileReader.readyState === 1) {
          fileReader.abort()
        }
      })
    }
  }, [imageFiles, setFile]);
  return (
    <div className="ImageUpload">
      {/* <form> */}
        <p className="paragraph">
          <div className="second-paragraph">
          <input
            type="file"
            id="file"
            onChange={changeHandler}
            accept="image/png, image/jpg, image/jpeg"
            multiple
            className="input-pics"
          />
          <FontAwesomeIcon icon="plus" className="plus"></FontAwesomeIcon>
          <span className="button-title">Ajouter une photo</span>
          </div>
          {
            images.length > 0 ?
              <div className="image-container">
                {
                  images.map((image, idx) => {
                    return <p key={idx}> <img src={image} alt="uploaded" className="uploaded-images"/> </p>
                  })
                }
              </div> : null
          }
        </p>
      {/* </form> */}
    </div>
  );
}

export default ViewImage;