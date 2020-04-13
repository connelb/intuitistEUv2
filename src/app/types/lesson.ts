type Lesson = {
    id: string,
    name: string,
    description: string,
    section: string,
    subSection: string,
    level: string,
    video: string,
    keywords: string,
    cards3: [{
        id: string,
        question: string,
        answer: string,
        audio: string,
        video: string,
        level: string,
        order: number,
        keywords: string,
        lesson3: string,
        //users3: [User3Card3]
    }]
};

export default Lesson;