import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  const back = () => navigate(-1);
  return (
    <button
      className="inline-flex dark:bg-darkBlue gap-2 px-4 bg-white py-1 rounded shadow-[0px_0px_8px_rgba(0,0,0,0.4)]"
      onClick={back}
    >
      <MoveLeft /> Back
    </button>
  );
}
