'use strict'

document.addEventListener('DOMContentLoaded', () => {

    /* 1. Исключение накладывания контента на хедер при скроле/прокрутке страницы */

    const header = document.querySelector('.header');       // создаем переменную находя блок по классу

    if (header) {                                           // проверяем существование элемента в DOM
        console.log('Константа header существует');

        const heightHeader = header.offsetHeight;           // определяем высоту блока, включая внутренние отступы

        document.addEventListener('scroll', () => {         // навешиваем слушатель событий на scroll страницы и ожидаем ее прокрутку

            console.log('Страница скролится');

            let scrollPageY = window.scrollY;                 // получаем значение насколько прокрутили страницу

            if (scrollPageY > heightHeader) {               // условие: если расстояние от верха страницы больше высоты элемента
                header.classList.add('header--scroll');      // устанавливаем класс модификатора на элемент
            } else {
                header.classList.remove('header--scroll');   // удаляем класс модификатора у элемента
            }

        });

    }

    /* 2. Клик на добавление рецепта в избранное */

    const favoriteBlocks = document.querySelectorAll('.recipe__indicators-favourites');

    favoriteBlocks.forEach(favoriteBlock => {
        console.log('Константа favoriteBlock существует');

        const favoriteButton = favoriteBlock.querySelector('.recipe__indicators-button');
        const favoriteCount = favoriteBlock.querySelector('.recipe__indicators-count');

        let isFavorite = false; // Состояние избранного
        let count = parseInt(favoriteCount.textContent); // Начальное значение счетчика с приведением строки к числу

        // Обработчик клика на кнопку
        favoriteButton.addEventListener('click', () => {
            isFavorite = !isFavorite; // Меняем состояние

            if (isFavorite) {
                count += 1; // Увеличиваем счетчик
            } else {
                count -= 1; // Уменьшаем счетчик
            }

            favoriteCount.textContent = count; // Обновляем счетчик
        });
    });

    /* 3. Логика для страницы логина */

    const loginForm = document.getElementById('loginForm'); // Форма входа
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Логин и пароль
    const correctUsername = 'vpr';
    const correctPassword = 'vpr';

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Останавливаем стандартную отправку формы

        const username = usernameInput.value;
        const password = passwordInput.value;

        // Проверяем логин и пароль
        if (username === correctUsername && password === correctPassword) {
            window.location.href = 'profile.html'; // Переходим на страницу профиля
        } else {
            alert('Неверный логин или пароль');
        }
    });




});
