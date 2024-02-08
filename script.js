document.body.style.background = "url('bgg.gif') center/cover no-repeat fixed";
document.body.style.width = "100%";
document.body.style.height = "100%";
document.body.style.margin = "0";
document.body.style.overflow = "hidden";
document.body.style.userSelect = "none";

const character = document.getElementById('character');
const attackButton = document.getElementById('attackButton');
const moveLeftButton = document.getElementById('moveLeftButton');
const moveRightButton = document.getElementById('moveRightButton');
const healthBar = document.getElementById('healthBar');
const healthValue = document.getElementById('healthValue');
const ultimateButton = document.getElementById('ultimateButton');
const scoreElement = document.getElementById('score');
const preloader = document.getElementById('preloader');
const explodeAudio = document.getElementById('explodeAudio');
const overAudio = document.getElementById('overAudio');
const punchAudio = document.getElementById('punchAudio');
const ultiAudio = document.getElementById('ultiAudio');

let isPunchAudioPlaying = false;





let currentPosition = window.innerWidth / 2;
let isGameOver = false;

let playerScore = 0;
let isAttacking = false;
let isWalkingRight = false;
let isWalkingLeft = false;
let animationTimeout;

let currentHealth = 100; // Initial health value
updateHealthBar();
updateHealthValue(); // Added to initialize the health value on page load

function updateHealthBar() {
    healthBar.style.width = `${currentHealth}%`;
}

function updateHealthValue() {

}

function decreaseHealth(amount) {
    currentHealth -= amount;
    if (currentHealth < 0) {
    currentHealth = 0;
            updateHealthBar();
            updateHealthValue();
        // Handle character death or other logic when health reaches zero
         // Display game over screen or perform other game over logic
                showGameOverScreen();
    }
    updateHealthBar();
    updateHealthValue(); // Added to update the displayed health value
}

function showGameOverScreen() {
    // Hide relevant game elements
    character.style.display = 'none';
    attackButton.style.display = 'none';
    moveLeftButton.style.display = 'none';
    moveRightButton.style.display = 'none';
    ultimateButton.style.display = 'none';
    scoreElement.style.display = 'none';

isGameOver = true;

   // Display game over screen
      const gameOverScreen = document.getElementById('gameOverScreen');
      gameOverScreen.style.display = 'flex'; // Show the game over screen


    // Display the final score
    const finalScoreElement = document.getElementById('finalScore');
    finalScoreElement.innerText = `Final Score: ${playerScore}`;


    // Display restart button
    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', restartGame);
    restartButton.addEventListener('touchstart', restartGame);

     if (!overAudio.played) {
            overAudio.play();
        }
}


function restartGame() {
increaseBlueBarWidth(100);
    // Clear existing enemies
    enemies.forEach(({ enemy }) => {
        document.body.removeChild(enemy);
    });
    enemies.length = 0;

isGameOver = false;
    // Reset player score and health
    blueBar.style.width = '0px';
    playerScore = 0;
    currentHealth = 100;
    updateScore();
    updateHealthBar();

    // Show relevant game elements
    character.style.display = 'block';
    attackButton.style.display = 'block';
    moveLeftButton.style.display = 'block';
    moveRightButton.style.display = 'block';
    ultimateButton.style.display = 'block';
    scoreElement.style.display = 'block';

    // Hide game over screen
 // Display game over screen
      const gameOverScreen = document.getElementById('gameOverScreen');
      gameOverScreen.style.display = 'none'; // Show the game over screen

    // Remove event listener from restart button
    const restartButton = document.getElementById('restartButton');
    restartButton.removeEventListener('click', restartGame);

}






function animateCharacter(imageUrls, index = 0, timeout = 100, onFrameCallback = null) {
    let animationDirection = 1; // 1 for forward, -1 for reverse

    function playNextFrame() {
        const isIdleFrame = imageUrls === playerImageUrls;
        if (isIdleFrame) {
            // Set different height and width for idle frames
            character.style.width = '20%'; // Adjust the width as needed
            character.style.height = '63%'; // Adjust the height as needed
        } else {
            // Reset to default height and width for other frames
            character.style.width = '';
            character.style.height = '';
        }

        character.src = imageUrls[index];

        if (onFrameCallback) {
            onFrameCallback(); // Call the callback after displaying each frame
        }

        index += animationDirection;

        if (index < 0 || index >= imageUrls.length) {
            // Change direction when reaching the start or end
            animationDirection *= -1;
            index += 2 * animationDirection;
        }

        animationTimeout = setTimeout(playNextFrame, timeout);
    }

    playNextFrame();
}


function isUltimateState() {
    return isAttacking;
}



function preloadImages(urls) {
    const promises = urls.map(url => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = (error) => reject(error);
            img.src = url;
        });
    });

    return Promise.all(promises);
}

const playerImageUrls = [];
for (let i = 1; i <= 17; i++) {
    playerImageUrls.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v3/main/idle%20(${i}).png`);
}

const attackRightImageUrls = [];
for (let i = 1; i <= 22; i++) {
    attackRightImageUrls.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v3/main/attack%20(${i}).png`);
}

const attackLeftImageUrls = [];
for (let i = 1; i <= 22; i++) {
    attackLeftImageUrls.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v3/main/attackleft%20(${i}).png`);
}

const walkRightImageUrls = [];
for (let i = 1; i <= 10; i++) {
    walkRightImageUrls.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v3/main/rightt%20(${i}).png`);
}

const walkLeftImageUrls = [];
for (let i = 1; i <=10; i++) {
    walkLeftImageUrls.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v3/main/rightt%20(${i}).png`);
}

const enemyWalkLeftImageUrls = [];
for (let i = 1; i <= 9; i++) {
    enemyWalkLeftImageUrls.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v3/main/enemy%20(${i}).png`);
}

const characterUltimateframes = [];
for (let i = 1; i <= 17; i++) {
    characterUltimateframes.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v3/main/ulti%20(${i}).png`);
}

const hitFrames = [];
for (let i = 1; i <= 8; i++) {
    hitFrames.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v3/main/hitt1%20(${i}).png`);
}


const ultimateOpening = [];
for (let i = 1; i <= 8; i++) {
    ultimateOpening.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v2/main/opening%20(${i}).png`);
}

const ultimateOpening2 = [];
for (let i = 1; i <= 5; i++) {
    ultimateOpening2.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v3/main/opening2%20(${i}).png`);
}

const exhaustedFrames = [];
for (let i = 1; i <= 4; i++) {
    exhaustedFrames.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v2/main/exhausted%20(1).png(${i}).png`);
}

const enemyAttackFrames = [];
for (let i = 1; i <= 14; i++) {
    enemyAttackFrames.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v3/main/enemyattack%20(${i}).png`);
}




preloadImages(enemyWalkLeftImageUrls);
preloadImages(playerImageUrls);
preloadImages(attackRightImageUrls);
preloadImages(attackLeftImageUrls);
preloadImages(walkRightImageUrls);
preloadImages(walkLeftImageUrls);
preloadImages(characterUltimateframes);
preloadImages(hitFrames);
preloadImages(ultimateOpening);
preloadImages(ultimateOpening2);
preloadImages(exhaustedFrames);
preloadImages(enemyAttackFrames);


Promise.all([
    preloadImages(playerImageUrls),
    preloadImages(attackRightImageUrls),
    preloadImages(enemyAttackFrames),
    preloadImages(enemyWalkLeftImageUrls),
    preloadImages(attackLeftImageUrls),
    preloadImages(walkRightImageUrls),
    preloadImages(walkLeftImageUrls),
    preloadImages(characterUltimateframes),
    preloadImages(hitFrames),
    preloadImages(ultimateOpening),
    preloadImages(ultimateOpening2),

    // Add other image URLs as needed
]).then(() => {
    // All images are loaded, start the game
    initializeGame();
    preloader.style.display = 'none'; // Hide the preloader
}).catch((error) => {
    console.error("Error loading images:", error);
    // Handle the error and possibly inform the user that there was an issue loading the game
    preloader.innerText = 'Error loading game. Please refresh the page.';
});

let lastMoveDirection = null;

    let isAttackButtonPressed = false;

 function handleAttackStart() {
     if (!isAttacking) {
         isAttacking = true;
         clearTimeout(animationTimeout);

         // Use the last movement direction for attack frames
         const attackDirection = lastMoveDirection === 'right' ? 'right' : 'left';

         const onFrameCallback = () => {
             if (isAttacking) {
                 checkAttackCollision();
             }
         };

         punchAudio.loop = true;
         punchAudio.play();
         isPunchAudioPlaying = true;

         // Continuously play punch audio while attack frames are performing
         punchAudio.addEventListener('ended', function() {
             this.currentTime = 0;
             this.play();
         });

         if (attackDirection === 'right') {
             // Set a different timeout for attack frames
             animateCharacter(attackRightImageUrls, 0, 20, onFrameCallback); // 20 milliseconds for attack frames
         } else {
             // Set a different timeout for attack frames
             animateCharacter(attackLeftImageUrls, 0, 20, onFrameCallback); // 20 milliseconds for attack frames
         }
     }
 }




function checkAttackCollision() {
    const characterRect = character.getBoundingClientRect();

    enemies.forEach(({ enemy, enemyImage, direction, frameIndex, hasCollided }) => {
        if (!hasCollided) { // Check if the enemy has already collided
            const enemyRect = enemy.getBoundingClientRect();

            if (
                characterRect.right > enemyRect.left &&
                characterRect.left < enemyRect.right &&
                characterRect.bottom > enemyRect.top &&
                characterRect.top < enemyRect.bottom
            ) {
                // Collision detected, play hit frames
                playHitFrames(enemyImage, enemy, direction);
                // Increase the blue bar width (up to a maximum of 50)
                increaseBlueBarWidth(10); // Adjust the amount to increase as needed

                // Set 'hasCollided' to true to prevent further collisions
                enemies.find(e => e.enemy === enemy).hasCollided = true;
            }
        }
    });
}


function playHitFrames(enemyImage, enemy, direction) {
    const hitFrameTimeout = 100; // Adjust the timeout between hit frames
    const hitFramesTotal = hitFrames.length;

    function playNextHitFrame(index) {
        if (index < hitFramesTotal) {
            enemyImage.src = hitFrames[index];
            setTimeout(() => playNextHitFrame(index + 1), hitFrameTimeout);
        } else {
            // Remove the enemy after playing all hit frames

            document.body.removeChild(enemy);
            const enemyIndex = enemies.findIndex((e) => e.enemy === enemy);
             explodeAudio.play();
            if (enemyIndex !== -1) {
                enemies.splice(enemyIndex, 1);
                playerScore += 1; // Add one point for each enemy removed
                updateScore();
            }
        }
    }

    // Reset enemy's image to the first hit frame
    enemyImage.src = hitFrames[0];

    // Play hit frames starting from the second frame
    playNextHitFrame(1);
}




function performUltimate() {
    if (!isAttacking) {
        isAttacking = true;
        clearTimeout(animationTimeout);
        ultimateButton.style.display = 'none'; // Hide the ultimate button

        ultiAudio.play();

        const ultimateOpeningTimeout = 100; // Adjust the timeout between opening ultimate frames
        const ultimateOpeningFramesTotal = ultimateOpening.length;
        const originalWidth = character.style.width;
        const originalHeight = character.style.height;

        function playNextOpeningFrame(index) {
            if (index < ultimateOpeningFramesTotal) {
                const openingFrame = ultimateOpening[index];
                character.src = openingFrame;

                // Make the opening frame fullscreen
                character.style.width = '100%';
                character.style.height = '100%';
                character.style.left = '50%'; // Center horizontally
                character.style.top = '50%'; // Center vertically

                setTimeout(() => playNextOpeningFrame(index + 1), ultimateOpeningTimeout);
            } else {
                // Reset to default size after playing opening frames
                character.style.width = originalWidth;
                character.style.height = originalHeight;
                character.style.left = '50%'; // Reset left property to default
                character.style.top = ''; // Reset top property to default

                // Play the second set of opening frames
                playNextOpeningFrame2(0);
            }
        }

        function playNextOpeningFrame2(index) {
            const ultimateOpening2Timeout = 200; // Adjust the timeout between opening ultimate 2 frames
            const ultimateOpening2FramesTotal = ultimateOpening2.length;

            if (index < ultimateOpening2FramesTotal) {
                const openingFrame2 = ultimateOpening2[index];
                character.src = openingFrame2;

                // Make the opening frame fullscreen
                character.style.width = '100%';
                character.style.height = '100%';
                character.style.left = '50%'; // Center horizontally
                character.style.top = '50%'; // Center vertically

                setTimeout(() => playNextOpeningFrame2(index + 1), ultimateOpening2Timeout);
            } else {
                // Reset to default size after playing opening frames
                character.style.width = originalWidth;
                character.style.height = originalHeight;
                character.style.left = '50%'; // Reset left property to default
                character.style.top = ''; // Reset top property to default

                // Play the actual ultimate frames
                playNextUltimateFrame(0);
            }
        }

function playNextUltimateFrame(index) {
    const ultimateTimeout = 100; // Adjust the timeout between ultimate frames
    const ultimateFramesTotal = characterUltimateframes.length;

    if (index < ultimateFramesTotal) {
        character.src = characterUltimateframes[index];
        setTimeout(() => playNextUltimateFrame(index + 1), ultimateTimeout);
    } else {
        setTimeout(() => {
            // Reset to idle frames after playing ultimate frames
            animateCharacter(playerImageUrls); // Call the function to switch to idle frames
        }, 1500);
        // Play hit frames after the ultimate frames
        playHitFramesToAllEnemies();
        resetBlueBar();
    }
}



        // Start playing the opening frames
        playNextOpeningFrame(0);
    }
}




function resetBlueBar() {
    const blueBar = document.getElementById('blueBar');
    blueBar.style.width = '0px';
}

function playHitFramesToAllEnemies() {
    const hitFrameTimeout = 100; // Adjust the timeout between hit frames
    const hitFramesTotal = hitFrames.length;

    function playNextHitFrame(index, enemy, enemyImage, direction) {
        if (index < hitFramesTotal) {
            enemyImage.src = hitFrames[index];
            setTimeout(() => playNextHitFrame(index + 1, enemy, enemyImage, direction), hitFrameTimeout);
        } else {
            // Remove the enemy after playing all hit frames
            document.body.removeChild(enemy);
            const enemyIndex = enemies.findIndex((e) => e.enemy === enemy);
            explodeAudio.play();
            if (enemyIndex !== -1) {
                enemies.splice(enemyIndex, 1);
                playerScore += 1; // Add 1 score for each enemy removed
                updateScore();
            }
        }
    }

    // Play hit frames to all enemies
    enemies.forEach(({ enemy, enemyImage, direction, frameIndex }) => {
        // Reset enemy's image to the first hit frame
        enemyImage.src = hitFrames[0];

        // Play hit frames starting from the second frame
        playNextHitFrame(1, enemy, enemyImage, direction);
    });
}



function updateScore() {
    scoreElement.innerText = `Points: ${playerScore}`;
}


// Update the existing code for increasing the blue bar
function increaseBlueBarWidth(amount) {
    const blueBar = document.getElementById('blueBar');
    const currentWidth = parseFloat(getComputedStyle(blueBar).width);
    const maxWidth = 100; // Adjust the maximum width as needed

    const newWidth = Math.min(currentWidth + amount, maxWidth);

    blueBar.style.width = `${newWidth}px`;

    // Show the ultimate button when the blue bar is full
    const ultimateButton = document.getElementById('ultimateButton');
    if (newWidth >= maxWidth) {
        ultimateButton.style.display = 'block';
    } else {
        ultimateButton.style.display = 'none';
    }

    if (newWidth === maxWidth) {

    }
}




function handleAttackEnd() {
    if (isAttacking) {
        clearTimeout(animationTimeout);
        isAttacking = false;
        character.style.width = '';
         punchAudio.pause();
                punchAudio.currentTime = 0;
                isPunchAudioPlaying = false;
        setTimeout(() => animateCharacter(playerImageUrls), 0);
                    isAttackButtonPressed = false; // Set the flag to false on button release

    }
}

let moveInterval;
let moveDirection = null;

character.style.left = `${currentPosition}px`;

function handleMove(direction) {
    lastMoveDirection = direction;

    const step = 10;

    if (direction === 'left') {
        currentPosition = Math.max(0, currentPosition - step);
        character.style.left = `${currentPosition}px`;

        if (!isWalkingLeft) {
            isWalkingLeft = true;
            clearTimeout(animationTimeout);
            animateCharacter(walkLeftImageUrls);
        }
        isWalkingRight = false;
    } else if (direction === 'right') {
        const maxXPosition = window.innerWidth - character.clientWidth +200;
        currentPosition = Math.min(maxXPosition, currentPosition + step);
        character.style.left = `${currentPosition}px`;

        if (!isWalkingRight) {
            isWalkingRight = true;
            clearTimeout(animationTimeout);
            animateCharacter(walkRightImageUrls);
        }
        isWalkingLeft = false;
    }
}



function stopMoving() {
    if (isWalkingRight) {
        isWalkingRight = false;
        clearTimeout(animationTimeout);
        if (!isAttackButtonPressed && !isAttacking) {
            animateCharacter(playerImageUrls); // Reset to idle frames only if the attack button is not pressed and not attacking
        }
    }
    if (isWalkingLeft) {
        isWalkingLeft = false;
        clearTimeout(animationTimeout);
        if (!isAttackButtonPressed && !isAttacking) {
            animateCharacter(playerImageUrls); // Reset to idle frames only if the attack button is not pressed and not attacking
        }
    }
}

if (isAttackButtonPressed) {
        punchAudio.loop = true;
        punchAudio.play();
        isPunchAudioPlaying = true;
    }


   attackButton.addEventListener('mousedown', () => {
        isAttackButtonPressed = true; // Set the flag to true on button press
        handleAttackStart();
    });
    attackButton.addEventListener('touchstart', () => {
        isAttackButtonPressed = true; // Set the flag to true on touch start
        handleAttackStart();
    });
    attackButton.addEventListener('mouseup', handleAttackEnd);
    attackButton.addEventListener('touchend', handleAttackEnd);

moveLeftButton.addEventListener('mousedown', () => {
    handleMove('left');
    moveInterval = setInterval(() => handleMove('left'), 100);
});
moveRightButton.addEventListener('mousedown', () => {
    handleMove('right');
    moveInterval = setInterval(() => handleMove('right'), 100);
});
moveLeftButton.addEventListener('mouseup', () => {
    clearInterval(moveInterval);
    stopMoving();
});
moveRightButton.addEventListener('mouseup', () => {
    clearInterval(moveInterval);
    stopMoving();
});

// Touch events for mobile
moveLeftButton.addEventListener('touchstart', () => {
    handleMove('left');
    moveInterval = setInterval(() => handleMove('left'), 100);
});

moveRightButton.addEventListener('touchstart', () => {
    handleMove('right');
    moveInterval = setInterval(() => handleMove('right'), 100);
});

// Add touchend event listeners to stop moving when touch is released
moveLeftButton.addEventListener('touchend', () => {
    clearInterval(moveInterval);
    stopMoving();
});

moveRightButton.addEventListener('touchend', () => {
    clearInterval(moveInterval);
    stopMoving();
});


ultimateButton.addEventListener('click', performUltimate);

// Enemy logic
const enemies = [];

function createEnemy(direction) {
    const enemy = document.createElement('div');
    enemy.className = 'enemy';
    enemy.style.width = '15%';
    enemy.style.height = '60%';
    enemy.style.position = 'absolute';
    enemy.style.bottom = '-5%';
    enemy.hasCollided = false; // Initialize the property

    const enemyImage = document.createElement('img');
    enemyImage.style.width = '100%';
    enemyImage.style.height = '100%';
    enemyImage.style.transform = direction === 'left' ? '' : 'scaleX(-1)';

    enemy.appendChild(enemyImage);

    // Calculate initial position based on corners
    if (direction === 'left') {
        enemy.style.left = '0';
        enemyImage.src = enemyWalkLeftImageUrls[0];
    } else {
        enemy.style.left = `${window.innerWidth - 30}px`;
        // Assuming you want to use the same frames for right as left (flipped)
        enemyImage.src = enemyWalkLeftImageUrls[0];
    }

    document.body.appendChild(enemy);

    return { enemy, enemyImage, direction, frameIndex: 0, hasCollided: false };
}






function moveEnemiesTowardsCharacter() {
    const characterRect = character.getBoundingClientRect();

    enemies.forEach(({ enemy, enemyImage, direction, frameIndex, hasCollided }) => {
        const enemyRect = enemy.getBoundingClientRect();

        if (
            characterRect.right > enemyRect.left &&
            characterRect.left < enemyRect.right &&
            characterRect.bottom > enemyRect.top &&
            characterRect.top < enemyRect.bottom
        ) {
            if (!hasCollided) {
                // Collision detected, decrease character's health
                decreaseHealth(0.1); // Adjust the amount to decrease as needed
                hasCollided = true; // Set the collision flag to true to prevent continuous collision
            }

            // Use reversed attack frames when colliding
            frameIndex = (frameIndex - 1 + enemyAttackFrames.length) % enemyAttackFrames.length;
            enemyImage.src = enemyAttackFrames[frameIndex];

            // Set the enemy height to 65%
            enemy.style.height = '65%';
        } else {
            // Reset the collision flag when not colliding
            hasCollided = false;

            // Use walk frames when not colliding
            frameIndex = (frameIndex + 1) % enemyWalkLeftImageUrls.length;
            enemyImage.src = enemyWalkLeftImageUrls[frameIndex];

            // Set the default enemy height
            enemy.style.height = '60%';
        }

        if (characterRect.left < enemyRect.left) {
            enemy.style.left = `${parseInt(enemy.style.left) - 1}px`;
        } else {
            enemy.style.left = `${parseInt(enemy.style.left) + 1}px`;
        }

        enemies.find(e => e.enemy === enemy).frameIndex = frameIndex;
    });

    setTimeout(() => {
        requestAnimationFrame(moveEnemiesTowardsCharacter);
    }, 100);
}








function respawnEnemies() {
    if (!isGameOver) { // Check if the game is not over before respawning enemies
        setInterval(() => {
            // Calculate respawn position based on corners
            const respawnPosition = Math.random() < 0.5 ? 'left' : 'right';
            const newEnemy = createEnemy(respawnPosition);
            enemies.push(newEnemy);
        }, 2000); // Adjust the respawn interval as needed
    }
}




function initializeGame() {
    enemies.push(createEnemy('left'));
    enemies.push(createEnemy('right'));

    character.style.bottom = "-35%"; // Set character at the bottom
       character.style.left = '50%';



    requestAnimationFrame(moveEnemiesTowardsCharacter);
    respawnEnemies();
    updateScore();

}



document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            handleMove('left');
            break;
        case 'ArrowRight':
            handleMove('right');
            break;
        case ' ':
            isAttackButtonPressed = true; // Set the flag to true on spacebar press
            handleAttackStart();
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
            clearInterval(moveInterval);
            stopMoving();
            break;
        case ' ':
            isAttackButtonPressed = false; // Set the flag to false on spacebar release
            handleAttackEnd();
            break;
    }
});
