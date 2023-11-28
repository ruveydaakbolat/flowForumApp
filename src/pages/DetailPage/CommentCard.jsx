import { MdDelete } from "react-icons/md";
import moment from "moment/moment";
import "moment/locale/tr";

const CommentCard = ({ data, handleDelete, isOwn }) => {
  return (
    <div className="bg-gray-800 p-3 rounded flex items-start gap-4 w-full">
      <img
        width={50}
        className="object-contain rounded-lg"
        src={data.author.image}
      />
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <b>{data.author.name}</b>
            <span className="text-gray-400">{moment(data.date).fromNow()}</span>
          </div>

          {isOwn && (
            <MdDelete
              onClick={() => handleDelete(data.id)}
              className="cursor-pointer hover:text-red-500"
            />
          )}
        </div>
        <p className="mt-2">{data.text}</p>
      </div>
    </div>
  );
};

export default CommentCard;
