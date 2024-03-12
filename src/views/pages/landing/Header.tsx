// material-ui
import { useTheme, styled } from "@mui/material/styles";
// project imports
import dashboard from "../../../assets/images/e-commerce/smart.jpeg";
import { Box, Container, Grid, Typography } from "@mui/material";
import dashboard1 from "../../../assets/images/e-commerce/smartnep.jpg";
import dashboard2 from "../../../assets/images/e-commerce/smartd.jpeg";
import { gridSpacing } from "../../../store/constant";

// styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './image.css'

var settings = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const HeaderImage = styled("img")(({ }) => ({
  height: '200px',
  width: "100%",
}));

const HeaderPage = () => {
  const theme = useTheme();
  return (
    <Container>
      <Grid
        container
        md={12}
        alignItems="center"
        justifyContent="space-between"
        spacing={gridSpacing}
        sx={{ mt: { xs: 3, sm: 3, md: 11 }, mb: { xs: 2.5, md: 1 }, boxShadow: '3px 2px 2px 3px red', zIndex: 1, backgroundColor: 'whitesmoke' }}
      >
        <Grid item xs={3}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.25rem", sm: "2rem", md: "2rem" },
              fontWeight: 900,
              lineHeight: 1.2,
            }}
          >
            Online Medicine
            <Box
              component="span"
              sx={{ ml: 2, color: theme.palette.primary.main }}
            >
              Swasthya Med
            </Box>
          </Typography>
        </Grid>
        <Grid
          xs={12}
          md={8}
          sx={{ borderLeft: '2px solid red' }}
        >
          <Slider {...settings}>
            <div>
              <HeaderImage src={dashboard} alt="Swasthya" />
            </div>
            <div>
              <HeaderImage src={dashboard1} alt="Swasthya" />
            </div>
            <div>
              <HeaderImage src={dashboard2} alt="Swasthya" />
            </div>
          </Slider>
        </Grid>
      </Grid>

    </Container>
  );
};

export default HeaderPage;
