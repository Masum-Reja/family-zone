import React from "react";
import Footer from "../common/Footer";
import Tab from "../components/Tab/Tab";

export default function About() {
  return (
    <>
      <div>
        <div className=" px-6 py-24 max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-semibold leading-10 text-gray-800 text-center">
            About Family Zone
          </h1>
          <div className="text-gray-700 py-5 flex justify-center items-center gap-4 lg:flex-row md:flex-row flex-col">
            <h1 className="">
              Welcome to Familyzone - the ultimate solution for families looking
              to stay connected and organized. We understand that modern
              families are often spread across different locations, devices, and
              platforms. That's why we've created a platform that brings
              everything together in one place, making it easy for families to
              stay connected, collaborate, and share information. At Familyzone,
              we believe that technology should be used to bring people closer
              together, not drive them apart. That's why we've designed our
              platform with family values in mind. We want to help families stay
              organized and communicate effectively, without compromising their
              privacy or security. With Familyzone, you can access your files,
              cloud content, and web shortcuts from any device, no matter where
              you are. You can easily share files with other family members and
              collaborate on projects, using our secure platform to protect your
              personal information. And with our chat and note-sharing features,
              you can stay connected and up-to-date with your family, no matter
              where life takes you. Our goal at Familyzone is to provide
              families with a simple, effective, and secure way to stay
              connected and organized. Whether you're a busy parent trying to
              keep track of your family's schedule or a teenager looking to
              collaborate with your siblings on a school project, we've got you
              covered. So why not give Familyzone a try? Sign up for a free
              account today and discover how our platform can help you and your
              family stay connected, collaborate, and thrive in today's
              fast-paced world.
            </h1>

            <img
              src="https://res.cloudinary.com/dzkzgswqp/image/upload/v1678030216/yibyrg8sauw20qf8xiad.jpg"
              className="rounded"
              alt=""
            />
          </div>
          <div>
            <h1 className="text-gray-700">
              Familyzone is an all-in-one platform designed to help families
              stay organized, communicate effectively, and collaborate
              seamlessly. With the increasing complexity of modern life, many
              families struggle to stay on top of everything, from schedules and
              appointments to important documents and files. Familyzone helps to
              solve this problem by providing a central hub where all of your
              family's information can be stored and accessed. One of the key
              features of Familyzone is its ability to bring together
              traditional files, cloud content, and web shortcuts in one place.
              This means that you
            </h1>
            <img
              src="https://res.cloudinary.com/dzkzgswqp/image/upload/v1678030270/zgp5kw5gtwerlzrft7lo.jpg"
              alt=""
              className="rounded mt-5"
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
