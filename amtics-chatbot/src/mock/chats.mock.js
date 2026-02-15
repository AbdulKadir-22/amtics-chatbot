export const mockChats = [
    {
        id: 1,
        sender: 'user',
        text: "Hi! I'm trying to find Professor Alan Smith. Can you tell me when his office hours are for this semester?",
        timestamp: '10:23 AM',
    },
    {
        id: 2,
        sender: 'bot',
        text: "Hello Alex! I can certainly help with that. Dr. Alan Smith is available on Tuesdays from 2:00 PM – 4:00 PM (In Person) and Thursdays from 10:00 AM – 12:00 PM (Virtual). He is located in the Science Building, Room 304.",
        timestamp: '10:23 AM',
        source: 'Faculty_Handbook_2024.pdf',
    },
    {
        id: 3,
        sender: 'bot',
        text: "Sure thing! I've pulled up Dr. Smith's quick reference card in the context panel for you.",
        timestamp: '10:24 AM',
    }
];

export const mockRecentQueries = [
    { id: 1, label: "Prof. Smith's Office Hours", time: 'Today' },
    { id: 2, label: "Cafeteria Menu", time: 'Today' },
    { id: 3, label: "CS101 Syllabus PDF", time: 'Yesterday' },
    { id: 4, label: "Finals Schedule", time: 'Yesterday' },
    { id: 5, label: "Library Late Fees", time: 'Yesterday' },
];

export const mockSuggestions = [
    "Current Semester Dates",
    "Campus Map",
    "Upcoming Events"
];
