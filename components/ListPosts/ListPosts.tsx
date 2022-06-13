/* eslint-disable react/no-unescaped-entities */
import { useState, forwardRef } from "react";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Grid,
  Slide,
  Divider,
  Tooltip,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  TextField,
  Button,
  Typography,
  Dialog,
  Zoom,
  styled,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import LaunchTwoToneIcon from "@mui/icons-material/LaunchTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import BulkActions from "./BulkActions";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color: ${theme.colors.error.main};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const applyFilters = (posts: Post[], query: string) => {
  return posts.filter((post: any) => {
    let matches = true;

    if (query) {
      const properties = ["title", "body"];
      let containsQuery = false;

      properties.forEach((property: any) => {
        if (post[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    return matches;
  });
};

const applyPagination = (posts: Post[], page: number, limit: number) => {
  return posts.slice(page * limit, page * limit + limit);
};

const ListPosts = ({ posts }: { posts: Post[] }) => {
  const [selectedItems, setSelectedposts] = useState<number[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSelectAllPosts = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedposts(event.target.checked ? posts.map((post) => post.id) : []);
  };

  const handleSelectOnepost = (
    _event: React.ChangeEvent<HTMLInputElement>,
    postId: number
  ) => {
    if (!selectedItems.includes(postId)) {
      setSelectedposts((prevSelected) => [...prevSelected, postId]);
    } else {
      setSelectedposts((prevSelected) =>
        prevSelected.filter((id) => id !== postId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredPosts = applyFilters(posts, query);
  const paginatedposts = applyPagination(filteredPosts, page, limit);
  const selectedBulkActions = selectedItems.length > 0;
  const selectedSomeposts =
    selectedItems.length > 0 && selectedItems.length < posts.length;
  const selectedAllposts = selectedItems.length === posts.length;

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleConfirmDelete = (postId: number) => {
    setOpenConfirmDelete(true);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteCompleted = () => {
    setOpenConfirmDelete(false);

    enqueueSnackbar("l'article a bien été supprimé", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      TransitionComponent: Zoom,
    });
  };

  return (
    <>
      <Card>
        <Box p={2}>
          {!selectedBulkActions && (
            <TextField
              sx={{
                m: 0,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleQueryChange}
              placeholder={"Recherche par titre, body"}
              value={query}
              size="small"
              fullWidth
              margin="normal"
              variant="outlined"
            />
          )}
          {selectedBulkActions && <BulkActions />}
        </Box>

        <Divider />

        {paginatedposts.length === 0 ? (
          <>
            <Typography
              sx={{
                py: 10,
              }}
              variant="h3"
              fontWeight="normal"
              color="text.secondary"
              align="center"
            >
              Nous n'avons pas trouvé d'article avec votre critère de recherche
            </Typography>
          </>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedAllposts}
                        indeterminate={selectedSomeposts}
                        onChange={handleSelectAllPosts}
                      />
                    </TableCell>
                    <TableCell>Titre</TableCell>
                    <TableCell>Corps</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedposts.map((post: any) => {
                    const ispostSelected = selectedItems.includes(post.id);
                    return (
                      <TableRow hover key={post.id} selected={ispostSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={ispostSelected}
                            onChange={(event) =>
                              handleSelectOnepost(event, post.id)
                            }
                            value={ispostSelected}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="h5">{post.title}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{post.body}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography noWrap>
                            <Tooltip title={"Voir"} arrow>
                              <IconButton color="primary">
                                <LaunchTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={"Supprimer"} arrow>
                              <IconButton
                                onClick={() => handleConfirmDelete(post.id)}
                                color="primary"
                              >
                                <DeleteTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box p={2}>
              <TablePagination
                component="div"
                count={filteredPosts.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 15]}
              />
            </Box>
          </>
        )}
      </Card>

      <DialogWrapper
        open={openConfirmDelete}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmDelete}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={5}
        >
          <AvatarError>
            <CloseIcon />
          </AvatarError>

          <Typography
            align="center"
            sx={{
              py: 4,
              px: 6,
            }}
            variant="h3"
          >
            Etes vous sûr de vouloir supprimer cet article ?
          </Typography>

          <Box>
            <Button
              variant="text"
              size="large"
              sx={{
                mx: 1,
              }}
              onClick={closeConfirmDelete}
            >
              Annuler
            </Button>
            <ButtonError
              onClick={handleDeleteCompleted}
              size="large"
              sx={{
                mx: 1,
                px: 3,
              }}
              variant="contained"
            >
              Supprimer
            </ButtonError>
          </Box>
        </Box>
      </DialogWrapper>
    </>
  );
};

export default ListPosts;
