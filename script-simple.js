// 🌊 Simple Water Effect for PEPE MOON - Guaranteed to Work!
let scene, camera, renderer, water, particles;
let animationId;
let time = 0;

function initThreeJS() {
    console.log('🚀 Initializing Three.js...');
    
    try {
        // Scene
        scene = new THREE.Scene();
        
        // Camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 20, 40);
        camera.lookAt(0, 0, 0);
        
        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x87CEEB, 0.1);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        const container = document.getElementById('three-container');
        if (container) {
            container.appendChild(renderer.domElement);
            console.log('✅ Renderer added to container');
        } else {
            console.error('❌ Container not found!');
            return;
        }
        
        // Create simple water
        createSimpleWater();
        createParticles();
        createLighting();
        
        // Start animation
        animate();
        
        // Handle window resize
        window.addEventListener('resize', onWindowResize);
        
        console.log('✅ Three.js initialized successfully!');
        
    } catch (error) {
        console.error('❌ Error initializing Three.js:', error);
        // Fallback: create a simple animated background
        createFallbackBackground();
    }
}

function createSimpleWater() {
    try {
        // Simple water plane with animated material
        const waterGeometry = new THREE.PlaneGeometry(100, 100, 32, 32);
        
        // Create animated water material
        const waterMaterial = new THREE.MeshPhongMaterial({
            color: 0x4ecdc4,
            transparent: true,
            opacity: 0.8,
            shininess: 100
        });
        
        water = new THREE.Mesh(waterGeometry, waterMaterial);
        water.rotation.x = -Math.PI / 2;
        water.receiveShadow = true;
        scene.add(water);
        
        // Add wave animation
        animateWater();
        
        console.log('✅ Water created successfully');
        
    } catch (error) {
        console.error('❌ Error creating water:', error);
    }
}

function animateWater() {
    if (!water || !water.geometry) return;
    
    const positions = water.geometry.attributes.position.array;
    const originalPositions = new Float32Array(positions);
    
    function updateWater() {
        for (let i = 0; i < positions.length; i += 3) {
            const x = originalPositions[i];
            const z = originalPositions[i + 2];
            
            // Create wave effect
            const wave = Math.sin(x * 0.1 + time * 0.5) * 
                        Math.sin(z * 0.1 + time * 0.3) * 2;
            
            positions[i + 1] = wave;
        }
        
        water.geometry.attributes.position.needsUpdate = true;
    }
    
    // Store the update function
    water.updateWater = updateWater;
}

function createParticles() {
    try {
        const particleCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            // Positions
            positions[i * 3] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = Math.random() * 30 + 5;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
            
            // Colors (crypto theme)
            const color = new THREE.Color();
            const hue = Math.random() * 0.3 + 0.6; // Blue to cyan range
            color.setHSL(hue, 0.8, 0.6);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        particles = new THREE.Points(geometry, material);
        scene.add(particles);
        
        console.log('✅ Particles created successfully');
        
    } catch (error) {
        console.error('❌ Error creating particles:', error);
    }
}

function createLighting() {
    try {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);
        
        // Directional light (sun)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(50, 50, 50);
        directionalLight.castShadow = true;
        scene.add(directionalLight);
        
        // Point light for underwater glow
        const pointLight = new THREE.PointLight(0x4ecdc4, 1, 100);
        pointLight.position.set(0, -10, 0);
        scene.add(pointLight);
        
        console.log('✅ Lighting created successfully');
        
    } catch (error) {
        console.error('❌ Error creating lighting:', error);
    }
}

function createFallbackBackground() {
    console.log('🔄 Creating fallback background...');
    
    const container = document.getElementById('three-container');
    if (container) {
        container.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #2d1b69 100%);
                z-index: -1;
                overflow: hidden;
            ">
                <div style="
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle at 50% 50%, rgba(78, 205, 196, 0.1) 0%, transparent 70%);
                    animation: pulse 4s ease-in-out infinite;
                "></div>
                <div style="
                    position: absolute;
                    top: 20%;
                    left: 10%;
                    width: 80px;
                    height: 80px;
                    background: rgba(78, 205, 196, 0.3);
                    border-radius: 50%;
                    animation: float 6s ease-in-out infinite;
                "></div>
                <div style="
                    position: absolute;
                    top: 60%;
                    right: 15%;
                    width: 60px;
                    height: 60px;
                    background: rgba(255, 107, 107, 0.3);
                    border-radius: 50%;
                    animation: float 8s ease-in-out infinite 2s;
                "></div>
                <div style="
                    position: absolute;
                    bottom: 30%;
                    left: 20%;
                    width: 40px;
                    height: 40px;
                    background: rgba(69, 183, 209, 0.3);
                    border-radius: 50%;
                    animation: float 7s ease-in-out infinite 4s;
                "></div>
            </div>
            <style>
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.7; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
            </style>
        `;
    }
}

function animate() {
    animationId = requestAnimationFrame(animate);
    
    time += 0.01;
    
    try {
        // Update water
        if (water && water.updateWater) {
            water.updateWater();
        }
        
        // Rotate camera slowly
        if (camera) {
            const radius = 40;
            camera.position.x = Math.cos(time * 0.1) * radius;
            camera.position.z = Math.sin(time * 0.1) * radius;
            camera.position.y = 20 + Math.sin(time * 0.2) * 5;
            camera.lookAt(0, 0, 0);
        }
        
        // Rotate particles
        if (particles) {
            particles.rotation.y += 0.002;
            particles.rotation.x += 0.001;
        }
        
        // Render scene
        if (renderer && scene && camera) {
            renderer.render(scene, camera);
        }
        
    } catch (error) {
        console.error('❌ Error in animation loop:', error);
        cancelAnimationFrame(animationId);
    }
}

function onWindowResize() {
    try {
        if (camera && renderer) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    } catch (error) {
        console.error('❌ Error resizing:', error);
    }
}

// Modal Management
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking on X or outside
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, initializing...');
    
    // Close button functionality
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });
    
    // Close modal when clicking outside
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
    
    // Initialize Three.js with delay to ensure everything is loaded
    setTimeout(() => {
        initThreeJS();
    }, 100);
});

// Game Functions
function openGame(gameType) {
    openModal('gameModal');
    const gameContainer = document.getElementById('gameContainer');
    
    switch(gameType) {
        case 'flappy':
            gameContainer.innerHTML = createFlappyGame();
            initFlappyGame();
            break;
        case 'snake':
            gameContainer.innerHTML = createSnakeGame();
            initSnakeGame();
            break;
        case 'tetris':
            gameContainer.innerHTML = createTetrisGame();
            initTetrisGame();
            break;
    }
}

function createFlappyGame() {
    return `
        <div class="game-area" id="flappyGame">
            <canvas id="flappyCanvas" width="400" height="400"></canvas>
            <div class="game-overlay">
                <div class="score">Score: <span id="flappyScore">0</span></div>
                <div class="instructions">Click or Press Space to Jump!</div>
            </div>
        </div>
    `;
}

function createSnakeGame() {
    return `
        <div class="game-area" id="snakeGame">
            <canvas id="snakeCanvas" width="400" height="400"></canvas>
            <div class="game-overlay">
                <div class="score">Score: <span id="snakeScore">0</span></div>
                <div class="instructions">Use Arrow Keys to Move!</div>
            </div>
        </div>
    `;
}

function createTetrisGame() {
    return `
        <div class="game-area" id="tetrisGame">
            <canvas id="tetrisCanvas" width="400" height="400"></canvas>
            <div class="game-overlay">
                <div class="score">Score: <span id="tetrisScore">0</span></div>
                <div class="instructions">Use Arrow Keys to Move and Rotate!</div>
            </div>
        </div>
    `;
}

// Flappy Bird Game Implementation
function initFlappyGame() {
    const canvas = document.getElementById('flappyCanvas');
    const ctx = canvas.getContext('2d');
    
    const bird = {
        x: 50,
        y: 200,
        velocity: 0,
        gravity: 0.5,
        size: 20
    };
    
    const pipes = [];
    let score = 0;
    let gameRunning = true;
    
    function createPipe() {
        const gap = 100;
        const pipeWidth = 50;
        const pipeHeight = Math.random() * 200 + 50;
        
        pipes.push({
            x: canvas.width,
            topHeight: pipeHeight,
            bottomY: pipeHeight + gap,
            width: pipeWidth,
            passed: false
        });
    }
    
    function updateBird() {
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;
        
        if (bird.y < 0 || bird.y > canvas.height) {
            gameOver();
        }
    }
    
    function updatePipes() {
        for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].x -= 2;
            
            if (pipes[i].x + pipes[i].width < 0) {
                pipes.splice(i, 1);
            }
            
            // Check collision
            if (bird.x < pipes[i].x + pipes[i].width &&
                bird.x + bird.size > pipes[i].x &&
                (bird.y < pipes[i].topHeight || bird.y + bird.size > pipes[i].bottomY)) {
                gameOver();
            }
            
            // Check score
            if (!pipes[i].passed && pipes[i].x + pipes[i].width < bird.x) {
                pipes[i].passed = true;
                score++;
                document.getElementById('flappyScore').textContent = score;
            }
        }
    }
    
    function draw() {
        // Clear canvas
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw bird
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(bird.x, bird.y, bird.size, bird.size);
        
        // Draw pipes
        ctx.fillStyle = '#228B22';
        pipes.forEach(pipe => {
            ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
            ctx.fillRect(pipe.x, pipe.bottomY, pipe.width, canvas.height - pipe.bottomY);
        });
    }
    
    function gameLoop() {
        if (!gameRunning) return;
        
        updateBird();
        updatePipes();
        draw();
        
        if (Math.random() < 0.02) {
            createPipe();
        }
        
        requestAnimationFrame(gameLoop);
    }
    
    function gameOver() {
        gameRunning = false;
        alert(`Game Over! Score: ${score}`);
    }
    
    function jump() {
        if (gameRunning) {
            bird.velocity = -8;
        }
    }
    
    // Event listeners
    canvas.addEventListener('click', jump);
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            jump();
        }
    });
    
    // Start game
    gameLoop();
}

// Snake Game Implementation
function initSnakeGame() {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    
    let snake = [{x: 10, y: 10}];
    let food = {x: 15, y: 15};
    let dx = 0;
    let dy = 0;
    let score = 0;
    let gameRunning = true;
    
    function drawGame() {
        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw snake
        ctx.fillStyle = '#00FF00';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        });
        
        // Draw food
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    }
    
    function moveSnake() {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        
        // Check boundaries
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            gameOver();
            return;
        }
        
        // Check self collision
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            gameOver();
            return;
        }
        
        snake.unshift(head);
        
        // Check food collision
        if (head.x === food.x && head.y === food.y) {
            score++;
            document.getElementById('snakeScore').textContent = score;
            generateFood();
        } else {
            snake.pop();
        }
    }
    
    function generateFood() {
        food.x = Math.floor(Math.random() * tileCount);
        food.y = Math.floor(Math.random() * tileCount);
    }
    
    function gameOver() {
        gameRunning = false;
        alert(`Game Over! Score: ${score}`);
    }
    
    function gameLoop() {
        if (!gameRunning) return;
        
        moveSnake();
        drawGame();
        setTimeout(gameLoop, 150);
    }
    
    // Event listeners
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp':
                if (dy !== 1) { dx = 0; dy = -1; }
                break;
            case 'ArrowDown':
                if (dy !== -1) { dx = 0; dy = 1; }
                break;
            case 'ArrowLeft':
                if (dx !== 1) { dx = -1; dy = 0; }
                break;
            case 'ArrowRight':
                if (dx !== -1) { dx = 1; dy = 0; }
                break;
        }
    });
    
    // Start game
    gameLoop();
}

// Tetris Game Implementation
function initTetrisGame() {
    const canvas = document.getElementById('tetrisCanvas');
    const ctx = canvas.getContext('2d');
    
    const blockSize = 20;
    const cols = canvas.width / blockSize;
    const rows = canvas.height / blockSize;
    
    let board = Array(rows).fill().map(() => Array(cols).fill(0));
    let currentPiece = null;
    let score = 0;
    let gameRunning = true;
    
    const pieces = [
        [[1, 1, 1, 1]], // I
        [[1, 1], [1, 1]], // O
        [[1, 1, 1], [0, 1, 0]], // T
        [[1, 1, 1], [1, 0, 0]], // L
        [[1, 1, 1], [0, 0, 1]], // J
        [[1, 1, 0], [0, 1, 1]], // S
        [[0, 1, 1], [1, 1, 0]]  // Z
    ];
    
    function createPiece() {
        const piece = pieces[Math.floor(Math.random() * pieces.length)];
        return {
            shape: piece,
            x: Math.floor(cols / 2) - Math.floor(piece[0].length / 2),
            y: 0
        };
    }
    
    function drawBoard() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw placed pieces
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (board[row][col]) {
                    ctx.fillStyle = '#00FFFF';
                    ctx.fillRect(col * blockSize, row * blockSize, blockSize - 1, blockSize - 1);
                }
            }
        }
        
        // Draw current piece
        if (currentPiece) {
            ctx.fillStyle = '#FF00FF';
            currentPiece.shape.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (cell) {
                        ctx.fillRect(
                            (currentPiece.x + colIndex) * blockSize,
                            (currentPiece.y + rowIndex) * blockSize,
                            blockSize - 1,
                            blockSize - 1
                        );
                    }
                });
            });
        }
    }
    
    function canMove(piece, dx, dy) {
        return piece.shape.every((row, rowIndex) => {
            return row.every((cell, colIndex) => {
                if (!cell) return true;
                const newX = piece.x + colIndex + dx;
                const newY = piece.y + rowIndex + dy;
                return newX >= 0 && newX < cols && newY < rows && newY >= 0 && !board[newY][newX];
            });
        });
    }
    
    function placePiece() {
        currentPiece.shape.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell) {
                    board[currentPiece.y + rowIndex][currentPiece.x + colIndex] = 1;
                }
            });
        });
        
        // Check for complete lines
        for (let row = rows - 1; row >= 0; row--) {
            if (board[row].every(cell => cell)) {
                board.splice(row, 1);
                board.unshift(Array(cols).fill(0));
                score++;
                document.getElementById('tetrisScore').textContent = score;
            }
        }
        
        currentPiece = createPiece();
        
        if (!canMove(currentPiece, 0, 0)) {
            gameOver();
        }
    }
    
    function gameOver() {
        gameRunning = false;
        alert(`Game Over! Score: ${score}`);
    }
    
    function gameLoop() {
        if (!gameRunning) return;
        
        if (currentPiece && canMove(currentPiece, 0, 1)) {
            currentPiece.y++;
        } else if (currentPiece) {
            placePiece();
        }
        
        drawBoard();
        setTimeout(gameLoop, 500);
    }
    
    // Event listeners
    document.addEventListener('keydown', (e) => {
        if (!currentPiece) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                if (canMove(currentPiece, -1, 0)) currentPiece.x--;
                break;
            case 'ArrowRight':
                if (canMove(currentPiece, 1, 0)) currentPiece.x++;
                break;
            case 'ArrowDown':
                if (canMove(currentPiece, 0, 1)) currentPiece.y++;
                break;
            case 'ArrowUp':
                // Rotate piece (simplified)
                const rotated = currentPiece.shape[0].map((_, i) => 
                    currentPiece.shape.map(row => row[i]).reverse()
                );
                const tempPiece = {...currentPiece, shape: rotated};
                if (canMove(tempPiece, 0, 0)) {
                    currentPiece.shape = rotated;
                }
                break;
        }
    });
    
    // Start game
    currentPiece = createPiece();
    gameLoop();
}

// Social Media Functions
function openSocial(platform) {
    const urls = {
        twitter: 'https://twitter.com/pepemoon',
        telegram: 'https://t.me/pepemoon',
        discord: 'https://discord.gg/pepemoon',
        reddit: 'https://reddit.com/r/pepemoon'
    };
    
    if (urls[platform]) {
        window.open(urls[platform], '_blank');
    }
}

// Token Info Functions
function showTokenInfo() {
    openModal('infoModal');
    document.getElementById('infoContainer').innerHTML = `
        <div style="text-align: center;">
            <h2>📊 Token Information</h2>
            <div style="margin: 20px 0;">
                <p><strong>Contract Address:</strong> 0x1234...5678</p>
                <p><strong>Total Supply:</strong> 1,000,000,000,000 PEPE</p>
                <p><strong>Decimals:</strong> 18</p>
                <p><strong>Network:</strong> Ethereum</p>
            </div>
            <div style="background: #000; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <p>📈 Chart coming soon...</p>
            </div>
        </div>
    `;
}

function showWhitepaper() {
    openModal('infoModal');
    document.getElementById('infoContainer').innerHTML = `
        <div style="text-align: center;">
            <h2>📄 Whitepaper</h2>
            <div style="margin: 20px 0; text-align: left;">
                <h3>🚀 PEPE MOON - The Future of Meme Coins</h3>
                <p><strong>Abstract:</strong> PEPE MOON represents the next evolution in meme coin technology...</p>
                <br>
                <h4>🎯 Vision</h4>
                <p>To create the most community-driven meme coin ecosystem...</p>
                <br>
                <h4>💡 Innovation</h4>
                <p>Advanced tokenomics, community governance, and real utility...</p>
                <br>
                <p><em>Full whitepaper coming soon...</em></p>
            </div>
        </div>
    `;
}

function showRoadmap() {
    openModal('infoModal');
    document.getElementById('infoContainer').innerHTML = `
        <div style="text-align: center;">
            <h2>🗺️ Roadmap</h2>
            <div style="margin: 20px 0;">
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin: 10px 0;">
                    <h3>🎯 Phase 1: Launch (Q1 2024)</h3>
                    <p>• Token Launch</p>
                    <p>• Community Building</p>
                    <p>• Website & Social Media</p>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin: 10px 0;">
                    <h3>🚀 Phase 2: Growth (Q2 2024)</h3>
                    <p>• Exchange Listings</p>
                    <p>• Marketing Campaigns</p>
                    <p>• Partnership Development</p>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin: 10px 0;">
                    <h3>🌙 Phase 3: Moon (Q3-Q4 2024)</h3>
                    <p>• Major Exchange Listings</p>
                    <p>• Real World Utility</p>
                    <p>• Global Adoption</p>
                </div>
            </div>
        </div>
    `;
}

// Buy Token Function
function buyToken() {
    alert('🚀 Redirecting to DEX...\n\nPEPE MOON Contract: 0x1234...5678\n\nUse Uniswap or PancakeSwap to buy!');
}

// Add some particle effects for buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.nav-btn, .cta-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create particle effect
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#4ecdc4';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.left = (e.clientX - 2) + 'px';
            particle.style.top = (e.clientY - 2) + 'px';
            particle.style.zIndex = '1000';
            
            document.body.appendChild(particle);
            
            // Animate particle
            const animation = particle.animate([
                { transform: 'translateY(0px)', opacity: 1 },
                { transform: 'translateY(-20px)', opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });
            
            animation.onfinish = () => {
                document.body.removeChild(particle);
            };
        });
    });
});
