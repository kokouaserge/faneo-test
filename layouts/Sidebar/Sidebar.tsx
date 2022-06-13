import Logo from "../../components/Logo/Logo";
import { Box, Card, Drawer, styled, useTheme } from "@mui/material";
import SidebarMenu from "./SidebarMenu";
import { useSelector, useDispatch } from "../../store/index";
import { AppState } from "../../types/AppState";
import { toggleSidebar } from "../../slices/sidebar";

const SidebarWrapper = styled(Card)(
  ({ theme }: any) => `
    width: ${theme.sidebar.width};
    background: ${theme.sidebar.background};
    height: 100%;
    
    @media (min-width: ${theme.breakpoints.values.lg}px) {
        position: fixed;
        height: calc(100% - ${theme.spacing(8)});
        margin: ${theme.spacing(4, 0, 4, 4)};
        z-index: 10;
        border-radius: ${theme.general.borderRadius};
    }
`
);

const TopSection = styled(Box)(
  ({ theme }) => `
        display: flex;
        height: 80px;
        align-items: center;
        margin: 0 ${theme.spacing(2)};
        border-bottom: ${theme.sidebar.dividerBg} solid 1px;
`
);

function Sidebar() {
  const theme: any = useTheme();
  const { sidebarToggle } = useSelector((state: AppState) => state.sidebar);
  const dispatch = useDispatch();
  const closeSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      <SidebarWrapper
        sx={{
          display: { xs: "none", lg: "inline-block" },
        }}
      >
        <TopSection>
          <Logo />
        </TopSection>
        <Box
          sx={{
            height: "calc(100% - 80px)",
          }}
        >
          <Box pt={1}>
            <SidebarMenu />
          </Box>
        </Box>
      </SidebarWrapper>
      <Drawer
        sx={{
          display: { lg: "none", xs: "inline-block" },
        }}
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper>
          <TopSection>
            <Logo />
          </TopSection>
          <SidebarMenu />
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
