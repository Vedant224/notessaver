import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updatePastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${
              pasteId ? "w-[80%]" : "w-[85%]"
            } text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2`}
          />
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={createPaste}
          >
            {pasteId ? "Update Paste" : "Create My Paste"}
          </button>

          {pasteId && (
            <button
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-500 dark:hover:bg-blue-600"
              onClick={resetPaste}
            >
              <PlusCircle size={20} />
            </button>
          )}
        </div>

        <div className="w-full flex flex-col items-start relative rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 backdrop-blur-2xl">
          <div className="w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]" />
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>
            <div className="w-fit rounded-t flex items-center justify-between gap-x-4 px-4">
              <button
                className="flex justify-center items-center transition-all duration-300 ease-in-out group"
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard", {
                    position: "top-right",
                  });
                }}
              >
                <Copy className="text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" size={20} />
              </button>
            </div>
          </div>

          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write Your Content Here...."
            className="w-full p-3 focus-visible:ring-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            style={{
              caretColor: "currentColor",
            }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;