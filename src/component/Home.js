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
  } = useQuery("todo", () =>
    axios.get("https://quiet-garden-36081.herokuapp.com/list")
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.status = false;
    const url = `https://quiet-garden-36081.herokuapp.com/list`;

    axios.post(url, data).then((res) => {
      if (res.status === 200) {
        reset();
        refetch();
        toast.success("Todo added");
      }
    });
  };

  if (isLoading) return <Loading />;

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
          className="input input-bordered w-full max-w-xs"
        />

        <button className="btn btn-success">Add Todo</button>
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
