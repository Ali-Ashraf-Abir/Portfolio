import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const elements = sectionRef.current.querySelectorAll(".skill-item");

        gsap.fromTo(
            elements,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current, 
                    start: "top 40%",
                    toggleActions: "play reverse play reverse"

                },
            }
        );
    }, []);

    return (
        <section className="py-10 font-nunito ml-[40vw] font-bold" ref={sectionRef}>
            <div className="lg:w-[40vw] px-6 sm:px-12 text-center">
                <h2 className="text-[3vh] font-bold text-[#EAEAEA] mb-6">My Skills</h2>
                <p className="text-[#F2A07B] text-[2vh] mb-8">
                    These are the technologies I use to build intuitive, efficient, and dynamic solutions.
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8">
                    {[
                        { src: "react.png", label: "React.js" },
                        { src: "node js.png", label: "Node.js" },
                        { src: "express.png", label: "Express.js" },
                        { src: "mongo.png", label: "MongoDB" },
                        { src: "threejs.png", label: "Three.js" },
                        { src: "blender.png", label: "Blender" },
                    ].map((skill, index) => (
                        <div key={index} className="w-20 h-20 skill-item">
                            <img src={skill.src} alt={`${skill.label} Logo`} className="object-contain w-full h-full" />
                            <p className="mt-2 text-[#EAEAEA] text-sm">{skill.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
