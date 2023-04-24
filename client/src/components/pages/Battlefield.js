import React, { useEffect } from "react";
import "../../styles/globals.css";
import { AiOutlineFlag } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { UPDATE_POSITION } from "../../utils/mutations";
import Auth from "../../utils/auth";

function Battlefield({ fieldMap }) {
  const currentUser = Auth.getUsername();
  console.log(currentUser);
  const [updatePosition, { error, data }] = useMutation(UPDATE_POSITION);

  const activeSpace = (id) => {
    try {
      const { data } = updatePosition({
        variables: {
          username: currentUser,
          position: id,
        },
      });

      document.getElementById(id).style.backgroundColor = "indigo";
    } catch (err) {
      console.log(err);
    }
  };
  const doNothing = function () {};

  return (
    <div className="grid grid-cols-12 gap-0 mx-auto min-w-[78rem] min-h-0 max-w-[79rem] p-10 ">
      {fieldMap.map((id, index) => {
        return (
          <div
            key={fieldMap[index].id}
            id={fieldMap[index].id}
            onClick={
              fieldMap[index].active
                ? () => activeSpace(fieldMap[index].id)
                : doNothing
            }
            className={
              fieldMap[index].active
                ? "hover:bg-red-500/30 bg-red-500 border-solid border-2 border-gray-600 text-white cursor-pointer min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px]"
                : "hover:bg-red-500/30 bg-transparent border-solid border-2 border-gray-600 text-white cursor-pointer min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px]"
            }
          >
            {fieldMap[index].player}
          </div>
        );
      })}
    </div>
  );
}

export default Battlefield;
