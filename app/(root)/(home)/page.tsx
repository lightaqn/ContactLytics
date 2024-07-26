"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { bottomItems, images } from "@/lib/constants";

export default function Home() {
  const subscriberTarget = 1000000;

  // const currentSubscribers = users?.length || 540000;
  const currentSubscribers = 540000;
  const dynamicLineWidth = (currentSubscribers / subscriberTarget) * 100;
  const router = useRouter();

  return (
    <main className="max-w-8xl mx-auto w-screen min-h-screen">
      <header className="h-½ p-6 bg-gradient-to-b min-h-[60vh] from-purple-800 to-blue-500 mt-0">
        <nav className="flex items-center mx-3 rounded-2xl shadow-lg justify-between text-purple-500 p-5 bg-gray-400/30 backdrop-blur-lg h-[10vh] ">
          <h1 className="text-2xl font-extrabold tracking-wide hover:text-purple-200">
            Contact<span className="opacity-80 text-purple-200">Lytics</span>
          </h1>

          <ol className="hidden md:inline-flex justify-around items-center text-xl text-center space-x-4">
            <li className="p-3 hover:text-purple-200 hover:cursor-pointer hover:transition hover:transform hover:scale-110 hover:duration-300">
              Features
            </li>

            <li className="p-3 hover:text-purple-200 hover:cursor-pointer hover:transition hover:transform hover:scale-110 hover:duration-300">
              Blog
            </li>

            <li
              className="p-3 border-2 w-28 focus:ring-2 focus:ring-purple border-white rounded-2xl shadow-lg cursor-pointer hover:text-purple-200"
              onClick={() => router.push("/auth")}
            >
              Try it
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2">
          <div className="lg:col-span-1">
            <div className="">
              {/* <Image
                src="/images.jpeg"
                className=""
                alt=""
                objectFit="contain"
                layout="responsive"
                width={70}
                height={70}
              /> */}
            </div>

            <div className=""></div>
          </div>

          <div className="lg:col-span-1 p-10 flex flex-col items-center justify-start">
            <div className="gap-y-6 flex flex-col text-purple-200 mb-10">
              <h3 className="uppercase leading-0 tracking-wider font-poppins text-6xl font-extrabold">
                Managing your Contacts
              </h3>

              <h4 className="uppercase font-bold text-4xl">
                has never been easier
              </h4>

              <p className="text-2xl space-y-4 tracking-wide ">
                <span>
                  Stay in the groove, make your moves, and never lose track with
                  our phone contacts app{" "}
                </span>

                <span>
                  From A to Z, we keep your contacts sleek and easy. Swipe,
                  connect, and vibe with your tribe!
                </span>
              </p>
            </div>

            <div className="space-y-2 flex flex-col my-10 items-center justify-start">
              <div className="flex items-center justify-between w-full gap-x-32">
                <p className="flex flex-col items-center text-start">
                  <span className="font-semibold text-lg text-white text-start hover:text-red-500">
                    {currentSubscribers} Users
                  </span>

                  <span className="font-normal text-md text-gray-300">
                    are building ContactLytics together
                  </span>
                </p>

                <p className="flex flex-col justify-start items-center text-start">
                  <span className="font-semibold text-lg text-white">
                    1M Users
                  </span>

                  <span className="font-normal text-md text-gray-300">
                    Estimated initial target
                  </span>
                </p>
              </div>
              {/* <div className="h-5 w-full relative">
                  <div className="absolute h-full w-full bg-gray-500 rounded-full shadow-lg border-2 border-sky-500" />

                  <div
                    className="h-full w-0 bg-sky-200 z-10 absolute rounded-full shadow-lg"
                    style={{ width: `${dynamicLineWidth}%` }}
                  />
                </div> */}

              {/* <div className="flex items-center justify-start -space-x-2 mt-4">
                {images.length > 0 &&
                  images.slice(0, 5).map((img, index) => (
                    <div
                      key={index}
                      className="h-16 w-16 flex items-center justify-center my-6"
                    >
                      <Image
                        src={img}
                        className="inline-block rounded-full ring-2 ring-white h-12 w-12"
                        width={70}
                        height={70}
                        alt=""
                        layout="responsive"
                        objectFit="contain"
                      />
                    </div>
                  ))}
              </div> */}
            </div>
          </div>
        </div>
      </header>

      <section className="w-full h-[50vh] ">
        <div className="mt-10 space-y-2 py-10 flex flex-col items-center justify-center">
          <legend className="text-3xl tracking-tight font-bold text-black">
            {" "}
            Our Unique Selling Points
          </legend>

          <p className="text-gray-500 text-lg">
            we stand head and shoulders above other because
          </p>
        </div>

        <div className="grid lg:grid-cols-3">
          {bottomItems.map(({ id, image, caption, description }: any) => (
            <div
              key={id}
              className="flex border-2 border-black flex-col h-[450px] items-center justify-center space-y-12 shadow-md hover:shadow-lg border-none rounded-2xl p-8 hover:bg-gray-100 hover:ease-in hover:transform hover:transition hover:duration-300 mx-4"
            >
              <div className="flex h-24 w-24">
                <Image
                  src={image}
                  className="h-full w-full"
                  alt={caption}
                  objectFit="contain"
                  layout="responsive"
                  width={70}
                  height={70}
                />{" "}
              </div>

              <div className="my-5 flex flex-col items-center justify-center mb-6">
                <strong className="text-3xl tracking-wider space-y-2 text-black">
                  {caption}{" "}
                </strong>

                <small className="text-xl text-gray-500 font-light">
                  {description}{" "}
                </small>
              </div>

              <button className="text-lg text-purple-500 font-semibold w-⅗ outlinebutton">
                <span className="outlinebuttonspan">Learn More</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
