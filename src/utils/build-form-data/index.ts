type PlainObject = Record<string, any>;

/**
 * Recursively appends keys and values from a nested object into FormData.
 * Supports arrays, nested objects, File objects, and primitive types.
 *
 * @param formData - The FormData instance to append to.
 * @param data - The source object with form data.
 * @param parentKey - Internal param for nested keys (do not set manually).
 */
function appendFormData(formData: FormData, data: PlainObject, parentKey = "") {
  if (data === null || data === undefined) return;

  if (
    typeof data !== "object" ||
    data instanceof Date ||
    data instanceof File ||
    data instanceof Blob
  ) {
    // Primitive or file/blob or date: append directly
    formData.append(parentKey, data instanceof Date ? data.toISOString() : data);
    return;
  }

  if (Array.isArray(data)) {
    data.forEach((value, index) => {
      const key = `${parentKey}[${index}]`;
      appendFormData(formData, value, key);
    });
  } else {
    Object.entries(data).forEach(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}[${key}]` : key;
      appendFormData(formData, value, fullKey);
    });
  }
}

/**
 * Builds a FormData object from a plain JavaScript object.
 *
 * @param data - The data object to convert.
 * @returns A FormData instance representing the object.
 */
export function buildFormData(data: PlainObject): FormData {
  const formData = new FormData();
  appendFormData(formData, data);
  return formData;
}
