import React, { useState } from "react";

// material-ui
import {
  Button,
  Step,
  Stepper,
  StepLabel,
  Stack,
  Typography,
} from "@mui/material";

// project imports
import ProductDetailsForm, { ProductDetailsData } from "./ProductDetailsForm";
import ProductPriceForm, { ProductPriceData } from "./ProductPriceForm";
import Review from "./Review";
import MainCard from "../../../ui-component/cards/MainCard";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import { CREATE_PRODUCT } from "../../../utils/mutations/productMutation";
import { useMutation } from "@apollo/client";
import { SNACKBAR_OPEN } from "../../../store/actions";
import { useDispatch } from "react-redux";

// step options
const steps = ["Product Details", "Price Details", "Review your Product"];

const getStepContent = (
  step: number,
  handleNext: () => void,
  handleBack: () => void,
  setErrorIndex: (i: number | null) => void,
  productDetailsData: ProductDetailsData,
  setProductDetailsData: (d: ProductDetailsData) => void,
  productPriceData: ProductPriceData,
  setProductPriceData: (d: ProductPriceData) => void
) => {
  switch (step) {
    case 0:
      return (
        <ProductDetailsForm
          handleNext={handleNext}
          setErrorIndex={setErrorIndex}
          productDetailsData={productDetailsData}
          setProductDetailsData={setProductDetailsData}
        />
      );
    case 1:
      return (
        <ProductPriceForm
          handleNext={handleNext}
          handleBack={handleBack}
          setErrorIndex={setErrorIndex}
          productPriceData={productPriceData}
          setProductPriceData={setProductPriceData}
        />
      );
    case 2:
      return (
        <Review
          productDetailsData={productDetailsData}
          productPriceData={productPriceData}
        />
      );
    default:
      throw new Error("Unknown step");
  }
};

// ==============================|| FORMS WIZARD - BASIC ||============================== //

const ProductEntryForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [productDetailsData, setProductDetailsData] = useState<any>({});
  const [productPriceData, setProductPriceData] = useState<any>({});
  const [errorIndex, setErrorIndex] = useState<number | null>(null);
  const [createProducts, { error }] = useMutation(CREATE_PRODUCT)
  const dispatch = useDispatch();

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      try {
        const data = await createProducts({ variables: { input: { ...productDetailsData, ...productPriceData } } });
        if (data) {
          dispatch({
            type: SNACKBAR_OPEN,
            open: true,
            message: "Product created successfully",
            variant: "alert",
            alertSeverity: "success",
          });
        }
      } catch (error) {
        dispatch({
          type: SNACKBAR_OPEN,
          open: true,
          message: "Error on creating product! Please try again",
          variant: "alert",
          alertSeverity: "error",
        });
      }
    }
    setActiveStep(activeStep + 1);
    setErrorIndex(null);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  if (error) {
    dispatch({
      type: SNACKBAR_OPEN,
      open: true,
      message: "Error on creating product! Please try again",
      variant: "alert",
      alertSeverity: "error",
    });
  }

  return (
    <MainCard title="Product Entry">
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label, index) => {
          const labelProps: { error?: boolean; optional?: React.ReactNode } =
            {};
          if (index === errorIndex) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Error
              </Typography>
            );

            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for product entry.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setProductDetailsData({});
                    setProductPriceData({});
                    setActiveStep(0);
                  }}
                  sx={{ my: 3, ml: 1 }}
                >
                  Reset
                </Button>
              </AnimateButton>
            </Stack>
          </>
        ) : (
          <>
            {getStepContent(
              activeStep,
              handleNext,
              handleBack,
              setErrorIndex,
              productDetailsData,
              setProductDetailsData,
              productPriceData,
              setProductPriceData
            )}
            {activeStep === steps.length - 1 && (
              <Stack
                direction="row"
                justifyContent={activeStep !== 0 ? "space-between" : "flex-end"}
              >
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <AnimateButton>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ my: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                </AnimateButton>
              </Stack>
            )}
          </>
        )}
      </>
    </MainCard>
  );
};

export default ProductEntryForm;
