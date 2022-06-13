import Link from "next/link";
import {
  Box,
  Card,
  Container,
  Typography,
  Tooltip,
  styled,
  Alert,
} from "@mui/material";

import Logo from "../../../../components/Logo/Logo";

import FirebaseAuthRegister from "../FirebaseAuthRegister/FirebaseAuthRegister";
import RegisterJWT from "../RegisterJWT/RegisterJWT";

import { useSelector, useDispatch } from "../../../../store/index";
import Title from "../../../../components/Title/Title";
import { changeMethod, changeRoute } from "../../../../slices/auth";
import { AppState } from "../../../../types/AppState";
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

function RegisterCover() {
  const { method } = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch();

  const handleChangeMethod = (method: string) => {
    dispatch(changeMethod({ method }));
  };

  return (
    <>
      <Title title="Inscription" />
      <Content>
        <SidebarWrapper
          sx={{
            display: { xs: "none", md: "inline-block" },
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
                Choisir entre les methodes d'inscription JWT et Firebase
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.primary"
                fontWeight="bold"
              >
                Voulez-vous changer de méthode d'inscription
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
                  Inscription
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 3,
                  }}
                >
                  Créer un compte
                </Typography>
              </Box>

              {method === "FirebaseAuth" && <FirebaseAuthRegister />}
              {method === "JWT" && <RegisterJWT />}

              <Box my={4}>
                <Typography
                  component="span"
                  variant="subtitle2"
                  color="text.primary"
                  fontWeight="bold"
                >
                  Vous avez dejà un compte
                </Typography>{" "}
                <a
                  href="#"
                  onClick={() => dispatch(changeRoute({ route: "login" }))}
                >
                  {" "}
                  <b>Connectez-vous</b>{" "}
                </a>
              </Box>
            </Card>
          </Container>
        </MainContent>
      </Content>
    </>
  );
}

export default RegisterCover;
