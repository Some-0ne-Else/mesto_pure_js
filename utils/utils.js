import {
  configValidation,
} from './constants.js';

/* clear popup validation errors */
function clearValidationErrors(formElement, formInstance) {
  const allFormInputs = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  allFormInputs.map(input => formInstance.hideInputError(formElement, input, configValidation.inputErrorClass, configValidation.errorClass));
}
export {
  clearValidationErrors,
};
