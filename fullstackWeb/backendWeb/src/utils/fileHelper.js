export const getLocalFilePath = (files, fieldName) => {
  return Array.isArray(files?.[fieldName]) && files[fieldName][0]?.path
    ? files[fieldName][0].path
    : "";
};
