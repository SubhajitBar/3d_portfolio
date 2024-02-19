import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

const Loader = ({ started, setStarted }) => {
  const { progress, item, total, loaded } = useProgress();

  useEffect(() => {
    setTimeout(() => {
      if (progress === 100) {
        setStarted(true);
      }
    }, 400);
  }, [progress, total, loaded, item]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-1000 pointer-events-none flex items-center justify-center bg-indigo-50 
      ${started ? "opacity-0" : "opacity-100"}
      `}
    >
     
      <div className="text-4xl md:text-9xl leading-snug md:leading-loose font-bold text-indigo-900 relative ">
        <div
          className="absolute left-0 top-0 overflow-hidden truncate text-clip transition-all duration-500"
          style={{
            width: `${progress}%`,
            height: `${100}%`,
          }}
        >
          Subhajit Bar
        </div>
        <div className="opacity-40"> Subhajit Bar</div>
      </div>
    </div>
  );
};

export default Loader;
