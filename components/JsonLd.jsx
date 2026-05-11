

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

// Main Person Schema
const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://ionihal.vercel.app/#person',

    name: 'Nihal K',
    givenName: 'Nihal',
    familyName: 'K',
    url: 'https://ionihal.vercel.app',
    image: 'https://ionihal.vercel.app/profile-photo.webp',

    jobTitle: 'Frontend Developer',
    description: 'Frontend developer specializing in React, Next.js, and modern web applications.',

    // Social and Professional Profiles
    sameAs: [
        'https://github.com/ioNihal',
        'https://linkedin.com/in/n1hal',
        'https://instagram.com/io.nihal',
        'https://x.com/n1haaaal',
    ],

    email: 'mailto:nihal04x@gmail.com',

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
    },

    // Project Portfolio (Work Examples)
    subjectOf: projectsData.map(project => ({
        '@type': 'SoftwareSourceCode',
        name: project.name,
        description: project.description,
        codeRepository: project.url,
        programmingLanguage: project.techs,
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
    '@id': 'https://ionihal.vercel.app/#website',
    name: 'Nihal K - Portfolio',
    url: 'https://ionihal.vercel.app',
    description: 'Personal portfolio website of Nihal K, a Frontend Developer from Kasaragod, Kerala',
    inLanguage: 'en',
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
