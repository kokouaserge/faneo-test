import React, { useState } from "react";
import clsx from "clsx";
import {
  Button,
  Tooltip,
  Badge,
  Collapse,
  ListItem,
  styled,
  tooltipClasses,
} from "@mui/material";
import ExpandLessTwoToneIcon from "@mui/icons-material/ExpandLessTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import { useDispatch } from "../../store";
import { closeSidebar } from "../../slices/sidebar";
import NavLink from "../../shared/NavLink/NavLink";

interface sidebarItemInterface {
  children?: React.ReactNode;
  active: boolean;
  link: string;
  icon: any;
  badge?: string;
  badgeTooltip?: string;
  open?: boolean;
  name: string;
}

const TooltipWrapper = styled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.black[100],
    color: theme.palette.getContrastText(theme.colors.alpha.black[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: "bold",
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      "0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.black[100],
  },
}));

const SidebarMenuItem = ({
  children,
  link,
  icon: Icon,
  badge,
  badgeTooltip,
  open: openParent = false,
  active = false,
  name,
  ...rest
}: sidebarItemInterface) => {
  const [menuToggle, setMenuToggle] = useState(openParent);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuToggle((Open) => !Open);
  };

  const onClickCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  if (children) {
    return (
      <ListItem component="div" className="Mui-children" key={name} {...rest}>
        <Button
          disableRipple
          className={clsx({ "Mui-active": menuToggle })}
          startIcon={Icon && <Icon />}
          endIcon={
            menuToggle ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />
          }
          onClick={toggleMenu}
        >
          {badgeTooltip ? (
            <TooltipWrapper title={badgeTooltip} arrow placement="right">
              {badge === "" ? (
                <Badge color="primary" variant="dot" />
              ) : (
                <Badge badgeContent={badge} />
              )}
            </TooltipWrapper>
          ) : badge === "" ? (
            <Badge color="primary" variant="dot" />
          ) : (
            <Badge badgeContent={badge} />
          )}
          {name}
        </Button>
        <Collapse in={menuToggle}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem component="div" key={name} {...rest}>
      <Button
        disableRipple
        activeClassName="Mui-active"
        component={NavLink}
        onClick={onClickCloseSidebar}
        to={link}
        startIcon={Icon && <Icon />}
      >
        {name}
        {badgeTooltip ? (
          <TooltipWrapper title={badgeTooltip} arrow placement="right">
            {badge === "" ? (
              <Badge color="primary" variant="dot" />
            ) : (
              <Badge badgeContent={badge} />
            )}
          </TooltipWrapper>
        ) : badge === "" ? (
          <Badge color="primary" variant="dot" />
        ) : (
          <Badge badgeContent={badge} />
        )}
      </Button>
    </ListItem>
  );
};

export default SidebarMenuItem;
