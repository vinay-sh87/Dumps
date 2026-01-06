import {
  ArrowDownToLine,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Facebook,
  Linkedin,
  Menu,
  Search,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import logo from "../assets/logo (1).svg";
import lineicon from "../assets/lineicons.f9e84b1d.svg";
import formbold from "../assets/formbold.51209f5d.svg";
import uideck from "../assets/uideck.2e687846.svg";
import heroImg from "../assets/hero-image-01.webp";
import serviceImg1 from "../assets/service-01.webp";
import serviceImg2 from "../assets/service-02.webp";
import serviceImg3 from "../assets/service-03.webp";
import portfolioImg1 from "../assets/portfolio-01.webp";
import portfolioImg2 from "../assets/portfolio-02.webp";
import portfolioImg3 from "../assets/portfolio-03.webp";
import portfolioImg4 from "../assets/portfolio-04.webp";

import { useState } from "react";

export default function Home() {
  const [menuToggle, setMenuToggle] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-transparent">
        <div className="container mx-auto px-2 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <div className="logo">
                <img src={logo} alt="Logo" />
              </div>

              <div className="hidden md:flex gap-6">
                {["About", "Services", "Portfolio", "Pricing"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="font-normal hover:text-blue-500 transition"
                  >
                    {item}
                  </a>
                ))}
                <div
                  className="relative"
                  onMouseEnter={() => setPagesOpen(true)}
                  onMouseLeave={() => setPagesOpen(false)}
                >
                  <a
                    href="#"
                    className="font-normal hover:text-blue-500 transition duration-200 ease-in-out  flex items-center gap-1 "
                  >
                    Pages {pagesOpen ? <ChevronUp /> : <ChevronDown />}
                  </a>
                  {pagesOpen && (
                    <div className="absolute top-full mt-2 left-0 shadow-lg p-2 z-50">
                      {[
                        "Home Page",
                        "Service Page",
                        "Portfolio Page",
                        "Blog Page",
                        "Contact Page",
                        "Docs",
                        "Sign in",
                        "Sign up",
                        "Error 404",
                      ].map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="block whitespace-nowrap font-normal hover:text-blue-500 transition ps-3 pe-10 py-1"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden md:flex gap-3">
              <button>
                <Search color="#777" />
              </button>
              <button className="bg-blue-500 px-8 py-3 rounded-full text-white">
                Get a Quote
              </button>
            </div>

            <div className="relative md:hidden">
              <button onClick={() => setMenuToggle(!menuToggle)}>
                {menuToggle ? <X /> : <Menu />}
              </button>

              {menuToggle && (
                <div className="absolute right-0 top-full mt-3 bg-white shadow-lg rounded-lg flex flex-col gap-5 p-3 z-50">
                  {["About", "Services", "Portfolio", "Pricing"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="font-normal hover:text-blue-500 transition ps-4 pe-20"
                      onClick={() => setMenuToggle(false)}
                    >
                      {item}
                    </a>
                  ))}
                  <a
                    href="#"
                    className="font-normal hover:text-blue-500 transition ps-4 pe-20"
                    onClick={() => setMenuToggle(false)}
                  >
                    Pages
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-2 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="left">
            <h1 className="text-4xl text-dark font-bold leading-snug mb-3">
              Next.js Site Template For <br /> Agency and Portfolio
            </h1>
            <p className="mb-6 text-gray-500 font-normal max-w-[480px]">
              Elevate your online presence and impress clients effortlessly! —
              featuring essential integrations, pre-built pages, and
              customizable components. Modern, responsive design with fast
              loading and SEO optimization.
            </p>
            <div className="flex gap-6 items-center">
              <button className="px-8 py-4 text-md rounded bg-blue-500 text-white">
                Explore Portfolio
              </button>
              <button className="flex gap-2 hover:text-blue-500 text-md">
                <ArrowDownToLine className="bg-blue-500 text-white rounded-full" />{" "}
                Download Brochure
              </button>
            </div>
            <p className="pt-8 text-gray-500 fw-bolc text-sm">
              Trusted by the best
            </p>
            <div className="pt-2 flex items-center">
              <img
                className="mr-4 py-3"
                width="219"
                height="40"
                src={lineicon}
                alt=""
              />
              <img
                className="mr-4 py-3"
                width="219"
                height="40"
                src={formbold}
                alt=""
              />
              <img
                className="mr-4 py-3"
                width="219"
                height="40"
                src={uideck}
                alt=""
              />
            </div>
          </div>
          <div className="right">
            <img
              className="w-full  h-full object-cover p-5"
              src={heroImg}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 py-5">
          <div className="md:w-1/2 lg:w-7/12">
            <h3 className="text-2xl uppercase font-semibold text-blue-500">
              About Us
            </h3>
            <h1 className="text-4xl font-bold leading-tight py-2">
              Better design, <br /> better experience
            </h1>
            <p className="mb-6 text-gray-500 font-normal max-w-[480px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              dui ligula, malesuada vel convallis in, tincidunt ut mi Vestibulum
              sit amet.
            </p>
          </div>
          <div className="md:w-1/2 lg:w-5/12">
            <h3 className="text-3xl font-semibold mb-4">Contact With Us</h3>
            <p className="mb-6 text-gray-500 font-normal max-w-[480px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              dui ligula, malesuada vel convallis in, tincidunt ut mi.
              Vestibulum sit amet urna placerat, tempor soloa demanium testi lor
              Aliq lorem vitae semper tempor.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="text-gray-500 border rounded-full p-2 hover:bg-blue-500 hover:text-white transition">
                <Facebook size={16} />
              </div>
              <div className="text-gray-500 border rounded-full p-2 hover:bg-blue-500 hover:text-white transition">
                <Twitter size={16} />
              </div>
              <div className="text-gray-500 border rounded-full p-2 hover:bg-blue-500 hover:text-white transition">
                <Youtube size={16} />
              </div>
              <div className="text-gray-500 border rounded-full p-2 hover:bg-blue-500 hover:text-white transition">
                <Linkedin size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-8 flex flex-col md:flex-row bg-blue-950 py-12 items-end">
        <div className="w-full lg:w-8/12">
          <h5 className="uppercase text-xl text-blue-800 font-semibold">
            What We do
          </h5>
          <h1 className="text-3xl sm:text-4xl text-white font-bold leading-tight">
            We help to build clients their <br /> dream projects
          </h1>
        </div>
        <div className="w-full lg:w-4/12">
          <div className="flex justify-end">
            <a
              href="#"
              className="text-lg font-medium text-white underline uppercase hover:text-blue-800"
            >
              Explore Services
            </a>
          </div>
        </div>
      </div>
      <div className="w-full bg-blue-950 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-4/12 bg-white">
              <img className="w-full" src={serviceImg1} alt="" />
              <div className="p-8">
                <h3 className="text-xl font-bold hover:text-blue-500">
                  Website Development
                </h3>
                <p className="py-4 text-lg text-gray-700">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse
                  possimus corporis earum aut dolorem.
                </p>
                <a
                  href="#"
                  className="flex pt-6 text-gray-700 gap-2 items-center"
                >
                  View Details <ArrowRight />
                </a>
              </div>
            </div>
            <div className="w-full md:w-4/12 bg-white">
              <img className="w-full" src={serviceImg2} alt="" />
              <div className="p-8">
                <h3 className="text-xl font-bold hover:text-blue-500">
                  Website Development
                </h3>
                <p className="py-4 text-lg text-gray-700">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse
                  possimus corporis earum aut dolorem.
                </p>
                <a
                  href="#"
                  className="flex pt-6 text-gray-700 gap-2 items-center"
                >
                  View Details <ArrowRight />
                </a>
              </div>
            </div>
            <div className="w-full md:w-4/12 bg-white">
              <img className="w-full" src={serviceImg3} alt="" />
              <div className="p-8">
                <h3 className="text-xl font-bold hover:text-blue-500">
                  Website Development
                </h3>
                <p className="py-4 text-lg text-gray-700">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse
                  possimus corporis earum aut dolorem.
                </p>
                <a
                  href="#"
                  className="flex pt-6 text-gray-700 gap-2 items-center"
                >
                  View Details <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="container mx-auto px-4 py-12">
          <h5 className="text-center text-lg font-semibold text-blue-500">
            Creative Portfolio
          </h5>
          <h1 className="text-center font-bold text-3xl md:text-4xl py-4">
            Recent Works
          </h1>
          <p className="text-center text-lg text-gray-700 font-normal">
            There are many variations of passages of Lorem Ipsum available but{" "}
            <br />
            the majority have suffered alteration in some form.
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center align-center gap-6">
        {["All", "Web", "Design", "App", "Graphic", "Web Design"].map(
          (item) => (
            <a
              key={item}
              className="text-gray-700 font-semibold hover:bg-gray-300 hover:text-blue-500 tracking-normal px-4 py-2 rounded-full"
            >
              {item}
            </a>
          )
        )}
      </div>
      <div className="w-full py-12 ">
        <div className="container mx-auto px-12 xl:w-10/12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/2">
              <img src={portfolioImg1} className="w-full rounded-lg" alt="" />
              <h5 className="text-xl font-semibold py-4 hover:text-blue-500">
                Startup Landing Page
              </h5>
              <p className="text-lg text-gray-700">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut
                incidunt quam illum tempora debitis sequi dolor voluptas?
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <img src={portfolioImg2} className="w-full rounded-lg" alt="" />
              <h5 className="text-xl font-semibold py-4 hover:text-blue-500">
                Job portal landing page
              </h5>
              <p className="text-lg text-gray-700">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut
                incidunt quam illum tempora debitis sequi dolor voluptas?
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-12 mt-8">
            <div className="w-full md:w-1/2">
              <img src={portfolioImg3} className="w-full rounded-lg" alt="" />
              <h5 className="text-xl font-semibold py-4 hover:text-blue-500">
                SaaS landing page
              </h5>
              <p className="text-lg text-gray-700">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut
                incidunt quam illum tempora debitis sequi dolor voluptas?
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <img src={portfolioImg4} className="w-full rounded-lg" alt="" />
              <h5 className="text-xl font-semibold py-4 hover:text-blue-500">
                Business & corporate template
              </h5>
              <p className="text-lg text-gray-700">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut
                incidunt quam illum tempora debitis sequi dolor voluptas?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
