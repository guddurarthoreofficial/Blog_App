const About = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
        <p className="text-gray-600 text-lg mb-6">
          Welcome to <span className="text-blue-600 font-semibold">CilliBlog</span>, your go-to platform for insightful blogs, diverse perspectives, and creative storytelling. We are passionate about bringing valuable content to our readers while empowering creators to share their voice.
        </p>

        <div className="border-t border-gray-200 my-10"></div>

        <h3 className="text-2xl font-semibold text-gray-700 mb-3">Our Mission</h3>
        <p className="text-gray-600 mb-6">
          At CilliBlog, our mission is to build a community-driven blog platform that inspires, educates, and informs. We believe in the power of stories — whether it's tech tutorials, personal experiences, or industry insights.
        </p>

        <div className="border-t border-gray-200 my-10"></div>

        <h3 className="text-2xl font-semibold text-gray-700 mb-3">Meet the Team</h3>
        <p className="text-gray-600 mb-6">
          We’re a team of developers, writers, and designers who came together with one goal — to make blogging easier and more rewarding. CilliBlog is built with the latest technologies (MERN stack) to ensure performance, security, and user-friendly experience.
        </p>

        <div className="mt-8">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CilliBlog. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
