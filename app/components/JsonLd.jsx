export default function JsonLd() {
    // Main personal information schema
    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        mainEntity: {
            '@type': 'Person',
            name: 'Nihal K',
            givenName: 'Nihal',
            familyName: 'K',
            alternateName: 'ioNihal',
            url: 'https://ionihal.vercel.app',
            sameAs: [
                'https://github.com/ioNihal',
                'https://linkedin.com/in/n1hal',
                'https://instagram.com/io.nihal'
            ],
            jobTitle: 'Frontend Developer Intern',
            description: 'Frontend Developer Intern from Kasaragod, Kerala, specializing in modern web technologies with a BCA degree in Software Development and Web Design',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Kasaragod',
                addressRegion: 'Kerala',
                addressCountry: 'India'
            },
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

    const projects = [
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

    // Project collection schema (ItemList)
    const projectListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        numberOfItems: projects.length,
        itemListOrder: "Desc",
        itemListElement: projects.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'CreativeWork',
                name: project.name,
                description: project.description,
                url: project.url,
                keywords: project.techs.join(', '),
                programmingLanguage: project.techs,
                author: {
                    '@type': 'Person',
                    name: 'Nihal K',
                    url: 'https://ionihal.vercel.app'
                }
            }
        }))
    };

    // Course/Education schema
    const educationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Bachelor of Computer Applications (BCA)',
        description: 'Software Development and Web Design specialization at Srinivas University ICIS',
        provider: {
            '@type': 'CollegeOrUniversity',
            name: 'Srinivas University ICIS',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Mangalore',
                addressRegion: 'Karnataka',
                addressCountry: 'India'
            }
        },
        courseCode: 'BCA',
        educationalLevel: 'Undergraduate',
        educationalCredentialAwarded: 'Bachelor Degree',
        timeRequired: 'P3Y',
        hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'full-time',
            location: {
                '@type': 'Place',
                name: 'Srinivas University ICIS Campus',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Mangalore',
                    addressRegion: 'Karnataka',
                    addressCountry: 'India'
                }
            }
        }
    };

    // Organization schema for current workplace
    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Nihal K - Portfolio',
        url: 'https://ionihal.vercel.app',
        description: 'Personal portfolio website of Nihal K, a Frontend Developer from Kasaragod, Kerala',
        author: {
            '@type': 'Person',
            name: 'Nihal K'
        }
    };

    // Skills schema
    const skillsSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Skills & Technologies',
        description: 'Technical skills and technologies used by Nihal K',
        numberOfItems: personSchema.knowsAbout.length,
        itemListElement: personSchema.knowsAbout.map((skill, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: skill
        }))
    };

    // Breadcrumb schema for better navigation structure
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://ionihal.vercel.app'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Skills',
                item: 'https://ionihal.vercel.app/#skills'
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: 'Projects',
                item: 'https://ionihal.vercel.app/#projects'
            },
            {
                '@type': 'ListItem',
                position: 4,
                name: 'Experience',
                item: 'https://ionihal.vercel.app/#experience'
            },
            {
                '@type': 'ListItem',
                position: 5,
                name: 'About',
                item: 'https://ionihal.vercel.app/#about'
            },
            {
                '@type': 'ListItem',
                position: 6,
                name: 'Contact',
                item: 'https://ionihal.vercel.app/#contact'
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(educationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(projectListSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(skillsSchema) }}
            />
        </>
    );
}