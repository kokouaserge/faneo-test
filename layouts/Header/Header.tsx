import { Box, IconButton, Tooltip, styled } from "@mui/material";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import Logo from "../../components/Logo/Logo";
import { useDispatch, useSelector } from "../../store";
import { toggleSidebar } from "../../slices/sidebar";

import Menu from "./Menu";
import Userbox from "./Userbox";

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        margin-top: ${theme.spacing(3)};
        position: relative;
        justify-content: space-between;
        width: 100%;
`
);

function Header() {
  const { sidebarToggle } = useSelector((state: any) => state.sidebar);
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <HeaderWrapper display="flex" alignItems="center">
      <Box display="flex" alignItems="center">
        <Box
          component="span"
          sx={{
            display: { lg: "none", xs: "inline-block" },
          }}
        >
          <Logo />
        </Box>
        <Box
          component="span"
          sx={{
            display: { xs: "none", md: "inline-block" },
          }}
        >
          <Menu />
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Userbox />
        <Box
          component="span"
          sx={{
            display: { lg: "none", xs: "inline-block" },
          }}
        >
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={handleToggleSidebar}>
              {!sidebarToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
