import React, { useState } from 'react';

const QuizForm = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [chapter, setChapter] = useState('Chapter 1');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedChapterForQuiz, setSelectedChapterForQuiz] = useState('Chapter 1'); // State for modal dropdown

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);

    // If the correctAnswer matches the old answer at this index, update it to the new value
    if (correctAnswer === answers[index] && value !== correctAnswer) {
      setCorrectAnswer(value);
    }
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
      correctAnswer: correctAnswer,
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
        setQuestion('');
        setAnswers(['', '', '', '']);
        setCorrectAnswer('');
        setChapter('Chapter 1');
      } else {
        alert('Failed to save quiz.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the quiz.');
    }
  };

  // Function to open the modal
  const handleGenerateQuizClick = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle generating the quiz (you can customize this logic)
  const handleGenerateQuiz = () => {
    alert(`Generating quiz for ${selectedChapterForQuiz}`);
    setIsModalOpen(false); // Close the modal after generating
  };

  return (
    <div className="w-full flex">
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Online Quiz</h2>
          {/* <button
            onClick={handleGenerateQuizClick}
            className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Generate Quiz
          </button> */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-none">
          <form onSubmit={handleSubmit}>
            {/* Chapter Selection */}
            <div className="mb-6 w-full">
              <select
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="w-48 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Chapter 1</option>
                <option>Chapter 2</option>
                <option>Chapter 3</option>
              </select>
            </div>

            {/* Question Input */}
            <div className="mb-6 w-full">
              <textarea
                placeholder="Type question here"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full h-24 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                required
              />
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4 mb-6 w-full">
              {["A", "B", "C", "D"].map((label, index) => (
                <div key={index} className="flex items-center space-x-2 w-full">
                  <span className="text-gray-700 font-medium">{label}.</span>
                  <input
                    type="text"
                    placeholder="Click to add answer"
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    required
                  />
                </div>
              ))}
            </div>

            {/* Correct Answer Selection */}
            <div className="mb-6 w-full">
              <select
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="w-48 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select correct answer
                </option>
                {answers.map((answer, index) => (
                  <option key={index} value={answer}>
                    {answer || `Option ${index + 1}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center w-full">
              <button
                type="button"
                className="text-blue-600 hover:underline flex items-center space-x-2"
              >
              </button>
              <button
                type="submit"
                className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition"
              >
                Add To Pool
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Generate Quiz</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Select Chapter</label>
              <select
                value={selectedChapterForQuiz}
                onChange={(e) => setSelectedChapterForQuiz(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Chapter 1</option>
                <option>Chapter 2</option>
                <option>Chapter 3</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              {/* <button
                onClick={handleGenerateQuiz}
                className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
              >
                Generate
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizForm;