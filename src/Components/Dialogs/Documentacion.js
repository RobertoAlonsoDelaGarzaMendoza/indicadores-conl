import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Slide,
} from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import React, { useEffect, useState } from "react";
import Api from "../../Restful/Api";
import Skeleton from "../Helpers/Skeleton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Documentacion({ flag_open, handleClose }) {
  const [loading, setLoading] = useState(true);
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    Api.get("/archivo")
      .then((response) => {
        setLoading(false);
        switch (response.status) {
          case 200:
            setDocumentos(response.data.Archivos);
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error>>>", error.message);
        }
      });
  }, []);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={flag_open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle>Documentación</DialogTitle>
      <DialogContent>
        {loading ? (
          Array(6)
            .fill()
            .map((elem, index) => (
              <div key={index}>
                <Skeleton marginTop="1.5rem" />
              </div>
            ))
        ) : (
          <List>
            {documentos.map((documento, index) => (
              <>
                <ListItem button key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      <DescriptionOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={documento.descripcion} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="descargar"
                      onClick={() => {
                        window.open(documento.url);
                      }}
                    >
                      <CloudDownloadIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="primary" onClick={handleClose}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Documentacion;
