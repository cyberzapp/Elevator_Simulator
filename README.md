Elevator_Simulator 🛗

A cinematic, highly visual elevator simulation built with React, Framer Motion, and GSAP. Experience smooth, algorithmic dispatching of multi-car elevator networks featuring interactive internal and external control panels.

✨ Features

Algorithmic Dispatching: Smart elevator routing determines the most efficient car to answer an external call based on proximity, current direction, and queued targets.

Cinematic Animations: Fluid door openings, accurate car scaling via GSAP, and a custom mouse cursor for desktop users.

Fully Responsive Layout: Optimized for mobile, tablet, and desktop viewing.

Immersive Onboarding: Features an animated metal-door intro screen and a clean tutorial modal on first launch (persisted via localStorage).

Telemetry Display: Real-time logging of network traffic/calls.

Glassmorphism UI: Premium dark-mode aesthetics with blurred backdrops, glowing accents, and parallax tilt effects.

🚀 Tech Stack

Framework: React 19 + Vite

Styling: Tailwind CSS + Inline Modules

Animations: Framer Motion (UI transitions, physics) & GSAP (Complex numerical property interpolation)

Icons: Lucide React

3D Effects: React Parallax Tilt

📦 Installation & Setup

Clone the repository:

git clone [https://github.com/yourusername/Elevator_Simulator.git](https://github.com/yourusername/Elevator_Simulator.git)
cd Elevator_Simulator


Install dependencies:

npm install


Start the development server:

npm run dev


Build for production:

npm run build


🎮 How to Use

External Controls: On the right panel, click the Up or Bell icon next to any floor to dispatch an elevator to that level. The system calculates the best car automatically.

Internal Controls: Underneath each elevator shaft, click the floor numbers to simulate a passenger inside the elevator pressing their destination button.

Watch the simulated logic operate dynamically as cars open their doors, adjust their directions, and pick up multiple stops optimally!

📄 License

This project is open-source and available under the MIT License.