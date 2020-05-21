//функция вывода ошибки  принимает пар1 форму, пар2 input элемент, пар3 сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); //объявляем константу значением которой является имя инпут элемента с постфиксом "-error"
  inputElement.classList.add(inputErrorClass); //навешиваем инпуту модификатор  с классом ошибки
  errorElement.textContent = errorMessage; //выводим сообщение об ошибке переданное параметром 3
  errorElement.classList.add(errorClass); //навешиваем тексту ошибки класс модификатор для отображентия ошибки
};
//вспомогательная функция проверяющая не содержит ли один из элементов списка валидности, не валидный в данный момент параметр
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если хотя бы одно поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid; //Если хотя бы одно поле не валидно, вернем true
  })
};

// Тогглер активности кнопки пар1 список элементов проверки пар2 кнопка
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) { //если функция вернула true (значит есть ошибка в одном и более параметрах валидации)
    buttonElement.classList.add(inactiveButtonClass); //добавляем модификатор неактивности кнопки
  } else {
    buttonElement.classList.remove(inactiveButtonClass); // иначе убираем модификатор
  }
}

// функция убирающая вывод ошибки (пар1 форма, пар2 нужный нам инпут)
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); //находим нужный инпут по id и ожидаем что у него будет постфикс "-error"
  inputElement.classList.remove(inputErrorClass); //снимаем с инпута класс ошибки
  errorElement.classList.remove(errorClass); //снимаем поля ошибки класс показывающий текущую ошибку
  errorElement.textContent = ''; //очищаем текст сообщения об ошибке
};

//функция проверки валидности элемента формы пар1 форма, пар2 нужный инпут
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) { //если у инпута состояние валидности ложно
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass); //вызываем описанную ранее функцию отображения ошибки с тремя параметрам пар1 форма, пар2 инпут, пар3 сообщение валидации
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass); //иначе вызываем функцию убирающую сообщение об ошибке
  }
};

//функция навешивающая ждунов-слушателей на форму
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector)); //соберем все инпуты  формы и сделаем из них массив
  const buttonElement = formElement.querySelector(submitButtonSelector); //присвоим новой константе селектор кнопки отправки обрабатываемой формы
  toggleButtonState(inputList, buttonElement, inactiveButtonClass); // потыкаем палочкой кнопку чтобы задать ей актуальное состояние

  inputList.forEach((inputElement) => { //для каждого элемента из собранного массива инпутов
    inputElement.addEventListener('input', function () { //добавим по ждуну-слушателю
      toggleButtonState(inputList, buttonElement, inactiveButtonClass); //и конечно потыкаем палочкой тоглер кнопки
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass); //вызовем функцию проверки валидности элемента формы
    });
  });
};

//функция перепроверяющая актуальность состояния кнопки, в случае если данные полей попапа изменились _позднее_ _и_ без использования метода _input_
const refreshButtonState = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector)); //соберем все инпуты  формы и сделаем из них массив
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
}



//убер функция включающая валидацию "всех" форм на странице
const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
  const formList = Array.from(document.querySelectorAll(formSelector)); //сделаем массив из массивоподобного списка всех форм на странице (см описание функции касательно всех)
  formList.forEach((formElement) => { //для каждой формы
    formElement.addEventListener('submit', function (evt) { //добавим ждуна на отправку
      evt.preventDefault(); //предотвратим действие по умолчанию
    });
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);

  });
};

//Для простоты и последующей интеграции с беком
const allForms = [{
  formSelector: '.popup-edit-profile__container',
  inputSelector: '.popup-edit-profile__input',
  submitButtonSelector: '.popup-edit-profile__action-button',
  inactiveButtonClass: 'popup-edit-profile__action-button_disabled',
  inputErrorClass: 'popup-edit-profile__input_type_error',
  errorClass: 'popup-edit-profile__input-error_active'
},
{
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__action-button',
  inactiveButtonClass: 'popup__action-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}];
//обработаем все формы полученные из массива
allForms.forEach(item => enableValidation(item));
