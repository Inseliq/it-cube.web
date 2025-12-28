// garland.js - Скрипт для анимации новогодней гирлянды

class ChristmasGarland {
  constructor() {
    this.lights = document.querySelectorAll('.christmas-lights .light');
    this.currentIndex = 0;
    this.animationSpeed = 300; // скорость в миллисекундах
    this.mode = 'sequence'; // режимы: sequence, wave, random, blink, rainbow
    this.init();
  }

  init() {
    if (this.lights.length === 0) return;
    this.startAnimation();
    this.addControls();
  }

  // Последовательное включение лампочек
  sequenceAnimation() {
    this.lights.forEach(light => light.classList.remove('active'));
    this.lights[this.currentIndex].classList.add('active');
    this.currentIndex = (this.currentIndex + 1) % this.lights.length;
  }

  // Волновая анимация
  waveAnimation() {
    this.lights.forEach((light, index) => {
      const delay = Math.abs(index - this.currentIndex);
      if (delay <= 2) {
        light.classList.add('active');
      } else {
        light.classList.remove('active');
      }
    });
    this.currentIndex = (this.currentIndex + 1) % this.lights.length;
  }

  // Случайное мигание
  randomAnimation() {
    this.lights.forEach(light => {
      if (Math.random() > 0.5) {
        light.classList.add('active');
      } else {
        light.classList.remove('active');
      }
    });
  }

  // Мигание всех лампочек
  blinkAnimation() {
    const allActive = Array.from(this.lights).every(light =>
      light.classList.contains('active')
    );

    this.lights.forEach(light => {
      if (allActive) {
        light.classList.remove('active');
      } else {
        light.classList.add('active');
      }
    });
  }

  // Радужная волна
  rainbowAnimation() {
    this.lights.forEach((light, index) => {
      const position = (index + this.currentIndex) % this.lights.length;
      if (position < this.lights.length / 2) {
        light.classList.add('active');
      } else {
        light.classList.remove('active');
      }
    });
    this.currentIndex = (this.currentIndex + 1) % this.lights.length;
  }

  // Запуск анимации
  startAnimation() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }

    this.animationInterval = setInterval(() => {
      switch (this.mode) {
        case 'sequence':
          this.sequenceAnimation();
          break;
        case 'wave':
          this.waveAnimation();
          break;
        case 'random':
          this.randomAnimation();
          break;
        case 'blink':
          this.blinkAnimation();
          break;
        case 'rainbow':
          this.rainbowAnimation();
          break;
      }
    }, this.animationSpeed);
  }

  // Изменение режима анимации
  setMode(newMode) {
    this.mode = newMode;
    this.currentIndex = 0;
    this.startAnimation();
  }

  // Изменение скорости
  setSpeed(speed) {
    this.animationSpeed = speed;
    this.startAnimation();
  }

  // Добавление элементов управления (опционально)
  addControls() {
    // Можно добавить клик по гирлянде для смены режима
    const garlandContainer = document.querySelector('.christmas-lights');
    if (garlandContainer) {
      garlandContainer.addEventListener('click', () => {
        const modes = ['sequence', 'wave', 'random', 'blink', 'rainbow'];
        const currentModeIndex = modes.indexOf(this.mode);
        const nextMode = modes[(currentModeIndex + 1) % modes.length];
        this.setMode(nextMode);
        console.log('Режим гирлянды:', nextMode);
      });

      // Добавляем подсказку
      garlandContainer.style.cursor = 'pointer';
      garlandContainer.title = 'Нажмите для смены режима анимации';
    }
  }

  // Остановка анимации
  stop() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.lights.forEach(light => light.classList.remove('active'));
    }
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const garland = new ChristmasGarland();

  // Сохраняем экземпляр глобально для возможного управления
  window.garland = garland;

  // Примеры использования (раскомментируйте при необходимости):

  // Изменить режим через 10 секунд
  // setTimeout(() => garland.setMode('wave'), 10000);

  // Изменить скорость
  // garland.setSpeed(150); // быстрее
  // garland.setSpeed(500); // медленнее
});

// Экспорт для использования в других модулях (если нужно)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ChristmasGarland;
}