import AssignmentIndTwoToneIcon from "@mui/icons-material/AssignmentIndTwoTone";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
export interface menuItemInterface {
  name: string;
  link: string;
  icons: string;
}

const menuItems = [
  {
    heading: "Gestion",
    items: [
      {
        name: "Users",
        icon: AssignmentIndTwoToneIcon,
        link: "/users",
      },
      {
        name: "Posts",
        icon: AccountTreeTwoToneIcon,
        link: "/posts",
      },
    ],
  },
];

export default menuItems;
