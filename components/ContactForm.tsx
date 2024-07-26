import { useState } from "react";
import { Upload } from "@/lib/svgs";
import axios from "axios";

const ContactForm = ({ userId, onSubmit, setShowContactForm }: any) => {
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "male",
    thumbnail: null,
    phoneNumber: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setContactData({ ...contactData, [name]: value });
  };

  const handleThumbnail = (e: any) => {
    const thumbnail = e.target.files[0];

    setContactData({ ...contactData, thumbnail });
  };

  const handleSaveContact = async (e: any) => {
    const contactInfo = { ...contactData, userId };
    const data = await axios
      .post("/api/ contacts/", contactInfo)
      .then((res) => res.json());

    onSubmit(contactInfo);

    setShowContactForm(false);
  };

  return (
    <div className="absolute z-30 flex top-0 bottom-0 left-0 right-0 h-screen w-screen bg-gray-600/50 backdrop-blur-lg p-10 items-center justify-center">
      <div className="flex flex-col space-y-4 h-⅘ w-⅘ items-center justify-center bg-white m-10">
        <legend>Add New Contact</legend>

        <>
          <form
            onSubmit={handleSaveContact}
            className="flex flex-col space-y-4 items-center justify-start"
          >
            <div className="relative z-0">
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="inputform"
                value={contactData.firstName}
                onChange={handleChange}
                placeholder=" "
              />

              <label htmlFor="firstName" className="labelform">
                First Name
              </label>
            </div>

            <div className="relative z-0">
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="inputform"
                value={contactData.lastName}
                onChange={handleChange}
                placeholder=" "
              />

              <label htmlFor="lastName" className="labelform">
                Last Name
              </label>
            </div>

            <div className="relative z-0">
              <input
                type="text"
                id="email"
                name="email"
                className="inputform"
                value={contactData.email}
                onChange={handleChange}
                placeholder=" "
              />

              <label htmlFor="email" className="labelform">
                Email
              </label>
            </div>

            <div className="relative z-0">
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="inputform"
                value={contactData.phoneNumber}
                onChange={handleChange}
                placeholder=" "
              />

              <label htmlFor="phoneNumber" className="labelform">
                Phone
              </label>
            </div>

            <div>
              <label className="sr-only">Gender</label>

              <select
                id="gender"
                className="formselect"
                name="gender"
                value={contactData.gender}
                onChange={handleChange}
              >
                <option selected>Choose a gender</option>

                <option value="male">Male</option>

                <option value="female">Female</option>

                <option value="null">Rather not say</option>
              </select>
            </div>

            <div className="flex items-center justify-center w-full">
              <label className="uploadlabel">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload />

                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>

                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>

                <input
                  id="thumbnail"
                  type="file"
                  className="hidden"
                  name="thumbnail"
                  value={contactData.thumbnail}
                  onChange={handleThumbnail}
                />
              </label>
            </div>

            <button
              type="submit"
              onClick={handleSaveContact}
              className="filledbutton w-full"
            >
              Save
            </button>
          </form>
        </>
      </div>
    </div>
  );
};

export default ContactForm;
