import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import { FaHome } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { HiCalendarDateRange } from "react-icons/hi2";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";
import StudentImg from "../../../assets/StudentImg.svg";

const QuizForm = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [chapter, setChapter] = useState('Chapter 1');

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = {
      chapterName: chapter,
      question: question,
      optionOne: answers[0],
      optionTwo: answers[1],
      optionThree: answers[2],
      optionFour: answers[3],
      correctAnswer: correctAnswer
    };

    try {
      const response = await fetch('http://localhost:8085/api/v1/question/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });
      if (response.ok) {
        alert('Quiz saved successfully!');
        // Clear the input fields
        setQuestion('');
        setAnswers(['', '', '', '']);
        setCorrectAnswer('');
        setChapter('Chapter 1'); // Reset to default chapter if needed
      } else {
        alert('Failed to save quiz.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the quiz.');
    }
  };

  return (
    <div className='flex'>
      <div>  
      <Sidebar BackgroundColor={"#287f93"}
        ImgURL={StudentImg} Name={"Alia Bhatt"}
         Id="SC/2021/12405"
         Logout={()=>{console.log("Click Logout Button")}} 
         Tab1="Home" Tab1Icon={FaHome} Tab1functions="/teacher-dashboard"
         Tab2="Students" Tab2Icon={PiStudentFill} Tab2functions='/teacher-dashboard/students'
         Tab3="Manage Schedule" Tab3Icon={HiCalendarDateRange} Tab3functions="/teacher-dashboard/manage-shedules" 
         Tab4="Payments" Tab4Icon={MdOutlinePayment} Tab4functions="/teacher-dashboard/payment"
         Tab5="Attendance" Tab5Icon={FaRegCalendarCheck} Tab5functions="/teacher-dashboard/attendence"
         AddNewTab={true} 
         Tab6="Settings" Tab6Icon={IoIosSettings} Tab6functions="/"/>
      </div>

      <div className="p-4 w-full">
        <h2 className="text-xl font-bold">Online Quiz</h2>
        <div className='flex'>
          <div className="mb-4">
            <label className="block"></label>
            <select
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              className="mt-1 block w-full p-2 border rounded"
            >
              <option>Chapter 1</option>
              <option>Chapter 2</option>
              <option>Chapter 3</option>
            </select>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block"></label>
            <textarea
              type="text"
              placeholder='Type question here'
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-1 block w-full h-10 p-2 border rounded focus:outline-none focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {["A", "B", "C", "D"].map((answer, index) => (
              <input
                key={index}
                type="text"
                placeholder='Click to add answer'
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="mt-1 block w-full p-2 border rounded"
                required
              />
            ))}
          </div>
          <div className="mb-4">
            <label className="block">Select correct answer</label>
            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="mt-1 block w-1/2 p-2 border rounded"
              required
            >
              {answers.map((answer, index) => (
                <option key={index} value={answer}>
                  {answer || `Option ${index + 1}`}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-400 text-white px-4 py-2 rounded">
            Add To Pool
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;