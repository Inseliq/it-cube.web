function initModals() {
  const modalTriggers = document.querySelectorAll('[modal]');

  function openModal() {
    // Создаём структуру модального окна
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overview';

    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';

    const modal = document.createElement('div');
    modal.className = 'modal';

    // Заголовок
    const title = document.createElement('h1');
    title.className = 'title';
    title.textContent = 'Заголовок модального окна';

    // Описание
    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = 'Описание модального окна.';

    // Контейнер с кнопками
    const container = document.createElement('div');
    container.className = 'container';

    // Кнопка "Выйти"
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'logout';
    logoutBtn.textContent = 'Выйти';

    // Кнопка "Отправить"
    const sendBtn = document.createElement('button');
    sendBtn.className = 'send';
    sendBtn.textContent = 'Отправить';

    // Собираем структуру
    modal.appendChild(title);
    modal.appendChild(description);
    container.appendChild(logoutBtn);
    container.appendChild(sendBtn);
    modal.appendChild(container);
    wrapper.appendChild(modal);
    modalOverlay.appendChild(wrapper);

    // Добавляем в тело страницы
    document.body.appendChild(modalOverlay);

    // Сразу добавляем класс open для запуска анимации
    modalOverlay.classList.add('open');

    // Обработчики закрытия
    function closeModal() {
      // Убираем класс open для анимации закрытия
      modalOverlay.classList.remove('open');

      // Удаляем элемент после завершения анимации
      modalOverlay.addEventListener('transitionend', () => {
        modalOverlay.remove();
      }, { once: true });
    }

    // Закрытие по клику на .wrapper (фон вокруг модалки)
    wrapper.addEventListener('click', (e) => {
      if (e.target === wrapper) {
        closeModal();
      }
    });

    // Закрытие по кнопке "Выйти"
    logoutBtn.addEventListener('click', closeModal);

    // Обработка кнопки "Отправить"
    sendBtn.addEventListener('click', () => {
      closeModal();
      alert('Заявка сформирована');
    });
  }

  // Назначаем обработчик клика на все элементы с [modal]
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', openModal);
  });
}

// Запускаем инициализацию после загрузки DOM
document.addEventListener('DOMContentLoaded', initModals);

class Snowfall {
  constructor(options = {}) {
    this.flakeCount = options.flakeCount || 50;
    this.flakeColor = options.flakeColor || '#fff';
    this.minSize = options.minSize || 10;
    this.maxSize = options.maxSize || 25;
    this.minSpeed = options.minSpeed || 1;
    this.maxSpeed = options.maxSpeed || 3;
    this.wind = options.wind || 0.5; // горизонтальное смещение (ветер)
    this.zIndex = options.zIndex || 9999;

    this.flakes = [];
    this.container = document.createElement('div');
    this.init();
  }

  init() {
    // Стили контейнера
    Object.assign(this.container.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: this.zIndex,
      mixBlendMode: 'lighten' // чтобы снег не затемнял контент
    });
    document.body.appendChild(this.container);

    // Создаём снежинки
    for (let i = 0; i < this.flakeCount; i++) {
      this.createFlake();
    }

    // Запуск анимации
    this.animate();
  }

  createFlake() {
    const flake = document.createElement('div');

    // Случайные параметры для каждой снежинки
    const size = Math.random() * (this.maxSize - this.minSize) + this.minSize;
    const speed = Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed;
    const x = Math.random() * window.innerWidth;
    const opacity = Math.random() * 0.7 + 0.3;

    // Стили снежинки
    Object.assign(flake.style, {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: this.flakeColor,
      maskSize: 'cover',
      maskPosition: 'center',
      maskRepeat: 'no-repeat',
      maskImage: 'url("../assets/icon/snowflake.svg")',
      borderRadius: '50%',
      opacity: opacity,
      left: `${x}px`,
      top: '-50px',
      pointerEvents: 'none'
    });

    this.container.appendChild(flake);

    this.flakes.push({
      element: flake,
      x,
      y: -50,
      speed,
      size,
      windOffset: Math.random() * 2 - 1 // случайное направление ветра
    });
  }

  animate() {
    const gravity = 0.1; // ускорение падения

    this.flakes.forEach(flake => {
      // Обновляем позицию
      flake.y += flake.speed;
      flake.x += this.wind * flake.windOffset;

      // Если снежинка вышла за нижний край экрана — возвращаем наверх
      if (flake.y > window.innerHeight + flake.size) {
        flake.y = -flake.size;
        flake.x = Math.random() * window.innerWidth;
      }

      // Если вышла за боковые края — корректируем
      if (flake.x < -flake.size) flake.x = window.innerWidth + flake.size;
      if (flake.x > window.innerWidth + flake.size) flake.x = -flake.size;

      // Применяем новые координаты
      flake.element.style.left = `${flake.x}px`;
      flake.element.style.top = `${flake.y}px`;
    });

    requestAnimationFrame(this.animate.bind(this));
  }
}

// Запуск снегопада (настройки можно менять)
window.addEventListener('load', () => {
  new Snowfall({
    flakeCount: 75,      // количество снежинок
    flakeColor: '#8ddfffff',  // цвет (можно HEX, RGB, название)
    minSize: 8,       // минимальный размер (px)
    maxSize: 20,      // максимальный размер (px)
    minSpeed: 0.8,   // минимальная скорость падения
    maxSpeed: 2.5,  // максимальная скорость падения
    wind: 0.7,     // сила ветра (горизонтальное смещение)
    zIndex: 9999     // z-index контейнера
  });
});

class ChristmasLights {
  constructor(selector = '.christmas-lights', options = {}) {
    this.container = document.querySelector(selector);
    if (!this.container) return;

    this.lights = this.container.querySelectorAll('.light');
    this.interval = options.interval || 400; // мс между переключениями
    this.duration = options.duration || 800;  // длительность свечения

    this.init();
  }

  init() {
    // Начальное состояние — все выключены
    this.lights.forEach(light => {
      light.style.opacity = '0';
    });

    // Запускаем анимацию
    this.animate();
  }

  animate() {
    let current = 0;

    const turnOn = () => {
      // Включаем текущую лампочку
      this.lights[current].style.transition = `opacity ${this.duration}ms ease-in-out`;
      this.lights[current].style.opacity = '1';

      // Через duration выключаем
      setTimeout(() => {
        this.lights[current].style.opacity = '0';
      }, this.duration);

      // Переходим к следующей (или начинаем заново)
      current = (current + 1) % this.lights.length;

      // Следующий шаг через interval
      setTimeout(turnOn, this.interval);
    };

    // Старт анимации
    turnOn();
  }
}

// Запуск гирлянды (настраивайте параметры)
window.addEventListener('DOMContentLoaded', () => {
  new ChristmasLights('.christmas-lights', {
    interval: 300,  // пауза между лампочками (мс)
    duration: 600   // время свечения одной лампочки (мс)
  });
});
