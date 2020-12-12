const checkElements = (...elements: any[]): boolean => {
  for (const element of elements) {
    if (
      !element
    ) {
      return false;
    }
  }

  return true;
};

interface IData {
  formAuthor: string;
  formDate: string;
  formArticle: string;
  formTags: string;
  formComment: string;
}

interface IErrors {
  formIsBroken: string;
  fieldIsEmpty: string;
}

const formErrors: IErrors = Object.freeze({
  formIsBroken: 'Sorry, but something went wrong. Please try again later or refresh your page',
  fieldIsEmpty: 'Some field is empty. Please check it out'
});

const formData: IData = {
  formAuthor: '',
  formDate: '',
  formArticle: '',
  formTags: '',
  formComment: ''
};

let submitIsRunning = false;

const authorInput = document.querySelector('#formAuthor') as HTMLInputElement;
const dateInput = document.querySelector('#formDate') as HTMLInputElement;
const articleInput = document.querySelector('#formArticle') as HTMLInputElement;
const tagsInput = document.querySelector('#formTags') as HTMLInputElement;
const commentInput = document.querySelector('#formComment') as HTMLInputElement;

const form = document.querySelector('#form') as HTMLFormElement;
const submit = document.querySelector('#submit') as HTMLButtonElement;
const error = document.querySelector('#formError') as HTMLElement;

const handleError = (textError: string): void => {
  if (
    error
  ) {
    error.textContent = textError;
    error.classList.add('form__error_visible');
  }
};

const hideError = (): void => {
  if (
    error
  ) {
    error.classList.remove('form__error_visible');
  }
};

const blockSubmit = (e: Event): boolean => {
  e.preventDefault();
  return false;
};

const toggleButton = (block: boolean): void => {
  if (
    block
  ) {
    submit.classList.add('form__submit_disabled');
  } else {
    submit.classList.remove('form__submit_disabled');
  }
};

const handleFocus = (e: Event): void => {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement;

  target.classList.remove('form__field_valid', 'form__field_invalid');

  hideError();
};

const handleBlur = (e: Event): void => {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement;
  const id = target.id;

  if (
    // @ts-ignore
    formData[id].trim()
  ) {
    target.classList.add('form__field_valid')
  } else {
    target.classList.add('form__field_invalid')
  }
};

const handleInput = (e: Event): void => {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement;
  const id: string = target.id;
  toggleButton(false);

  // @ts-ignore
  formData[id] = target.value;
};

const validateAll = (data: IData): boolean => {
  const keys = Object.getOwnPropertyNames(data);
  let checker = true;

  for (const key of keys) {
    if (
      // @ts-ignore
      !data[key].trim()
    ) {
      const elem = document.getElementById(key) as HTMLInputElement | HTMLTextAreaElement;

      if (
        elem
      ) {
        elem.classList.add('form__field_invalid')
      }

      handleError(formErrors.fieldIsEmpty);
      checker = false;
    }
  }

  return checker;
};

const handleSubmit = (e: Event): void => {
  if (
    submitIsRunning ||
    !validateAll(formData)
  ) {
    e.preventDefault();
    toggleButton(true);
    return ;
  } else {
    submitIsRunning = true;
  }
};

const setEvents = (): void => {
  if (
    !checkElements(authorInput, dateInput, articleInput, tagsInput, commentInput, form, submit)
  ) {
    handleError(formErrors.formIsBroken);
    form.addEventListener('submit', blockSubmit)
    return ;
  }

  const inputs: Array<HTMLInputElement | HTMLTextAreaElement> = [
    authorInput, dateInput, articleInput, tagsInput, commentInput
  ];

  for (const input of inputs) {
    input.addEventListener('focus', handleFocus);
    input.addEventListener('blur', handleBlur);
    input.addEventListener('input', handleInput);
  }

  form.addEventListener('submit', handleSubmit);
}

setEvents();
