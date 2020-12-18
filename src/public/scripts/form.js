"use strict";
var checkElements = function () {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i] = arguments[_i];
    }
    for (var _a = 0, elements_1 = elements; _a < elements_1.length; _a++) {
        var element = elements_1[_a];
        if (!element) {
            return false;
        }
    }
    return true;
};
var formErrors = Object.freeze({
    formIsBroken: 'Sorry, but something went wrong. Please try again later or refresh your page',
    fieldIsEmpty: 'Some field is empty. Please check it out'
});
var formData = {
    formAuthor: '',
    formDate: '',
    formArticle: '',
    formTags: '',
    formComment: ''
};
var submitIsRunning = false;
var authorInput = document.querySelector('#formAuthor');
var dateInput = document.querySelector('#formDate');
var articleInput = document.querySelector('#formArticle');
var tagsInput = document.querySelector('#formTags');
var commentInput = document.querySelector('#formComment');
var form = document.querySelector('#form');
var submit = document.querySelector('#submit');
var error = document.querySelector('#formError');
var handleError = function (textError) {
    if (error) {
        error.textContent = textError;
        error.classList.add('form__error_visible');
    }
};
var hideError = function () {
    if (error) {
        error.classList.remove('form__error_visible');
    }
};
var blockSubmit = function (e) {
    e.preventDefault();
    return false;
};
var toggleButton = function (block) {
    if (block) {
        submit.classList.add('form__submit_disabled');
    }
    else {
        submit.classList.remove('form__submit_disabled');
    }
};
var handleFocus = function (e) {
    var target = e.target;
    target.classList.remove('form__field_valid', 'form__field_invalid');
    hideError();
};
var handleBlur = function (e) {
    var target = e.target;
    var id = target.id;
    if (
    // @ts-ignore
    formData[id].trim()) {
        target.classList.add('form__field_valid');
    }
    else {
        target.classList.add('form__field_invalid');
    }
};
var handleInput = function (e) {
    var target = e.target;
    var id = target.id;
    toggleButton(false);
    // @ts-ignore
    formData[id] = target.value;
};
var validateAll = function (data) {
    var keys = Object.getOwnPropertyNames(data);
    var checker = true;
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (
        // @ts-ignore
        !data[key].trim()) {
            var elem = document.getElementById(key);
            if (elem) {
                elem.classList.add('form__field_invalid');
            }
            handleError(formErrors.fieldIsEmpty);
            checker = false;
        }
    }
    return checker;
};
var handleSubmit = function (e) {
    if (submitIsRunning ||
        !validateAll(formData)) {
        e.preventDefault();
        toggleButton(true);
        return;
    }
    else {
        submitIsRunning = true;
    }
};
var setEvents = function () {
    if (!checkElements(authorInput, dateInput, articleInput, tagsInput, commentInput, form, submit)) {
        handleError(formErrors.formIsBroken);
        form.addEventListener('submit', blockSubmit);
        return;
    }
    var inputs = [
        authorInput, dateInput, articleInput, tagsInput, commentInput
    ];
    for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
        var input = inputs_1[_i];
        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);
        input.addEventListener('input', handleInput);
    }
    form.addEventListener('submit', handleSubmit);
};
setEvents();
