import React, { useState } from 'react';

// --- ТИПЫ И ДАННЫЕ ---
export interface CrosswordData {
  id: number;
  word: string;
  definition: string;
  x: number[];
  y: number[];
}

export interface CrosswordConfig {
  grid: string[][];
  words: CrosswordData[];
}

const CROSSWORD_DATA: CrosswordConfig = {
  grid: [
    ['у', 'п', 'с', 'а', 'м', 'а', 'т', 'е'],
    ['ф', 'и', 'с', 'п', 'ч', 'е', 'е', 'в'],
    ['г', 'н', 'ш', 'и', 'ф', 'р', 'л', 'к'],
    ['а', 'г', 'и', 'н', ' ', 'в', 'к', 'р'],
    ['б', 'и', 'р', 'г', 'ш', 'ь', 'к', 'я'],
    ['н', 'в', 'у', 'с', 'п', 'н', 'а', 'р'],
    ['я', 'о', 'р', 'т', 'и', 'о', 'д', 'ы'],
  ],
  words: [
    { id: 1, word: 'клевета', definition: 'Распространение заведомо ложных сведений, порочащих честь и достоинство другого лица или подрывающих его репутацию. (7)', x: [6, 6, 6, 7, 7, 6, 5], y: [3, 2, 1, 1, 0, 0, 0] },
    { id: 2, word: 'вирус', definition: 'Разновидность компьютерных программ или вредоносный код, отличительным признаком которых является способность к размножению. (5)', x: [1, 1, 2, 2, 3], y: [5, 4, 4, 5, 5] },
    { id: 3, word: 'кряк', definition: 'Специальная программа, позволяющая использовать лицензионную программу без платной регистрации. (4)', x: [7, 7, 7, 6], y: [2, 3, 4, 4] },
    { id: 4, word: 'спам', definition: 'Массовая рассылка на большое число адресов, содержащая рекламу или коммерческие предложения, вирусы и т.п. (4)', x: [2, 3, 3, 4], y: [1, 1, 0, 0] },
    { id: 5, word: 'червь', definition: 'Разновидность вредоносной программы, самостоятельно распространяющейся через сети. (5)', x: [4, 5, 5, 5, 5], y: [1, 1, 2, 3, 4] },
    { id: 6, word: 'баг', definition: 'Жаргонное слово, обычно обозначающее ошибку в программе или системе, которая выдает неожиданный или неправильный результат. (3)', x: [0, 0, 1], y: [4, 3, 3] },
    { id: 7, word: 'троян', definition: 'Вредоносная программа, распространяемая людьми. Осуществляет несанкционированные действия: сбор информации, разрушение и т.д. (5)', x: [3, 2, 1, 0, 0], y: [6, 6, 6, 6, 5] },
    { id: 8, word: 'спуфинг', definition: 'Вид хакерской атаки, заключающийся в использовании чужого IP-адреса компьютера с целью обмана системы безопасности. (7)', x: [2, 1, 0, 0, 1, 1, 0], y: [0, 0, 0, 1, 1, 2, 2] },
    { id: 9, word: 'фишинг', definition: 'Вид интернет-мошенничества, целью которого является получение доступа к конфиденциальным данным (логинам и паролям). (6)', x: [4, 3, 2, 2, 3, 3], y: [2, 2, 2, 3, 3, 4] },
    { id: 10, word: 'шпион', definition: 'Программы, скрытно собирающие различную информацию о пользователе компьютера и затем отправляющие её своему автору. (5)', x: [4, 4, 4, 5, 5], y: [4, 5, 6, 6, 5] },
    { id: 11, word: 'дыра', definition: 'Способ, не предусмотренный разработчиками ПО, позволяющий получить несанкционированный доступ или вызвать неправильную работу. (4)', x: [6, 7, 7, 6], y: [6, 6, 5, 5] },
  ],
};

// --- КОМПОНЕНТ ИГРЫ ---
export const CrosswordGame: React.FC<{ onSaveScore: (score: number) => void }> = ({ onSaveScore }) => {
  const [selectedCells, setSelectedCells] = useState<{ x: number; y: number }[]>([]);
  const [solvedWords, setSolvedWords] = useState<number[]>([]);

  // Цвета для выделения отгаданных слов
  const getWordColor = (id: number) => {
    const hue = (id * 47) % 360; 
    return {
      bg: `hsl(${hue}, 70%, 85%)`,
      border: `hsl(${hue}, 60%, 40%)`,
      text: `hsl(${hue}, 80%, 20%)`,
      listBg: `hsl(${hue}, 60%, 95%)`,
    };
  };

  const getSolvedWordIdForCell = (x: number, y: number): number | null => {
    for (const id of solvedWords) {
      const word = CROSSWORD_DATA.words.find((w) => w.id === id);
      if (word) {
        for (let i = 0; i < word.x.length; i++) {
          if (word.x[i] === x && word.y[i] === y) return id;
        }
      }
    }
    return null;
  };

  const handleCellClick = (x: number, y: number) => {
    if (getSolvedWordIdForCell(x, y)) return;

    setSelectedCells((prev) => {
      const index = prev.findIndex((c) => c.x === x && c.y === y);
      if (index !== -1) {
        return prev.filter((_, i) => i !== index);
      } else {
        return [...prev, { x, y }];
      }
    });
  };

  const handleClear = () => {
    setSelectedCells([]);
  };

  const handleCheck = () => {
    let matchedId: number | null = null;

    for (const item of CROSSWORD_DATA.words) {
      if (solvedWords.includes(item.id)) continue;
      if (selectedCells.length !== item.x.length) continue;

      let isMatch = true;
      for (let i = 0; i < selectedCells.length; i++) {
        if (selectedCells[i].x !== item.x[i] || selectedCells[i].y !== item.y[i]) {
          isMatch = false;
          break;
        }
      }

      if (isMatch) {
        matchedId = item.id;
        break;
      }
    }

    if (matchedId !== null) {
      const newSolved = [...solvedWords, matchedId];
      setSolvedWords(newSolved);
      if (newSolved.length === CROSSWORD_DATA.words.length) {
        onSaveScore(150); 
      }
    }

    setSelectedCells([]); 
  };

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap', 
      gap: '30px',
      alignItems: 'flex-start',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      margin: '20px 0',
      width: '100%', // Гарантирует, что блок не выйдет за рамки экрана
      boxSizing: 'border-box'
    }}>
      
      {/* --- ЛЕВАЯ ЧАСТЬ: Сетка и кнопки --- */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
        maxWidth: '380px', // Ограничиваем максимальную ширину, но позволяем сжиматься
        boxSizing: 'border-box'
      }}>
        
        <div>
          <h4 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#115e59' }}>Кроссворд: ИБ термины</h4>
          <p style={{ margin: 0, fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
            Выделите буквы слова последовательно,<br/>затем нажмите «Проверить».
          </p>
        </div>

        {/* Сетка Кроссворда */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${CROSSWORD_DATA.grid[0].length}, minmax(0, 1fr))`, // Ключевое изменение: ячейки пропорциональны
          gap: '4px',
          backgroundColor: '#064e3b', 
          padding: '10px',
          borderRadius: '8px',
          width: '100%', // Сетка тянется на всю доступную ширину родителя
          boxSizing: 'border-box',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          {CROSSWORD_DATA.grid.flatMap((row, y) =>
            row.map((letter, x) => {
              if (letter === ' ') {
                // Пустая ячейка тоже должна сохранять пропорции
                return <div key={`${x}-${y}`} style={{ width: '100%', aspectRatio: '1 / 1' }} />;
              }

              const solvedWordId = getSolvedWordIdForCell(x, y);
              const isSelected = selectedCells.some((c) => c.x === x && c.y === y);
              
              let bgStyle = { backgroundColor: '#ffffff', borderColor: '#d1d5db', color: '#064e3b' };

              if (solvedWordId) {
                const colors = getWordColor(solvedWordId);
                bgStyle = { backgroundColor: colors.bg, borderColor: colors.border, color: colors.text };
              } else if (isSelected) {
                bgStyle = { backgroundColor: '#fef08a', borderColor: '#ca8a04', color: '#000000' };
              }

              return (
                <div
                  key={`${x}-${y}`}
                  onClick={() => handleCellClick(x, y)}
                  style={{
                    width: '100%', 
                    aspectRatio: '1 / 1', // Гарантирует, что ячейка останется квадратной
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: 'clamp(12px, 4vw, 18px)', // Текст уменьшается, если экран маленький
                    textTransform: 'uppercase',
                    borderRadius: '4px',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    cursor: solvedWordId ? 'default' : 'pointer',
                    userSelect: 'none',
                    boxSizing: 'border-box',
                    ...bgStyle
                  }}
                >
                  {letter}
                </div>
              );
            })
          )}
        </div>

        {/* Кнопки управления */}
        <div style={{ display: 'flex', gap: '10px', width: '100%', boxSizing: 'border-box' }}>
          <button 
            onClick={handleCheck} 
            style={{
              flex: 1,
              padding: '12px 5px',
              backgroundColor: '#059669', 
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Проверить
          </button>
          <button 
            onClick={handleClear} 
            disabled={selectedCells.length === 0}
            style={{
              flex: 1,
              padding: '12px 5px',
              backgroundColor: selectedCells.length === 0 ? '#e5e7eb' : '#f3f4f6',
              color: selectedCells.length === 0 ? '#9ca3af' : '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: selectedCells.length === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            Сбросить
          </button>
        </div>
      </div>

      {/* --- ПРАВАЯ ЧАСТЬ: Описания слов --- */}
      <div style={{
        flex: '1 1 280px', // Уменьшил порог, чтобы лучше помещалось на мобильных
        width: '100%',
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '20px',
        maxHeight: '500px', 
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}>
        <h5 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
          Описания терминов:
        </h5>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {CROSSWORD_DATA.words.map((item) => {
            const isSolved = solvedWords.includes(item.id);
            const colors = getWordColor(item.id);

            return (
              <li
                key={item.id}
                style={{
                  padding: '12px',
                  borderRadius: '6px',
                  backgroundColor: isSolved ? colors.listBg : '#ffffff',
                  border: `1px solid ${isSolved ? colors.border : '#e2e8f0'}`,
                  borderLeft: `5px solid ${isSolved ? colors.border : '#cbd5e1'}`,
                  color: isSolved ? colors.text : '#475569',
                  fontSize: '13px',
                  lineHeight: '1.4',
                  opacity: isSolved ? 1 : 0.8,
                  wordWrap: 'break-word' // Предотвращает разрыв контейнера длинными словами
                }}
              >
                <strong style={{ color: isSolved ? colors.text : '#0f172a', marginRight: '5px' }}>
                  {item.id}.
                </strong>
                <span style={{ textDecoration: isSolved ? 'line-through' : 'none' }}>
                  {item.definition}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      
    </div>
  );
};