// 音楽ファイルを読み込みます
const audio = new Audio('music.mp3');

// Web Audio APIを使用して周波数を分析します
const context = new AudioContext();
const analyser = context.createAnalyser();
const source = context.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(context.destination);

// Canvasを初期化します
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ゲームのループを設定します
const loop = setInterval(() => {
  // Canvasをクリアします
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 周波数データを取得します
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);

  // ノーツを描画します
  for (let i = 0; i < bufferLength; i++) {
    const frequency = i * context.sampleRate / bufferLength;
    const amplitude = dataArray[i] / 256;
    const x = (frequency / 2000) * canvas.width;
    const y = canvas.height - (amplitude * canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
  }
}, 10);

// 音楽を再生します
audio.play();
