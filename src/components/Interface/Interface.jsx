import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { Typewriter } from "react-simple-typewriter";
import { currentProjectAtom, projects } from "../Projects/Projects";
import { useForm, ValidationError } from "@formspree/react";

const Section = ({ children, mobileTop }) => {
  return (
    <motion.section
      className={`h-screen w-screen p-8 max-w-screen-2xl mx-auto
        flex flex-col items-center xs:items-start 
        ${mobileTop ? "justify-start md:justify-center" : "justify-center"}`}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

const Interface = ({ setSection }) => {
  return (
    <div className={`flex flex-col items-center w-full md:w-4/5 mx-auto `}>
      <AboutSection setSection={setSection} />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

export default Interface;

const AboutSection = ({ setSection }) => {
  return (
    <Section mobileTop>
      <h1 className=" text-4xl sm:text-6xl font-black leading-snug sm:leading-snug mt-8 sm:mt-0">
        Hi, I'm
        <br />
        <span className="bg-white px-1 italic">Subhajit Bar</span>
      </h1>
      <motion.p
        className="text-base sm:text-lg 
        text-gray-700
         mt-4"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 1,
            delay: 1,
          },
        }}
      >
        I am a {"  "}
        <span className="text-indigo-900 gap-1 tracking-widest">
          <Typewriter
            words={[" Designer", " Developer", " Freelancer"]}
            loop={false}
            cursor
            typeSpeed={90}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
        <br />
        Welcome to My Portfolio
        <br />
        Where Creativity meets Functionality.
      </motion.p>
      <motion.button
        className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-base sm:text-lg mt-4 md:mt-16"
        onClick={() => setSection(3)}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 1,
            delay: 1.5,
          },
        }}
      >
        Contact me
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    title: "ReactJs",
    level: 80,
  },
  {
    title: "NodeJs",
    level: 80,
  },
  {
    title: "Expressjs",
    level: 80,
  },
  {
    title: "MongoDb",
    level: 80,
  },
  {
    title: "TypeScipt",
    level: 85,
  },
  {
    title: "JavaScript",
    level: 90,
  },
  {
    title: "MySQL",
    level: 90,
  },
  {
    title: "HTML/CSS",
    level: 95,
  },
];
// const languages = [
//   {
//     title: "English",
//     level: 75,
//   },
//   {
//     title: "Hindi",
//     level: 50,
//   },
//   {
//     title: "Bengali",
//     level: 98,
//   },
// ];

const SkillsSection = () => {
  return (
    <Section className="">
      <motion.div className="w-full " whileInView={"visible"}>
        <h2 className="text-3xl md:text-4xl font-bold text-white">Skills</h2>
        <div className="my-5 space-y-4">
          {skills.map((item, idx) => {
            return (
              <div className=" w-full xs:w-64 sm:w-64" key={idx}>
                <div className="flex justify-between items-end">
                  <motion.h3
                    className=" text-base md:text-lg font-bold text-gray-100"
                    initial={{
                      opacity: 0,
                    }}
                    variants={{
                      visible: {
                        opacity: 1,
                        transition: {
                          duration: 1,
                          delay: 0.5 + idx * 0.2,
                        },
                      },
                    }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.h5
                    className=" text-xs sm:text-sm text-gray-200"
                    initial={{
                      opacity: 0,
                    }}
                    variants={{
                      visible: {
                        opacity: 1,
                        transition: {
                          duration: 1,
                          delay: 0.5 + idx * 0.2,
                        },
                      },
                    }}
                  >
                    {item.level}%
                  </motion.h5>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${item.level}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 0.5 + idx * 0.2,
                        },
                      },
                    }}
                  ></motion.div>
                </div>
              </div>
            );
          })}
        </div>
        {/* <h2 className="text-3xl md:text-4xl font-bold mt-8 text-white">
          Languages
        </h2>
        <div>
          <div className="my-5 space-y-4">
            {languages.map((item, idx) => (
              <div className="w-full md:w-64" key={idx}>
                <motion.h3
                  className=" text-lg md:text-xl font-bold text-gray-100"
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + idx * 0.2,
                      },
                    },
                  }}
                >
                  {item.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${item.level}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 1 + idx * 0.2,
                        },
                      },
                    }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </motion.div>
    </Section>
  );
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section className="mx-0 h-full p-0 z-10 my-8">
      <motion.div
        className="flex w-full md:w-5/6 h-full gap-10 items-end justify-center z-20"
        whileInView={"visible"}
      >
        <motion.button
          className="z-20 flex items-center justify-center p-3 w-11 h-10 rounded-md hover:bg-indigo-600 bg-gray-300 hover:text-white  text-black transition-all"
          onClick={previousProject}
          initial={{
            opacity: 0,
          }}
          variants={{
            visible: {
              opacity: 1,
              transition: {
                duration: 1,
                delay: 0.5,
                ease: "easeInOut",
              },
            },
          }}
        >
          <IoArrowBackOutline className=" text-2xl xs:text-3xl" />
        </motion.button>
        <motion.h2
          initial={{
            opacity: 0,
          }}
          variants={{
            visible: {
              opacity: 1,
              transition: {
                duration: 1,
                delay: 0.5,

                ease: "easeInOut",
              },
            },
          }}
          className=" text-3xl mb-2 md:text-4xl font-bold text-center"
        >
          Projects
        </motion.h2>
        <motion.button
          className=" z-20 flex items-center justify-center p-3  w-11 h-10 rounded-md hover:bg-indigo-600 transition-all bg-gray-300 hover:text-white text-black"
          onClick={nextProject}
          initial={{
            opacity: 0,
          }}
          variants={{
            visible: {
              opacity: 1,
              transition: {
                duration: 1,
                delay: 0.5,
                ease: "easeInOut",
              },
            },
          }}
        >
          <IoArrowForwardOutline className="  text-2xl xs:text-3xl" />
        </motion.button>
      </motion.div>
    </Section>
  );
};

const ContactSection = () => {
  const [state, handleSubmit] = useForm("xgegkpzj");
  return (
    <Section className="items-center xs:items-start md:items-start md:justify-start">
      <h2 className="text-4xl font-bold">Contact Me</h2>
      <div className="my-4 md:my-6 p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full">
        {state.succeeded ? (
          <p className="text-gray-900 opacity-80 text-center">
            Thanks for your message!
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="name"
              className="font-medium text-gray-900 block mb-1"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-indigo-500"
              required
            />
            <label
              htmlFor="email"
              className="font-medium text-gray-900 block mb-1 mt-4 md:mt-8 "
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-indigo-500"
              required
            />
            <ValidationError
              field="email"
              className="mt-1 text-red-500"
              errors={state.errors}
            />
            <label
              htmlFor="message"
              className="font-medium text-gray-900 block mb-1 mt-4 md:mt-8"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 outline-indigo-500"
              required
            />
            <ValidationError
              className="mt-1 text-red-500"
              errors={state.errors}
            />
            <button
              type="submit"
              disabled={state.submitting}
              className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-base sm:text-lg mt-5 md:mt-12"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </Section>
  );
};
