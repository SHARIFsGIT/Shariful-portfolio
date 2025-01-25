import Image from 'next/image'
import CodingCode from './CodingCode'
import ContactForm from './ContactForm'
import PrimaryCode from './PrimaryCode'
import ProfessionalCode from './ProfessionalCode'
import SocialCode from './SocialCode'

export function Contact() {
  return (
    <div className="max-h-full overflow-y-auto bg-gradient-to-b from-pink-100 via-white-100 to-white">
      <div className="relative h-36">
        <Image
          fill
          className="object-cover object-center"
          alt=""
          src={'/assets/images/author2.jpg'}
        />
        <Image
          className="absolute left-6 top-14 rounded-full border-2 border-black"
          alt="Shariful Islam"
          width={120}
          height={120}
          src={'/assets/images/author.jpg'}
        />
        <h1 className="absolute bottom-4 left-40 bg-gradient-to-r from-green-200 to-white bg-clip-text text-3xl font-medium text-transparent">
          Shariful Islam
        </h1>
      </div>

      <div className="flex p-8">
        <div className="w-5/12">
          <h3 className="group relative mb-4 mt-5 font-mono text-xl">
            <span className="relative">
              Find Me On
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gray-800 transition-all duration-1000 group-hover:w-full"></span>
            </span>
          </h3>
          <div className="space-y-0">
            <PrimaryCode />
            <ProfessionalCode />
            <CodingCode />
            <SocialCode />
          </div>
        </div>

        <div className="flex w-2/12 flex-col items-center justify-center">
          <div className="h-full w-px bg-red-300"></div>
          <span className="my-4 px-4">Or</span>
          <div className="h-full w-px bg-red-300"></div>
        </div>

        <div className="w-5/12">
          <h3 className="group relative mb-4 mt-5 font-mono text-xl">
            <span className="relative">
              Fill Out This Form
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gray-800 transition-all duration-1000 group-hover:w-full"></span>
            </span>
          </h3>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}