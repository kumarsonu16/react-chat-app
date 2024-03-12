import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => {
  return {
    paper: {
      marginTop: theme.spacing(5),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    actions: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    chatMessages: { marginTop: "10px", width: "48%" },
  };
});

export default useStyles;
