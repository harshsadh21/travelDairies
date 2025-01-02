import { useEffect, useRef, useState } from "react";
import { FaRegFileImage } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const ImageSelector = ({ image, setImage, handleDeleteImg }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleOnChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  const onChooseFile = () => {
    inputRef.current.click();
  };
  const handleRemove = () => {
    // setPreviewUrl(null);
    setImage(null);
    handleDeleteImg();
  };
  useEffect(() => {
    if (typeof image === "string") {
      setPreviewUrl(image);
    } else if (image) {
      setPreviewUrl(URL.createObjectURL(image));
    } else {
      setPreviewUrl(null);
    }

    return () => {
      if (previewUrl && typeof previewUrl === "string" && !image) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [image]);

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleOnChange}
        className="hidden"
      />

      {!image ? (
        <button
          className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50"
          onClick={() => onChooseFile()}
        >
          <div className="w-14 h-14 rounded-full bg-emerald-200 flex items-center justify-center border border-emerald-100">
            <FaRegFileImage className="text-sm text-emerald-600" />
          </div>
          <p className="text-lg text-slate-500">
            Browse the image files to upload{" "}
          </p>
        </button>
      ) : (
        <div className="w-full relative flex items-center justify-center ">
          <img
            src={previewUrl}
            alt="seleceted"
            className="w-full h-[300px] rounded object-cover"
          />
          <button
            className="px-2 py-2 bg-rose-400 hover:bg-rose-500 text-red-600 absolute top-2 right-3 rounded"
            onClick={handleRemove}
          >
            <MdDelete />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
