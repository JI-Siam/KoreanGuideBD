"use client";

import { useRef, useState } from 'react';
import Link from 'next/link';
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
} from 'framer-motion';

// Colors are set inline so global CSS (h2, p, a rules) can't override them.
const BRAND = '#10B981';
const WHITE = { color: '#ffffff' };
const MUTED = { color: '#d4d4d8' };
const LABEL = { color: '#a1a1aa' };
const EASE = [0.76, 0, 0.24, 1];

// Put the photos in /public/universities/ (or change the paths below).
// Landscape or square photos, at least 1400px tall, work best.
const UNIVERSITIES = [
    {
        slug: 'korea-university',
        name: 'Korea University',
        short: 'Korea Univ.',
        city: 'Seoul',
        founded: '1905',
        type: 'Private',
        image: 'https://images.unsplash.com/photo-1728390589073-07e936311aa9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description:
            'A private research university in northern Seoul, set on a stone-built Gothic campus. Known for business, law and a very active alumni network that many international students lean on for internships and jobs.',
        highlights: ['Business', 'Law', 'Engineering'],
    },
    {
        slug: 'seoul-national-university',
        name: 'Seoul National University',
        short: 'SNU',
        city: 'Seoul',
        founded: '1946',
        type: 'National',
        image: 'https://images.unsplash.com/20/cambridge.JPG?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description:
            "Korea's flagship national university, on a large hillside campus in Gwanak. Research-heavy and highly competitive, with a broad range of graduate programs and a growing set of English-taught courses.",
        highlights: ['Natural sciences', 'Medicine', 'Engineering'],
    },
    {
        slug: 'yonsei-university',
        name: 'Yonsei University',
        short: 'Yonsei',
        city: 'Seoul',
        founded: '1885',
        type: 'Private',
        image: 'https://images.unsplash.com/photo-1742747215638-0105cbcd2645?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description:
            "One of Korea's oldest institutions, based in the Sinchon student district. Popular with international applicants for its English-taught tracks and its lively campus and city life right outside the gate.",
        highlights: ['International studies', 'Medicine', 'Business'],
    },
    {
        slug: 'kaist',
        name: 'KAIST',
        short: 'KAIST',
        city: 'Daejeon',
        founded: '1971',
        type: 'National',
        image: 'https://images.unsplash.com/photo-1747854828989-5c8408a8f0bc?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description:
            'A science and technology university in Daejeon, built around research. Most graduate courses are taught in English, and the campus sits inside a city known for its research institutes.',
        highlights: ['Computer science', 'Robotics', 'Engineering'],
    },
];

export default function PhotoGrid() {
    const sectionRef = useRef(null);
    const reduceMotion = useReducedMotion();
    const [active, setActive] = useState(0);
    const count = UNIVERSITIES.length;

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    // One viewport of scrolling per university
    useMotionValueEvent(scrollYProgress, 'change', (p) => {
        const next = Math.min(count - 1, Math.max(0, Math.floor(p * count)));
        setActive((prev) => (prev === next ? prev : next));
    });

    const goTo = (index) => {
        if (!sectionRef.current) return;
        const top = sectionRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: top + index * window.innerHeight + 4,
            behavior: reduceMotion ? 'auto' : 'smooth',
        });
    };

    const current = UNIVERSITIES[active];
    const dur = (s) => (reduceMotion ? 0 : s);

    return (
        <section
            ref={sectionRef}
            aria-label="Featured universities"
            className="relative"
            style={{ height: `${(count + 1) * 100}vh`, background: '#09090b' }}
        >
            <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden md:flex-row">
                {/* LEFT: images wipe in as you scroll */}
                <div
                    className="relative h-[42%] w-full md:h-full md:w-1/2"
                    style={{ background: '#18181b' }}
                >
                    {UNIVERSITIES.map((u, i) => (
                        <motion.div
                            key={u.slug}
                            className="absolute inset-0"
                            style={{
                                zIndex: i + 1,
                                background: 'linear-gradient(135deg, #27272a 0%, #09090b 100%)',
                            }}
                            initial={false}
                            animate={{
                                clipPath: i <= active ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
                            }}
                            transition={{ duration: dur(0.9), ease: EASE }}
                        >
                            <motion.img
                                src={u.image}
                                alt={`${u.name} campus`}
                                className="h-full w-full object-cover"
                                loading={i === 0 ? 'eager' : 'lazy'}
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                                initial={false}
                                animate={{ scale: i === active ? 1 : 1.12 }}
                                transition={{ duration: dur(1.4), ease: [0.16, 1, 0.3, 1] }}
                            />
                            <div
                                aria-hidden
                                className="absolute inset-0"
                                style={{
                                    background:
                                        'linear-gradient(to top, rgba(9,9,11,0.75) 0%, rgba(9,9,11,0) 45%), linear-gradient(to bottom, rgba(9,9,11,0.55) 0%, rgba(9,9,11,0) 25%)',
                                }}
                            />
                        </motion.div>
                    ))}

                    {/* Caption over the photo */}
                    <div
                        className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-10"
                        style={{ zIndex: 50 }}
                    >
                        <div className="flex items-center gap-3 border border-white/20 bg-zinc-950/60 px-4 py-2 text-sm font-medium backdrop-blur-md" style={WHITE}>
                            <span className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND }} />
                            {current.city}, South Korea
                        </div>
                        <div className="font-outfit text-sm font-bold tabular-nums" style={WHITE}>
                            {active + 1} / {count}
                        </div>
                    </div>
                </div>

                {/* RIGHT: text swaps with the image */}
                <div
                    className="relative flex h-[58%] w-full flex-col justify-between px-6 pb-6 pt-6 md:h-full md:w-1/2 md:px-14 md:pb-12 md:pt-28 lg:px-20"
                    style={{ background: '#09090b' }}
                >
                    {/* Scroll progress line */}
                    <motion.div
                        aria-hidden
                        className="absolute left-0 top-0 hidden h-full w-[3px] md:block"
                        style={{ background: BRAND, scaleY: scrollYProgress, transformOrigin: 'top' }}
                    />

                    <div className="flex-1 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current.slug}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: dur(0.45), ease: [0.16, 1, 0.3, 1] }}
                            >
                                <p className="text-sm font-semibold" style={{ color: BRAND }}>
                                    {current.type} university in {current.city}
                                </p>

                                <h2
                                    className="font-outfit mt-3 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl"
                                    style={WHITE}
                                >
                                    {current.name}
                                </h2>

                                <p className="mt-5 max-w-xl text-base leading-relaxed md:mt-7 md:text-lg" style={MUTED}>
                                    {current.description}
                                </p>

                                <dl className="mt-6 grid max-w-md grid-cols-3 border-y border-white/15 py-4 md:mt-9 md:py-5">
                                    {[
                                        ['Founded', current.founded],
                                        ['City', current.city],
                                        ['Type', current.type],
                                    ].map(([label, value]) => (
                                        <div key={label}>
                                            <dt className="text-xs font-medium" style={LABEL}>
                                                {label}
                                            </dt>
                                            <dd className="font-outfit mt-1 text-lg font-extrabold md:text-xl" style={WHITE}>
                                                {value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>

                                <ul className="mt-6 hidden flex-wrap gap-2 md:flex">
                                    {current.highlights.map((h) => (
                                        <li
                                            key={h}
                                            className="border border-white/20 px-3 py-1.5 text-sm"
                                            style={MUTED}
                                        >
                                            {h}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/universities"
                                    className="mt-6 inline-flex items-center px-7 py-3.5 text-sm font-semibold transition-all hover:brightness-90 md:mt-9"
                                    style={{ background: BRAND, color: '#ffffff' }}
                                >
                                    Explore {current.short}
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Jump between universities */}
                    <nav aria-label="Choose a university" className="mt-4 grid grid-cols-4 gap-3">
                        {UNIVERSITIES.map((u, i) => (
                            <button
                                key={u.slug}
                                type="button"
                                onClick={() => goTo(i)}
                                aria-current={i === active}
                                className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                                style={{ outlineColor: BRAND }}
                            >
                                <span
                                    className="block h-[3px] w-full transition-colors duration-300"
                                    style={{ background: i === active ? BRAND : 'rgba(255,255,255,0.2)' }}
                                />
                                <span
                                    className="mt-2 block truncate text-xs font-semibold transition-opacity duration-300 md:text-sm"
                                    style={{ ...WHITE, opacity: i === active ? 1 : 0.5 }}
                                >
                                    {u.short}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </section>
    );
}