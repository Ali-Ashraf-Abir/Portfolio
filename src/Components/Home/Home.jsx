import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { update } from 'three/examples/jsm/libs/tween.module.js';
import Intro from './Intro';
import Skills from './Skills';
import Projects from './Projects';
import EducationAndCertifications from './Certificates';
import ContactMe from './Contact';



gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const canvasRef = useRef(null);
    const aboutRef = useRef(null);
    const skillsRef = useRef(null);
    const projectsRef = useRef(null);
    const experienceRef = useRef(null);  // New section ref
    const contactRef = useRef(null);     // New section ref

    useEffect(() => {
        // Scene, Camera, and Renderer Setup
        const loader = new GLTFLoader();
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        canvasRef.current.appendChild(renderer.domElement);
        // Load a Night Sky Background

        // Add Dense Fog to the Scene
        const fogColor = 0x00000; // Dark, almost black color for a dense atmosphere
        const fogDensity = 0.15; // Higher density for very dense fog
        scene.fog = new THREE.FogExp2(fogColor, fogDensity);


        // // Load and apply background texture from public folder
        // const textureLoader = new THREE.TextureLoader();
        // const nightSkyTexture = textureLoader.load('/night2.jpeg', () => {
        //   scene.background = nightSkyTexture;
        // });
        scene.background = new THREE.Color(0x000000)


        // enabling shadows
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;



        // Golden Hour Lighting
        const goldenLightColor = 0xBFD8FF; // Warm golden color for the sunlight
        const ambientLightColor = 0xA1B3CC; // Soft ambient light color to give the warm look

        // Directional Light (simulating the Sun)
        const goldenLight = new THREE.DirectionalLight(goldenLightColor, 1);
        goldenLight.position.set(5, 10, 5);  // Adjust position to mimic the sun
        goldenLight.castShadow = true;
        goldenLight.shadow.mapSize.width = 2048;
        goldenLight.shadow.mapSize.height = 2048;
        scene.add(goldenLight);

        // Ambient Light (soft light fill)
        const ambientLight = new THREE.AmbientLight(ambientLightColor, 0.4); // Lower intensity for ambient fill
        scene.add(ambientLight);

        // Adjust shadow properties (if necessary)
        goldenLight.shadow.bias = -0.0001;

        // mountains and trees
        // Add silhouettes of mountains and trees
        const textureLoader = new THREE.TextureLoader();

        // Create a plane geometry for the mountains
        const mountainGeometry = new THREE.PlaneGeometry(1000, 100, 30, 100); // Width, Height, Segments
        mountainGeometry.rotateX(-Math.PI / 2); // Rotate to make it look upright

        // Displace vertices to create a mountain-like structure
        const mountainHeight = 100;
        for (let i = 0; i < mountainGeometry.attributes.position.count; i++) {
            const vertex = new THREE.Vector3(
                mountainGeometry.attributes.position.getX(i),
                mountainGeometry.attributes.position.getY(i),
                mountainGeometry.attributes.position.getZ(i)
            );
            vertex.y += Math.random() * mountainHeight - mountainHeight / 2; // Add randomness for peaks and valleys
            mountainGeometry.attributes.position.setXYZ(i, vertex.x, vertex.y, vertex.z);
        }
        mountainGeometry.attributes.position.needsUpdate = true;

        // Apply a texture or basic material
        const mountainMaterial = new THREE.MeshStandardMaterial({
            color: 0x6b8e23, // Olive green color for the mountains
            flatShading: true,
            fog: false,
            opacity: 0.4 // Flat shading for a low-poly effect
        });
        const mountains = new THREE.Mesh(mountainGeometry, mountainMaterial);
        mountains.position.set(0, -5, -200); // Position further back
        mountains.scale.set(1, 2, -200)
        scene.add(mountains);




        const trees = [];

        loader.load('/Low-Poly_Models 2.glb', (gltf) => {
            const treeModel = gltf.scene;

            // Clone and scatter multiple trees
            for (let i = 0; i < 2; i++) { // Increase the count for more coverage
                const tree = treeModel.clone();
                tree.position.set(
                    Math.random() * 20 - 10, // Random X position close to the model
                    -2, // Place on the ground
                    Math.random() * 50 - 25 // Spread trees along the Z-axis
                );
                tree.scale.set(2, 2, 2); // Adjust size
                scene.add(tree);
                trees.push(tree); // Add tree to the array for animation
            }
        });

        // Function to update tree positions for the animation
        function animateTrees() {
            const speed = 0.1; // Speed at which trees move backward
            const resetPosition = -6; // Z-position to reset trees when they move out of view

            trees.forEach(tree => {
                // Move trees backward
                tree.position.z -= speed;

                // Reset tree position when it moves out of view
                if (tree.position.z < resetPosition) {
                    tree.position.z = -resetPosition; // Move back to the start
                    tree.position.x = Math.random() * 20 - 15; // Randomize X position
                }
            });
        }


        // sparks section

        // Create fiery sparks (floating around)
        const sparkGeometry = new THREE.BufferGeometry();
        const sparkCount = 30000; // Number of spark particles

        // Array to store positions of particles and color data
        const sparkPositions = [];
        const velocities = [];
        const sparkColors = [];  // Array to store the color of each spark
        const sparkSizes = [];   // Array to store the size of each spark

        // Define the colors for the sparks
        const colors = [
            new THREE.Color(0xFF4500), // Fiery red
            new THREE.Color(0xFF6347), // Orange-red
            new THREE.Color(0xFFD700), // Gold (yellowish)
        ];

        for (let i = 0; i < sparkCount; i++) {
            const x = Math.random() * 200 - 100; // Range: -100 to 100
            const y = Math.random() * 200 - 100; // Range: -100 to 100
            const z = Math.random() * 200 - 100; // Range: -100 to 100
            sparkPositions.push(x, y, z);

            // Random velocities for spark movement
            velocities.push(Math.random() * 0.1 - 0.05); // x velocity
            velocities.push(Math.random() * 0.1 - 0.05); // y velocity
            velocities.push(Math.random() * 0.1 - 0.05); // z velocity

            // Assign a random color to each spark
            sparkColors.push(colors[Math.floor(Math.random() * colors.length)]);

            // Assign random sizes to the sparks (for variety)
            sparkSizes.push(Math.random() * 0.2 + 0.05); // Random size between 0.05 and 0.25
        }

        sparkGeometry.setAttribute('position', new THREE.Float32BufferAttribute(sparkPositions, 3));
        sparkGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sparkSizes, 1)); // Size for each spark

        // Create a material for sparks (fire-like colors) with emissive color
        const sparkMaterial = new THREE.PointsMaterial({
            size: 0.2, // Default size of each spark (won't be used due to size attribute)
            transparent: true,
            opacity: 1,
            sizeAttenuation: true,
            vertexColors: true,  // Enable vertex colors
            alphaTest: 0.5,  // Discard transparent pixels for a cleaner look
            emissive: new THREE.Color(0xFF4500), // Dark red emissive glow
            emissiveIntensity: 50, // Intensity of the glow
            fog: false
        });


        // Create a BufferAttribute for colors and add it to the geometry
        const colorArray = [];
        for (let i = 0; i < sparkCount; i++) {
            const color = sparkColors[i];
            colorArray.push(color.r, color.g, color.b); // Add the color of each spark
        }

        sparkGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorArray, 3));

        // Create the particle system (sparks)
        const sparks = new THREE.Points(sparkGeometry, sparkMaterial);
        scene.add(sparks);

        // Animate the sparks to float and move around like fire
        const animateSparks = () => {
            const positions = sparks.geometry.attributes.position.array;

            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += velocities[i];   // X axis velocity
                positions[i + 1] += velocities[i + 1]; // Y axis velocity
                positions[i + 2] += velocities[i + 2]; // Z axis velocity

                // Reset position if spark moves too far
                if (positions[i + 1] < -100) positions[i + 1] = 100;
                if (positions[i] < -100) positions[i] = 100;
                if (positions[i] > 100) positions[i] = -100;
            }

            sparks.geometry.attributes.position.needsUpdate = true; // Mark the positions as updated
            sparks.geometry.attributes.color.needsUpdate = true;   // Mark the color attribute as updated
            sparks.geometry.attributes.size.needsUpdate = true;    // Mark the size attribute as updated
        };

        // Function to update the shape (circle-like)
        const updateShape = () => {
            const particleCount = sparkGeometry.attributes.position.count;
            const shapeData = sparkGeometry.attributes.position.array;

            for (let i = 0; i < particleCount; i++) {
                const radius = sparkSizes[i]; // Use the spark size as a radius for the displacement

                // Apply displacement to form a circle shape for each particle
                shapeData[i * 3] += Math.sin(i) * radius * 0.2; // X displacement based on sine wave
                shapeData[i * 3 + 1] += Math.cos(i) * radius * 0.2; // Y displacement based on cosine wave
            }

            sparkGeometry.attributes.position.needsUpdate = true; // Update the position attribute
        };


        // Add a Light Source
        const light = new THREE.DirectionalLight(0xBFD8FF, 1);
        light.position.set(10, 10, 10);
        scene.add(light);












        // Load a 3D Model with Animations

        let model, mixer;

        // Load the GLB model
        loader.load('WOLF.glb', (gltf) => {
            model = gltf.scene;
            mixer = new THREE.AnimationMixer(model);
            model.scale.set(6, 6, 6);

            // Play the 6th animation (index 5) initially

                const sixthAnimation = gltf.animations[5]; // Index starts at 0
                if (sixthAnimation) {
                    const action = mixer.clipAction(sixthAnimation);
                    action.setLoop(THREE.LoopRepeat); // Set loop for the animation
                    action.play();
                }
    
            

            // Adjust the model position
            model.position.set(0, -2, 0);
            scene.add(model);

            // Traverse model to enable shadow casting
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true; // Cast shadow
                    child.receiveShadow = true; // Receive shadow
                }
            });

            // Call setupScrollAnimation after the model is loaded
            setupScrollAnimation();
        });



        // Camera Initial Position: Focus on the wolf's face
        camera.position.set(0, 1, 3); // Adjust to focus on the wolf's face
        camera.lookAt(new THREE.Vector3(0, 1, 0)); // Adjust lookAt if necessary

        // GSAP ScrollTrigger Setup
        const setupScrollAnimation = () => {
            // Define camera positions and rotations for each section
            const sections = [
                { id: 'about', position: { x: 0, y: 1, z: 6 }, rotation: { x: 0, y: 0, z: 0 } },
                { id: 'skills', position: { x: 2, y: 1, z: 5 }, rotation: { x: 0, y: Math.PI / 6, z: 0 } },
                { id: 'projects', position: { x: -2, y: 2, z: 7 }, rotation: { x: Math.PI / 12, y: -Math.PI / 4, z: 0 } },
                { id: 'experience', position: { x: 2, y: 2, z: 7 }, rotation: { x: Math.PI / 12, y: Math.PI / 3, z: 0 } },
                { id: 'contact', position: { x: 2, y: 1, z: 5 }, rotation: { x: 0, y: Math.PI / 6, z: 0 } },
            ];

            sections.forEach(({ id, position, rotation }) => {
                ScrollTrigger.create({
                    trigger: `#${id}`,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: true,
                    onUpdate: (self) => {
                        const progress = self.progress; // Scroll progress (0 to 1)
                        gsap.to(camera.position, {
                            x: position.x * progress + (1 - progress) * camera.position.x,
                            y: position.y * progress + (1 - progress) * camera.position.y,
                            z: position.z * progress + (1 - progress) * camera.position.z,
                            overwrite: true,
                        });
                        gsap.to(camera.rotation, {
                            x: rotation.x * progress + (1 - progress) * camera.rotation.x,
                            y: rotation.y * progress + (1 - progress) * camera.rotation.y,
                            z: rotation.z * progress + (1 - progress) * camera.rotation.z,
                            overwrite: true,
                        });
                    },
                });
            });

            ScrollTrigger.refresh();
        };





        // camera rotation on mouse
        const mouse = { x: 0, y: 0 };
        const targetRotation = { x: 0, y: 0 };
        let isScrolling = false;
        let currentCameraRotation = { x: 0, y: 0 }; // To track camera rotation after scrolling

        const onMouseMove = (event) => {
            if (isScrolling) {
                mouse.x = 1;
                mouse.y = 1;
            } else {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // Normalize to [-1, 1]
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize to [-1, 1]
                console.log('Mouse Pos:', mouse.x, mouse.y);
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        const onScroll = () => {
            isScrolling = true;
            // Store current camera rotation at scroll time

            const thirdAnimation = model.animations[2]; // 3rd animation (index 2)
            if (thirdAnimation) {
                const action = mixer.clipAction(thirdAnimation);
                action.setLoop(THREE.LoopRepeat); // Set loop for the animation
                action.play();
            }
            currentCameraRotation.x = camera.rotation.x;
            currentCameraRotation.y = camera.rotation.y;

            // Set mouse to extreme position during scroll to stop mouse from affecting it
            mouse.x = 1;
            mouse.y = 1;

            // Stop scrolling after 1 second of no scroll
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
                console.log('Scrolling stopped:', camera.rotation.x, camera.rotation.y);
            }, 3000); // Adjust delay to suit your scroll detection needs
        };

        let scrollTimeout = null;
        window.addEventListener('scroll', onScroll);










        let clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            let delta = clock.getDelta(); // Time between frames

            // Animate other things like sparks, shape, trees, etc.
            animateSparks();
            updateShape();
            animateTrees();

            // Update animation mixer if exists
            if (mixer) mixer.update(0.01);

            // Smoothly rotate the camera based on mouse position
            if (!isScrolling) {
                targetRotation.x = currentCameraRotation.x + mouse.y * 0.1; // Offset by current camera rotation
                targetRotation.y = currentCameraRotation.y + mouse.x * 0.1;

                gsap.to(camera.rotation, {
                    x: targetRotation.x,
                    y: targetRotation.y,
                    duration: 0.5,
                    ease: 'power2.out',
                });
            }

            renderer.render(scene, camera);
        };


        animate();

        // Handle Window Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup on Component Unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            renderer.dispose();
        };
    }, []);


    useEffect(() => {
        const createScrollAnimation = (ref) => {
            gsap.fromTo(
                ref.current,
                { opacity: 0, scale: 0.5 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top 60%",
                        end: "bottom 0%",
                        scrub: true, // Smoothens the animation with the scroll
                        onEnter: () => gsap.to(ref.current, { opacity: 1, scale: 1, duration: 1,overwrite:'auto' }),
                        onLeave: () => gsap.to(ref.current, { opacity: 0, scale: 0.5, duration: 0.5,overwrite:'auto' }),
                        onEnterBack: () => gsap.to(ref.current, { opacity: 1, scale: 1,overwrite:'auto' }),
                        onLeaveBack: () => gsap.to(ref.current, { opacity: 0, scale: 0.5,overwrite:'auto' }),
                    },
                }
            );
        };
    
        createScrollAnimation(aboutRef);
        createScrollAnimation(skillsRef);
        createScrollAnimation(projectsRef);
        createScrollAnimation(experienceRef);
        createScrollAnimation(contactRef);
    
        // Refresh ScrollTrigger to recalculate positions

        return () => ScrollTrigger.kill(); // Cleanup on component unmount
    }, []);

    return (
        <>
            <div
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full"
            />




            {/* some grain effect */}
            <div
                className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.3]"
                dangerouslySetInnerHTML={{
                    __html: `
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <filter id="grainy" x="0" y="0" width="100%" height="100%">
    <!-- Turbulence to create noise -->
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
    <!-- Apply a red hue to the noise -->
    <feColorMatrix type="matrix" values="1.5 0 0 0 0
                                         0 0 0 0 0
                                         0 0 0 0 0
                                         0 0 0 1 0" />
  </filter>
  <rect width="100%" height="100%" filter="url(#grainy)" />
</svg>F
      `,
                }}
            />

            {/* grid lines */}


            <div
                className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none opacity-[0.05]"
                dangerouslySetInnerHTML={{
                    __html: `
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <defs>
    <pattern id="wide-bars" patternUnits="userSpaceOnUse" width="100" height="100">
      <!-- Vertical Bar -->
      <rect x="0" y="0" width="5" height="100" fill="rgba(255, 255, 255, 0.2)" />
      <!-- Horizontal Bar -->
      <rect x="0" y="0" width="100" height="5" fill="rgba(255, 255, 255, 0.2)" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#wide-bars)" />
</svg>
      `,
                }}
            />



            <Intro ref={aboutRef}></Intro>
            <div
                id="skills"
                ref={skillsRef}
                className="h-screen flex justify-center items-center text-3xl text-white sticky top-0"
            >
                <Skills></Skills>
            </div>



            <div
                id="projects"
                ref={projectsRef}
                className="h-screen flex justify-center items-center text-3xl text-white sticky top-0"
            >
                <Projects></Projects>
            </div>
            <div
                id="experience"
                ref={experienceRef}
                className="h-screen flex justify-center items-center text-3xl text-white sticky top-0"
            >
               <EducationAndCertifications></EducationAndCertifications>
            </div>
            <div
                id="contact"
                ref={contactRef}
                className="h-screen flex justify-center items-center text-3xl text-white sticky top-0"
            >
                <ContactMe></ContactMe>
            </div>
        </>


    )
};

export default Home;
