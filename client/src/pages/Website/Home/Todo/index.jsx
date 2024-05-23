import Todo from "./todo";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePublicContext } from "../../../../providers/PublicContextProvider";
import { getTodosUser } from "../../../../queries/getQueryFns";
import AddTask from "./addTask";
import { createTask } from "../../../../queries/postQueryFns";
import { deleteTask } from "../../../../queries/deleteQueryFns";
import { updateTask } from "../../../../queries/patchQueryFns";
import ShowDetailsTask from "./showDetailsTask";
import UpdateTask from "./updateTask";

const Home = () => {
  const [onClickEdit, setOnClickEdit] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const { setIsLoading } = usePublicContext();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: todos,
    isError,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["todo", currentPage],
    queryFn: () => getTodosUser({ currentPage }),
    keepPreviousData: true,
  });

  const generateRowsWithId = (data) => {
    if (!Array.isArray(data.todos)) {
      return [];
    }

    return data?.todos?.map((item, index) => ({
      ...item,
      id: index + 1,
      owner: item.userId.username,
    }));
  };

  const columns = [
    { field: "subject", headerName: "Subject", width: 200 },
    { field: "priority", headerName: "Priority", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    { field: "owner", headerName: "Owner", width: 200 },
  ];

  const { mutateAsync: createTaskMutate } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      refetch();
      setShowAddTask(false);
      toast.success("Task created successfully!");
    },
    onError: (error) => {
      toast.error("Error creating task. Please try again.");
      console.error("Error creating task:", error);
    },
  });

  const { mutateAsync: updateTaskMutate } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      refetch();
      setOnClickEdit(false);
      toast.success("Task updated successfully!");
    },
    onError: (error) => {
      toast.error("Error updating task. Please try again.");
      console.error("Error updating task:", error);
    },
  });

  const handleUpdateClick = (details) => {
    setSelectedDetails(details);
    setOnClickEdit(true);
  };

  const handleOnCancelUpdate = () => {
    setOnClickEdit(false);
  };

  const handleAddClick = () => {
    setShowAddTask(true);
  };

  const handleOnCancelAdd = () => {
    setShowAddTask(false);
  };

  const handleOnCancelShowDetails = () => {
    setShowDetails(false);
  };

  const handleShowDetails = (details) => {
    setSelectedDetails(details);
    setShowDetails(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      refetch();
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Error deleting task. Please try again.");
      console.error("Error deleting task:", error);
    }
  };

  const handleSaveAdd = async (createData) => {
    let data = [...todos.todos];
    data = createData;
    try {
      await createTaskMutate({
        createData: data,
      });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleSaveUpdate = async (updatedData) => {
    let data = [...todos.todos];
    data = updatedData;
    try {
      await updateTaskMutate({
        id: selectedDetails._id,
        updatedData: data,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Pagination
  const handlePreviousPage = async () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      await refetch({ currentPage: prevPage });
    }
  };

  const handleNextPage = async () => {
    if (currentPage < todos.totalCount) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage); // Update the current page state
      await refetch({ currentPage: nextPage }); // Pass the updated page number to refetch
    }
  };
  // Pagination End

  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending, setIsLoading]);

  useEffect(() => {
    if (isError) {
      toast.error("Error fetching data");
    }
  }, [isError]);

  return (
    <>
      {showAddTask && (
        <AddTask onCancel={handleOnCancelAdd} onSave={handleSaveAdd} />
      )}

      {onClickEdit && (
        <UpdateTask
          data={selectedDetails}
          onCancel={handleOnCancelUpdate}
          onSave={handleSaveUpdate}
        />
      )}

      {showDetails && (
        <ShowDetailsTask
          details={selectedDetails}
          onCancel={handleOnCancelShowDetails}
        />
      )}

      <Todo
        rows={todos ? generateRowsWithId(todos) : []}
        columns={columns}
        handleAddClick={handleAddClick}
        handleUpdateClick={handleUpdateClick}
        handleDeleteTask={handleDeleteTask}
        handleShowDetails={handleShowDetails}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        currentPage={currentPage}
        totalCount={todos?.totalCount}
      />
    </>
  );
};

export default Home;
