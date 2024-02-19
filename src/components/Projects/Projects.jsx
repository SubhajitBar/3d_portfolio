import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Language Learner",
    techstack: "ReactJS, TypeScript",
    description:
      "Web Application to learn new languages, take tests and check scores",
    image: "images/langGo.png",
    url: "https://languagelearner-ten.vercel.app",
  },
  {
    title: "Full Stack Portfolio",
    techstack: "MERN Stack",
    description:
      "Portfolio to showcase skills, timelines, and projects without changing/rewriting the code.",
    url: "https://portfolio-subhajitbar.vercel.app",
    image: "images/Portfolio.png",
  },
  {
    title: "Prakalpa",
    techstack: "MERN Stack",
    description:
      "LMS platform to manage college projects, enrollment of any project, faculty allocation to any project etc",
    url: "https://prakalpa-swart.vercel.app",
    image: "images/prakalpa.png",
  },
  {
    title: "3d Portfolio",
    techstack: "ReactJS, React-three-fiber",
    description:
      "Visually attractive 3d portfolio website with stunning animations, designs and effects. ",
    url: "https://subhajitbar.vercel.app",
    image: "images/3d-portfolio.png",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;
  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}        
      >
        <planeGeometry args={[1.5, 1.6]} />
        {/* <planeGeometry args={[2.2, 2.4]} /> */}
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[1.3, 0.7, 0.5]}
        // scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.35}
        zoom={0.85}
      />

      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.11}
        position={[-0.65, -0.05, 0]}
      >
        {project.title.toUpperCase()}
      </Text>

      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.08}
        position={[-0.65, -0.2, 0]}
      >
        {project.techstack}
      </Text>
      <Text
        maxWidth={1.4}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.07}
        position={[-0.65, -0.39, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  const isMobile = window.innerWidth < 768;
  const responsiveRatio = viewport.width / 5;
  const projectScaleRatio = Math.max(0.8, Math.min(1.1 * responsiveRatio, 1.1));

  return (
    <group
      position-y={-viewport.height * 2 - 0.2}
      scale={[projectScaleRatio, projectScaleRatio, projectScaleRatio]}
    >
      {projects.map((item, idx) => (
        <motion.group
          key={"projects_" + idx}
          position={[idx * 2.5, 0, -3]}
          animate={{
            x: isMobile ? 0 + (idx - currentProject) * 1.8 : 0 + (idx - currentProject) * 2,
            y: currentProject === idx ? 0 : -0.1,
            z: currentProject === idx ? -1 : -1,
            rotateX: currentProject === idx ? 0 : -Math.PI / 3,
            rotateZ: currentProject === idx ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={item} highlighted={idx === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};

export default Projects;
