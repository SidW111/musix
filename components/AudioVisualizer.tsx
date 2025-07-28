import React, {  useEffect, useRef } from "react"

type AudioVisualizerProps = {
    audioContext: AudioContext,
    source: MediaElementAudioSourceNode
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({audioContext,source})=>{

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const analyzer = audioContext.createAnalyser()
        source.connect(analyzer);
        analyzer.fftSize=256
    },[])
}


export default AudioVisualizer;