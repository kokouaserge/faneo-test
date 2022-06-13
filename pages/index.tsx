import type { NextPage } from "next";
import Footer from "../components/Footer/Footer";
import { usePosts } from "../hooks/usePosts";
import { Grid } from "@mui/material";
import ListPosts from "../components/ListPosts/ListPosts";
import HeaderPosts from "../components/HeaderPosts/HeaderPosts";
import Title from "../components/Title/Title";
import PageTitleWrapper from "../components/PageTitleWrapper/PageTitleWrapper";
import Loading from "../components/Loading/Loading";
import Error from "../components/Error/Error";

const Home: NextPage = () => {
  const { data: posts, isError, isSuccess, isLoading } = usePosts();

  if (isLoading) {
    return (
      <Loading
        title="Chargement de page ...."
        message="La page est en chargement veuillez patienter svp"
      />
    );
  }

  if (isError) {
    return (
      <Error
        title="Erreur de récupération"
        message="Une erreur est survenue lors de la récupération"
      />
    );
  }

  if (isSuccess) {
    return (
      <>
        <Title title="Liste des articles" />
        <PageTitleWrapper>
          <HeaderPosts />
        </PageTitleWrapper>

        <Grid
          sx={{
            px: 4,
          }}
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <ListPosts posts={posts} />
          </Grid>
        </Grid>
        <Footer />
      </>
    );
  }

  return <></>;
};

export default Home;
