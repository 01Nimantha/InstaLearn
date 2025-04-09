import { createSlice } from "@reduxjs/toolkit";

const quistionSlice = createSlice({
  name:"quistion",
  initialState:{quistionArr:[
    {
      "id": 1,
      "question": "Which programming language is primarily used for Android app development?",
      "options": ["Java", "Python", "C++", "Ruby"],
      "correctAnswer": "Java",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 2,
      "question": "What does HTML stand for?",
      "options": ["HyperText Markup Language", "High-Level Text Machine Language", "Hyperlink and Text Management Language", "Home Tool Markup Language"],
      "correctAnswer": "HyperText Markup Language",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 3,
      "question": "Which of the following is a JavaScript framework?",
      "options": ["React", "Laravel", "Django", "Spring Boot"],
      "correctAnswer": "React",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 4,
      "question": "Which data structure follows the LIFO principle?",
      "options": ["Queue", "Stack", "Linked List", "Array"],
      "correctAnswer": "Stack",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 5,
      "question": "What is the primary purpose of SQL?",
      "options": ["Styling web pages", "Managing databases", "Creating animations", "Building operating systems"],
      "correctAnswer": "Managing databases",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 6,
      "question": "Which of these is not a programming language?",
      "options": ["Python", "C++", "HTML", "Swift"],
      "correctAnswer": "HTML",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 7,
      "question": "Which company developed the C# programming language?",
      "options": ["Apple", "Google", "Microsoft", "IBM"],
      "correctAnswer": "Microsoft",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 8,
      "question": "What is the time complexity of binary search?",
      "options": ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
      "correctAnswer": "O(log n)",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 9,
      "question": "Which protocol is used for secure communication over the internet?",
      "options": ["HTTP", "FTP", "SSH", "HTTPS"],
      "correctAnswer": "HTTPS",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 10,
      "question": "Which of these is a NoSQL database?",
      "options": ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
      "correctAnswer": "MongoDB",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 11,
      "question": "What does CSS stand for?",
      "options": ["Cascading Style Sheets", "Computer System Styling", "Creative Style Syntax", "Code Style System"],
      "correctAnswer": "Cascading Style Sheets",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 12,
      "question": "Which keyword is used to declare a constant variable in JavaScript?",
      "options": ["var", "let", "const", "final"],
      "correctAnswer": "const",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 13,
      "question": "Which of the following is an interpreted language?",
      "options": ["C", "C++", "Java", "Python"],
      "correctAnswer": "Python",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 14,
      "question": "Which software development methodology follows an iterative approach?",
      "options": ["Waterfall", "Agile", "V-Model", "Spiral"],
      "correctAnswer": "Agile",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 15,
      "question": "Which function is used to print output in Python?",
      "options": ["echo()", "printf()", "cout<<", "print()"],
      "correctAnswer": "print()",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 16,
      "question": "Which of these is a front-end web framework?",
      "options": ["Django", "Angular", "Spring", "Flask"],
      "correctAnswer": "Angular",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 17,
      "question": "Which of the following is an example of cloud storage?",
      "options": ["Google Drive", "RAM", "SSD", "Hard Disk"],
      "correctAnswer": "Google Drive",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 18,
      "question": "Which symbol is used for comments in Python?",
      "options": ["//", "/* */", "#", "--"],
      "correctAnswer": "#",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 19,
      "question": "What is the main advantage of using version control systems like Git?",
      "options": ["Data Encryption", "Tracking changes", "Faster Internet", "Better UI"],
      "correctAnswer": "Tracking changes",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    },
    {
      "id": 20,
      "question": "Which sorting algorithm has the best average-case time complexity?",
      "options": ["Bubble Sort", "Quick Sort", "Merge Sort", "Selection Sort"],
      "correctAnswer": "Merge Sort",
      "disable": false,
      "mark": false,
      "studentAnswer": ""
    }
],marks:0,markscount:0,questioncount:0

  },
  reducers:{
    addQuistion:(state,action)=>{
      state.quistionArr=action.payload
    },
    addMark: (state, action) => {
      state.quistionArr = state.quistionArr.map(question =>
        question.id === action.payload.id ? { ...question, ...action.payload } : question
      );
    },
    makeDisable: (state) => {
      state.quistionArr.forEach((item) => {
        item.disable = true;
      });
    },
    calculateFullQuestionPaperMarks: (state) => {
      state.markscount = 0;
      state.questioncount = 0;
    
      state.quistionArr.forEach((item) => {
        if (item.mark) {
          state.markscount += 1;
        }
        state.questioncount += 1;
      });
      state.marks = (state.markscount / state.questioncount) * 100;
    }
    
    
  }
});

export const quistionAction = quistionSlice.actions;
export default quistionSlice;