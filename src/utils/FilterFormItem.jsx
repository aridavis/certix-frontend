export const CreateTextField = (name, label, type, enabled) => {
  return { field_type: "textfield", name, label, type, enabled };
};

export const CreateDateField = (name, label, type) => {
  return { field_type: "date", name, label, type };
};

export const CreateDateTimeField = (name, label, type) => {
  return { field_type: "datetime", name, label, type };
};

export const CreateMediaFileField = (name, label, type) => {
  return { field_type: "media_file", name, label, type };
};
export const CreateFileField = (name, label, type) => {
  return { field_type: "file", name, label, type };
};

export const CreateSelect = (name, label, values) => {
  return { field_type: "select", name, label, values };
};

export const CreateThumbnailField = (name, label) => {
  return { field_type: "thumbnail", name, label };
};

export const CreateAutoComplete = (
  name,
  model_name,
  label,
  values,
  option,
  multiple
) => {
  return {
    field_type: "autocomplete",
    name,
    model_name,
    label,
    values,
    option,
    multiple,
  };
};
