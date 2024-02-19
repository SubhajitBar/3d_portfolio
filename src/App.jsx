import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import Interface from "./components/Interface/Interface";
import { Suspense, useEffect, useState } from "react";
import { ScrollManager } from "./components/ScrollManager/ScrollManager";
import Menu from "./components/Menubar/Menu";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { framerMotionConfig } from "./components/config/config";
import { Cursor } from "./components/Cursor/Cursor";
import Loader from "./components/Loader/Loader";

function App() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  return (
    <>
      <Loader started={started} setStarted={setStarted} />
      <MotionConfig
        transition={{
          ...framerMotionConfig,
        }}
      >
        <Canvas shadows camera={{ position: [2, 0.7, 3.5], fov: 39 }}>
          {/* <color attach="background" args={["#d3b2db"]} /> */}
          <ScrollControls pages={4} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Scroll>
              <Suspense>
                {/* {started && ( */}
                  <Experience section={section} menuOpened={menuOpened} />
                {/* )} */}
              </Suspense>
            </Scroll>
            <Scroll html>
              {started && (<Interface setSection={setSection} />) }
            </Scroll>
          </ScrollControls>
        </Canvas>
        <Menu
          onSectionChange={setSection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
        <Cursor />
      </MotionConfig>
      <Leva hidden />
    </>
  );
}

export default App;
