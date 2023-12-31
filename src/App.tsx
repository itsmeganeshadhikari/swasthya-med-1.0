import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import themes from "./themes";
import { DefaultRootStateProps } from "./types";
import Routes from "./routes";
import { useSelector } from "react-redux";
import Snackbar from "./ui-component/extended/Snackbar";
import { JWTProvider } from "./contexts/JWTContext";
import Locales from "./ui-component/Locales";
import NavigationScroll from "./layout/NavigationScroll";

function App() {
  const customization = useSelector(
    (state: DefaultRootStateProps) => state.customization
  );
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <Locales>
            <NavigationScroll>
              <JWTProvider>
                <>
                  <Routes />
                  <Snackbar />
                </>
              </JWTProvider>
            </NavigationScroll>
          </Locales>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
