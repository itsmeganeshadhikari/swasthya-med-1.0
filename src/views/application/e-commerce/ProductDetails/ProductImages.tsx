import { useSelector } from "react-redux";
// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, CardMedia, Grid, useMediaQuery } from "@mui/material";

// project import
import MainCard from "../../../../ui-component/cards/MainCard";
import Avatar from "../../../../ui-component/extended/Avatar";
import { Products } from "../types";
import { DefaultRootStateProps } from "../../../../types";
import { gridSpacing } from "../../../../store/constant";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
// third-party
import Slider from "react-slick";
// import Carousel, { Modal, ModalGateway } from "react-images";
import { Key, useState } from "react";
// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const ProductImages = ({ product }: { product: Products }) => {
  const theme = useTheme();
  const customization = useSelector(
    (state: DefaultRootStateProps) => state.customization
  );

  const product1 = [...product.image]
  console.log(product1);

  const matchDownLG = useMediaQuery(theme.breakpoints.up("lg"));
  const initialImage = product.image[0].url;

  const [selected, setSelected] = useState(initialImage);
  const [modal, setModal] = useState(false);
  const onOpenModal = () => setModal(true);
  const onCloseModal = () => setModal(false);
  const lgNo = matchDownLG ? 4 : 3;

  const settings = {
    dots: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: "0px",
    slidesToShow: product.image.length > 2 ? lgNo : product.image.length,
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={gridSpacing}
      >
        <Grid item xs={12}>
          <MainCard content={false} sx={{ m: "0 auto" }}>
            <CardMedia
              onClick={() => onOpenModal()}
              component="img"
              image={selected}
              sx={{
                borderRadius: `${customization.borderRadius}px`,
                overflow: "hidden",
                cursor: "zoom-in",
              }}
            />
          </MainCard>
        </Grid>
        <Grid item xs={11} sm={7} md={9} lg={10} xl={8}>
          <Slider {...settings}>
            {product1.map((item: any, index: Key | null | undefined) => (
              <Box key={index} onClick={() => setSelected(item?.url)} sx={{ p: 1 }}>
                <Avatar
                  outline={selected == item}
                  size={matchDownLG ? "lg" : "md"}
                  color="primary"
                  src={item?.url}
                  variant="rounded"
                  sx={{ m: "0 auto", cursor: "pointer" }}
                />
              </Box>
            ))}
          </Slider>
        </Grid>
      </Grid>
      {modal ? (
        <Modal open={modal} onClose={onCloseModal} center>
          <CardMedia
            component="img"
            image={selected}
          />
        </Modal>
      ) : null}
    </>
  );
};

export default ProductImages;
