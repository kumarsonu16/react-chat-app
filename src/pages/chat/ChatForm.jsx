import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import TextInput from "../../components/InputComponents/TextInput";
import useStyles from "./ChatFormStyle";

const LoginForm = (props) => {
  const classes = useStyles();
  const {
    values: { message},
    handleSubmit,
    isValid,
  } = props;
  
  return (
    <Container className="py-4" maxWidth="sm">
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <TextInput
            {...props}
            label={"message"}
            name="message"
            value={message}
            required={true}
          />
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={isValid ? classes.sendButton: classes.disableButton}
          disabled={!isValid}
        >
          Send
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
