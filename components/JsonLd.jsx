

// Data used in the schemas
const projectsData = [
    {
        name: 'Explore Kasaragod',
        description: 'A fast, ad-free digital directory and platform showcasing Kasaragod\'s finest local eateries, travel destinations, and essential services, built with a community-first approach.',
        url: 'https://explorekasaragod.org',
        techs: ['Next.js', 'TypeScript', 'Tailwind', 'Prisma', 'PostgreSQL']
    },
    {
        name: 'RenderCard',
        description: 'A high-performance Open Graph (OG) image generation API allowing developers to render highly customizable social preview cards in real-time.',
        url: 'https://rendercard.vercel.app',
        techs: ['Next.js', 'Edge Runtime', 'SVG']
    },
    {
        name: 'Formcord',
        description: 'A lightweight, zero-dependency NPM package that channels website form submissions and system events straight to Discord channels.',
        url: 'https://formcord.vercel.app',
        techs: ['Node.js', 'Edge Runtime', 'Web APIs']
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

    jobTitle: 'Full-Stack Developer',
    description: 'Full-Stack Developer specializing in React, Next.js, Node.js, and database engineering.',

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
    description: 'Personal portfolio website of Nihal K, a Full-Stack Developer from Kasaragod, Kerala',
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
