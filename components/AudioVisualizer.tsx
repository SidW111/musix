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
    const analyzer = audioContext.createAnalyser();
    source.connect(analyzer);
    analyzer.fftSize = 256;

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx || !canvas) return;

    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
      requestAnimationFrame(draw);

      analyzer.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 2.5;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i];

        const r = barHeight + 25 * (i / bufferLength);
        const g = 250 * (i / bufferLength);
        const b = 50;

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };
    draw();
  }, [audioContext, source]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-64 bg-black rounded-lg shadow-lg"
      width={800}
      height={256}
    />
  );
};

export default AudioVisualizer;
