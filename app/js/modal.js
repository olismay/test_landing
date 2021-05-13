let button = document.querySelector('.collab__button');
let modal = document.querySelector('.modal');
let body = document.getElementsByTagName('body');


button.addEventListener( 'click', (evt) => {
  evt.preventDefault();
  modal.style.display = 'block';
});

window.addEventListener( 'click', (e) => {
  e.target === modal ? modal.style.display = 'none' : null; 
});