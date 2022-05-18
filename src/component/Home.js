import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { QueryClient, useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "./Loading";
import TodoList from "./TodoList";

const Home = () => {
  const {
    isLoading,
    error,
    data: lists,
    refetch,
  } = useQuery("todo", () => axios.get("http://localhost:5000/list"));

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.status = false;
    const url = `http://localhost:5000/list`;

    axios.post(url, data).then((res) => {
      if (res.status === 200) {
        reset();
        refetch();
        toast.success("Todo added");
      }
    });
  };

  if (isLoading) return <Loading />;

  console.log(lists.data);
  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-5 justify-center "
      >
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />

        <button class="btn btn-success">Add Todo</button>
      </form>

      <div className="w-2/3 mt-10 mx-auto">
        {lists?.data?.map((todo) => (
          <TodoList refetch={refetch} key={todo._id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default Home;
