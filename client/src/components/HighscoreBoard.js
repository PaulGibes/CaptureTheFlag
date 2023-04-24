import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SCORES } from "../utils/queries";
import { Table } from "flowbite-react";

function HighscoreBoard() {
  const { data } = useQuery(QUERY_SCORES);

  console.log(data);

  return (
    <div>
      <Table className="w-[17rem] mx-auto h-[20rem]">
        <Table.Head className="bg-transparent accent">
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Wins</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data &&
            data.scores.map((score) => (
              <Table.Row className="border-gray-500 ">
                <Table.Cell className="whitespace-nowrap font-medium text-white">
                  {score.username}
                </Table.Cell>
                <Table.Cell className="accent">{score.wins}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default HighscoreBoard;
