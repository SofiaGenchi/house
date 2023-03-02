function scrollHeader() {
  const header = document.getElementById("header");

  if (this.scrollY >= 50) header.classList.add("scroll-header");
}
window.addEventListener("scroll", scrollHeader);


var swiperPopular = new Swiper(".popular__container", {
  spaceBetween: 32,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 3,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const accordionItems = document.querySelectorAll(".value__accordion-item");
accordionItems.forEach((item) => {
  const accordionHeader = item.querySelector(".value__accordion-header");

  accordionHeader.addEventListener("click", () => {
    const openItem = document.querySelector('.accordion-open')
    toggleItem(item);

    if(openItem && openItem!== item){
        toggleItem(openItem)
    }
  });
});

const toggleItem = (item) => {
  const accordionContent = item.querySelector(".value__accordion-content");

  if (item.classList.contains("accordion-open")) {
    accordionContent.removeAttribute("style");
    item.classList.remove("accordion-open");
  } else {
    accordionContent.style.height = accordionContent.scrollHeight + "px";
    item.classList.add("accordion-open");
  }
};



const sections = document.querySelectorAll('section[id]')

function scrollActive(){
  const scrollY = window.pageYOffset

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 58,
          sectionId = current.getAttribute('id')
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
    }else {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)



function scrollUp(){
  const scrollUp = document.getElementById('scroll-up');

  if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


// -----------------
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

if(selectedTheme){
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)

  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})



const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
  reset: true
})

sr.reveal(`.home__title, .popular__container, .subscribe__container`)
sr.reveal(`.home__description, .footer__info`, {delay: 500})
sr.reveal(`.home__search`, {delay: 600})
sr.reveal(`.home__value`, {delay: 700})
sr.reveal(`.home__images`, {delay: 800, origin: 'botton'})
sr.reveal(`.logos__img`, {interval: 100})
sr.reveal(`.value__images, .contact__content`, {origin: 'left'})
sr.reveal(`.value__content, .contact__images`, {origin: 'right'})

// Copiar email
function copyEmail() {
  let email = document.getElementById("email");
  let button = document.querySelector(".button-email");

  // email.select();
  email.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(email.value).then(() =>{
    button.innerHTML = "Copied";
    setTimeout(() => button.innerHTML = "Email", 1000);
  })
}

// leyendo json
// function getData(){
//   fetch('./assets/json/data.json')
//     .then(res => res.json)
//     .then(datos => {
//       console.log(datos);
//     })
// }


// fetch('https://server.com/data.json')
//   .then((response) => response.json())
//   .then((json) => console.log(json))

// fetch('./datos.json')
//   .then((response) => response.json())
//   .then(data => {
//     const propiedadesContainer = document.getElementById('propiedades-container');

//     data.forEach(propiedad => {
//       const propiedadElement = document.createElement('article');
//       propiedadElement.classList.add('popular__card', 'swiper-slide');

//       const imagenElement = document.createElement('img');
//       imagenElement.scr = propiedad.imagen;

//       const dataElement = document.createElement('h2');
//       dataElement.classList.add('popular__data');

//       const priceElement = document.createElement('h2');
//       priceElement.classList.add('popular__price');
//       priceElement.innerHTML = `<span>USD</span>${propiedad.precio}`;

//       const titleElement = document.createElement('h3');
//       titleElement.classList.add('popular__title');
//       titleElement.textContent = propiedad.nombre;

//       const descriptionElement = document.createElement('p');
//       descriptionElement.classList.add('popular__description');
//       descriptionElement.textContent = propiedad.descripcion;

//       dataElement.appendChild(priceElement);
//       dataElement.appendChild(titleElement);
//       dataElement.appendChild(descriptionElement);

//       propiedadElement.appendChild(imagenElement);
//       propiedadElement.appendChild(dataElement);

//       propiedadesContainer.appendChild(propiedadElement);
//     });
//   });




async function propiedades() {
  const requestURL = 'https://raw.githubusercontent.com/SofiaGenchi/house/main/assets/json/datos.json';
  const request = new Request(requestURL);

  const response = await fetch(request);
  const propiedadesText = await response.text();

  const misPropiedades = JSON.parse(propiedadesText);
  propiedadesArticle(misPropiedades)
  // propiedadesHeroes(misPropiedades);
}

function propiedadesArticle(obj) {
  const propiedadesContainer = document.getElementById('propiedades-container');
  const propiedades = obj.propiedades;

  for (const propiedad of propiedades){
    const article = document.createElement('article');
    const divData = document.createElement('div');
    const img = document.createElement('img');
    const price = document.createElement('h2');
    const title = document.createElement('h3');
    const description = document.createElement('p')

    article.classList.add('popular__card', 'swiper-slide')
    divData.classList.add('popular__data');

    img.textContent = propiedad.imagen;
    img.classList.add('popular__img');

    price.textContent = `<span>USD</span> ${propiedad.precio}`;
    price.classList.add('popular__price');

    title.textContent = `${propiedad.nombre}`;
    title.classList.add('popular__title');

    description.textContent = `${propiedad.description}`;
    description.classList.add('popular__description');


    article.appendChild(img);
    article.appendChild(divData);
    divData.appendChild(price);
    divData.appendChild(title);
    divData.appendChild(description);

    propiedadesContainer.appendChild(article);
  }
}
propiedades();