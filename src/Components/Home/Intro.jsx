import React, { useEffect } from 'react'
import './Intro.css'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from '@react-three/fiber';
import { Text, Points, PointMaterial } from '@react-three/drei';
import { random } from 'maath';
gsap.registerPlugin(ScrollTrigger);




export default function Intro() {

    useEffect(() => {
        gsap.to("#child-div", {
            opacity: 0, // Fade out the child div
            scrollTrigger: {
                trigger: "#parentdiv", // Parent container
                start: "top top", // When the parent starts scrolling
                end: "50%", // Fade out completely by 50% scroll
                scrub: true, // Smooth animation
            },
        });

        gsap.from(".header-letter", {
            y: 50, // Move from below
            opacity: 0, // Start invisible
            stagger: 0.1, // Stagger each letter by 0.1s
            duration: 1.2, // Animation duration
            ease: "elastic.out(1, 0.5)", // Elastic bounce effect
        });
    }, []);
    return (
        <div
            id="about"

        >
            <div className="h-screen  " id="parentdiv">

                <div id="child-div" className="sticky lg:top-[30vh] w-[40%] text-center p-4 font-bold">
                    <p className='text-[8vh] text-[#EAEAEA] flex flex-col justify-center items-center font-nunito sticky top-0 '>
                        Ali Ashraf Abir
                    </p>
                    <p className='front text-[2vh] lg:text-[6vh] text-[#F2A07B]  font-Oswald p-4'>Full Stack Developer</p>

                    <p className='text-[2vh] lg:text-[2vh] text-[#F2A07B] flex justify-center items-end font-OSwald'>


                        "I'm a passionate full-stack developer with expertise in building scalable, efficient, and user-centric web applications. Proficient in modern technologies like React, Node.js, and databases like MongoDB, I thrive on creating seamless front-end interfaces and robust back-end architectures. I enjoy problem-solving, learning new tools, and turning ideas into reality through code. Let’s build something great together!"


                    </p>

                </div>

            </div>

        </div>
    )
}
