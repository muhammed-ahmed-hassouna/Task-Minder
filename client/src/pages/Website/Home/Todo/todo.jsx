import { useState } from "react";
import {
  FiEdit,
  FiEdit2,
  FiEdit3,
  FiMinus,
  FiMoreHorizontal,
  FiPlus,
  FiTrash,
} from "react-icons/fi";
import FilledButton from "../../../../components/ui/buttons/FilledButton";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";

const Todo = ({
  rows,
  columns,
  handleAddClick,
  handleUpdateClick,
  handleDeleteTask,
  handleShowDetails,
  handlePreviousPage,
  handleNextPage,
  currentPage,
  totalCount,
}) => {
  const [activeItem, setActiveItem] = useState("Lists");

  const priorityColors = {
    high: "#ff0000",
    medium: "#ffa500",
    low: "#008000",
  };

  const priorityCellRenderer = ({ value }) => {
    return (
      <div style={{ color: priorityColors[value.toLowerCase()] }}>{value}</div>
    );
  };

  const updatedColumns = columns
    ?.map((column) => {
      if (column.field === "priority") {
        return {
          ...column,
          renderCell: (params) => priorityCellRenderer(params),
        };
      }
      return column;
    })
    .concat({
      width: 100,
      renderCell: (params) => (
        <div className='flex h-full items-center justify-center gap-6'>
          <Tooltip title='Edit Task'>
            <div onClick={() => handleUpdateClick(params.row)}>
              <FiEdit className='cursor-pointer text-blue-600' />
            </div>
          </Tooltip>

          <Tooltip title='Delete Task'>
            <div onClick={() => handleDeleteTask(params.row._id)}>
              <FiTrash className='cursor-pointer text-red-600' />
            </div>
          </Tooltip>

          <Tooltip title='See Details'>
            <div onClick={() => handleShowDetails(params.row)}>
              <FiMoreHorizontal className='cursor-pointer ' />
            </div>
          </Tooltip>
        </div>
      ),
    });

  const hasNextPage = currentPage * 5 < totalCount;

  return (
    <>
<div className='mx-auto mt-20 w-full max-w-4xl rounded-lg border bg-white shadow-md'>
    <div className='flex flex-col lg:flex-row lg:items-center p-6'>
      <ul className='flex flex-wrap lg:flex-nowrap gap-4 lg:gap-14 mb-4 lg:mb-0'>
        <li className='text-3xl font-normal'>Tasks</li>
        <li
          className={`cursor-pointer rounded-r-md bg-[#fbbf24] bg-opacity-25 p-2 transition duration-300 hover:bg-opacity-100 ${activeItem === "Lists" ? "bg-opacity-90" : ""}`}
          onClick={() => setActiveItem("Lists")}
        >
          Lists
        </li>
        <li
          className={`cursor-pointer rounded-r-md bg-[#fbbf24] bg-opacity-25 p-2 transition duration-300 hover:bg-opacity-100 ${activeItem === "KANBAN BOARD" ? "bg-opacity-90" : ""}`}
          onClick={() => setActiveItem("KANBAN BOARD")}
        >
          KANBAN BOARD
        </li>
      </ul>
      <FilledButton
        text='Add Task'
        icon={<FiPlus className='m-1' />}
        buttonType='submit'
        isButton={true}
        onClick={handleAddClick}
        className='ml-4 w-36 cursor-pointer rounded-lg border bg-blue-400 p-2 text-white transition hover:bg-opacity-80'
      />
    </div>
  

        {activeItem === "Lists" && (
          <div className='p-4'>
            <div className='h-96 w-full'>
              <DataGrid
                rows={rows}
                columns={updatedColumns}
                disableColumnFilter
                disablePagination
                disableColumnMenu
                disableColumnSorting
                pageSizeOptions={[5, 10]}
              />
            </div>
            <div className='mt-6 flex justify-end gap-4'>
              <div>
                <FilledButton
                  text='Previous Page'
                  icon={
                    <div className='m-1'>
                      <FiMinus />
                    </div>
                  }
                  buttonType='submit'
                  isButton={true}
                  onClick={handlePreviousPage}
                  className='cursor-pointer rounded-lg border bg-blue-400 p-2 text-white transition hover:bg-opacity-80'
                  isDisable={currentPage === 1}
                />
              </div>
              <div>
                <FilledButton
                  text='Next Page'
                  icon={
                    <div className='m-1'>
                      <FiPlus />
                    </div>
                  }
                  buttonType='submit'
                  isButton={true}
                  onClick={handleNextPage}
                  className='cursor-pointer rounded-lg border bg-blue-400 p-2 text-white transition hover:bg-opacity-80'
                  isDisable={!hasNextPage}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Todo;
