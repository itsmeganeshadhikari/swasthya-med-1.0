// material-ui
import { useTheme, styled } from "@mui/material/styles";
import { Container, Grid, Link, Typography } from "@mui/material";

// project imports
import { gridSpacing } from "../../../store/constant";

// assets
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

import logo from "../../../assets/images/logoSw.png";

// styles
const FooterWrapper = styled("div")(({ theme }) => ({
  padding: "35px 0",
  color: "#fff",
  background: "rgb(216 216 216)",
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));

const FooterLink = styled(Link)({
  color: "purple",
  display: "inline-flex",
  alignItems: "center",
  textDecoration: "none !important",
  opacity: "0.8",
  "& svg": {
    fontsize: "1.125rem",
    marginRight: 8,
  },
  "&:hover": {
    opacity: "1",
  },
});

const FooterSubWrapper = styled("div")(({ theme }) => ({
  padding: "20px 0",
  color: "white",
  backgroundColor: "rgb(216 216 216)",
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));

// ==============================|| LANDING - FOOTER PAGE ||============================== //

const FooterPage = () => {
  const theme = useTheme();
  return (
    <>
      <FooterWrapper>
        <Container>
          <Grid container alignItems="center" spacing={gridSpacing}>
            <Grid item xs={12} sm={4}>
              <img src={logo} alt="SwasthyaMed" width="100" />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid
                container
                alignItems="center"
                spacing={2}
                sx={{
                  justifyContent: "flex-end",
                  [theme.breakpoints.down("md")]: { justifyContent: "center" },
                }}
              >
                <Grid item>
                  <FooterLink
                    href="https://www.facebook.com/profile.php?id=61556518389128"
                    target="_blank"
                    underline="hover"
                  >
                    <InstagramIcon />
                    Blog
                  </FooterLink>
                </Grid>
                <Grid item>
                  <FooterLink
                    href="https://www.facebook.com/profile.php?id=61556518389128"
                    target="_blank"
                    underline="hover"
                  >
                    <FacebookIcon />
                    Facebook
                  </FooterLink>
                </Grid>
                <Grid item>
                  <FooterLink
                    href="https://www.facebook.com/profile.php?id=61556518389128"
                    target="_blank"
                    underline="hover"
                  >
                    <TwitterIcon />
                    Twitter
                  </FooterLink>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </FooterWrapper>
      <FooterSubWrapper>
        <Container>
          <Typography variant="subtitle2" component="div" color="purple">
            &#169; Swasthya MED
          </Typography>
        </Container>
      </FooterSubWrapper>
    </>
  );
};

export default FooterPage;
