class FormValidator {
  constructor(configValidation, currentForm) {
    this._formSelector = currentForm;
    this._inputSelector = configValidation.inputSelector;
    this._submitButtonSelector = configValidation.submitButtonSelector;
    this._inactiveButtonClass = configValidation.inactiveButtonClass;
    this._inputErrorClass = configValidation.inputErrorClass;
    this._errorClass = configValidation.errorClass;
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // объявляем константу значением которой является имя инпут элемента с постфиксом "-error"
    inputElement.classList.add(this._inputErrorClass); // навешиваем инпуту модификатор  с классом ошибки
    errorElement.textContent = errorMessage; // выводим сообщение об ошибке переданное параметром 3
    errorElement.classList.add(this._errorClass); // навешиваем тексту ошибки класс модификатор для отображентия ошибки
  };

  // вспомогательная функция проверяющая не содержит ли один из элементов списка валидности, не валидный в данный момент параметр
  _hasInvalidInput(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если хотя бы одно поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid; // Если хотя бы одно поле не валидно, вернем true
    });
  };

  // Тогглер активности кнопки пар1 список элементов проверки пар2 кнопка
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) { // если функция вернула true (значит есть ошибка в одном и более параметрах валидации)
      buttonElement.classList.add(this._inactiveButtonClass); // добавляем модификатор неактивности кнопки
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass); // иначе убираем модификатор
    }
  };

  // функция убирающая вывод ошибки (пар1 форма, пар2 нужный нам инпут)
  hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // находим нужный инпут по id и ожидаем что у него будет постфикс "-error"
    inputElement.classList.remove(this._inputErrorClass); // снимаем с инпута класс ошибки
    errorElement.classList.remove(this._errorClass); // снимаем поля ошибки класс показывающий текущую ошибку
    errorElement.textContent = ''; // очищаем текст сообщения об ошибке
  };

  // функция проверки валидности элемента формы пар1 форма, пар2 нужный инпут
  _checkInputValidity(formElement, inputElement, _inputErrorClass, _errorClass) {
    if (!inputElement.validity.valid) { // если у инпута состояние валидности ложно
      this._showInputError(formElement, inputElement, inputElement.validationMessage); // вызываем описанную ранее функцию отображения ошибки с тремя параметрам пар1 форма, пар2 инпут, пар3 сообщение валидации
    } else {
      this.hideInputError(formElement, inputElement); // иначе вызываем функцию убирающую сообщение об ошибке
    }
  };

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector)); // соберем все инпуты  формы и сделаем из них массив
    const buttonElement = formElement.querySelector(this._submitButtonSelector); // присвоим новой константе селектор кнопки отправки обрабатываемой формы
    this._toggleButtonState(inputList, buttonElement); // потыкаем палочкой кнопку чтобы задать ей актуальное состояние
    inputList.forEach((inputElement) => { // для каждого элемента из собранного массива инпутов
      inputElement.addEventListener('input', () => { // добавим по слушателю
        this._toggleButtonState(inputList, buttonElement); // и конечно потыкаем палочкой тоглер кнопки
        this._checkInputValidity(formElement, inputElement); // вызовем функцию проверки валидности элемента формы
      });
    });
  };

  enableValidation() {
    const formElement = document.querySelector(this._formSelector);
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(formElement);
  };
}

export default FormValidator;

