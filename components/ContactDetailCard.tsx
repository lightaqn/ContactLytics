import Image from "next/image";
import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import { ArrowBack, Phone, TextIcon, Email } from "@/lib/svgs";

import axios from "axios";

const ContactDetailCard = ({
  onDelete,
  phoneNumber,
  firstName,
  lastName,
  thumbnail,
  gender,
  email,
  onClick,
  display,
  isActive,
  userId,
  contactId,
}: any) => {
  const [isEditing, setIsEditing] = useState(false);

  const [editContactData, setEditContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "male",
    thumbnail: null,
    phoneNumber: "",
  });

  const [deleteWarn, setDeleteWarn] = useState(false);

  const handleUpdateContact = async (editedData) => {
    const editedContactInfo = { ...contactData, userId, contactId };
    const data = await axios
      .put(`/api/contacts`, { editedContactInfo })
      .then((response) => response.json())
      .then((data) => {
        setEditContactData(data);
        console.log("Updated contact data:", data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating contact data:", error);
      });
    setError(error);
  };

  const handleDelete = async () => {
    onDelete();
    const data = await axios
      .delete("/api/contacts/", { userId })
      .then((response) => response.json())
      .then((data) => {
        console.log("Deleted contact data:", data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating contact data:", error);
      });
  };

  return (
    <div className="h-full w-full relative">
      {isEditing ? (
        <ContactForm
          contactData={editContactData}
          onSubmit={handleUpdateContact}
        />
      ) : (
        <>
          <div className="h-full w-full">
            <Image
              src={
                editContactData.thumbnail.length
                  ? editContactData.thumbnail
                  : thumbnail
              }
              layout="fill"
              objectFit="cover"
              className=""
              alt=""
            />
          </div>

          <div className="h-full w-full bg-sky-200 absolute bg-gray-300/30 backdrop-blur-lg">
            <div className="bg-transparent h-1/4">
              <div className="bg-white rounded-full p-5 h-[30px] w-[30px] top-20">
                <ArrowBack />
              </div>
            </div>
            <div className="bg-white rounded-t-3xl bottom-0 left-0 right-0 h-¾ relative">
              <div
                className={`flex items-center justify-center text-center -mt-30 z-10 absolute -top-[40px] h-[80px] w-[80px] ${
                  (!thumbnail || !editContactData.thumbnail) &&
                  firstName &&
                  "bg-black mr-3 text-3xl p-5"
                } `}
              >
                {thumbnail || editContactData.thumbnail ? (
                  <>
                    (
                    <Image
                      className="w-full h-full rounded-5xl ring-2 ring-purple-500"
                      layout="fill"
                      src={
                        editContactData.thumbnail.length
                          ? editContactData.thumbnail
                          : thumbnail
                      }
                      alt=""
                      objectFit="contain"
                    />
                    )
                  </>
                ) : (
                  <p className="uppercase text-center text-white">
                    {editContactData.firstName.length
                      ? editContactData.firstName[0]
                      : firstName[0]}
                  </p>
                )}
              </div>
              <div className="flex items-center text-center justify-center my-6 space-y-2">
                <h2 className="text-black text-2xl font-semibold tracking-wide space-x-1 flex">
                  {" "}
                  <span>
                    {editContactData.firstName.length
                      ? editContactData.firstName
                      : firstName}
                  </span>
                  <span>
                    {editContactData.lastName.length
                      ? editContactData.lastName
                      : lastName}
                  </span>
                </h2>

                <h4 className="text-gray-700 text-3xl font-bold text-center">
                  {editContactData.gender.length
                    ? editContactData.gender[0]
                    : gender[0]}
                </h4>
              </div>
              <div
                onClick={() => setIsEditing(true)}
                className="flex p-6 space-x-4 bg-gray-200 shadow-md hover:shadow-lg"
              >
                <Edit />

                <p className="ml-3">Edit Contact</p>
              </div>
              <div className="my-4 items-center mx-4 mt-8 space-y-6">
                <div className="grid grid-cols-7 border-b-2 border-gray-500">
                  <div className="col-span-1">
                    <div className="rounded-full p-3 shadow-md text-white bg-green-500 hover:focus:active:shadow-lg h-8 w-8">
                      <Phone />
                    </div>
                  </div>
                  <div className="col-span-4 items-center justify-start">
                    <p className="text-xl text-black flex flex-col">
                      <span className="text-gray-600">Mobile</span>

                      <span className="font-bold">
                        {editContactData.phoneNumber.length
                          ? editContactData.phoneNumber
                          : phoneNumber}
                      </span>
                    </p>
                  </div>

                  <div className="col-span-2 space-x-2">
                    <div className="rounded-full p-3 shadow-md hover:bg-gray-200 hover:focus:active:shadow-lg h-8 w-8 ">
                      <Phone />
                    </div>

                    <div className="rounded-full p-3 shadow-md hover:bg-gray-200 hover:focus:active:shadow-lg h-8 w-8 ">
                      <TextIcon />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-7 border-b-2 border-gray-500">
                  <div className="col-span-1">
                    <div className="rounded-full p-3 shadow-md text-white bg-red-500 hover:focus:active:shadow-lg h-8 w-8">
                      <Email />
                    </div>
                  </div>
                  <div className="col-span-4 items-center justify-start">
                    <p className="text-xl text-black flex flex-col">
                      <span className="text-gray-600">Email</span>

                      <span className="font-bold">
                        {editContactData.email.length
                          ? editContactData.email
                          : email}
                      </span>
                    </p>
                  </div>
                  <div className="col-span-2 space-x-2">
                    <div className="hidden rounded-full p-3 shadow-md hover:bg-gray-200 hover:focus:active:shadow-lg h-8 w-8 ">
                      <Phone />
                    </div>

                    <div
                      className="rounded-full p-3 shadow-md hover:bg-gray-200

hover:focus:active:shadow-lg h-8 w-8 "
                    >
                      <TextIcon />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`flex relative my-4 items-center justify-center ${
                  deleteWarn &&
                  "h-screen w-screen bg-gray-700/40 backdrop-blur-lg"
                } `}
              >
                <button
                  onClick={() => setDeleteWarn(true)}
                  className={`buttondelete ${deleteWarn && "hidden"} `}
                >
                  delete
                </button>

                {deleteWarn && (
                  <div className="flex flex-col absolute bottom-20 w-3/5 mx-auto h-[10vh] z-20 rounded-3xl focus:ring-2 focus:ring-purple-200 space-y-4 p-4 bg-gray-700 text-xl">
                    <h3 className="text-black">Delete {phoneNumber}?</h3>

                    <div className="flex m-4 my-6 uppercase font-bold tracking-wide bg-transparent items-center justify-center space-x-2">
                      <span
                        className="text-blue-500"
                        onClick={() => setDeleteWarn(false)}
                      >
                        Cancel
                      </span>

                      <span
                        onClick={handleDelete}
                        className="border-l-4 border-gray-200 text-red-500"
                      >
                        Delete
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactDetailCard;
