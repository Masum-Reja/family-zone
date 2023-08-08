import React from "react";

const Feature = () => {
  return (
    <div>
      <section className="bg-gray-100">
        <div className="w-full relative pb-10 xl:px-0 max-w-screen-xl py-8 mx-auto">
          <img
            className="absolute w-full inset-0 dark:hidden h-full object-cover object-center"
            src="https://cdn.tuk.dev/assets/templates/weCare/hero2-bg.png"
            alt="we care family"
          />

          <div className="pt-32 lg:flex items-center relative z-10 container mx-auto">
            <div className="w-full lg:w-1/2 h-full lg:pr-10 xl:pr-0">
              <img
                className="mx-auto"
                src="https://cdn.tuk.dev/assets/templates/weCare/hero2-left.png"
                alt="peop"
              />
            </div>
            <div role="contentinfo" className="w-full lg:w-1/2 h-full">
              <p tabindex="0" className="text-cyan-700 uppercase text-2xl mb-4">
                Set of products
              </p>
              <h1
                tabindex="0"
                className="text-cyan-700 text-4xl lg:text-6xl font-black mb-8"
              >
                To help you do more
              </h1>
              <p tabindex="0" className="text-gray-800  font-regular mb-8 ">
                Familyzone brings everything—traditional files, cloud content,
                and web shortcuts—together in one place. Save and access your
                files from any device, and share them with anyone. Discover what
                Familyzone can do for you—get a free account, no strings
                attached!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feature;
