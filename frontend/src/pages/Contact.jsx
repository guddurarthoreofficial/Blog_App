import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-toastify';


const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "5485c3fd-834d-4e9f-ab4d-f61c09438ac4",
      name: data.name,
      email: data.email,
      message: data.message
    }
    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Message sent successfully!");
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 md:flex w-full max-w-4xl">

        {/* Contact Form */}
        <div className="md:w-1/2 pr-6 mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Contact Us</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">This field is required</p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">This field is required</p>
              )}
            </div>
            <div className="mb-4">
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                {...register("message", { required: true })}
              ></textarea>
              {errors.message && (
                <p className="text-sm text-red-500 mt-1">This field is required</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="md:w-1/2 pl-6 border-t md:border-t-0 md:border-l border-gray-300">
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center">
              <FaPhoneAlt className="text-red-500 mr-3" />
              <span>+91 9523605578</span>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="text-purple-600 mr-3" />
              <span>guddurathoreOfficial@gmail.com</span>
            </li>
            <li className="flex items-center">
              <FaMapMarkerAlt className="text-green-600 mr-3" />
              <span>Bettiah, West Champaran, India</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Contact;
