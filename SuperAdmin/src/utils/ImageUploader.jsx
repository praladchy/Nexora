import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X, UploadCloud, Plus, Trash2 } from "lucide-react";

const ProductImageDropzone = ({ images, setFieldValue }) => {
  
  // Logic to handle file drops
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Map files to include a preview URL for the UI
      const filesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      // Update Formik state: append new images to existing ones
      setFieldValue("images", [...images, ...filesWithPreview]);
    },
    [images, setFieldValue]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  // Remove specific image by index
  const removeImage = (e, index) => {
    e.stopPropagation(); // Prevent dropzone from triggering when clicking delete
    const updated = [...images];
    // Revoke the data uri to avoid memory leaks
    URL.revokeObjectURL(updated[index].preview);
    updated.splice(index, 1);
    setFieldValue("images", updated);
  };

  // Facebook-style dynamic grid logic
  const getGridClass = (count) => {
    if (count <= 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-3";
    return "grid-cols-4"; // 4 or more images
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h3 className="font-semibold mb-3 text-gray-700">Product Gallery</h3>

      {/* MAIN CONTAINER (Large Preview or Dropzone) */}
      <div
        {...getRootProps()}
        className="relative h-72 w-full bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden group cursor-pointer transition-all hover:border-purple-400"
      >
        <input {...getInputProps()} />
        
        {images.length > 0 ? (
          <>
            <img
              src={images[0].preview}
              className="h-full w-full object-cover"
              alt="Main Product"
            />
            {/* Hover Overlay for Main Image */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity">
              <div className="bg-white/90 p-2 rounded-full mb-2 shadow-lg">
                <UploadCloud className="text-purple-600" size={24} />
              </div>
              <p className="text-white text-sm font-medium">Replace Main Image</p>
              
              <button
                onClick={(e) => removeImage(e, 0)}
                className="absolute top-3 right-3 bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transition-colors shadow-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-2">
            <div className="p-4 bg-gray-100 rounded-full">
              <UploadCloud size={40} className="text-gray-300" />
            </div>
            <p className="font-medium">Click or Drag Main Image</p>
            <p className="text-xs text-gray-400">Supports JPG, PNG, WEBP</p>
          </div>
        )}
      </div>

      {/* DYNAMIC SUB-GRID (Additional Images) */}
      {images.length > 1 && (
        <div className={`grid gap-3 mt-4 ${getGridClass(images.length - 1)}`}>
          {images.slice(1).map((file, index) => (
            <div 
              key={index + 1} 
              className="relative group h-28 rounded-lg overflow-hidden border border-gray-200 shadow-sm"
            >
              <img 
                src={file.preview} 
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" 
                alt={`Preview ${index + 1}`} 
              />
              
              {/* Hover Overlay for Grid Images */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <button
                  type="button"
                  onClick={(e) => removeImage(e, index + 1)}
                  className="bg-red-500 p-2 rounded-full text-white hover:scale-110 transition-transform shadow-md"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {/* Inline "Add More" Square */}
          <div 
            {...getRootProps()} 
            className="h-28 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-colors text-gray-400 hover:text-purple-500"
          >
            <Plus size={20} />
            <span className="text-[10px] font-medium mt-1 uppercase tracking-wider">Add More</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageDropzone;