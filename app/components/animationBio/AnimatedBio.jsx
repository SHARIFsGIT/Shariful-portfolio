import { useCallback, useEffect, useState } from 'react';

const AnimatedBio = ({ className = '' }) => {
  const texts = [
    'ROS Engineer',
    'Software Developer',
    'Competitive Programmer',
    'MERN Stack Web Developer',
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const animateText = useCallback(() => {
    setIsVisible(false);
    
    const timeoutId = setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % texts.length);
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [texts.length]);

  useEffect(() => {
    const intervalId = setInterval(animateText, 3000);
    return () => clearInterval(intervalId);
  }, [animateText]);

  return (
    <div className="inline-flex items-center h-8">
      <h6 
        className={`${className} min-w-[280px] transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {texts[currentIndex]}
      </h6>
    </div>
  );
};

export default AnimatedBio;