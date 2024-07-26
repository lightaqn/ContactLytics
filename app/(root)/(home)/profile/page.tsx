"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import ContactCard from "@/components/ContactCard";
import ContactForm from "@/components/ContactForm";
import ContactDetailCard from "@/components/ContactDetailCard";
import { Search, Add } from "@/lib/svgs";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);

  const [contacts, setContacts] = useState([]);

  const [display, setDisplay] = useState([]);

  const [search, setSearch] = useState("");

  const [filtered, setFiltered] = useState([]);

  const [showContactForm, setShowContactForm] = useState(false);

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const {token }= router?.query
    if (!token) {
      router.push("/auth");
    } else {
      const data = axios
        .get(`/api/auth?token=${token}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            router.push("/auth");
            throw new Error("Token verification failed");
          }
        })
        .then((data) => {
          setUser(data.user);
          fetchContacts(data.user.userId);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const fetchContacts = (userId: any) => {
    const data = axios
      .get(`/api/contacts?userId=${userId}`)
      .then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          throw new Error("Failed to fetch contacts");
        }
      })

      .then((data) => {
        setContacts(data?.contacts);

        setLoading(false);
      })

      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignOut = async () => {
    const data = await axios
      .delete("/api/auth/")

      .then((response) => response)

      .then((data) => {
        setUser(null);

        setContacts([]);

        console.log("Sign Out successful:", data);
      })

      .catch((error) => {
        console.error("Error signin out:", error);
      });
  };

  const handleSelectContact = (contact: any) => {
    if (contact) {
      setDisplay(contact);
    } else {
      setDisplay([]);
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault();

    const filteredContacts = contacts.filter((contact) => {
      const value = String(contact[key]);
      return value.includes(search);
    });

    setFiltered(filteredContacts);
  };

  useEffect(() => {
    let timeOut: any;

    if (timeOut) {
      clearTimeout(timeOut);
    }

    timeOut = setTimeout(() => {
      handleSearch;
    }, 300);

    return () => clearTimeout(timeOut);
  }, [search]);

  return (
    <div className="flex h-full w-full items-center justify-center p-16 bg-gray-500/30 backdrop-blur-lg relative">
      {user ? (
        <>
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-gray-500 text-lg">
                Welcome{" "}
                <span className="text-green-500 ml-3 font-semibold">
                  {/* {user.email}{" "} */}
                </span>
              </h4>

              <button
                className="mx-4 outlinebutton opacity-50"
                onClick={handleSignOut}
              >
                <span className="outlinebuttonspan">Sign Out</span>
              </button>
            </div>

            <h3> Contacts </h3>
            {loading ? (
              <>{Loader}</>
            ) : (
              <>
                <div className="p-8 m-10 w-⅘ h-⅘ grid lg:grid-cols-3">
                  <div
                    className={`lg:col-span-1 space-y-2 p-3 items-center justify-start overflow-y-scroll scrollbar-hide block ${
                      display && "hidden"
                    } `}
                  >
                    {/* //search content  */}

                    <form
                      // onSubmit={handleSearch}
                      className="flex w-full bg-gray-400/30 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-white p-3 rounded-2xl text-2xl text-gray-700 my-4 border-2 border-gray-500 sticky"
                    >
                      <Search />

                      <input
                        value={search}
                        onChange={(e: any) => setSearch(e.target.value)}
                        className="border-none bg-transparent flex-grow h-full focus:outline-none"
                        placeholder="... Search Contacts"
                      />
                    </form>
                    {filtered.length > 0
                      ? filtered.map((contact: any) => (
                          <ContactCard
                            key={contact?.phoneNumber}
                            firstName={contact?.firstName}
                            phoneNumber={contact?.phoneNumber}
                            thumbnail={contact?.thumbnail}
                            onClick={handleSelectContact(contact)}
                            isActive={
                              display?.phoneNumber === contact?.phoneNumber
                            }
                          />
                        ))
                      : contacts
                          .slice()
                          .sort((a: any, b: any) =>
                            a.firstName.localeCompare(b.firstName)
                          )
                          .map((contact: any) => (
                            <ContactCard
                              key={contact.phoneNumber}
                              firstName={contact.firstName}
                              phoneNumber={contact.phoneNumber}
                              thumbnail={contact.thumbnail}
                              onClick={handleSelectContact(contact)}
                              isActive={
                                display.phoneNumber === contact.phoneNumber
                              }
                            />
                          ))}
                  </div>
                  <div
                    className={`lg:col-span-2 hidden ${display && "block"} `}
                  >
                    <ContactDetailCard
                      key={display.phoneNumber}
                      firstName={display.firstName}
                      lastName={display.lastName}
                      phoneNumber={display.phoneNumber}
                      thumbnail={display.thumbnail}
                      email={display.email}
                      gender={display.gender}
                      contactId={display.contactId}
                      userId={user.userId === display.userId && user.userId}
                      onDelete={handleSelectContact}
                    />
                  </div>
                </div>
                //add contact button
                <div
                  onClick={() => setShowContactForm(true)}
                  className="absolute flex z-20 bottom-20 right-20 w-12 h-12 rounded-full p-4 text-2xl font-extrabold bg-green-500 text-white hover:opacity-50 hover:transition hover:transform hover:duration-200 hover:scale-95 hover:ease-in shadow-md hover:shadow-lg ring-2 ring-green-200"
                >
                  <Add />
                </div>
                {showContactForm && (
                  <ContactForm
                    userId={user.userId}
                    setShowContactForm={setShowContactForm}
                  />
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <>{Loader}</>
      )}
    </div>
  );
}
