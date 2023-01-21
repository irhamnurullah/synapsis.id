import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import BlogCard from '@/components/blogCard';

export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [details, setDetails] = useState();
  const [userDetail, setUserDetail] = useState([]);
  const [commentDetail, setCommentDetail] = useState();

  useEffect(() => {
    if (id) {
      getDetailPost();
    }
    getDetailComment(id);
  }, [id]);

  useEffect(() => {
    if (details) {
      getUser(details.user_id);
    }
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

  async function getDetailComment(postId) {
    try {
      const response = await axios.get(
        `https://gorest.co.in/public/v2/comments`
      );
      const result = response?.data;
      const filter = result.filter((fil) => fil.post_id == postId);
      setCommentDetail(filter);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="h-screen bg-slate-900 flex items-center justify-center">
      <BlogCard
        body={details?.body}
        title={details?.title}
        user={userDetail}
        comment={commentDetail}
      />
    </div>
  );
}
