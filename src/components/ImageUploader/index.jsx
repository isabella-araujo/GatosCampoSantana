import './style.css';
import { useEffect, useRef, useState } from 'react';

import { FaImage } from 'react-icons/fa6';
import { HiOutlineUpload } from 'react-icons/hi';
import { PiWarningCircle } from 'react-icons/pi';

import ErrorMessage from '../ErrorMessage';

const MAX_IMAGE_SIZE = 921600;

export default function ImageUploader({
  children,
  file,
  onFile = () => {},
  error,
  onError = () => {},
}) {
  const classnameError = error ? 'error' : '';
  const inputRef = useRef(null);

  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    if (!file) {
      setPreviewImage(null);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  function handleClick() {
    if (!inputRef.current) return;
    inputRef.current.click();
  }

  function handleChange() {
    if (!inputRef.current) return;

    const fileInput = inputRef.current;
    const selectedFile = fileInput?.files?.[0];

    if (!selectedFile) return;

    if (MAX_IMAGE_SIZE < selectedFile.size) {
      onError('O tamanho da imagem ultrapassa o limite.');
      return;
    }

    if (typeof onError === 'function') {
      onError('');
    }
    if (typeof onFile === 'function') {
      onFile(selectedFile);
    }
  }

  function imageDisplay() {
    if (error) {
      return <PiWarningCircle className={`icon-image ${classnameError}`} />;
    }

    if (previewImage) {
      return <img className="image" src={previewImage} />;
    }

    return <FaImage className={`icon-image ${classnameError}`} />;
  }

  return (
    <div className="group-container">
      <div className={`container-image ${classnameError}`}>
        {imageDisplay()}
      </div>

      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleChange}
        className="uploader"
      />
      <button
        type="button"
        className={`btn-image-uploader${classnameError}`}
        onClick={handleClick}
      >
        {children} <HiOutlineUpload className="icon-btn" />
      </button>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}
