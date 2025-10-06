export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Nihal K',
        url: 'https://ionihal.vercel.app',
        sameAs: [
            'https://github.com/ioNihal',
            'https://linkedin.com/in/n1hal',
            'https://instagram.com/io.nihal'
        ],
        jobTitle: 'Frontend Developer Intern',
        description: 'Full Stack Developer from Kasaragod, Kerala, specializing in modern web technologies with a BCA degree in Software Development and Web Design',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Kasaragod',
            addressRegion: 'Kerala',
            addressCountry: 'India'
        },
        alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: 'Srinivas University ICIS',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Mangalore',
                addressRegion: 'Karnataka',
                addressCountry: 'India'
            },
            department: 'Institute of Computer and Information Science (ICIS)',
            degree: 'Bachelor of Computer Applications (BCA)',
            description: 'Software Development and Web Design',
        },
        knowsAbout: [
            'Web Development',
            'JavaScript',
            'TypeScript',
            'React',
            'Next.js',
            'Node.js',
            'Full Stack Development'
        ],
        // Add your work examples (projects)
        hasOccupation: {
            '@type': 'Occupation',
            name: 'Frontend Developer Intern',
            occupationLocation: {
                '@type': 'Country',
                name: 'India'
            },
            employmentType: 'Internship'
        },
        hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Bachelor degree',
            name: 'Bachelor of Computer Applications',
            educationalLevel: 'Undergraduate degree',
            recognizedBy: {
                '@type': 'Organization',
                name: 'Srinivas University',
                department: 'Institute of Computer and Information Science (ICIS)',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Mangalore',
                    addressRegion: 'Karnataka',
                    addressCountry: 'India'
                }
            }
        },
        workExample: [
            {
                '@type': 'CreativeWork',
                name: 'Toolight',
                description: 'A light and color based fun & serious utility tools web app, helping designers and boring humans find something useless.',
                url: 'https://toolight.vercel.app'
            },
            {
                '@type': 'CreativeWork',
                name: '2D Stickman Game',
                description: 'Developed a challenging and fun stickman style 1v1 fighting game using HTML Canvas, CSS, Vanilla JS.',
                url: 'https://ionihal.github.io/game2dsite'
            },
            {
                '@type': 'CreativeWork',
                name: 'Inventory Management System',
                description: 'Built a MERN stack web app featuring real time inventory tracking, offline order & payment processing, and an admin mediated order workflow.',
                url: 'https://github.com/ioNihal/sims-dashboard-front'
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}