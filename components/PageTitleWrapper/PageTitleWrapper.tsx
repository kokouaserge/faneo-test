import React from "react";
import { Box, styled } from "@mui/material";

interface PageTitleWrapperInterface {
  children: React.ReactNode;
}

const PageTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(4)};
`
);

const PageTitleWrapper = ({ children }: PageTitleWrapperInterface) => {
  return (
    <>
      <PageTitle className="MuiPageTitle-wrapper">{children}</PageTitle>
    </>
  );
};

export default PageTitleWrapper;
