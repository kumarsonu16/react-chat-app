import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import TextInput from "../../components/InputComponents/TextInput";
import useStyles from "./LoginFormStyle";

const LoginForm = (props) => {
  const classes = useStyles();
  const {
    values: { username, password },
    handleSubmit,
    isValid,
  } = props;
  
  return (
    <Container className="py-4">
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <TextInput
            {...props}
            label={"Username"}
            name="username"
            value={username}
            required={true}
          />
          <TextInput
            {...props}
            label="Password"
            name="password"
            value={password}
            required={true}
          />
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={!isValid}
          style={{ marginTop : "20px" }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
