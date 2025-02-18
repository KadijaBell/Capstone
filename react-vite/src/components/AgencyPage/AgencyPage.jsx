import { useState } from "react";
import { motion } from "framer-motion";

const AgencyPage = () => {
  // State to hold our form data.
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    agencyName: "",
    agencyType: "",
    agencyWebsite: "",
    businessEmail: "",
    businessPhone: "",
    businessAddress: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add form submission logic here (e.g., API call)
  };

  // Framer Motion animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-midnight">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
        <motion.div
          className="bg-ivory dark:bg-midnight p-12 rounded-xl shadow-lg"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <h1 className="text-3xl font-semibold text-charcoal dark:text-ivory mb-6">
            Agency Registration
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Representative Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-charcoal dark:text-ivory mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="jobTitle"
                  className="block text-charcoal dark:text-ivory mb-2"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Your role in the agency"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-charcoal dark:text-ivory mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@agency.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-charcoal dark:text-ivory mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  required
                />
              </div>
            </div>

            {/* Agency Information */}
            <h2 className="text-2xl font-semibold text-charcoal dark:text-ivory mt-8">
              Agency Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label
                  htmlFor="agencyName"
                  className="block text-charcoal dark:text-ivory mb-2"
                >
                  Agency Name
                </label>
                <input
                  type="text"
                  id="agencyName"
                  name="agencyName"
                  value={formData.agencyName}
                  onChange={handleChange}
                  placeholder="Agency name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="agencyType"
                  className="block text-charcoal dark:text-ivory mb-2"
                >
                  Agency Type
                </label>
                <input
                  type="text"
                  id="agencyType"
                  name="agencyType"
                  value={formData.agencyType}
                  onChange={handleChange}
                  placeholder="e.g., Entertainment, Talent, etc."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="agencyWebsite"
                  className="block text-charcoal dark:text-ivory mb-2"
                >
                  Agency Website
                </label>
                <input
                  type="url"
                  id="agencyWebsite"
                  name="agencyWebsite"
                  value={formData.agencyWebsite}
                  onChange={handleChange}
                  placeholder="https://agency.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                />
              </div>
              <div>
                <label
                  htmlFor="businessEmail"
                  className="block text-charcoal dark:text-ivory mb-2"
                >
                  Business Email
                </label>
                <input
                  type="email"
                  id="businessEmail"
                  name="businessEmail"
                  value={formData.businessEmail}
                  onChange={handleChange}
                  placeholder="contact@agency.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="businessPhone"
                  className="block text-charcoal dark:text-ivory mb-2"
                >
                  Business Phone
                </label>
                <input
                  type="tel"
                  id="businessPhone"
                  name="businessPhone"
                  value={formData.businessPhone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                />
              </div>
              <div>
                <label
                  htmlFor="businessAddress"
                  className="block text-charcoal dark:text-ivory mb-2"
                >
                  Business Address
                </label>
                <input
                  type="text"
                  id="businessAddress"
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  placeholder="123 Agency Street, City, Country"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gold text-black px-6 py-2 rounded-lg transition duration-300 ease-linear hover:bg-blush hover:text-black"
              >
                Submit
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AgencyPage;
