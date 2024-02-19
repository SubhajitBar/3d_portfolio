import {
  Environment,
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  // OrbitControls,
  useScroll,
} from "@react-three/drei";
import { Scene } from "./Scene/Scene";
import { Avatar } from "./Avatar/Avatar";
import { motion } from "framer-motion-3d";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../components/config/config";
// import * as THREE from "three";
import Projects from "../components/Projects/Projects";
import { Background } from "./Background/Background";

const Experience = ({ menuOpened }) => {
  const characterContainerAboutRef = useRef();
  const characterGroup = useRef();
  const { viewport } = useThree();

  const isMobile = window.innerWidth < 768;
  const isSmallMobile = window.innerWidth < 431;
  const responsiveRatio = viewport.width / 5;
  const officeScaleRatio = Math.max(0.45, Math.min(1.1 * responsiveRatio, 1.1));
  const avatarScaleRatio = Math.max(0.4, Math.min(1 * responsiveRatio, 1));

  const data = useScroll();
  const [section, setSection] = useState(0);
  const [characterAnimation, setCharacterAnimation] = useState("Typing");

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  const cameraPositionY = useMotionValue();
  const cameraLookAtY = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -0.9 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 0.9 : 0, {
      ...framerMotionConfig,
    });

    animate(cameraPositionY, menuOpened ? 0.5 : 0.5, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtY, menuOpened ? -0.1 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  useFrame((state) => {
    let curSection = Math.floor(data.scroll.current * data.pages);
    if (curSection > 3) {
      curSection = 3;
    }
    if (curSection !== section) {
      setSection(curSection);
    }

    state.camera.position.x = cameraPositionX.get();
    state.camera.position.y = cameraPositionY.get();
    state.camera.lookAt(cameraLookAtX.get(), cameraLookAtY.get(), 0);

    if (section === 0) {
      characterContainerAboutRef.current.getWorldPosition(
        characterGroup.current.position
      );
    }

    // const position = new THREE.Vector3();
    // characterContainerAboutRef.current.getWorldPosition(position);
    // console.log([position.x, position.y, position.z]);
    // [0.4818339199030065, -0.663764377301937, -0.1259245643919162]
    // [0.5621504627559784, -0.69, -0.10213740312452786]
    // [0.587767815829546, -0.69, -0.10679183301689303]

    // const quaternion = new THREE.Quaternion();
    // characterContainerAboutRef.current.getWorldQuaternion(quaternion);
    // const euler = new THREE.Euler();
    // euler.setFromQuaternion(quaternion, "XYZ");
    // console.log([euler.x, euler.y, euler.z]);
    // [-3.141592653589793, 1.0753981633974483, 3.141592653589793]
    // [-3.141592653589793, 0.9653981633974482, 3.141592653589793]
    // (3) [-3.141592653589793, 0.9653981633974484, 3.141592653589793]
  });

  useEffect(() => {
    setCharacterAnimation("Falling");
    setTimeout(() => {
      setCharacterAnimation(section === 0 ? "Typing" : "Standing");
    }, 400);
  }, [section]);

  return (
    <>
      {/* <OrbitControls /> */}
      <Environment preset="sunset" />
      <Background />
      {/* Avatar */}
      <motion.group
        ref={characterGroup}
        position={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        rotation={[-3.141592653589793, 0.9653981633974484, 3.141592653589793]}
        animate={"" + section}
        transition={{
          duration: 0.6,
        }}
        variants={{
          0: {
            scaleX: avatarScaleRatio,
            scaleY: avatarScaleRatio,
            scaleZ: avatarScaleRatio,
          },

          1: {
            y: -viewport.height - 0.85,
            x: isMobile ? 0.3 : 0,
            z: 0.5,
            rotateX: 0,
            rotateY: isMobile ? -Math.PI / 2 : 0,
            rotateZ: 0,
          },
          2: {
            x: isMobile ? -0.8 : -1,
            y: -viewport.height * 2.7 + 0.7,
            z: isSmallMobile ? -1 : -0.2,
            rotateX: 0,
            rotateY: isSmallMobile ? Math.PI / 5.2 : Math.PI / 2.2,
            rotateZ: 0,
          },
          3: {
            y: -viewport.height * 3.5 + 0.1,
            x: 0.3,
            z: 1.7,
            rotateX: 0,
            rotateY: -Math.PI / 4,
            rotateZ: 0,
          },
        }}
      >
        <Avatar animation={characterAnimation} wireframe={section === 2} />
      </motion.group>

      {/* SCENE  */}
      <motion.group
        position={[
          isMobile ? 0 : 0.5 * officeScaleRatio,
          isMobile ? -viewport.height * 3 : -0.57,
          0.3,
        ]}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        rotation-y={-Math.PI / 4}
        animate={{
          y: isMobile ? -viewport.height / 3 : -0.75,
        }}
      >
        <Scene section={section} />
        <motion.group
          ref={characterContainerAboutRef}
          name="CharacterSpot"
          position={[0, 0, -0.157]}
          rotation={[-Math.PI, 0.29, -Math.PI]}
          scale={[0.9, 0.9, 0.9]}
        ></motion.group>
      </motion.group>

      {/* 3D Objects */}
      <motion.group
        position={[-0.5, -1.5, -10]}
        animate={{
          z: section === 1 ? -2 : -10,
          y: section === 1 ? -viewport.height : -1.5,
        }}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[1, -3, -15]} scale={[2, 2, 2]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"red"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[3, 3, 3]} position={[3, 1, -18]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color={"yellow"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[1.4, 1.4, 1.4]} position={[-3, -1, -11]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"blue"}
            />
          </mesh>
        </Float>
      </motion.group>

      {/* Projects */}
      <motion.group>
        <Projects />
      </motion.group>
    </>
  );
};

export default Experience;
