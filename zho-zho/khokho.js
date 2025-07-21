document.addEventListener('DOMContentLoaded', function() {
    // Game elements
    const gameBoard = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const statusDisplay = document.getElementById('status');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    // Game variables
    let score = 0;
    let timeLeft = 60;
    let gameInterval;
    let timerInterval;
    let isGameRunning = false;
    let activeChaserIndex = 0;
    
    // Players and poles
    const chasers = [];
    const runners = [];
    const poles = [];
    let activePlayer = null;
    
    // Initialize game
    function initGame() {
        // Clear the board
        gameBoard.innerHTML = '';
        chasers.length = 0;
        runners.length = 0;
        poles.length = 0;
        
        // Create poles (8 poles in a rectangle formation)
        const polePositions = [
            { x: 50, y: 50 },    // Top-left
            { x: 50, y: 250 },    // Middle-left
            { x: 50, y: 450 },    // Bottom-left
            { x: 750, y: 50 },    // Top-right
            { x: 750, y: 250 },   // Middle-right
            { x: 750, y: 450 },   // Bottom-right
            { x: 250, y: 250 },   // Center-left
            { x: 550, y: 250 }    // Center-right
        ];
        
        polePositions.forEach((pos, index) => {
            const pole = document.createElement('div');
            pole.className = 'pole';
            pole.style.left = `${pos.x}px`;
            pole.style.top = `${pos.y}px`;
            pole.dataset.index = index;
            gameBoard.appendChild(pole);
            poles.push({
                element: pole,
                x: pos.x,
                y: pos.y,
                index: index
            });
        });
        
        // Create chasers (3 players)
        for (let i = 0; i < 3; i++) {
            const chaser = document.createElement('div');
            chaser.className = 'player chaser';
            chaser.textContent = i + 1;
            chaser.style.left = `${poles[i].x}px`;
            chaser.style.top = `${poles[i].y}px`;
            chaser.dataset.index = i;
            gameBoard.appendChild(chaser);
            chasers.push({
                element: chaser,
                x: poles[i].x,
                y: poles[i].y,
                index: i,
                isActive: i === 0
            });
        }
        
        // Create runners (3 players)
        for (let i = 0; i < 3; i++) {
            const runner = document.createElement('div');
            runner.className = 'player runner';
            runner.textContent = 'R';
            runner.style.left = `${poles[i + 3].x}px`;
            runner.style.top = `${poles[i + 3].y}px`;
            gameBoard.appendChild(runner);
            runners.push({
                element: runner,
                x: poles[i + 3].x,
                y: poles[i + 3].y,
                isTagged: false
            });
        }
        
        // Set first chaser as active
        activeChaserIndex = 0;
        chasers[0].isActive = true;
        chasers[0].element.style.border = '2px solid white';
        activePlayer = chasers[0];
        
        // Reset score and timer
        score = 0;
        timeLeft = 60;
        scoreDisplay.textContent = `Score: ${score}`;
        timerDisplay.textContent = `Time: ${timeLeft}s`;
        statusDisplay.textContent = 'Status: Use arrow keys to move, K to pass (kho)';
    }
    
    // Start game
    function startGame() {
        if (isGameRunning) return;
        
        isGameRunning = true;
        startBtn.disabled = true;
        
        // Game timer
        timerInterval = setInterval(function() {
            timeLeft--;
            timerDisplay.textContent = `Time: ${timeLeft}s`;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
        
        // Game loop
        gameInterval = setInterval(function() {
            checkCollisions();
        }, 50);
    }
    
    // End game
    function endGame() {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        isGameRunning = false;
        startBtn.disabled = false;
        statusDisplay.textContent = `Status: Game over! Final score: ${score}`;
    }
    
    // Reset game
    function resetGame() {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        isGameRunning = false;
        startBtn.disabled = false;
        initGame();
        statusDisplay.textContent = 'Status: Waiting to start';
    }
    
    // Check for collisions between chasers and runners
    function checkCollisions() {
        const activeChaser = chasers[activeChaserIndex];
        
        runners.forEach(runner => {
            if (!runner.isTagged) {
                const distance = Math.sqrt(
                    Math.pow(activeChaser.x - runner.x, 2) + 
                    Math.pow(activeChaser.y - runner.y, 2)
                );
                
                if (distance < 30) { // Collision detected
                    runner.isTagged = true;
                    runner.element.style.display = 'none';
                    score += 10;
                    scoreDisplay.textContent = `Score: ${score}`;
                    
                    // Check if all runners are tagged
                    if (runners.every(r => r.isTagged)) {
                        statusDisplay.textContent = 'Status: All runners tagged!';
                        setTimeout(() => {
                            // Reset runners
                            runners.forEach((runner, i) => {
                                runner.isTagged = false;
                                runner.element.style.display = '';
                                runner.x = poles[i + 3].x;
                                runner.y = poles[i + 3].y;
                                runner.element.style.left = `${runner.x}px`;
                                runner.element.style.top = `${runner.y}px`;
                            });
                        }, 1000);
                    }
                }
            }
        });
    }
    
    // Move active player
    function movePlayer(direction) {
        if (!isGameRunning || !activePlayer) return;
        
        const speed = 10;
        let newX = activePlayer.x;
        let newY = activePlayer.y;
        
        switch (direction) {
            case 'up':
                newY = Math.max(0, activePlayer.y - speed);
                break;
            case 'down':
                newY = Math.min(gameBoard.offsetHeight - 30, activePlayer.y + speed);
                break;
            case 'left':
                newX = Math.max(0, activePlayer.x - speed);
                break;
            case 'right':
                newX = Math.min(gameBoard.offsetWidth - 30, activePlayer.x + speed);
                break;
        }
        
        activePlayer.x = newX;
        activePlayer.y = newY;
        activePlayer.element.style.left = `${newX}px`;
        activePlayer.element.style.top = `${newY}px`;
    }
    
    // Pass the chase (kho) to next chaser
    function passChase() {
        if (!isGameRunning || !activePlayer || chasers.length < 2) return;
        
        // Find nearest pole to active chaser
        let nearestPole = null;
        let minDistance = Infinity;
        
        poles.forEach(pole => {
            const distance = Math.sqrt(
                Math.pow(activePlayer.x - pole.x, 2) + 
                Math.pow(activePlayer.y - pole.y, 2)
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                nearestPole = pole;
            }
        });
        
        // Only pass if close to a pole (kho rule)
        if (minDistance < 40) {
            // Deactivate current chaser
            activePlayer.isActive = false;
            activePlayer.element.style.border = '2px solid #2980b9';
            
            // Move to next chaser
            activeChaserIndex = (activeChaserIndex + 1) % chasers.length;
            activePlayer = chasers[activeChaserIndex];
            activePlayer.isActive = true;
            activePlayer.element.style.border = '2px solid white';
            
            // Move the new active chaser to the pole
            activePlayer.x = nearestPole.x;
            activePlayer.y = nearestPole.y;
            activePlayer.element.style.left = `${nearestPole.x}px`;
            activePlayer.element.style.top = `${nearestPole.y}px`;
        }
    }
    
    // Event listeners
    startBtn.addEventListener('click', function() {
        initGame();
        startGame();
    });
    
    resetBtn.addEventListener('click', resetGame);
    
    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        if (!isGameRunning) return;
        
        switch (e.key) {
            case 'ArrowUp':
                movePlayer('up');
                break;
            case 'ArrowDown':
                movePlayer('down');
                break;
            case 'ArrowLeft':
                movePlayer('left');
                break;
            case 'ArrowRight':
                movePlayer('right');
                break;
            case 'k':
            case 'K':
                passChase();
                break;
        }
    });
    
    // Initialize game on load
    initGame();
});