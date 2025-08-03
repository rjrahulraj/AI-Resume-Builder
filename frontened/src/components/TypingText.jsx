import { useEffect, useState } from "react";

const TypingText = ({ text, speed = 100, pause = 1500 }) => {
     const [displayedText, setDisplayedText] = useState("");
     const [index, setIndex] = useState(0);
     const [isDeleting, setIsDeleting] = useState(false);

     useEffect(() => {
          let timeout;

          if (!isDeleting && index < text.length) {
               timeout = setTimeout(() => {
                    setDisplayedText((prev) => prev + text[index]);
                    setIndex(index + 1);
               }, speed);
          } else if (index === text.length && !isDeleting) {
               timeout = setTimeout(() => {
                    setIsDeleting(true);
               }, pause);
          } else if (isDeleting && index > 0) {
               timeout = setTimeout(() => {
                    setDisplayedText((prev) => prev.slice(0, -1));
                    setIndex(index - 1);
               }, speed / 1.5);
          } else if (isDeleting && index === 0) {
               setIsDeleting(false);
          }

          return () => clearTimeout(timeout);
     }, [text, index, isDeleting, speed, pause]);

     return (
          <h1
               className="text-base sm:text-lg font-medium  bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 bg-clip-text text-transparent"
               style={{
                    minHeight: "1.5em", // prevent vertical shifting
                    minWidth: `${text.length}ch`, // prevent width shifting
                    whiteSpace: "nowrap",
                    overflow: "hidden",
               }}
          >
               {displayedText}
               <span className="animate-pulse">|</span>
          </h1>
     );
};

export default TypingText;
