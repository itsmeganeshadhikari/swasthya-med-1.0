// material-ui
import { useTheme, styled } from "@mui/material/styles";
import { Box, Container, Grid, Typography } from "@mui/material";

// third party
import { motion } from "framer-motion";

// project imports
// project imports
import dashboard from "../../../assets/images/e-commerce/swasthyaM.png";
import { gridSpacing } from "../../../store/constant";
// styles
const HeaderImage = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  borderRadius: "1px",
  transform: "scale(1.3)",
  transformOrigin: theme.direction === "rtl" ? "100% 50%" : "0 50%",
  [theme.breakpoints.down("lg")]: {
    transform: "scale(1.2)",
  },
}));

const HeaderPage = () => {
  const theme = useTheme();

  return (
    <Container>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={gridSpacing}
        sx={{ mt: { xs: 10, sm: 6, md: 18.75 }, mb: { xs: 2.5, md: 10 } }}
      >
        <Grid item xs={12} md={10}>
          <Grid
            container
            spacing={gridSpacing}
            sx={{
              pr: 10,
              [theme.breakpoints.down("lg")]: { pr: 0, textAlign: "center" },
            }}
          >
            <Grid item xs={12} md={5}>
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, translateY: 550 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 30,
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "1.25rem", sm: "2rem", md: "3rem" },
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
                </motion.div>
              </Grid>
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, translateY: 550 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 30,
                    delay: 0.2,
                  }}
                >
                  <Typography
                    variant="h4"
                    component="div"
                    color="inherit"
                    sx={{
                      fontSize: { xs: "1rem", md: "1.125rem" },
                      fontWeight: 400,
                      lineHeight: 1.4,
                    }}
                  >
                    All products displayed on Swasthya Med are 100% genuine and
                    reliable.
                  </Typography>
                </motion.div>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Box sx={{ mt: 2, pb: 4, ml: 20 }}>
                <HeaderImage src={dashboard} alt="Swasthya" />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeaderPage;
