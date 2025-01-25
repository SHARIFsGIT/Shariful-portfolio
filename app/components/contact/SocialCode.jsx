
const socialMedia = [
  {
    social: "youtube",
    link: "Engineer's Diary",
    href: "https://www.youtube.com/@engineersdiary1052",
  },
  {
    social: "instagram",
    link: "shariful_islam_1994",
    href: "https://www.instagram.com/shariful_islam_1994/",
  },
  {
    social: "facebook",
    link: "শরীফুল ইসলাম  (Shariful)",
    href: "https://www.facebook.com/enggsharif",
  },
];

const SocialCode = () => {
  return (
    <div className="font-mono text-gray-800 p-3">
      <p className="text-[#1B9CFC]">#socialMedia &#123;</p>
      
      {socialMedia.map((item, index) => (
        <p className="pl-8 my-1" key={`social-${index}`}>
          {item.social}:{" "}
          <a 
            href={item.href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-red-400 hover:underline"
          >
            {item.link}
          </a>
          ;
        </p>
      ))}
      
      <p className="text-[#1B9CFC]">&#125;</p>
    </div>
  );
};

export default SocialCode;