// Предустановленные пользователи с уникальным оформлением
const predefinedUsers = [
    {
        firstName: "Инна",
        lastName: "Коваленко",
        hikes: 20,
        altitude: 3600,
        days: 65,
        personalSite: "kovalenko/main.html",
        theme: "kovalenko-inna"
    },
    {
        firstName: "Галина",
        lastName: "Коваленко",
        hikes: 24,
        altitude: 3800,
        days: 72,
        personalSite: "kovalenkog/main.html",
        theme: "kovalenko-galina"
    },
    {
        firstName: "Игорь",
        lastName: "Стрельников",
        hikes: 30,
        altitude: 4500,
        days: 95,
        personalSite: "strelnikovi/main.html",
        theme: "strelnikov-igor"
    },
    {        
        firstName: "Иван",
        lastName: "Стрельников",
        hikes: 28,
        altitude: 4200,
        days: 89,
        personalSite: "strelnikov/main.html",
        theme: "strelnikov"
    },
    {
        firstName: "Юрий",
        lastName: "Жолнач",
        hikes: 28,
        altitude: 4200,
        days: 89,
        personalSite: "zholnach/main.html",
        theme: "zholnach"
    },
    {
        firstName: "Юрий",
        lastName: "Жёлнач",
        hikes: 25,
        altitude: 3900,
        days: 75,
        personalSite: "zholnach/main.html",
        theme: "zholnach2"
    },
    {
        firstName: "София",
        lastName: "Ткаченко",
        hikes: 18,
        altitude: 3500,
        days: 60,
        personalSite: "tkachenko/main.html",
        theme: "tkachenko"
    },
    {
        firstName: "Евгения",
        lastName: "Чуркина",
        hikes: 22,
        altitude: 4100,
        days: 85,
        personalSite: "churkina/main.html",
        theme: "churkina"
    },
    {
        firstName: "Ирина",
        lastName: "Загдай",
        hikes: 19,
        altitude: 3800,
        days: 67,
        personalSite: "zagdai/main.html",
        theme: "zagdai"
    },
    {
        firstName: "Иван",
        lastName: "Моисеев",
        hikes: 42,
        altitude: 5100,
        days: 124,
        personalSite: "moiseev/main.html",
        theme: "moiseev"
    },
    {
        firstName: "Александр",
        lastName: "Медведев",
        hikes: 15,
        altitude: 3200,
        days: 45,
        personalSite: "medvedev/main.html",
        theme: "medvedev"
    },
    {
        firstName: "Александр",
        lastName: "Погребняк",
        hikes: 23,
        altitude: 4600,
        days: 78,
        personalSite: "pogrebnyak/main.html",
        theme: "pogrebnyak"
    },
    {
        firstName: "Владимир",
        lastName: "Савченко",
        hikes: 31,
        altitude: 3900,
        days: 112,
        personalSite: "savchenko/main.html",
        theme: "savchenko"
    },
    {
        firstName: "Богдан",
        lastName: "Сесь",
        hikes: 17,
        altitude: 3400,
        days: 52,
        personalSite: "ses/main.html",
        theme: "ses"
    },
    // Новый 15-й аккаунт для всех остальных людей
    {
        firstName: "Другой",
        lastName: "Пользователь",
        hikes: 0,
        altitude: 0,
        days: 0,
        personalSite: "other/main.html",
        theme: "other-user"
    }
];

// Флаг для отслеживания использования общего аккаунта
let isUsingGeneralAccount = false;
// Флаг для отображения предустановленных пользователей
let showPredefinedUsers = false;

// Создание снежинок
function createSnowflakes() {
    const snowContainer = document.getElementById('snow-container');
    const snowflakeCount = 80;
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        const size = Math.random() * 6 + 4;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        snowflake.style.left = `${Math.random() * 100}vw`;
        
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${delay}s`;
        
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        
        snowContainer.appendChild(snowflake);
    }
}

// Инициализация приложения
function initApp() {
    contentContainer = document.getElementById('content-container');
    showLoginForm();
    
    // Добавляем переключатель для показа/скрытия предустановленных пользователей
    const toggleButton = document.createElement('button');
    toggleButton.id = 'toggle-predefined-users';
    toggleButton.innerHTML = '<i class="fas fa-eye"></i> Показать предустановленные аккаунты';
    toggleButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 15px;
        background: rgba(76, 201, 240, 0.2);
        border: 1px solid rgba(76, 201, 240, 0.5);
        color: white;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.9rem;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    toggleButton.addEventListener('mouseenter', () => {
        toggleButton.style.background = 'rgba(76, 201, 240, 0.4)';
        toggleButton.style.transform = 'scale(1.05)';
    });
    toggleButton.addEventListener('mouseleave', () => {
        toggleButton.style.background = 'rgba(76, 201, 240, 0.2)';
        toggleButton.style.transform = 'scale(1)';
    });
    toggleButton.addEventListener('click', togglePredefinedUsers);
    document.body.appendChild(toggleButton);
}

// Переключение отображения предустановленных пользователей
function togglePredefinedUsers() {
    showPredefinedUsers = !showPredefinedUsers;
    const userSection = document.getElementById('predefined-users-section');
    const toggleButton = document.getElementById('toggle-predefined-users');
    
    if (userSection) {
        if (showPredefinedUsers) {
            userSection.style.display = 'block';
            toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i> Скрыть предустановленные аккаунты';
            toggleButton.style.background = 'rgba(76, 201, 240, 0.6)';
        } else {
            userSection.style.display = 'none';
            toggleButton.innerHTML = '<i class="fas fa-eye"></i> Показать предустановленные аккаунты';
            toggleButton.style.background = 'rgba(76, 201, 240, 0.2)';
        }
    }
}

// Показать форму входа
function showLoginForm() {
    const template = document.getElementById('login-template');
    contentContainer.innerHTML = template.innerHTML;
    
    // Сброс флага
    isUsingGeneralAccount = false;
    
    // Заполняем список предустановленных пользователей
    const userList = document.getElementById('predefined-users-list');
    userList.innerHTML = '';
    predefinedUsers.forEach((user, index) => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        
        // Для 15-го аккаунта добавляем специальную пометку
        if (index === 14) {
            userItem.textContent = `${user.firstName} ${user.lastName} (Общий)`;
            userItem.style.backgroundColor = 'rgba(76, 201, 240, 0.3)';
            userItem.style.border = '1px solid rgba(76, 201, 240, 0.5)';
            userItem.title = 'Общий аккаунт для всех новых пользователей';
        } else {
            userItem.textContent = `${user.firstName} ${user.lastName}`;
        }
        
        userItem.addEventListener('click', () => {
            document.getElementById('login-first-name').value = user.firstName;
            document.getElementById('login-last-name').value = user.lastName;
            
            // Для общего аккаунта меняем флаг
            if (index === 14) {
                isUsingGeneralAccount = true;
            }
            
            // Скрыть сообщение об ошибке, если оно было показано
            document.getElementById('login-error').style.display = 'none';
        });
        userList.appendChild(userItem);
    });
    
    // Обработчик формы входа
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('login-first-name').value.trim();
        const lastName = document.getElementById('login-last-name').value.trim();
        
        if (firstName && lastName) {
            // Сначала проверяем, введены ли данные общего аккаунта
            if (firstName === "Другой" && lastName === "Пользователь") {
                // Немедленное перенаправление на общий сайт
                window.location.href = "users/other/main.html";
                return;
            }
            
            // Поиск пользователя в предустановленных (первые 14 аккаунтов)
            const specificUsers = predefinedUsers.slice(0, 14);
            const user = specificUsers.find(user => 
                user.firstName.toLowerCase() === firstName.toLowerCase() && 
                user.lastName.toLowerCase() === lastName.toLowerCase()
            );
            
            if (user) {
                // Немедленное перенаправление на персональный сайт пользователя
                window.location.href = user.personalSite;
            } else {
                // Для всех остальных - используем 15-й аккаунт
                window.location.href = "users/other/main.html";
            }
        } else {
            alert('Пожалуйста, заполните все поля формы.');
        }
    });
    
    // Автоматический выбор общего аккаунта при пустом вводе и фокусе
    const firstNameInput = document.getElementById('login-first-name');
    const lastNameInput = document.getElementById('login-last-name');
    
    firstNameInput.addEventListener('focus', function() {
        if (!this.value && !lastNameInput.value) {
            document.getElementById('login-error').style.display = 'none';
        }
    });
    
    lastNameInput.addEventListener('focus', function() {
        if (!this.value && !firstNameInput.value) {
            document.getElementById('login-error').style.display = 'none';
        }
    });
}

// Показать страницу "нет аккаунта"
function showNoAccountPage() {
    const template = document.getElementById('no-account-template');
    contentContainer.innerHTML = template.innerHTML;
    
    // Обработчик кнопки "Вернуться ко входу"
    document.getElementById('go-to-login').addEventListener('click', function() {
        showLoginForm();
    });
}

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    createSnowflakes();
    initApp();
    
    // Обновление снежинок при изменении размера окна
    window.addEventListener('resize', function() {
        const snowContainer = document.getElementById('snow-container');
        snowContainer.innerHTML = '';
        createSnowflakes();
    });
});