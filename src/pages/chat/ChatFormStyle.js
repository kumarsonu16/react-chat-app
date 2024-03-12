import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  sendButton: {
    padding: "15px 20px !important",
  },
  disableButton: {
    marginBottom: "20px !important",
    padding: "15px 20px !important",
  }
}));

export default useStyles;
