
const primaryContacts = [
  {
    social: "email",
    link: "sharifaiub15@gmail.com",
    href: "mailto:sharifaiub15@gmail.com",
  },
  {
    social: "phone",
    link: "+316 81942970",
    href: "tel:+31681942970",
  },
  {
    social: "whatsapp",
    link: "+49 1778797486",
    href: "https://wa.me/491778797486",
  },
];

const PrimaryCode = () => {
  return (
    <div className="font-mono text-gray-800 p-3">
      <p className="text-[#1B9CFC]">#primaryContacts &#123;</p>
      
      {primaryContacts.map((item, index) => (
        <p className="pl-8 my-1" key={`primary-${index}`}>
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

export default PrimaryCode;