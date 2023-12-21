import React, { useEffect, useState } from "react";

type Props = {};

const ButtonTheme = (props: Props) => {
  const [isDark, setIsDark] = useState(false);
  const changeMode = () => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    changeMode();
  }, [isDark]);
  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      className="absolute top-[16px] right-[16px] py-[10px] px-[16px] dark:bg-[#050833] rounded-md font-semibold text-md w-[120px] bg-[#599BF6] text-black dark:text-white">
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ButtonTheme;
