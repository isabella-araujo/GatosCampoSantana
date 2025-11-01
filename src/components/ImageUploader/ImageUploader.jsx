import styles from './ImageUploader.module.css';
import { useEffect, useRef, useState } from 'react';

import { FaImage } from 'react-icons/fa6';
import { HiOutlineUpload } from 'react-icons/hi';
import { PiWarningCircle } from 'react-icons/pi';

import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';

const MAX_IMAGE_SIZE = 921600;

export default function ImageUploader({
  children,
  file,
  onFile = () => {},
  error,
  onError = () => {},
}) {
  const classnameError = error ? styles.error : '';
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
      return (
        <PiWarningCircle className={`${styles.iconImage} ${classnameError}`} />
      );
    }

    if (previewImage) {
      return <img className={styles.image} src={previewImage} />;
    }

    return <FaImage className={`${styles.iconImage} ${classnameError}`} />;
  }

  return (
    <div className={styles.groupContainer}>
      <div className={`${styles.containerImage} ${classnameError}`}>
        {imageDisplay()}
      </div>

      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleChange}
        className={styles.uploader}
      />
      <button
        type="button"
        className={`${styles.btn} ${classnameError}`}
        onClick={handleClick}
      >
        {children} <HiOutlineUpload className={styles.iconBtn} />
      </button>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}
