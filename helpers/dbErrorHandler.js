"use strict";

const getUniqueErrorMessage = error => {
  try {
    const fieldName = error.message.substring(error.message.lastIndexOf(".$") + 2, error.message.lastIndexOf("_1"));
    return `${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)} already exists`;
  } catch {
    return "Unique field already exists";
  }
};

const getErrorMessage = error => {
  if (error.code === 11000 || error.code === 11001) {
    return getUniqueErrorMessage(error);
  }

  if (error.code) return "Something went wrong";

  for (const fieldError of Object.values(error.errors || {})) {
    if (fieldError.message) return fieldError.message;
  }
  return "Something went wrong";
};

module.exports = { getErrorMessage };