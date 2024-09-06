import { getPosts } from "../api";
import { useState, useEffect } from "react";
import { BlogCard } from "../components/BlogCard";

export function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadAllPosts() {
      const data = await getPosts();
      data.sort(
        (d1, d2) =>
          new Date(d2.dateCreated).getTime() -
          new Date(d1.dateCreated).getTime()
      );
      setPosts(data);
    }
    loadAllPosts();
  }, []);
  // cannot map something undefined, because data is not loaded instancuously, so we have to put empty array "useState([])" to start with.
  return (
    <div className="posts">
      {posts.map((post) => {
        return (
          <>
            <BlogCard post={post} />
          </>
        );
      })}
    </div>
  );
}
