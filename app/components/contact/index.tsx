import dynamic from 'next/dynamic';
import Image from 'next/image';
import { memo } from 'react';

// Lazy load components
const CodingCode = dynamic(() => import('./CodingCode'), { ssr: true });
const PrimaryCode = dynamic(() => import('./PrimaryCode'), { ssr: true });
const ProfessionalCode = dynamic(() => import('./ProfessionalCode'), { ssr: true });
const SocialCode = dynamic(() => import('./SocialCode'), { ssr: true });
const ContactForm = dynamic(() => import('./ContactForm'), { ssr: true });

const UnderlineHeading = memo(({ children }: { children: React.ReactNode }) => (
  <h3 className="group relative mb-4 mt-5 font-mono text-xl">
    <span className="relative">
      {children}
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gray-800 transition-all duration-1000 group-hover:w-full"></span>
    </span>
  </h3>
));

UnderlineHeading.displayName = 'UnderlineHeading';

const Divider = memo(() => (
  <div className="flex w-2/12 flex-col items-center justify-center">
    <div className="h-full w-px bg-red-300"></div>
    <span className="my-4 px-4">Or</span>
    <div className="h-full w-px bg-red-300"></div>
  </div>
));

Divider.displayName = 'Divider';

export function Contact() {
  return (
    <div className="max-h-full overflow-y-auto bg-gradient-to-b from-pink-100 via-white-100 to-white">
      {/* Header Section */}
      <header className="relative h-36">
        <Image
          fill
          className="object-cover object-center"
          alt="Cover Image"
          src="/assets/images/author2.jpg"
          priority
        />
        <Image
          className="absolute left-6 top-14 rounded-full border-2 border-black"
          alt="Shariful Islam"
          width={120}
          height={120}
          src="/assets/images/author.jpg"
          priority
        />
        <h1 className="absolute bottom-4 left-40 bg-gradient-to-r from-green-200 to-white bg-clip-text text-3xl font-medium text-transparent">
          Shariful Islam
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex p-8">
        {/* Left Section */}
        <section className="w-5/12">
          <UnderlineHeading>Find Me On</UnderlineHeading>
          <div className="space-y-0">
            <PrimaryCode />
            <ProfessionalCode />
            <CodingCode />
            <SocialCode />
          </div>
        </section>

        <Divider />

        {/* Right Section */}
        <section className="w-5/12">
          <UnderlineHeading>Fill Out This Form</UnderlineHeading>
          <ContactForm />
        </section>
      </main>
    </div>
  );
}