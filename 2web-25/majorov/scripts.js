// Функция для создания эффекта снега
const createSnow = () => {
    const numSnowflakes = 200;
    for (let i = 0; i < numSnowflakes; i++) {
        let snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        document.body.appendChild(snowflake);
    }
};
document.addEventListener('DOMContentLoaded', () => {
    createSnow();
});