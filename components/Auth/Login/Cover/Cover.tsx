import {
  Box,
  Card,
  Tooltip,
  Typography,
  Container,
  Alert,
  styled,
} from "@mui/material";
import Logo from "../../../Logo/Logo";
import { AppState } from "../../../../types/AppState";

import FirebaseAuthLogin from "../FirebaseAuthLogin/FirebaseAuthLogin";
import LoginJWT from "../LoginJWT/LoginJWT";
import { useSelector, useDispatch } from "../../../../store/index";
import { changeMethod, changeRoute } from "../../../../slices/auth";

const icons = {
  FirebaseAuth: "/images/logo/firebase.svg",
  JWT: "/images/logo/jwt.svg",
};

const Content = styled(Box)(
  () => `
    display: flex;
    flex: 1;
    width: 100%;
`
);

const MainContent = styled(Box)(
  () => `
  padding: 0 0 0 440px;
  width: 100%;
  display: flex;
  align-items: center;
`
);

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    background: ${theme.colors.alpha.white[100]};
    width: 440px;
`
);

const SidebarContent = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(6)};
`
);

const CardImg = styled(Card)(
  ({ theme }: any) => `
    border-radius: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 1px solid ${theme.colors.alpha.black[10]};
    transition: ${theme.transitions.create(["border"])};
    position: absolute;

    &:hover {
      border-color: ${theme.colors.primary.main};
    }
`
);

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(33)};
`
);

function LoginCover() {
  const { method } = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch();

  const handleChangeMethod = (method: string) => {
    dispatch(changeMethod({ method }));
  };

  return (
    <>
      <Content>
        <SidebarWrapper
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <SidebarContent>
            <Logo />
            <Box mt={6}>
              <TypographyH1
                variant="h1"
                sx={{
                  mb: 7,
                }}
              >
                2 possibilités de connexion
              </TypographyH1>
              <Box
                sx={{
                  position: "relative",
                  width: 300,
                  height: 120,
                }}
              >
                <Tooltip arrow placement="top" title="Firebase">
                  <CardImg
                    sx={{
                      width: 90,
                      height: 90,
                      left: 70,
                    }}
                    onClick={() => handleChangeMethod("FirebaseAuth")}
                  >
                    <img width={50} alt="Firebase" src={icons.FirebaseAuth} />
                  </CardImg>
                </Tooltip>
                <Tooltip arrow placement="top" title="JSON Web Token">
                  <CardImg
                    sx={{
                      width: 110,
                      height: 110,
                      top: -30,
                      left: 170,
                    }}
                    onClick={() => handleChangeMethod("JWT")}
                  >
                    <img width={80} alt="JSON Web Token" src={icons.JWT} />
                  </CardImg>
                </Tooltip>
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  my: 3,
                }}
              >
                Choisir entre les methodes de connexion JWT et Firebase
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.primary"
                fontWeight="bold"
              >
                Voulez-vous changer de méthode de connexion
              </Typography>
            </Box>
          </SidebarContent>
        </SidebarWrapper>
        <MainContent>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
            maxWidth="sm"
          >
            <Card
              sx={{
                p: 4,
                my: 4,
              }}
            >
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1,
                  }}
                >
                  Se connecter
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 3,
                  }}
                >
                  Connectez vous à un compte
                </Typography>
              </Box>

              {method === "FirebaseAuth" && <FirebaseAuthLogin />}
              {method === "JWT" && <LoginJWT />}

              <Box my={4}>
                <Typography
                  component="span"
                  variant="subtitle2"
                  color="text.primary"
                  fontWeight="bold"
                >
                  Vous n'avez pas de compte
                </Typography>{" "}
                <a
                  href="#"
                  onClick={() => dispatch(changeRoute({ route: "register" }))}
                >
                  {" "}
                  <b>Créer un compte</b>{" "}
                </a>
              </Box>

              <Tooltip title={"Utilisé pour la démo"}>
                <Alert severity="warning">
                  utiliser <b>Sincere@april.biz</b> et comme mot de passe{" "}
                  <b>123456</b>
                </Alert>
              </Tooltip>
            </Card>
          </Container>
        </MainContent>
      </Content>
    </>
  );
}

export default LoginCover;
