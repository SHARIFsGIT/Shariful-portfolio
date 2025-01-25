
const codingPlatforms = [
  {
    social: "leetcode",
    link: "Shariful Islam",
    href: "https://leetcode.com/u/SHARIFsGIT/",
  },
  {
    social: "codeforces",
    link: "1zer0ne0",
    href: "https://codeforces.com/profile/1zer0ne0",
  },
  {
    social: "codechef",
    link: "sharifaiub15",
    href: "https://www.codechef.com/users/sharifaiub15",
  },
  {
    social: "virtual judge",
    link: "zer0ne_01",
    href: "https://vjudge.net/user/zer0ne_01",
  },
];

const CodingCode = () => {
  return (
    <div className="font-mono text-gray-800 p-3">
      <p className="text-[#1B9CFC]">#codingPlatforms &#123;</p>
      
      {codingPlatforms.map((item, index) => (
        <p className="pl-8 my-1" key={`coding-${index}`}>
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

export default CodingCode;