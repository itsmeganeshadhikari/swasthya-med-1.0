import React from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Slider, useMediaQuery } from "@mui/material";

// third-party
// import Slider from 'react-slick';

const RelatedProducts = ({ id }: { id?: string }) => {
  const theme = useTheme();
  const matchDownXl = useMediaQuery(theme.breakpoints.down("xl"));
  const matchDownLG = useMediaQuery(theme.breakpoints.down("xl"));
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  let noItems = 5;
  noItems = matchDownSM ? 1 : noItems;
  noItems = matchDownMD ? 2 : noItems;
  noItems = matchDownLG ? 3 : noItems;
  noItems = matchDownXl ? 4 : noItems;

  const settings = {
    dots: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: "0px",
    slidesToShow: noItems,
  };

  let productResult: React.ReactElement | React.ReactElement[] = <></>;

  return <Slider {...settings}>{productResult}</Slider>;
};

export default RelatedProducts;
