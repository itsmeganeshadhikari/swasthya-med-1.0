// third party
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// ==============================|| QUILL EDITOR ||============================== //

const ReactQuillDemo = ({ value, onChange }: any) => {
  return <ReactQuill value={value} onChange={onChange} />;
};

export default ReactQuillDemo;
