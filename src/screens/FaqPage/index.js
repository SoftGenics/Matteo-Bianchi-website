import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import './index.css'

const faqs = [
  { question: "Do blue light blocking glasses really work?", answer: "Yes, they help reduce eye strain by filtering blue light from screens." },
  { question: "Is it OK to wear blue light blocking glasses all the time?", answer: "Yes, but it's best to use them when exposed to digital screens." },
  { question: "Who should wear blue light blocking glasses?", answer: "Anyone who spends long hours on digital devices or experiences eye strain." },
  { question: "Is blue light bad for your eyes?", answer: "Excessive exposure can contribute to digital eye strain and sleep disturbances." },
  { question: "How can I check if blue light glasses are real?", answer: "Use a blue light test card or check for reflection of blue light on lenses." },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-main-container">
      <div className="faq-container">
        {/* <h2 className="faq-title">Frequently Asked Questions about Blue Light Glasses</h2> */}
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
                <span className={`arrow ${openIndex === index ? "rotate" : ""}`}><IoIosArrowUp /></span>
              </button>
              <div className={`faq-answer ${openIndex === index ? "open" : ""}`}>{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
