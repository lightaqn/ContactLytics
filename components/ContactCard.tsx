import Image from "next/image";

const ContactCard = ({
  phoneNumber,
  thumbnail,
  firstName,
  onClick,
  display,
  isActive,
}: any) => {
  return (
    <div
      key={phoneNumber}
      onClick={onClick}
      className={`grid grid-cols-4 w-full ${
        isActive &&
        "active:border-l-4 active:ease-in active:transition active:duration-200 active:transform active:scale-95 focus:ring-1 focus-ring-white shadow-md hover:shadow-lg"
      } `}
    >
      <div className="col-span-1 rounded-full uppercase text-center text-white bg-black mr-3 text-xl p-3">
        {thumbnail ? (
          <>
            <Image
              src={thumbnail}
              className="w-full h-full rounded-full focus:ring-2 focus:ring-purple-500"
              alt=""
              layout="responsive"
              objectFit="contain"
            />
          </>
        ) : (
          <p>{firstName[0]} </p>
        )}
      </div>

      <div className="cols-span-3 text-lg text-center text-gray-500 ">
        {firstName.length ? firstName : phoneNumber}
      </div>
    </div>
  );
};

export default ContactCard;
