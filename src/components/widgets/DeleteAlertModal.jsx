import { useAuthStore, useExpenseStore } from "@/store";
import { useMoveToTrashExpense, useDeleteExpense } from "@/lib/react-query";
import { showToast } from "@/lib/utils";
import { TriangleAlert, CircleAlert } from "lucide-react"

export const DeleteAlertModal = ({ permanent }) => {
  const { toggleDeleteModal, deleteItem } = useExpenseStore(state => ({
    toggleDeleteModal: state.toggleDeleteModal,
    deleteItem: state.deleteItem
  }));
  const user = useAuthStore(state => state.user);
  const { mutateAsync: moveToTrashExpense, isPending: isMovingToTrash } = useMoveToTrashExpense();
  const { mutateAsync: deleteExpense, isPending: isDeleting } = useDeleteExpense();

  const handleDelete = async () => {
    let res = "";
    if (permanent) {
      res = await deleteExpense({
        owner: user?.$id,
        deleteItem
      });
    } else {
      res = await moveToTrashExpense({
        owner: user?.$id,
        deleteItem
      });
    }

    console.log(res)

    if (res?.ok) {
      showToast("Deleted successfully.");
      toggleDeleteModal();
    } else {
      showToast("Failed to delete.", "error");
    }
  };

  return (
    <div className={`fixed top-0 left-0 z-50 w-full h-full bg-black/30 backdrop-blur flex justify-center items-center px-6 py-10`}>
      <div className="w-full bg-white rounded-md px-4 py-6 overflow-auto md:max-w-3xl dark-theme">
        <div className="flex justify-between items-center">
          <h2 className="heading3">Delete Confirmation</h2>
        </div>
        <p className="body-text">
          Are you sure you want to delete?
          {permanent ? (
            <p className="bg-orange-100 text-orange-700 px-2 py-4 text-sm rounded my-2 flex items-center gap-2">
              <span><TriangleAlert /></span>
              <span>Once you delete it, it's gone forever. No way to bring it back!</span>
            </p>
          ) : (
            <p className="bg-purple-100 text-purple-700  px-2 py-4 text-sm rounded my-2 flex items-center gap-2">
              <span><CircleAlert /></span>
              <span>This will be moved to trash. Don't worry, you can restore it anytime from the trash.</span>
            </p>
          )}
        </p>
        <div className={`mt-4 flex justify-end ${(isMovingToTrash || isDeleting) && "pointer-events-none"}`}>
          <button
            disabled={isDeleting}
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            {isDeleting || isMovingToTrash ? "Deleting.." : "Delete"}
          </button>
          <button
            onClick={toggleDeleteModal}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
