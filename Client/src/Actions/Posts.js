import * as api from "../API";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({
      type: "START_LOADING",
    });
    const { data } = await api.fetchPosts(page);

    console.log("data is ", data);
    dispatch({
      type: "FETCH_ALL",
      payload: data,
    });

    dispatch({
      type: "END_LOADING",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "START_LOADING",
      });
      const { data } = await api.fetchPost(id);
  
      console.log("data is ", data);
      dispatch({
        type: "FETCH_POST",
        payload: data,
      });
  
      dispatch({
        type: "END_LOADING",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({
        type: "START_LOADING",
      });
    const { data } = await api.createPost(post);

    dispatch({ type: "CREATE", payload: data });
    dispatch({
        type: "END_LOADING",
      });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({
      type: "DELETE",
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    console.log(data);
    console.log("like patched here");
    dispatch({ type: "LIKE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({
        type: "START_LOADING",
      });
    console.log("search Query ", searchQuery);
    const {
      data: { data },
    } = await api.fetchPostBySearch(searchQuery);
    dispatch({
      type: "FETCH_BY_SEARCH",
      payload: data,
    });
    dispatch({
        type: "END_LOADING",
      });
  } catch (error) {
    console.log(error);
  }
};
