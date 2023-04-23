import React, { useEffect } from "react";
import "../../styles/globals.css";
import { AiOutlineFlag } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { UPDATE_POSITION } from "../../utils/mutations";
import Auth from "../../utils/auth";


function Battlefield({fieldMap}) {
  const currentUser = Auth.getUsername()
  console.log(currentUser)
  const [updatePosition, { error, data }] = useMutation(UPDATE_POSITION);
  
  const activeSpace = (id) => {
    try {
      const { data } = updatePosition({
        variables: {
          username: currentUser,
          position: id
         },
      });

      document.getElementById(id).style.backgroundColor = "indigo";
    } catch (err) {
      console.log(err);
    }

    
  };
  const doNothing = function () {
  };


  return (
      <div className="grid grid-cols-12 p-10 min-h-screen">
        {fieldMap.map((id, index) => {
          return (
            <div
              key={fieldMap[index].id}
              id={fieldMap[index].id}
              onClick={fieldMap[index].active ? () => activeSpace(fieldMap[index].id) : doNothing}
              className={"hover:bg-indigo-500 border-solid border-2 border-indigo-600 cursor-pointer min-h-[100px]"}
              style={fieldMap[index].active ? { backgroundColor: "yellow" } : { backgroundColor: "white" }}
            >{fieldMap[index].player}</div>
          );
        })}
      </div>
  );
}

export default Battlefield;
