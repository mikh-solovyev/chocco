const form = document.querySelector(".form");
const modal = document.querySelector("#modal");
const modalText = modal.querySelector(".modal__text");
const modalCloseBtn = document.querySelector(".app-modal-close");
const reset = document.querySelector(".form__reset");
/**
 * Функция для покази или закрытия всплывающего модального окна
 */
const toggleModal = () => {
    if(modal.classList.contains("active")) {
        modal.classList.remove("active");
    } else {
        modal.classList.add("active");
    }

    // Убираем или добавлчем вертикальный скролл
    changeScroll();
};

/**
 * Обратотчик закрытия модального окна
 */
modalCloseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleModal();
});

/**
 * Функция валидации формы на пустые занчения
 * @param fields
 * @returns {boolean}
 */
const validateForm = (...fields) => {
    const emptyFields = fields.filter((item) => {
        // Убираем на поле класс для ошибок
        item.classList.remove("form__input_type_error");
        return !(item.value.trim().length);
    });

    // Если нашлись поля, которые не заполнены, то возвращаем false и помечаем как ошибочные
    if(emptyFields.length) {

        emptyFields.forEach((item) => {
            item.classList.add("form__input_type_error");
        });

        return false;
    }

    return true;

}

/**
 * Обработчик отправки формы
 */
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Сама форма
    const _thisForm = e.target;

    // Обязательные поля
    const [name, phone, comment, to] = [
        _thisForm.elements.name,
        _thisForm.elements.phone,
        _thisForm.elements.comment,
        _thisForm.elements.to
    ];

    const isValidForm = validateForm(name, phone, comment, to);

    // Если есть какие-то не заполенные поля, то останавляеваем выполнение обработчика
    if(!isValidForm) return;

    // Отправка запроса на сервер
    const promise = new Promise((resolve, reject) => {
        // Объект для передачи полей формы
        const data = {
            name: name.value,
            phone: phone.value,
            comment: comment.value,
            to: to.value,
        };

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://webdev-api.loftschool.com/sendmail");
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.responseType = "json";
        xhr.send(JSON.stringify(data));

        xhr.addEventListener("load", (e) => {
            const response = xhr.response;
            if(response.status) {
               resolve(response);
            } else {
               reject(response);
            }
        });
    });

    promise.then((response) => {
        modalText.innerText = response.message;
    });

    promise.catch((response) => {
        modalText.innerText = response.message;
    });

    promise.finally(() => {
        toggleModal();
    });

});


/**
 * Обработчик кнопки для удаление ошибочных полей
 */
reset.addEventListener("click", (e) => {
    const fields = [...form.elements];

    fields.forEach((item) => {
        item.classList.remove("form__input_type_error");
    });
});

