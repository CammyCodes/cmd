import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register the plugin once for the whole app. (useGSAP is a hook, not a plugin.)
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger, useGSAP };
