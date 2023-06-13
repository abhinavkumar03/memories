import React, { useEffect }from "react";
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../actions/Posts";

import useStyles from "./styles";

const Paginate = ({ page }) => {
    const location = useLocation();
    const { numberOfPages } = useSelector((state) => state.posts);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
      if(page) dispatch(getPosts(page))
    }, [page], [location])
    

    return(
        <Pagination classes={{ ul: classes.ul }} count={numberOfPages} page={Number(page) || 1} variant="outlined" color="primary" renderItem={(item) => (
            <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
        )} />
    );
};

export default Paginate