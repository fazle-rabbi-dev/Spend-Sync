import React, { useState } from "react";
import { X } from "lucide-react";
import { savePDF } from "@progress/kendo-react-pdf";

export const UserExpenses = ({ expenses }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const downloadAsPDF = () => {
    const divToPrint = document.getElementById("expenses-container");
    savePDF(divToPrint, { paperSize: "A4", fileName: "expenses.pdf" });
  };

  return (
    <div>
      <button onClick={toggleModal}>Toggle Modal</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}><X /></span>
            <div id="expenses-container" className="bg-amber-100">
              aliquip culpa quis officia aliquip minim magna ut nulla incididunt qui sunt non eu occaecat qui cupidatat adipisicing culpa ipsum laboris ad eiusmod cillum enim minim culpa consequat ex magna laboris laboris est laborum minim adipisicing eu dolor consectetur do ex nulla id magna eu voluptate consectetur deserunt officia ullamco non sint amet elit veniam non do minim ipsum aute dolor veniam ipsum aliquip dolore ea ut consectetur cupidatat eu proident eiusmod minim ea Lorem in pariatur deserunt laborum ea sunt Lorem cillum occaecat dolore excepteur non sit ea laboris cupidatat ullamco et Lorem velit velit do dolor culpa nulla
            </div>
            <button onClick={downloadAsPDF}>Download as PDF</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserExpenses;