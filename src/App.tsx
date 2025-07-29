import { useEffect, useRef, useState } from "react";
import FileUpload from "../components/FileUpload";
import AudioVisualizer from "../components/AudioVisualizer";
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

    setAudioContext(newAudioContext);
    setSourceNode(srcNode);
  }, [audioFile]);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-3xl font-bold">🎵 Musix</h1>
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
            <AudioVisualizer audioContext={audioContext} source={sourceNode} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
