import * as Yup from "yup";
import { Formik } from "formik";
import Link from "next/link";
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Checkbox,
  Link as MiuLink,
  FormControlLabel,
  TextField,
  Typography,
  CircularProgress,
  styled,
} from "@mui/material";
import useRefMounted from "../../../../hooks/useRefMounted";
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "../../../../utils/auth";

const ImgWrapper = styled("img")(
  ({ theme }: any) => `
    margin-right: ${theme.spacing(1)};
`
);

function FirebaseAuthLogin() {
  const isMountedRef = useRefMounted();

  const handleGoogleClick = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button
        fullWidth
        onClick={handleGoogleClick}
        size="large"
        variant="outlined"
      >
        <ImgWrapper alt="Google" src="/images/logo/google.svg" />
        Connexion avec Google
      </Button>
      <Divider
        sx={{
          mt: 4,
          mb: 2,
        }}
      >
        Ou
      </Divider>
      <Formik
        initialValues={{
          email: "",
          password: "",
          terms: false,
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
            await signInWithEmailAndPassword(values.email, values.password);

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
                      I accept the terms and conditions .
                    </Typography>
                  </>
                }
              />
              <Link href="/recovery">
                <b>Mot de passe Oublié?</b>
              </Link>
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
              size="large"
              fullWidth
              type="submit"
              variant="contained"
            >
              Se connecter
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default FirebaseAuthLogin;
