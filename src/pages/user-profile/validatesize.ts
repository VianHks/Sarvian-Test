export const validateFileSize = (file: File): boolean => {
  const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

  return file.size <= maxSizeInBytes;
};

export const toBase64 = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});
