import {createPost} from "@/app/_actions/actions";

const AddPost = () => {
  return (
    <div>
      <form action={createPost} className="p-4 flex flex-col items-center gap-4">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          className="border border-gray-200 text-gray-900 block p-2 rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 text-white p-2"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddPost