import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SCORES } from "../utils/queries";
import { Table } from "flowbite-react";

function HighscoreBoard() {
  const { data } = useQuery(QUERY_SCORES);

  console.log(data);

  return (
    <div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Wins</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data &&
            data.scores.map((score) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {score.username}
                </Table.Cell>
                <Table.Cell>{score.wins}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default HighscoreBoard;
