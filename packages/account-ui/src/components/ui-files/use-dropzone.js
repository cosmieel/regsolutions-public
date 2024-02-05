import { ref } from 'vue';
import { useDropzone as useDropzoneLibrary } from 'vue3-dropzone';
import { ERROR_MESSAGES } from './constants.js';

/**
 * Return boolean value
 *
 * @param {Array} fileRejections
 * @param {string} target
 */
const getFileStateByTarget = (fileRejections, target) =>
  fileRejections
    .flatMap((item) => (item?.errors || []).map((error) => error?.code))
    .includes(target);

export const useDropzone = (props, emit) => {
  const { name, accept, minFileBytes, maxFileBytes, preventDropOnDocument, multiple } = props;

  const error = ref(null);
  const isUploading = ref(false);

  const onDrop = async (acceptFiles, rejectReasons) => {
    if (isUploading.value) {
      return;
    }

    const result = { name, acceptFiles, rejectReasons, error: null, image: null };
    const isInvalidType = getFileStateByTarget(rejectReasons, 'file-invalid-type');
    const isToLarge = getFileStateByTarget(rejectReasons, 'file-too-large');

    error.value = null;

    if (isInvalidType) {
      result.error = ERROR_MESSAGES.wrongFormat;
    } else if (isToLarge) {
      result.error = ERROR_MESSAGES.toLarge;
    }

    result.acceptFiles = acceptFiles.length === 0 ? null : acceptFiles;

    result.rejectReasons = rejectReasons.length === 0 ? null : rejectReasons;

    error.value = result.error;

    emit('drop', result);
  };

  const { getRootProps, isDragActive, isDragReject, acceptedFiles, getInputProps, fileRejections } =
    useDropzoneLibrary({
      onDrop,
      multiple,
      minSize: minFileBytes,
      maxSize: maxFileBytes,
      accept: accept.map((option) => option.value),
      preventDropOnDocument,
    });

  return {
    name,
    error,
    accept,
    isUploading,
    getRootProps,
    isDragActive,
    isDragReject,
    acceptedFiles,
    getInputProps,
    fileRejections,
  };
};
