document.addEventListener('DOMContentLoaded', function() {
    createSnowflakes();
    
    const elements = document.querySelectorAll('.greeting-box > *');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    });
    
    initQuiz();
    initMemeGenerator();
});

function createSnowflakes() {
    const snowContainer = document.getElementById('snow-container');
    const snowflakeCount = 200;
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snow');
        
        const size = Math.random() * 8 + 2;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        
        snowflake.style.left = `${Math.random() * 100}vw`;
        
        const randomX = (Math.random() - 0.5) * 100;
        snowflake.style.setProperty('--random-x', `${randomX}px`);
        
        const duration = Math.random() * 20 + 10;
        
        const delay = Math.random() * 5;
        
        snowflake.style.animation = `fall ${duration}s linear ${delay}s infinite`;
        
        const flickerDelay = Math.random() * 5;
        snowflake.style.animation += `, flicker ${Math.random() * 3 + 2}s ease-in-out ${flickerDelay}s infinite alternate`;
        
        snowContainer.appendChild(snowflake);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes flicker {
        0%, 100% { opacity: var(--opacity); }
        50% { opacity: calc(var(--opacity) * 0.5); }
    }
`;
document.head.appendChild(style);

function initQuiz() {
    const modal = document.getElementById('quiz-modal');
    const quizSteps = document.querySelectorAll('.quiz-step');
    const options = document.querySelectorAll('.quiz-option');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const resultSection = document.getElementById('quiz-result');
    const mainContent = document.getElementById('main-content');
    
    let currentStep = 0;
    const answers = [null, null, null, null];
    const totalSteps = 4;
    
    // ТИПЫ СТУДЕНТОВ
    const roles = {
        'love-cook-harmony': {
            title: 'ЁБАНЫЙ СТУДЕНТ',
            icon: '📚🖕',
            description: 'Твоя сверхспособность — сдавать сессию в последнюю ночь. Твоя миссия — выживать на дошираках и энергетиках. Твоё секретное умение — спать на парах и всё понимать.',
            cringe: 95,
            spirit: 98,
            session: 45
        },
        'care-cook-laughter': {
            title: 'ЗАБОТЛИВЫЙ БОТАН',
            icon: '🤓📖',
            description: 'Ты учишь всё заранее, но всё равно ничего не знаешь. Твоя миссия — делать конспекты для всех. Твоё секретное умение — красиво оформлять шпоры.',
            cringe: 92,
            spirit: 96,
            session: 80
        },
        'wisdom-support-tradition': {
            title: 'МУДРЫЙ ПРОФЕССОР',
            icon: '👴🍺',
            description: 'Ты знаешь всех преподов и их слабые места. Твоя миссия — договариваться обо всём. Твоё секретное умение — сдавать за бутылку.',
            cringe: 90,
            spirit: 97,
            session: 75
        },
        'support-create-warmth': {
            title: 'ПОДДЕРЖИВАЮЩИЙ ДРУЖИЩЕ',
            icon: '🤝🍻',
            description: 'Ты всегда помогаешь списывать и делишься шпорами. Твоя миссия — спасать всех от отчисления. Твоё секретное умение — делать незаметные фото билетов.',
            cringe: 93,
            spirit: 95,
            session: 60
        },
        'love-decorate-laughter': {
            title: 'ВЕСЁЛЫЙ ТРЭШ',
            icon: '😄🤪',
            description: 'Ты превращаешь учёбу в цирк. Твоя миссия — смешить группу до слёз. Твоё секретное умение — сдавать экзамены с приколами.',
            cringe: 88,
            spirit: 94,
            session: 30
        },
        'care-organize-warmth': {
            title: 'ОРГАНИЗАТОР ПЬЯНОК',
            icon: '📋🍺',
            description: 'Ты планируешь все посиделки вместо учёбы. Твоя миссия — устраивать вечеринки вместо подготовки. Твоё секретное умение — находить деньги на выпивку.',
            cringe: 85,
            spirit: 92,
            session: 20
        },
        'wisdom-cook-tradition': {
            title: 'ТРАДИЦИОННЫЙ ОТЛИЧНИК',
            icon: '📜🥇',
            description: 'Ты учишься как твои родители. Твоя миссия — поддерживать семейную честь. Твоё секретное умение — получать стипендию.',
            cringe: 87,
            spirit: 93,
            session: 90
        },
        'support-decorate-harmony': {
            title: 'ГАРМОНИЧНЫЙ ЛЕНТЯЙ',
            icon: '🎶😴',
            description: 'Ты находишь баланс между учёбой и ничегонеделанием. Твоя миссия — успевать всё в последний момент. Твоё секретное умение — спать и учиться одновременно.',
            cringe: 90,
            spirit: 96,
            session: 50
        }
    };
    
    // ОТВЕТЫ НА ВОПРОС ПРО СЕССИЮ
    const sessionAnswers = {
        'session1': 'готовишься в ночь перед экзаменом и надеешься на чудо',
        'session2': 'учишься прямо на парах, пока все спят',
        'session3': 'списываешь у всех подряд и молишься',
        'session4': 'уповаешь на богов и удачу'
    };
    
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    modal.style.display = 'flex';
    updateProgress();

    prevBtn.style.order = '1';
    nextBtn.style.order = '2';
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            const step = this.closest('.quiz-step');
            const stepIndex = parseInt(step.id.split('-')[1]) - 1;
            const value = this.dataset.value;
            
            answers[stepIndex] = value;
            
            const stepOptions = step.querySelectorAll('.quiz-option');
            stepOptions.forEach(opt => {
                opt.style.background = '';
                opt.style.borderColor = '';
            });
            
            this.style.background = 'rgba(0, 255, 170, 0.3)';
            this.style.borderColor = '#00ffaa';
            
            nextBtn.style.display = 'flex';
            
            if (stepIndex === totalSteps - 1) {
                nextBtn.innerHTML = 'УЗНАТЬ РЕЗУЛЬТАТ';
            }
        });
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentStep < totalSteps - 1) {
            if (answers[currentStep] !== null) {
                quizSteps[currentStep].classList.remove('active');
                currentStep++;
                quizSteps[currentStep].classList.add('active');
                
                updateProgress();
                
                if (currentStep > 0) {
                    prevBtn.style.display = 'flex';
                }
                
                if (answers[currentStep] !== null) {
                    nextBtn.style.display = 'flex';
                } else {
                    nextBtn.style.display = 'none';
                }
            } else {
                showNotification('Бля, выбери уже что-то, ёпта!');
            }
        } else {
            if (answers[currentStep] !== null) {
                showResult();
            } else {
                showNotification('Ну ты даёшь, выбери ответ, пидор!');
            }
        }
    });
    
    prevBtn.addEventListener('click', function() {
        if (currentStep > 0) {
            quizSteps[currentStep].classList.remove('active');
            currentStep--;
            quizSteps[currentStep].classList.add('active');
            
            updateProgress();
            
            if (currentStep === 0) {
                prevBtn.style.display = 'none';
            }
            
            if (answers[currentStep] !== null) {
                nextBtn.style.display = 'flex';
            } else {
                nextBtn.style.display = 'none';
            }
        }
    });
    
    function updateProgress() {
        const progress = ((currentStep + 1) / totalSteps) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Вопрос ${currentStep + 1} из ${totalSteps}`;
    }
    
    function showResult() {
        modal.style.display = 'none';
        
        // Формируем ключ из первых трех ответов
        const roleKey = `${answers[0]}-${answers[1]}-${answers[2]}`;
        
        let role;
        if (roles[roleKey]) {
            role = roles[roleKey];
        } else {
            // Если комбинации нет - берём случайную
            const keys = Object.keys(roles);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            role = roles[randomKey];
        }
        
        // Получаем ответ на вопрос про сессию
        const sessionAnswer = sessionAnswers[answers[3]] || 'ты как-то готовишься к сессии';
        
        document.getElementById('result-title').textContent = `${role.title}`;
        document.getElementById('result-icon').textContent = role.icon;
        
        const description = document.querySelector('.result-description');
        description.innerHTML = `
            <p><strong>Твоя сверхспособность:</strong> ${role.description.split('. ')[0]}.</p>
            <p><strong>Твоя миссия:</strong> ${role.description.split('. ')[1]}.</p>
            <p><strong>Секретное умение:</strong> ${role.description.split('. ')[2]}</p>
            <p><strong>Отношение к сессии:</strong> Ты ${sessionAnswer}.</p>
        `;
        
        setTimeout(() => {
            document.getElementById('cringe-level').style.width = `${role.cringe}%`;
            document.getElementById('spirit-level').style.width = `${role.spirit}%`;
            document.getElementById('session-level').style.width = `${role.session}%`;
        }, 500);
        
        resultSection.classList.remove('hidden');
        mainContent.classList.remove('hidden');
        
        resultSection.style.opacity = '0';
        resultSection.style.transform = 'translateY(30px)';
        resultSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            resultSection.style.opacity = '1';
            resultSection.style.transform = 'translateY(0)';
        }, 100);
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 85, 85, 0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 1001;
            animation: slideIn 0.3s ease;
            font-weight: bold;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
        
        const notificationStyle = document.createElement('style');
        notificationStyle.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(notificationStyle);
    }
}

function initMemeGenerator() {
    const memeGenerator = document.querySelector('.meme-generator-container');
    if (!memeGenerator) return;
    
    memeGenerator.style.opacity = '0';
    memeGenerator.style.transform = 'translateY(30px)';
    memeGenerator.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    setTimeout(() => {
        memeGenerator.style.opacity = '1';
        memeGenerator.style.transform = 'translateY(0)';
    }, 300);
    
    const imageOptions = document.querySelectorAll('.image-option:not(.custom-image)');
    const customImageOption = document.querySelector('.custom-image');
    const customImageUpload = document.getElementById('custom-image-upload');
    const topTextInput = document.getElementById('top-text');
    const bottomTextInput = document.getElementById('bottom-text');
    const randomTextBtn = document.getElementById('random-text');
    const memeImage = document.getElementById('meme-image');
    const previewTopText = document.getElementById('preview-top-text');
    const previewBottomText = document.getElementById('preview-bottom-text');
    const newMemeBtn = document.getElementById('new-meme');
    const topCharCount = topTextInput.nextElementSibling;
    const bottomCharCount = bottomTextInput.nextElementSibling;
    
    // ТЕКСТЫ С МАТОМ ДЛЯ МЕМОВ (СЕССИОННЫЕ)
    const randomTopTexts = [
        "СЕССИЯ НА НОСУ",
        "ЁБАНЫЙ МАТАН",
        "КТО ПРИДУМАЛ ЭКЗАМЕНЫ",
        "Я НИХУЯ НЕ ЗНАЮ",
        "ЗАВТРА ЭКЗАМЕН",
        "БЛЯ, ОПЯТЬ ДВОЙКА",
        "ПРЕПОД - ПИДОРАС",
        "СЕССИЯ - ЭТО АД",
        "СКОЛЬКО МОЖНО УЧИТЬ",
        "ХВАТИТ, Я УСТАЛ"
    ];
    
    const randomBottomTexts = [
        "ПОШЛА НАХУЙ СЕССИЯ",
        "ДАВАЙТЕ УЖЕ СДАВАТЬ",
        "Я СНОВА НЕ СДАЛ",
        "ЁБАНЫЙ ВОПРОС №5",
        "ГДЕ ШПОРЫ, БЛЯ?",
        "МНЕ НАДОЕЛ ЭТОТ ВУЗ",
        "СКОЛЬКО МОЖНО СДАВАТЬ",
        "ПИЗДЕЦ КАК Я УСТАЛ",
        "СДАМ ЗА БУТЫЛКУ",
        "ПОФИГ НА ВСЁ"
    ];
    
    let currentImage = '';
    let currentTopText = '';
    let currentBottomText = '';
    
    updateCharCount(topTextInput, topCharCount);
    updateCharCount(bottomTextInput, bottomCharCount);
    
    imageOptions.forEach(option => {
        option.addEventListener('click', function() {
            imageOptions.forEach(opt => opt.classList.remove('active'));
            customImageOption.classList.remove('active');
            
            this.classList.add('active');
            
            const imageName = this.dataset.image;
            currentImage = imageName;
            memeImage.style.backgroundImage = `url(${imageName})`;
        });
    });
    
    customImageOption.addEventListener('click', function() {
        customImageUpload.click();
    });
    
    customImageUpload.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(event) {
                imageOptions.forEach(opt => opt.classList.remove('active'));
                customImageOption.classList.add('active');
                
                currentImage = event.target.result;
                memeImage.style.backgroundImage = `url(${event.target.result})`;
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    topTextInput.addEventListener('input', function() {
        currentTopText = this.value;
        previewTopText.textContent = currentTopText.toUpperCase();
        updateCharCount(this, topCharCount);
    });
    
    bottomTextInput.addEventListener('input', function() {
        currentBottomText = this.value;
        previewBottomText.textContent = currentBottomText.toUpperCase();
        updateCharCount(this, bottomCharCount);
    });
    
    randomTextBtn.addEventListener('click', function() {
        const randomTop = randomTopTexts[Math.floor(Math.random() * randomTopTexts.length)];
        const randomBottom = randomBottomTexts[Math.floor(Math.random() * randomBottomTexts.length)];
        
        topTextInput.value = randomTop;
        bottomTextInput.value = randomBottom;
        
        currentTopText = randomTop;
        currentBottomText = randomBottom;
        
        previewTopText.textContent = currentTopText.toUpperCase();
        previewBottomText.textContent = currentBottomText.toUpperCase();
        
        updateCharCount(topTextInput, topCharCount);
        updateCharCount(bottomTextInput, bottomCharCount);
        
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
    
    newMemeBtn.addEventListener('click', function() {
        imageOptions.forEach(opt => opt.classList.remove('active'));
        customImageOption.classList.remove('active');
        customImageUpload.value = '';
        
        topTextInput.value = '';
        bottomTextInput.value = '';
        
        currentImage = '';
        currentTopText = '';
        currentBottomText = '';
        
        memeImage.style.backgroundImage = '';
        previewTopText.textContent = '';
        previewBottomText.textContent = '';
        
        updateCharCount(topTextInput, topCharCount);
        updateCharCount(bottomTextInput, bottomCharCount);
        
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        showMemeNotification('Готово! Создавай новый мем, студент!');
    });
    
    function updateCharCount(input, counter) {
        const count = input.value.length;
        const max = input.maxLength;
        counter.textContent = `${count}/${max}`;
        
        if (count > max * 0.8) {
            counter.style.color = '#ff5555';
        } else {
            counter.style.color = 'rgba(255, 255, 255, 0.7)';
        }
    }
    
    function showMemeNotification(message) {
        const existingNotification = document.querySelector('.meme-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = 'meme-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100%);
            background: rgba(255, 85, 85, 0.9);
            color: white;
            padding: 15px 30px;
            border-radius: 10px;
            z-index: 1001;
            font-weight: 600;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            animation: memeNotificationSlideIn 0.3s ease forwards;
            max-width: 90%;
            text-align: center;
        `;
        
        document.body.appendChild(notification);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes memeNotificationSlideIn {
                from {
                    transform: translateX(-50%) translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
            }
            @keyframes memeNotificationSlideOut {
                from {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(-50%) translateY(-100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            notification.style.animation = 'memeNotificationSlideOut 0.3s ease forwards';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 300);
        }, 3000);
    }
    
    if (imageOptions.length > 0) {
        imageOptions[0].click();
    }
}