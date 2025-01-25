
const professionalProfiles = [
  {
    social: "website",
    link: "shariful.com",
    href: "https://shariful.com",
  },
  {
    social: "linkedin",
    link: "MD SHARIFUL ISLAM",
    href: "https://www.linkedin.com/in/im-shariful-islam/",
  },
  {
    social: "github",
    link: "SHARIFsGIT",
    href: "https://github.com/SHARIFsGIT",
  },
  {
    social: "daily.dev",
    link: "Shariful",
    href: "https://app.daily.dev/zer0ne",
  },
];

const ProfessionalCode = () => {
  return (
    <div className="font-mono text-gray-800 p-3">
      <p className="text-[#1B9CFC]">#professionalProfiles &#123;</p>
      
      {professionalProfiles.map((item, index) => (
        <p className="pl-8 my-1" key={`professional-${index}`}>
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

export default ProfessionalCode;