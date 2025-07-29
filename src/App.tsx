import { useEffect, useRef, useState } from "react";
import FileUpload from "./components/FileUpload";
import AudioVisualizer from "./components/AudioVisualizer";
import './index.css';

const App = ({}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [sourceNode, setSourceNode] =
    useState<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    if (!audioRef.current || !audioFile) return;

    const newAudioContext = new AudioContext();
    const srcNode = newAudioContext.createMediaElementSource(audioRef.current);

    srcNode.connect(newAudioContext.destination);

    setAudioContext(newAudioContext);
    setSourceNode(srcNode);
  }, [audioFile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white flex items-center justify-center">
      <div
        className="w-full max-w-4xl p-8 flex flex-col gap-6 items-center 
  bg-white/5 backdrop-blur-md rounded-2xl shadow-neon-purple
  border border-white/10"
      >
        {" "}
        <p>powered by sid</p>
        <h1 className="text-3xl font-bold">🎵 Musix 🎵</h1>
        <FileUpload onFileSelect={setAudioFile} />
        {audioFile && (
          <>
            <audio
              ref={audioRef}
              src={URL.createObjectURL(audioFile)}
              controls
              className="mt-4"
              autoPlay
            />

            {audioContext && sourceNode && (
              <AudioVisualizer
                audioContext={audioContext}
                source={sourceNode}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
