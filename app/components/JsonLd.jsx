import React from 'react';

// Data used in the schemas
const projectsData = [
    {
        name: 'Toolight',
        description: 'A light and color based fun & serious utility tools web app, helping designers and boring humans find something useless.',
        url: 'https://toolight.vercel.app',
        techs: ['React', 'JavaScript', 'CSS Modules']
    },
    {
        name: '2D Stickman Game',
        description: 'Developed a challenging and fun stickman style 1v1 fighting game using HTML Canvas, CSS, Vanilla JS.',
        url: 'https://ionihal.github.io/game2dsite',
        techs: ['HTML5 Canvas', 'JavaScript', 'CSS']
    },
    {
        name: 'Inventory Management System',
        description: 'Built a MERN stack web app featuring real time inventory tracking, offline order & payment processing, and an admin mediated order workflow.',
        url: 'https://github.com/ioNihal/sims-dashboard-front',
        techs: ['React', 'Express.js', 'MongoDB']
    }
];

// --- Main Person Schema ---
const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nihal K',
    givenName: 'Nihal',
    familyName: 'K',
    url: 'https://ionihal.vercel.app',
    image: 'https://ionihal.vercel.app/profile-photo.webp',

    jobTitle: 'Frontend Developer Intern',
    description: 'Frontend Developer Intern and Full Stack Enthusiast from Kasaragod, Kerala, specializing in React, Next.js, and MongoDB.',

    // Social and Professional Profiles
    sameAs: [
        'https://github.com/ioNihal',
        'https://linkedin.com/in/n1hal',
        'https://instagram.com/io.nihal',
    ],

    // Geographical Location
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kasaragod',
        addressRegion: 'Kerala',
        addressCountry: 'India'
    },

    // Education 
    alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Srinivas University',
        url: 'https://srinivasuniversity.edu.in',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Mangalore',
            addressRegion: 'Karnataka',
            addressCountry: 'India'
        },

        hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Bachelor degree',
            name: 'Bachelor of Computer Applications (BCA)',
            educationalLevel: 'Undergraduate degree',
        }
    },

    // Technical Skills
    knowsAbout: [
        'Web Development', 'JavaScript', 'TypeScript', 'React', 'Next.js',
        'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Full Stack Development'
    ],

    // Professional Experience
    hasOccupation: {
        '@type': 'Occupation',
        name: 'Frontend Developer Intern',
        estimatedSalary: {
            '@type': 'MonetaryAmount',
            currency: 'INR',
            unitText: 'MONTH',
            // OPTIONAL: Add a range or single value if comfortable
            // value: { '@type': 'QuantitativeValue', minValue: 20000, maxValue: 40000 }
        }
    },

    // Project Portfolio (Work Examples)
    subjectOf: projectsData.map(project => ({
        '@type': 'CreativeWork',
        name: project.name,
        description: project.description,
        url: project.url,
        genre: 'Web Application Development',
        keywords: project.techs.join(', '),
        author: {
            '@type': 'Person',
            name: 'Nihal K',
        }
    })),
};


// --- WebSite Schema (Foundational) ---
const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nihal K - Portfolio',
    url: 'https://ionihal.vercel.app',
    description: 'Personal portfolio website of Nihal K, a Frontend Developer from Kasaragod, Kerala',
};


export default function JsonLd() {
    return (
        <>
            {/* Person Schema (The main profile information) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            {/* WebSite Schema (For sitelink search box eligibility) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </>
    );
}
