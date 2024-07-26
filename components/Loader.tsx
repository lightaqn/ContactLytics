import Image from "next/image";

export default function Loader() {
  <div className="flex w-full h-full p-40 bg-gray-700/40 backdrop-blur-lg">
    <Image
      src="/assets/loaderImage.jpg"
      className="w-¼ h-¼ items-center justify-center animate-spin m-20 ring-4 ring-yellow-500 shadow-xl"
      alt=""
      layout="responsive"
      objectFit="contain"
      width={80}
      height={80}
    />
  </div>;
}
