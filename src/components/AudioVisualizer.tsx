import React, { useEffect, useRef } from "react";

type AudioVisualizerProps = {
  audioContext: AudioContext;
  source: MediaElementAudioSourceNode;
};

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  audioContext,
  source,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

 useEffect(() => {
  const analyser = audioContext.createAnalyser();
  source.connect(analyser);
  analyser.fftSize = 2048;

  const bufferLength = analyser.fftSize;
  const dataArray = new Uint8Array(bufferLength);

  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");

  if (!ctx || !canvas) return;

  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  const draw = () => {
    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    ctx.fillStyle = "#0f172a"; // background (navy)
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.lineWidth = 2;
    const gradient = ctx.createLinearGradient(0, 0, WIDTH, 0);
    gradient.addColorStop(0, "#4f46e5");
    gradient.addColorStop(0.5, "#22d3ee");
    gradient.addColorStop(1, "#10b981");

    ctx.strokeStyle = gradient;

    ctx.beginPath();

    const sliceWidth = (WIDTH * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * HEIGHT) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(WIDTH, HEIGHT / 2);
    ctx.stroke();
  };

  draw();
}, [audioContext, source]);


  return (
    <canvas
      ref={canvasRef}
  className="w-full h-64 bg-black rounded-lg shadow-[0_0_30px_rgba(99,102,241,0.6)] "
      
    />
  );
};

export default AudioVisualizer;
