export const mockDocuments = [
    {
        id: 1,
        name: "CS101_Syllabus_Fall2023.pdf",
        tag: "Course Syllabus",
        tagColor: "bg-blue-50 text-blue-600",
        date: "Oct 24, 2023",
        tokens: "4,021 tkns",
        status: "Indexed",
        statusColor: "text-emerald-500 bg-emerald-50",
        iconType: "pdf"
    },
    {
        id: 2,
        name: "Dr_Smith_Bio_2024.docx",
        tag: "Faculty Bios",
        tagColor: "bg-purple-50 text-purple-600",
        date: "Oct 25, 2023",
        tokens: "1,285 tkns",
        status: "Indexed",
        statusColor: "text-emerald-500 bg-emerald-50",
        iconType: "docx"
    },
    {
        id: 3,
        name: "Event_Calendar_Spring24.pdf",
        tag: "Campus Events",
        tagColor: "bg-orange-50 text-orange-600",
        date: "Oct 26, 2023",
        tokens: "--",
        status: "Processing",
        statusColor: "text-orange-500 bg-orange-50",
        iconType: "pdf"
    }
];

export const mockStats = [
    { label: "Total Documents", value: "1,248", trend: "+12 this week", type: "count" },
    { label: "Last Index Update", value: "2m ago", subValue: "Auto-sync enabled", type: "time" },
    { label: "Storage Used", value: "4.2 GB", progress: 42, subValue: "42% of 10 GB Quota", type: "storage" }
];
