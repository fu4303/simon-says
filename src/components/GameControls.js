import {
  Dialog,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Zoom,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ReplayIcon from "@material-ui/icons/Replay";
import React, { useState } from "react";
import { useSimonSays } from "../simon-says";
const useStyles = makeStyles((theme) => ({
  score: {
    fontSize: "3em",
    fontWeight: "bold",
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    borderRadius: "50%",
    width: "144px",
    height: "144px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "all",
    flexDirection: "column",
  },

  container: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
  },
}));

const TransitionComponent = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

const ResponsiveDialog = (modalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  if (isMobile) {
    return <Drawer anchor="bottom" {...modalProps} />;
  }

  return <Dialog TransitionComponent={TransitionComponent} {...modalProps} />;
};

export const GameControls = () => {
  const classes = useStyles();
  const simonSays = useSimonSays();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  return (
    <div>
      <div className={classes.container}>
        <Paper className={classes.paper} elevation={24}>
          <Typography className={classes.score}>
            {simonSays.song.length}
          </Typography>
          <IconButton
            onClick={() => {
              setIsOptionsOpen(true);
            }}
          >
            <MoreHorizIcon />
          </IconButton>
        </Paper>
      </div>

      <ResponsiveDialog
        open={isOptionsOpen}
        onClose={() => {
          setIsOptionsOpen(false);
        }}
      >
        <List>
          <ListItem
            button
            onClick={() => {
              simonSays.reset();
              setIsOptionsOpen(false);
            }}
          >
            <ListItemIcon>
              <ReplayIcon />
            </ListItemIcon>
            <ListItemText primary="Reset" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setIsOptionsOpen(false);
            }}
          >
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary="Cancel" />
          </ListItem>
        </List>
      </ResponsiveDialog>
    </div>
  );
};
