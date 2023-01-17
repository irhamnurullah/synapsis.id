import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [details, setDetails] = useState();
  const [userDetail, setUserDetail] = useState([]);
  const [commentDetail, setCommentDetail] = useState([]);

  useEffect(() => {
    if (id) {
      getDetailPost();
      getDetailComment();
    }
    return;
  }, []);

  useEffect(() => {
    if (details) {
      getUser(details.user_id);
    }
    return;
  }, [details]);

  async function getDetailPost() {
    try {
      const response = await axios.get(
        `https://gorest.co.in/public/v2/posts/${id}`
      );
      const result = response?.data;
      setDetails(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getDetailComment() {
    try {
      const response = await axios.get(
        `https://gorest.co.in/public/v2/comments`
      );
      const result = response?.data;
      setCommentDetail(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getUser(userId) {
    try {
      const response = await axios.get(
        `https://gorest.co.in/public/v2/users/${userId}`
      );
      const result = response.data;
      setUserDetail(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  function findDetailComment(postId) {
    const filter = commentDetail.filter((fil) => fil.post_id == postId);
    setCommentDetail(filter);
  }
  return (
    <div>
      <div>{details?.body}</div>
      <div>{details?.title}</div>
      <div>{userDetail?.name}</div>
      <div>{userDetail?.email}</div>
      <div>{userDetail?.body}</div>

      <div>{commentDetail[0]?.post_id}</div>
      <div>{commentDetail[0]?.name}</div>
      <div>{commentDetail[0]?.email}</div>
      <div>{commentDetail[0]?.body}</div>
    </div>
  );
}
