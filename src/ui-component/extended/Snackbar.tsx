import { useSelector } from "react-redux";

// material-ui
import {
  Alert,
  Button,
  Fade,
  Grow,
  IconButton,
  Slide,
  SlideProps,
} from "@mui/material";
import MuiSnackbar from "@mui/material/Snackbar";

// assets
import CloseIcon from "@mui/icons-material/Close";

import { DefaultRootStateProps, KeyedObject } from "../../types";
import { useEffect, useState } from "react";

// animation function
function TransitionSlideLeft(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props: SlideProps) {
  return <Grow {...props} />;
}

// animation options
const transition: KeyedObject = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade,
};

// ==============================|| SNACKBAR ||============================== //

const Snackbar = () => {
  const [open, setOpen] = useState(false);
  const snackbarInitial = useSelector(
    (state: DefaultRootStateProps) => state.snackbar
  );

  const handleClose = (reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setOpen(snackbarInitial.open);
  }, [snackbarInitial.action, snackbarInitial.open]);

  return (
    <>
      {/* default snackbar */}
      {snackbarInitial.variant === "default" && (
        <MuiSnackbar
          anchorOrigin={snackbarInitial.anchorOrigin}
          open={open}
          autoHideDuration={6000}
          onClose={(_e,v) => handleClose(v)}
          message={snackbarInitial.message}
          TransitionComponent={transition[snackbarInitial.transition]}
          action={
            <>
              <Button
                color="secondary"
                size="small"
                onClick={() => handleClose()}
              >
                UNDO
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => handleClose()}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
      )}

      {/* alert snackbar */}
      {snackbarInitial.variant === "alert" && (
        <MuiSnackbar
          TransitionComponent={transition[snackbarInitial.transition]}
          anchorOrigin={snackbarInitial.anchorOrigin}
          open={open}
          autoHideDuration={6000}
          onClose={(_e,v) => handleClose(v)}
        >
          <Alert
            variant="filled"
            severity={snackbarInitial.alertSeverity}
            sx={{
              bgcolor: `${snackbarInitial.alertSeverity}.dark`,
              color:
                snackbarInitial.alertSeverity === "warning" ? "grey.800" : "",
            }}
            action={
              <>
                {snackbarInitial.actionButton !== false && (
                  <Button
                    color="secondary"
                    size="small"
                    onClick={() => handleClose()}
                  >
                    UNDO
                  </Button>
                )}
                {snackbarInitial.close !== false && (
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={() => handleClose()}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </>
            }
          >
            {snackbarInitial.message}
          </Alert>
        </MuiSnackbar>
      )}
    </>
  );
};

export default Snackbar;
