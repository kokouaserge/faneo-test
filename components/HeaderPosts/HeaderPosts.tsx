/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-for */
import { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Zoom,
  Typography,
  TextField,
  CircularProgress,
  Button,
} from "@mui/material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { useSnackbar } from "notistack";
import { useSelector } from "../../store/index";
import { createPost } from "../../hooks/usePosts";

function HeaderPosts() {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state: any) => state.auth);
  const mutationPost = createPost();

  const handleCreatePostOpen = () => {
    setOpen(true);
  };

  const handleCreatePostClose = () => {
    setOpen(false);
  };

  const handleCreatePostSuccess = () => {
    enqueueSnackbar("L'article a été ajouté avec succès", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      TransitionComponent: Zoom,
    });

    setOpen(false);
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Gestion des articles
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 },
            }}
            onClick={handleCreatePostOpen}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            Ajouter un nouveau article
          </Button>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleCreatePostClose}
      >
        <DialogTitle
          sx={{
            p: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Ajout d'un article
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={{
            title: "",
            body: "",
            userId: 1,
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().max(255).required("Le titre est obligatoire"),
            body: Yup.string().required("Le corps est obligatoire"),
          })}
          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {
              const { title, body } = _values;
              await mutationPost.mutateAsync({ title, body, userId: user.id });
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              handleCreatePostSuccess();
            } catch (err: any) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
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
            <form onSubmit={handleSubmit}>
              <DialogContent
                dividers
                sx={{
                  p: 3,
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={7}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          error={Boolean(touched.title && errors.title)}
                          fullWidth
                          helperText={touched.title && errors.title}
                          label={"Le titre de l'article"}
                          name="username"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.title}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={Boolean(touched.body && errors.body)}
                          fullWidth
                          helperText={touched.body && errors.body}
                          label={"le corps de l'article"}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="email"
                          value={values.body}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  p: 3,
                }}
              >
                <Button color="secondary" onClick={handleCreatePostClose}>
                  Annuler
                </Button>
                <Button
                  type="submit"
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={Boolean(errors.submit) || isSubmitting}
                  variant="contained"
                >
                  Ajouter
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

export default HeaderPosts;
