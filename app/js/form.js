let form = document.querySelector('.form');
let overlay = document.querySelector('.overlay');
let name = document.getElementById('name');
let email = document.getElementById('email');
let message = document.querySelector('.form__text--message');
let formButton = document.querySelector('.form__button');
let errorEmail = document.querySelector('.form__error--email');
let errorName = document.querySelector('.form__error--name');
let errorMessage = document.querySelector('.form__error--message');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let reg = /^([a-zа-яё])/i;

    if(!reg.test(name.value)) {
        name.style.border = '1px solid red';
        errorName.innerHTML = 'Please, fill in this field. Use letters only';
        return false;
    }

    reg = /\w+@\w+\.\w{2,20}/gi;

    if(!reg.test(email.value)) {
        email.style.border = '1px solid red';
        errorEmail.innerHTML = 'Incorrect email';
        return false;
    } 

    if(!message.value) {
        message.style.border= '1px solid red';
        errorMessage.innerHTML = 'This field shouldn\'t be empty';
        return false;
    }   
    
    const formData = new FormData(form);
    const data = {};

    for( const [key, value] of formData ) {
        data[key] = value;
    }

    sendData('https://jsonplaceholder.typicode.com/posts', JSON.stringify(data))
            .then(() => {
                form.reset();
            })
            .then(() => {
                form.style.display = 'none';
                overlay.style.display = 'block';
            })
            .catch((err) => {
                console.log(err);
            });
    
            window.addEventListener( 'click', (e) => {
                e.target === overlay ? overlay.style.display = 'none' : null; 
            });
})

const sendData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        body: data,
    });

    if(!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`);
    }

    return await response.json();
};