const SITE = 'https://www.nihalu.com';
const PERSON_ID = `${SITE}/#person`;

const projects = [
    {
        name: 'Explore Kasaragod',
        description: "A fast, ad-free directory of Kasaragod's eateries, destinations and essential services, built community-first.",
        url: 'https://explorekasaragod.org',
        keywords: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    },
    {
        name: '2D Stickman Game',
        description: 'A 1v1 stickman fighting game built with HTML Canvas and vanilla JavaScript.',
        url: 'https://ionihal.github.io/game2dsite',
        keywords: ['HTML5 Canvas', 'JavaScript', 'CSS'],
    },
    {
        name: 'RenderCard',
        description: 'An Open Graph image API that renders customizable social preview cards from URL parameters.',
        url: 'https://rendercard.vercel.app',
        keywords: ['Next.js', 'Edge Runtime', 'Image Generation'],
    },
    {
        name: 'Formcord',
        description: 'A zero-dependency package that sends form submissions and system events to Discord.',
        url: 'https://formcord.vercel.app',
        keywords: ['Node.js', 'Edge Runtime', 'Web APIs', 'Discord API'],
    },
    {
        name: 'React WIP UI System',
        description: 'A composable React kit of badges, banners and overlays for marking work-in-progress features.',
        url: 'https://react-wip-ui.vercel.app',
        keywords: ['React', 'Next.js'],
    },
    {
        name: 'Inventory Management System',
        description: 'A MERN app with real-time inventory tracking, offline orders and admin-approved payments.',
        url: 'https://github.com/ioNihal/sims-dashboard-front',
        keywords: ['React', 'Express.js', 'MongoDB'],
    },
];

const person = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Nihal K',
    givenName: 'Nihal',
    familyName: 'K',
    url: SITE,
    image: `${SITE}/profile-photo.webp`,
    jobTitle: 'Full-Stack Developer',
    worksFor: { '@type': 'Organization', name: 'DGymBook' },
    description: 'Full-Stack Developer specializing in React, Next.js, Node.js, and database engineering.',
    sameAs: [
        'https://github.com/ioNihal',
        'https://linkedin.com/in/n1hal',
        'https://instagram.com/io.nihal',
        'https://x.com/n1haaaal',
    ],
    email: 'nihal04x@gmail.com',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kasaragod',
        addressRegion: 'Kerala',
        addressCountry: 'India',
    },
    alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Srinivas University',
        url: 'https://srinivasuniversity.edu.in',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Mangalore',
            addressRegion: 'Karnataka',
            addressCountry: 'India',
        },
    },
    knowsAbout: [
        'Web Development', 'JavaScript', 'TypeScript', 'React', 'Next.js',
        'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Prisma', 'Tailwind CSS',
    ],
};

const website = {
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    name: 'Nihal K - Portfolio',
    url: SITE,
    description: 'Personal portfolio of Nihal K, a Full-Stack Developer from Kasaragod, Kerala',
    inLanguage: 'en',
    author: { '@id': PERSON_ID },
};

const works = projects.map((p) => ({
    '@type': 'CreativeWork',
    name: p.name,
    description: p.description,
    url: p.url,
    keywords: p.keywords.join(', '),
    author: { '@id': PERSON_ID },
}));

const graph = {
    '@context': 'https://schema.org',
    '@graph': [person, website, ...works],
};

export default function JsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(graph).replace(/</g, '\\u003c'),
            }}
        />
    );
}