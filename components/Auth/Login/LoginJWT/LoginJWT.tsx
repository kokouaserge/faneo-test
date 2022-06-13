import * as Yup from "yup";
import { Formik } from "formik";
import Link from "next/link";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Checkbox,
  Typography,
  Link as LinkMiu,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import useRefMounted from "../../../../hooks/useRefMounted";

import { useDispatch, useSelector } from "../../../../store/index";
import { loginMock } from "../../../../hooks/useAuth";
import { AppState } from "../../../../types/AppState";
import { changeRoute } from "../../../../slices/auth";

const LoginJWT = () => {
  const isMountedRef = useRefMounted();
  const dispatch = useDispatch();
  const { users } = useSelector((state: AppState) => state.auth);

  const handleLogin = (values: { email: string; password: string }) => {
    return loginMock(values, users, dispatch);
  };

  return (
    <Formik
      initialValues={{
        email: "Sincere@april.biz",
        password: "123456",
        terms: true,
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("L'email doit être une adresse email valide")
          .max(255)
          .required("L'email est obligatoire"),
        password: Yup.string()
          .max(255)
          .required("Le mot de passe est obligatoire"),
        terms: Yup.boolean().oneOf(
          [true],
          "Vous devez accepter les termes et conditions"
        ),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          handleLogin(values);

          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err: any) {
          console.error(err);
          if (isMountedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            margin="normal"
            autoFocus
            helperText={touched.email && errors.email}
            label={"Email address"}
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            margin="normal"
            helperText={touched.password && errors.password}
            label={"Password"}
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <Box
            alignItems="center"
            display="flex"
            justifyContent="space-between"
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.terms}
                  name="terms"
                  color="primary"
                  onChange={handleChange}
                />
              }
              label={
                <>
                  <Typography variant="body2">
                    {"I accept the"}{" "}
                    <LinkMiu component="a" href="#">
                      terms and conditions
                    </LinkMiu>
                    .
                  </Typography>
                </>
              }
            />

            <a
              href="#"
              onClick={() => dispatch(changeRoute({ route: "recovery" }))}
            >
              Mot de passe Oublié ?
            </a>
          </Box>

          {Boolean(touched.terms && errors.terms) && (
            <FormHelperText error>{errors.terms}</FormHelperText>
          )}

          <Button
            sx={{
              mt: 3,
            }}
            color="primary"
            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
            disabled={isSubmitting}
            type="submit"
            fullWidth
            size="large"
            variant="contained"
          >
            Connexion
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default LoginJWT;
