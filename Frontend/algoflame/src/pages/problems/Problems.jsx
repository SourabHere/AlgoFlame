import React, { useState, useEffect } from "react";
import "./problem.css";
import { useNavigate } from "react-router-dom";
import { GiChewedSkull } from "react-icons/gi";
import { FaFeatherAlt } from "react-icons/fa";
import { BiDumbbell } from "react-icons/bi";
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const Problems = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/v1/problems");
        const jsonData = await response.json();
        // console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("error in fetching data", error);
      }
    };

    // console.log(data);

    fetchData();
  }, []);

  const openProblem = (id) => {
    navigate(`/problems/${id}`);
  };

  // console.log(data);

  return (
    <div className="head">
      <ChakraProvider>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Difficulty</Th>
                <Th>Submissions</Th>
                <Th>Companies</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(
                ({ sphereId, name, difficulty, companies, submissions }) => {
                  return (
                    <Tr key={sphereId}>
                      <Td className="prob_col problem_name">
                        <a onClick={() => openProblem(sphereId)} href="">
                          {" "}
                          {name}{" "}
                        </a>
                      </Td>
                      <Td className="prob_col problem_diff">
                        {difficulty}&nbsp;&nbsp;{" "}
                        {difficulty === "Hard" ? (
                          <GiChewedSkull />
                        ) : difficulty === "Medium" ? (
                          <BiDumbbell />
                        ) : (
                          <FaFeatherAlt />
                        )}{" "}
                      </Td>
                      <Td className="prob_col problem_rating">{submissions}</Td>
                      <Td className="prob_col problem_asked">{companies}</Td>
                    </Tr>
                  );
                }
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </ChakraProvider>
      {/* <section className="allprobs">
        <div className="container problem_container">
          <table className="problem_table" border={1}>
            <thead>
              <tr>
                <th className="problem_head problem_name">Name</th>
                <th className="problem_head problem_diff">Difficulty</th>
                <th className="problem_head problem_asked">Companies</th>
                <th className="problem_head problem_rating">Submissions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(
                ({ sphereId, name, difficulty, companies, submissions }) => {
                  return (
                    <tr key={sphereId}>
                      <td className="prob_col problem_name">
                        <a onClick={() => openProblem(sphereId)} href="">
                          {" "}
                          {name}{" "}
                        </a>
                      </td>
                      <td className="prob_col problem_diff">
                        {difficulty}{" "}
                        {difficulty === "Hard" ? (
                          <GiChewedSkull />
                        ) : difficulty === "Medium" ? (
                          <BiDumbbell />
                        ) : (
                          <FaFeatherAlt />
                        )}{" "}
                      </td>
                      <td className="prob_col problem_asked">{companies}</td>
                      <td className="prob_col problem_rating">{submissions}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </section> */}
    </div>
  );
};

export default Problems;
