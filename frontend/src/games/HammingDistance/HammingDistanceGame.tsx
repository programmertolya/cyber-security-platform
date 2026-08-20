import React, { useEffect, useRef, useState } from 'react';

const SKIN_URL = '/assets/FileImage.png';

const VALID_WORDS_3 = ['000', '111'];
const VALID_WORDS_7 = [
  '0000000', '1110001', '0110010', '1000011',
  '1010100', '0100101', '1100110', '0010111',
  '1101000', '0011001', '1011010', '0101011',
  '0111100', '1001101', '0001110', '1111111'
];

export const HammingDistanceGame: React.FC<{ onSaveScore?: (score: number) => void }> = ({ onSaveScore }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [score, setScore] = useState(0);
  const [mode, setMode] = useState<3 | 7>(3);
  const [targetWordUI, setTargetWordUI] = useState('');

  const reqRef = useRef<number>(0);
  const game = useRef({
    status: 'menu',
    birdY: 275,
    velocity: 0,
    pipes: [] as any[],
    targetWord: '',
    bgImg: new Image(),
    birdImg: new Image(),
    score: 0,
    mode: 3
  });

  useEffect(() => {
    game.current.bgImg.src = '/assets/bg.png'; 
    game.current.birdImg.src = SKIN_URL;

    if (game.current.pipes.length === 0) {
      game.current.pipes = [generatePipe(800), generatePipe(1200)];
    }

    reqRef.current = requestAnimationFrame(loop);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, []);

  const generatePipe = (xPos: number) => {
    const validWords = game.current.mode === 3 ? VALID_WORDS_3 : VALID_WORDS_7;
    const correct = validWords[Math.floor(Math.random() * validWords.length)];
    let wrong = validWords[Math.floor(Math.random() * validWords.length)];
    while (wrong === correct) {
      wrong = validWords[Math.floor(Math.random() * validWords.length)];
    }

    const flipIndex = Math.floor(Math.random() * game.current.mode);
    const target = correct.substring(0, flipIndex) +
      (correct[flipIndex] === '0' ? '1' : '0') +
      correct.substring(flipIndex + 1);

    return {
      x: xPos,
      w: 120,
      correct,
      wrong,
      target,
      isTopCorrect: Math.random() > 0.5,
      passed: false
    };
  };

  const startGame = () => {
    game.current = {
      ...game.current,
      status: 'playing',
      birdY: 275,
      velocity: 0,
      pipes: [generatePipe(600), generatePipe(1050)],
      score: 0,
      mode: mode,
      targetWord: ''
    };

    setScore(0);
    setGameState('playing');
  };

  const gameOver = () => {
    game.current.status = 'gameover';
    setGameState('gameover');
    if (onSaveScore) onSaveScore(game.current.score);
  };

  const toggleMode = () => {
    const newMode = mode === 3 ? 7 : 3;
    setMode(newMode);
    game.current.mode = newMode;
  };

  const loop = () => {
    const g = game.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    // физика
    if (g.status === 'playing') {
      g.velocity += 0.2; 
      g.birdY += g.velocity;

      if (g.birdY < 0 || g.birdY > 550) gameOver();

      const bx1 = 80 + 15;
      const by1 = g.birdY - 15;
      const bx2 = 80 + 45;
      const by2 = g.birdY + 15;

      if (g.pipes[g.pipes.length - 1].x < 450) {
        g.pipes.push(generatePipe(g.pipes[g.pipes.length - 1].x + 450));
      }

      for (let i = 0; i < g.pipes.length; i++) {
        let p = g.pipes[i];
        p.x -= 2;

        const px1 = p.x;
        const px2 = p.x + p.w;

        if (bx2 > px1 && bx1 < px2) {
          const inTop = by1 < 70;
          const inMid = by2 > 220 && by1 < 330;
          const inBot = by2 > 480;

          if (inTop || inMid || inBot) gameOver();
        }

        if (!p.passed && bx1 > px2) {
          p.passed = true;
          const wentTop = g.birdY < 220;

          if ((wentTop && p.isTopCorrect) || (!wentTop && !p.isTopCorrect)) {
            g.score += 1;
            setScore(g.score);
          } else {
            gameOver();
          }
        }
      }

      if (g.pipes[0].x < -150) g.pipes.shift();

      const nextPipe = g.pipes.find(p => !p.passed);
      if (nextPipe && g.targetWord !== nextPipe.target) {
        g.targetWord = nextPipe.target;
        setTargetWordUI(nextPipe.target);
      }
    }


    ctx.clearRect(0, 0, 800, 550);

    // Фон
    if (g.bgImg.complete && g.bgImg.naturalHeight !== 0) {
      ctx.drawImage(g.bgImg, 0, 0, 800, 550);
    } else {
      ctx.fillStyle = '#6495ED'; 
      ctx.fillRect(0, 0, 800, 550);
    }

    for (let p of g.pipes) {
      ctx.fillStyle = "rgba(40, 45, 55, 0.9)"; 
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"; 
      ctx.lineWidth = 2;

      const drawWall = (y: number, h: number) => {
        ctx.beginPath();
        ctx.roundRect(p.x, y, p.w, h, 4);
        ctx.fill();
        ctx.stroke();
      };

      drawWall(0, 70);   
      drawWall(220, 110); 
      drawWall(480, 70);  


      const wordTop = p.isTopCorrect ? p.correct : p.wrong;
      const wordBottom = !p.isTopCorrect ? p.correct : p.wrong;

      ctx.font = "bold 26px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.strokeStyle = "black";
      ctx.lineWidth = 4;
      ctx.strokeText(wordTop, p.x + p.w / 2, 145);
      ctx.strokeText(wordBottom, p.x + p.w / 2, 405);

      ctx.fillStyle = "white";
      ctx.fillText(wordTop, p.x + p.w / 2, 145);
      ctx.fillText(wordBottom, p.x + p.w / 2, 405);
    }


    if (g.birdImg.complete && g.birdImg.naturalHeight !== 0) {
      const width = 60;
      const height = 60;
      const x = 80 - (width - 60) / 2; 
      const y = g.birdY - height / 2;  
      ctx.drawImage(g.birdImg, x, y, width, height);
    } else {
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(110, g.birdY, 20, 0, Math.PI * 2);
      ctx.fill();
    }

    if (g.status !== 'playing') {
      g.birdY = 275 + Math.sin(Date.now() / 300) * 10;
    }

    reqRef.current = requestAnimationFrame(loop);
  };

  const handleJump = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e && e.cancelable) e.preventDefault(); 
    if (gameState === 'playing') {
      game.current.velocity = -4.5;
    }
  };


  const textShadowStyle = {
    textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0px 3px 5px rgba(0,0,0,0.8)'
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      maxWidth: '800px', 
      margin: '0 auto', 
      aspectRatio: '800/550', 
      borderRadius: '12px', 
      overflow: 'hidden', 
      backgroundColor: '#000',
      touchAction: 'none', 
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent'
    }}>

      <canvas
        ref={canvasRef}
        width={800}
        height={550}
        style={{ display: 'block', width: '100%', height: '100%', cursor: 'pointer' }}
        onMouseDown={handleJump}
        onTouchStart={handleJump}
      />

      {/* меню */}
      {gameState !== 'playing' && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: 10
        }}>

          <h1 style={{ ...textShadowStyle, color: 'white', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center', textTransform: 'uppercase' }}>
            {gameState === 'gameover' ? 'ИГРА ОКОНЧЕНА' : 'Hamming Run'}
          </h1>

          {/* инструкция */}
          {gameState === 'menu' && (
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '20px',
              maxWidth: '90%',
              width: '400px',
              textAlign: 'center'
            }}>
              <h3 style={{ ...textShadowStyle, color: '#38bdf8', fontSize: '1.2rem', margin: '0 0 10px 0' }}>КАК ИГРАТЬ?</h3>
              <p style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: '1.4', margin: '0 0 8px 0', textShadow: '1px 1px 2px #000' }}>
                Тапайте по экрану для управления полетом. Сверху показан <b>входящий сигнал с 1 ошибкой</b>.
              </p>
              <p style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: '1.4', margin: '0', textShadow: '1px 1px 2px #000' }}>
                Летите в проход с кодовым словом, которое отличается от сигнала ровно на <b>1 бит</b> (минимальное расстояние Хэмминга)!
              </p>
            </div>
          )}

  
          {gameState === 'gameover' && (
            <p style={{ ...textShadowStyle, color: '#38bdf8', fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
              Счет: {score}
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '90%', maxWidth: '300px' }}>

            <button
              onClick={toggleMode}
              style={{
                width: '100%', padding: '12px', backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: '2px solid rgba(255, 255, 255, 0.3)', color: 'white',
                fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', ...textShadowStyle,
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.border = '2px solid white'}
              onMouseOut={(e) => e.currentTarget.style.border = '2px solid rgba(255, 255, 255, 0.3)'}
            >
              РЕЖИМ: {mode} БИТ
            </button>

            <button
              onClick={startGame}
              style={{
                width: '100%', padding: '12px', backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: '2px solid rgba(255, 255, 255, 0.3)', color: 'white',
                fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', ...textShadowStyle,
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.border = '2px solid white'}
              onMouseOut={(e) => e.currentTarget.style.border = '2px solid rgba(255, 255, 255, 0.3)'}
            >
              {gameState === 'gameover' ? 'ИГРАТЬ СНОВА' : 'ИГРАТЬ'}
            </button>

          </div>
        </div>
      )}

      {gameState === 'playing' && (
        <div style={{ position: 'absolute', top: '15px', left: '0', width: '100%', pointerEvents: 'none', zIndex: 10 }}>

          {/* счет */}
          <div style={{ position: 'absolute', left: '20px', top: '0' }}>
            <span style={{ ...textShadowStyle, color: 'white', fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 'bold' }}>
              {score}
            </span>
          </div>

          {/* слово с ошибкой */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...textShadowStyle, color: '#e2e8f0', fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>
              Сигнал с ошибкой
            </div>
            <div style={{ ...textShadowStyle, color: '#38bdf8', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: '4px' }}>
              {targetWordUI}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};