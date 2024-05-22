import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function Previews({ setImages }) {
  const [acceptFileError, setAcceptFileError] = useState(false);
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpeg": [],
    },
    maxFiles: 4,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            //need to create a preview URL for the image to show it in the UI. when we upload something it is saved inside the browser memory and we can access it using URL.createObjectURL(file)
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  useEffect(() => {
    if (fileRejections.length > 0) {
      setAcceptFileError(true);
    } else {
      setAcceptFileError(false);
    }
  }, [fileRejections]);

  useEffect(() => {
    setImages(files);
  }, [files]);

  const clearImages = (e) => {
    e.preventDefault();
    setFiles([]);
  };

  return (
    <>
      <section className="flex flex-col justify-between items-center p-4 rounded-md  border-2 border-cyan-600 border-dashed ml-2">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p className=" text-start text-gray-400">
            Drag 'n' drop images here, or click to select images
          </p>
          {acceptFileError && (
            <p className="text-red-500">
              Only png and jpeg files are accepted & maximum number of files are
              4
            </p>
          )}
        </div>
        <div className="flex w-full  flex-row justify-start">
          {files.map((file) => (
            <img
              key={file.name}
              src={file.preview}
              className="h-20 object-cover objecr-center shadow-2xl "
              // Revoke data uri after image is loaded
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
          ))}
        </div>
      </section>
      <div className="flex justify-end mt-2">
        <button
          onClick={clearImages}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
          disabled={files.length === 0}
        >
          Clear Images
        </button>
      </div>
    </>
  );
}

export default Previews;
