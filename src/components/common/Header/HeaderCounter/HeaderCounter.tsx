import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./HeaderBasket.module.css";
const { totlaNum, container, popupAnimate, iconWrapper } = styles;

type THeaderCounterProps = {
  totalQuntity: number;
  to: string;
  HederIcon: React.ReactNode;
  title: string;
};

const HeaderCounter = ({
  totalQuntity,
  to,
  HederIcon,
  title,
}: THeaderCounterProps) => {
  const navigate = useNavigate();

  const [isAniamte, setIsAnimate] = useState(false);
  
  const quantitySyles = `${totlaNum} ${isAniamte ? popupAnimate : ""}`;

  useEffect(() => {
    if (!totalQuntity) return;

    setIsAnimate(true);

    const debounc = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounc);
  }, [totalQuntity]);

  return (
    <div className={container} onClick={() => navigate(to)}>
      <div className={iconWrapper}>
        {HederIcon}
        {totalQuntity > 0 && (
          <div className={quantitySyles}>{totalQuntity}</div>
        )}
      </div>
      <h1>{title}</h1>
    </div>
  );
};

export default HeaderCounter;
