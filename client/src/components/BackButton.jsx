import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };
  return (
    <div>
      <button
        onClick={handleBackButton}
        className="my-1 p-2 flex items-center gap-1 text-slate-400"
      >
        <IoMdArrowRoundBack className=" text-4xl" />
        Back
      </button>
    </div>
  );
};

export default BackButton;
