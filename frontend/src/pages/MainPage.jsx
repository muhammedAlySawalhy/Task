import React from "react";
import { FaComments, FaLock, FaClock } from "react-icons/fa";

const MainPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div
        className="bg-cover bg-center h-64 flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('https://example.com/high-quality-image.jpg')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-4 rounded">
          <h1 className="text-4xl font-bold drop-shadow-lg">
            Welcome to Doctor-Patient Chat
          </h1>
        </div>
      </div>

      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold">Chat with your doctor</h2>
          <p className="mt-2 text-gray-700">
            Get in touch with your healthcare provider quickly and easily.
          </p>
        </div>

 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-4 shadow-md rounded-md text-center">
            <FaComments className="text-3xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Communication</h3>
            <p className="text-gray-700">
              Send and receive messages instantly.
            </p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md text-center">
            <FaLock className="text-3xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-700">
              Your conversations are encrypted and secure.
            </p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md text-center">
            <FaClock className="text-3xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
            <p className="text-gray-700">
              Access your doctor any time, anywhere.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
