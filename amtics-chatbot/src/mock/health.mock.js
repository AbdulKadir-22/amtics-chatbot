export const mockHealthStatus = [
    {
        id: 1,
        label: "Groq Engine",
        sub: "Inference Model",
        status: "Online",
        color: "text-emerald-500",
        type: "engine"
    },
    {
        id: 2,
        label: "Vector DB",
        sub: "Knowledge Base",
        status: "Synced",
        color: "text-emerald-500",
        type: "database"
    },
    {
        id: 3,
        label: "Guardrails",
        sub: "Content Filter",
        status: "Active",
        color: "text-emerald-500",
        type: "security"
    }
];

export const mockKnowledgeSources = [
    {
        id: 1,
        title: "2026 Academic Handbook",
        desc: "Official policies, grading scales, and degree requirements directly from the Registrar.",
        sync: "2 days ago",
        verified: true
    },
    {
        id: 2,
        title: "Campus Safety Protocols",
        desc: "Emergency procedures, safe walk routes, and contact numbers sourced from Campus Safety.",
        sync: "Today, 9:00 AM",
        verified: true
    },
    {
        id: 3,
        title: "Course Catalog & Faculty Directory",
        desc: "Comprehensive list of all current courses, prerequisites, and faculty office hours.",
        sync: "Weekly",
        verified: true,
        featured: true,
        stats: [
            { label: "COURSES", value: "2,450+" },
            { label: "FACULTY", value: "380+" }
        ]
    }
];
