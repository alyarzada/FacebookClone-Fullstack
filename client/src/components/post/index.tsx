import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import useAuthContext from "../../hooks/useAuthContext";

const Post = () => {
  const [value, setValue] = useState<string>("");
  const [posts, setPosts] = useState<object[] | []>([]);
  const [files, setFiles] = useState<any[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });
  const { token }: any = useAuthContext();

  const thumbs = files.map((file) => (
    <div
      className="inline-flex rounded border border-solid border-color-[#eaeaea] mt-8 mr-8 w-[100px] height-[100px] p-4 "
      key={file.name}
    >
      <div className="flex min-w-0 overflow-hidden">
        <img
          src={file.preview}
          className="block w-auto h-full"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    fetchPostsMutation.mutate();
  }, []);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const fetchPostsMutation = useMutation({
    mutationFn: () => {
      return axios.get(`${import.meta.env.VITE_BASE_URL}/post`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (response) => {
      setPosts(response.data.posts);
    },
  });

  const submitMutation = useMutation({
    mutationFn: (data) => {
      return axios.post(
        `${import.meta.env.VITE_BASE_URL}/post/create`,
        { content: data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: (response) => {
      setPosts((prev) => [response.data.post, ...prev]);
      toast.success(response.data.message);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`${import.meta.env.VITE_BASE_URL}/post/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (response) => {
      setPosts((prev) =>
        prev.filter((post) => post._id !== response.data.post._id)
      );
      toast.success(response.data.message);
    },
  });

  const editPostMutation = useMutation({
    mutationFn: (id) => {
      return axios.patch(`${import.meta.env.VITE_BASE_URL}/post/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (response) => {
      setPosts((prev) =>
        prev.map((post) => {
          if (post._id === response.data.post._id) {
            return {
              ...post,
              content: response.data,
            };
          }
          return post;
        })
      );
      toast.success(response.data.message);
    },
  });

  return (
    <div className="w-full min-h-[calc(100vh-56px)] flex items-center justify-center">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitMutation.mutate(value);
          }}
        >
          <textarea
            className="bg-gray-700 text-slate-50 outline-none p-3 rounded block mb-1"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            name="post-textarea"
            id="postId"
            cols="40"
            rows="5"
          ></textarea>
          <div className="flex justify-between items-center">
            <section>
              <div
                {...getRootProps({
                  className:
                    "bg-yellow-800 hover:bg-yellow-600 text-slate-50 px-6 py-3 rounded cursor-pointer text-sm",
                })}
              >
                <input {...getInputProps()} />
                <AiOutlineCloudUpload />
              </div>
              <aside>{thumbs}</aside>
            </section>
            <button
              type="submit"
              className="rounded bg-cyan-400 hover:bg-cyan-500 px-5 py-2 text-slate-50"
            >
              Send
            </button>
          </div>
        </form>

        <div className="mt-4">
          {fetchPostsMutation.isLoading ? (
            <div className="flex justify-center">
              <ScaleLoader color="#22D3EE" />
            </div>
          ) : posts?.length > 0 ? (
            posts.map((post, index) => {
              return (
                <div
                  key={post._id}
                  className="p-2 rounded bg-white drop-shadow-lg my-2"
                >
                  <div className="flex justify-between items-center">
                    <h1>Post {index + 1}</h1>
                    <div className="flex gap-x-2">
                      <button
                        title="Edit Post"
                        onClick={() => editPostMutation.mutate(post._id)}
                      >
                        <AiOutlineEdit className="text-green-400 hover:text-green-500" />
                      </button>
                      <button
                        title="Delete Post"
                        onClick={() => deletePostMutation.mutate(post._id)}
                      >
                        <FiTrash2 className="text-red-400 hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                  <p>{post.content}</p>
                </div>
              );
            })
          ) : (
            <h4>Post yoxdur</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
