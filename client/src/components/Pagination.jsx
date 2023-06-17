import React, { useEffect }from "react";
import { Pagination, PaginationItem } from '@mui/material';
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../actions/Posts";

const Paginate = ({ page }) => {
    const location = useLocation();
    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
      if(page) dispatch(getPosts(page))
    }, [page], [location])
    

    return(
        <Pagination style={{ display: 'flex', justifyContent: 'space-around'}}  count={numberOfPages} page={Number(page) || 1} variant="outlined" color="primary" renderItem={(item) => (
            <PaginationItem {...item} style={{ display: 'flex', justifyContent: 'space-around'}}  component={Link} to={`/posts?page=${item.page}`} />
        )} />
    );
};

export default Paginate;