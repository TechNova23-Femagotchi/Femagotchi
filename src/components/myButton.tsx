import React from 'react';
import '../App.css';



interface ButtonProps{
    onClick: () => void;
    children: React.ReactNode;

}

function MyButton({onClick, children} : ButtonProps) {
//   const handleClick = () => {
//     alert('cycle');
//   };

  return (
    <>
    <div>
      <button className="my-button" onClick={onClick}> {children} </button>
    </div>
    
    </>
  );
}

export default MyButton;