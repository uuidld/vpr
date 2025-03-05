 // Плавная прокрутка к секциям
 function scrollToSection(id) {
  const element = document.getElementById(id);
  const headerHeight = document.querySelector("header").offsetHeight;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}

// Аккордеон FAQ
document.querySelectorAll('.faq-item h3').forEach(item => {
  item.addEventListener('click', function() {
    this.parentElement.classList.toggle('active');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.testimonial-slider');
  const testimonials = document.querySelectorAll('.testimonial');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  
  let currentSlide = 0;
  
  // Инициализация первого слайда
  testimonials[0].classList.add('active');
  
  // Установка высоты слайдера по высоте самого высокого отзыва
  function setSliderHeight() {
    let maxHeight = 0;
    testimonials.forEach(testimonial => {
      const height = testimonial.offsetHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    });
    slider.style.height = maxHeight + 'px';
  }
  
  // Показ определенного слайда
  function showSlide(index) {
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
      testimonial.style.transform = 'translateX(100%)';
    });
    
    testimonials[index].classList.add('active');
    testimonials[index].style.transform = 'translateX(0)';
  }
  
  // Переход к следующему слайду
  function nextSlide() {
    currentSlide++;
    if (currentSlide >= testimonials.length) {
      currentSlide = 0;
    }
    showSlide(currentSlide);
  }
  
  // Переход к предыдущему слайду
  function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = testimonials.length - 1;
    }
    showSlide(currentSlide);
  }
  
  // Обработчики событий для кнопок
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Автоматическое переключение слайдов
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Остановка автопереключения при наведении мыши
  slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  // Возобновление автопереключения при уходе мыши
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
  
  // Установка высоты слайдера при загрузке и изменении размера окна
  setSliderHeight();
  window.addEventListener('resize', setSliderHeight);
});


// Функция для генерации полей ввода для каждого задания
document.getElementById('tasks').addEventListener('input', function() {
  const tasks = parseInt(this.value);
  const taskInputs = document.getElementById('task-inputs');
  taskInputs.innerHTML = ''; // Очищаем предыдущие поля

  if (tasks > 0) {
    for (let i = 1; i <= tasks; i++) {
      const taskDiv = document.createElement('div');
      taskDiv.className = 'task-input';
      taskDiv.innerHTML = `
        <h4>Задание ${i}</h4>
        <div class="input-group">
          <label for="max-score-${i}">Максимальный балл за задание:</label>
          <input type="number" id="max-score-${i}" min="1" placeholder="Введите балл">
        </div>
        <div class="input-group">
          <label for="probability-${i}">Вероятность правильного выполнения (%):</label>
          <input type="number" id="probability-${i}" min="0" max="100" placeholder="Введите процент">
        </div>
      `;
      taskInputs.appendChild(taskDiv);
    }
  }
});

// Функция для расчёта баллов
function calculateScore() {
  const tasks = parseInt(document.getElementById('tasks').value);
  if (!tasks || tasks <= 0) {
    alert('Пожалуйста, введите корректное количество заданий.');
    return;
  }

  let totalMaxScore = 0;
  let expectedScore = 0;

  for (let i = 1; i <= tasks; i++) {
    const maxScore = parseFloat(document.getElementById(`max-score-${i}`).value) || 0;
    const probability = parseFloat(document.getElementById(`probability-${i}`).value) || 0;

    if (maxScore <= 0) {
      alert(`Пожалуйста, введите корректный максимальный балл для задания ${i}.`);
      return;
    }
    if (probability < 0 || probability > 100) {
      alert(`Пожалуйста, введите корректную вероятность (0-100%) для задания ${i}.`);
      return;
    }

    totalMaxScore += maxScore;
    expectedScore += maxScore * (probability / 100);
  }

  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    <h3>Результат:</h3>
    <p>Максимально возможный балл: ${totalMaxScore}</p>
    <p>Ожидаемый балл: ${expectedScore.toFixed(2)}</p>
    <p>Минимально возможный балл: 0</p>
  `;
}


document.querySelectorAll('.btn-details').forEach(button => {
  button.addEventListener('click', function() {
    const courseDetails = this.nextElementSibling; // Ищем следующий за кнопкой скрытый блок с деталями
    
    // Переключаем класс open, чтобы анимировать раскрытие
    courseDetails.classList.toggle('open');
    
    // Делаем так, чтобы при раскрытии кнопка "Подробнее" меняла текст на "Скрыть"
    if (courseDetails.classList.contains('open')) {
      this.textContent = 'Скрыть';
    } else {
      this.textContent = 'Подробнее';
    }
  });
});