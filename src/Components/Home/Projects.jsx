import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function Projects() {
    const sectionRef = useRef(null);

    const projects = [
        {
            img: "restaurant chain.PNG",
            title: "Restaurant Chain Platform",
            description: "An intuitive platform for online food purchase with payment integration.",
        },
        {
            img: "portfolio.PNG",
            title: "Portfolio Website",
            description: "A sleek, modern portfolio showcasing my skills and projects.",
        },
        {
            img: "3D scene.png",
            title: "3D Visualizer",
            description: "A 3D scene created with Three.js for interactive visualizations.",
        },
    ];

    useEffect(() => {
        const projectItems = sectionRef.current.querySelectorAll(".project-item");
        const titles= sectionRef.current.querySelectorAll(".titles")

        gsap.fromTo(
            projectItems,
            { opacity: 0, y: 50 }, // Start state: invisible and below position
            {
                opacity: 1,
                y: 0, // End state: fully visible and in position
                duration: 0.5,
                stagger: 0.2, // Time between animations
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 50%", // Animation starts when section is 75% into the viewport
                    toggleActions: "play none none none", // Play animation once when entering
                },
            }
        );
        gsap.fromTo(
            titles,
            { opacity: 0, y: 50 }, // Start state: invisible and below position
            {
                opacity: 1,
                y: 0, // End state: fully visible and in position
                duration: 0.5,
                stagger: 0.2, // Time between animations
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 45%", // Animation starts when section is 75% into the viewport
                    toggleActions: "play none none none", // Play animation once when entering
                },
            }
        );
    }, []);


    return (
        <section className="w-screen h-screen text-[#EAEAEA] font-nunito flex items-center justify-center">
            <div ref={sectionRef} className="w-full max-w-[80vw] mt-[-35vh]">
                <h2 className="text-3xl font-bold text-center mb-8 titles">My Projects</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 titles">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="group project-item relative overflow-hidden rounded-lg shadow-lg bg-[rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-300"
                        >
                            <img
                                src={project.img}
                                alt={project.title}
                                className="w-full h-36 object-cover group-hover:opacity-80"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{project.title}</h3>
                                <p className="text-sm text-[#F2A07B] mt-2">{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
