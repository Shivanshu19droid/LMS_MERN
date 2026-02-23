import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";

function Footer() {
  const ccurrentDate = new Date();
  const year = ccurrentDate.getFullYear();

  return (
  <footer className="w-full bg-[#F8FAFC] border-t border-slate-200 mt-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-8">

      <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6">

        {/* Left Section */}
        <section className="text-sm sm:text-base text-[#64748B] text-center sm:text-left font-medium leading-relaxed">
          © {year} LMS Platform. All rights reserved.
        </section>

        {/* Right Section */}
        <section className="flex items-center justify-center gap-4 sm:gap-5">

          <a className="p-2.5 rounded-xl text-[#64748B] transition-all duration-200 hover:bg-[#2563EB]/10 hover:text-[#2563EB]">
            <BsFacebook size={18} className="sm:w-5 sm:h-5" />
          </a>

          <a className="p-2.5 rounded-xl text-[#64748B] transition-all duration-200 hover:bg-[#2563EB]/10 hover:text-[#2563EB]">
            <BsInstagram size={18} className="sm:w-5 sm:h-5" />
          </a>

          <a className="p-2.5 rounded-xl text-[#64748B] transition-all duration-200 hover:bg-[#2563EB]/10 hover:text-[#2563EB]">
            <BsLinkedin size={18} className="sm:w-5 sm:h-5" />
          </a>

          <a className="p-2.5 rounded-xl text-[#64748B] transition-all duration-200 hover:bg-[#2563EB]/10 hover:text-[#2563EB]">
            <BsTwitter size={18} className="sm:w-5 sm:h-5" />
          </a>

        </section>
      </div>

    </div>
  </footer>
);



}

export default Footer;
