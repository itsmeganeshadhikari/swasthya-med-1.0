import React, { useState } from "react";
import { useDispatch } from "react-redux";

// material-ui
import {
  Button,
  Dialog,
  IconButton,
  Grid,
  Stack,
  TextField,
  Zoom,
  ZoomProps,
  CardMedia,
} from "@mui/material";

// third-party
import { useFormik } from "formik";

// project imports
import MainCard from "../../../../ui-component/cards/MainCard";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import { SNACKBAR_OPEN } from "../../../../store/actions";
import { gridSpacing } from "../../../../store/constant";

// assets
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import { useMutation } from "@apollo/client";
import { CREATE_TRANSACTION } from "../../../../utils/mutations/transactionMutation";
import useAuth from "../../../../hooks/useAuth";

const Transition = React.forwardRef((props: ZoomProps, ref) => (
  <Zoom ref={ref} {...props} />
));

// ==============================|| CHECKOUT PAYMENT - ADD NEW CARDS ||============================== //

const AddPaymentCard = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("")
  const [uploadTransactionImage] = useMutation(CREATE_TRANSACTION);
  const { user } = useAuth();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      transactionImage: "",
      userId: "",
    },
    onSubmit: async (e) => {
      const response = await uploadTransactionImage({
        variables:
        {
          createTransactionInput:
            { transactionImage: e.transactionImage[0], user: user?._id }
        }
      });
      if (response) {
        handleClose();
        dispatch({
          type: SNACKBAR_OPEN,
          open: true,
          message: "Uploaded Success",
          variant: "alert",
          alertSeverity: "success",
        });
      } else {
        dispatch({
          type: SNACKBAR_OPEN,
          open: true,
          message: "Uploaded Fail",
          variant: "alert",
          alertSeverity: "error",
        });
      }
    },
  });

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      sx={{
        "& .MuiDialog-paper": {
          p: 0,
        },
      }}
    >
      <MainCard
        title="Upload Transaction"
        secondary={
          <IconButton onClick={handleClose} size="large">
            <HighlightOffTwoToneIcon fontSize="small" />
          </IconButton>
        }
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <TextField
                type="file"
                fullWidth
                name="transactionImage"
                onChange={(event: any) => {
                  const fileList = event.target.files
                  const result: (string | ArrayBuffer | null)[] = []
                  const urls: string[] = []
                  const files: File[] = Array.from(fileList);
                  files.map((file: File) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    const url = URL.createObjectURL(file);
                    reader.onload = () => {
                      if (reader.readyState == 2) {
                        result.push(reader.result)
                        urls.push(url)
                        setImage(url)
                      }
                    };
                  })
                  formik.setFieldValue("transactionImage", result);
                  formik.setFieldValue("transactionImagePreview", urls);
                }
                }
              />
            </Grid>
            <Grid>
              <CardMedia
                sx={{
                  height: 200,
                  width: 200,
                  margin: 4
                }}
                // component='img'
                image={image}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button color="error" onClick={handleClose}>
                  Cancel
                </Button>
                <AnimateButton>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </AnimateButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </MainCard>
    </Dialog>
  );
};

export default AddPaymentCard;
