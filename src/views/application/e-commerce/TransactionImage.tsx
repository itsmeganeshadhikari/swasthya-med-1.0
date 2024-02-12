import { useSelector } from "react-redux";
// material-ui
import { CardMedia, Grid } from "@mui/material";
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'

// project import
import MainCard from "../../../ui-component/cards/MainCard";
import { DefaultRootStateProps } from "../../../types";
import { gridSpacing } from "../../../store/constant";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
// third-party
// import Carousel, { Modal, ModalGateway } from "react-images";
import { useCallback, useState } from "react";
// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const TransactionImage = ({ image }: any) => {
    const customization = useSelector(
        (state: DefaultRootStateProps) => state.customization
    );
    const [modal, setModal] = useState(false);
    const onOpenModal = () => setModal(true);
    const onCloseModal = () => setModal(false);
    const [isZoomed, setIsZoomed] = useState(false)

    const handleZoomChange = useCallback((shouldZoom: any) => {
        setIsZoomed(shouldZoom)
    }, [])

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
                            image={image}
                            sx={{
                                borderRadius: `${customization.borderRadius}px`,
                                overflow: "hidden",
                                cursor: "zoom-in",
                            }}
                        />
                    </MainCard>
                </Grid>
            </Grid>
            {modal ? (
                <Modal open={modal} onClose={onCloseModal} center>
                    <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
                        <CardMedia
                            component="img"
                            image={image}
                        />
                    </ControlledZoom>
                </Modal>
            ) : null}
        </>
    );
};

export default TransactionImage;
