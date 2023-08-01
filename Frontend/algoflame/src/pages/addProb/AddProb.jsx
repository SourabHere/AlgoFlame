import React, { useState } from "react";
import "./AddProb.css";
import axios from "axios";
import { Toast, toast } from "react-hot-toast";
import api from "../../utils/api";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const AddProb = () => {
  const [formData, setFormData] = useState({
    problemDescription: "",
    problemName: "",
    inputData: "",
    outputData: "",
    exampleTestCaseInput: "",
    exampleTestCaseOutput: "",
    testCaseInput: "",
    testCaseOutput: "",
    difficulty: "",
    companies: "",
  });

  const check = () => {
    if (
      !formData.problemDescription ||
      !formData.problemName ||
      !formData.inputData ||
      !formData.outputData ||
      !formData.exampleTestCaseInput ||
      !formData.exampleTestCaseOutput ||
      !formData.testCaseInput ||
      !formData.testCaseOutput ||
      !formData.companies ||
      !formData.difficulty
    ) {
      toast.error("Please fill all the required details");
      return false;
    } else {
      return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(formData);
    if (check()) {
      const questionData = {
        name: formData.problemName,
        description: formData.problemDescription,
        inputData: formData.inputData,
        outputData: formData.outputData,
        difficulty: formData.difficulty,
        companies: formData.companies,
        testCaseInput: formData.testCaseInput,
        testCaseOutput: formData.testCaseOutput,
        exampleTestCaseInput: formData.exampleTestCaseInput,
        exampleTestCaseOutput: formData.exampleTestCaseOutput,
        submissions: 0,
      };

      console.log(questionData);

      api
        .post("/problemset/v1/admin/addquestion", questionData)
        .then((response) => {
          console.log(response.data);
          toast.success("Problem added successfully");
          window.location.href = "http://localhost:3000/";
        })
        .catch((error) => {
          toast.error("An error occured while creating the user");
          console.log("error", error);
        });
    }
  };

  return (
    <div className="problem-form">
      <div>
        <label htmlFor="problemName">Problem Name</label>
        <input
          type="text"
          id="problemName"
          name="problemName"
          value={formData.problemName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="problemDescription">Problem Description</label>
        <textarea
          id="problemDescription"
          name="problemDescription"
          value={formData.problemDescription}
          onChange={handleChange}
        />
      </div>

      {/* <FormLabel id="">Difficulty</FormLabel> */}
      <label htmlFor="difficulty">Difficulty</label>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        // defaultValue="Medium"
        name="difficulty"
      >
        <FormControlLabel
          onClick={handleChange}
          value="Easy"
          control={<Radio />}
          label="Easy"
        />
        <FormControlLabel
          onClick={handleChange}
          value="Medium"
          control={<Radio />}
          label="Medium"
        />
        <FormControlLabel
          onClick={handleChange}
          value="Hard"
          control={<Radio />}
          label="Hard"
        />
      </RadioGroup>

      <label htmlFor="companies">Companies OA</label>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        // defaultValue="No"
        name="companies"
      >
        <FormControlLabel
          onClick={handleChange}
          value="Yes"
          control={<Radio />}
          label="Yes"
        />
        <FormControlLabel
          onClick={handleChange}
          value="No"
          control={<Radio />}
          label="No"
        />
      </RadioGroup>

      <div>
        <label htmlFor="inputData">Input Data</label>
        <input
          type="text"
          id="inputData"
          name="inputData"
          value={formData.inputData}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="outputData">Output Data</label>
        <input
          type="text"
          id="outputData"
          name="outputData"
          value={formData.outputData}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="exampleTestCaseInput">Example Test Case Input</label>
        <input
          type="text"
          id="exampleTestCaseInput"
          name="exampleTestCaseInput"
          value={formData.exampleTestCaseInput}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="exampleTestCaseOutput">Example Test Case Output</label>
        <input
          type="text"
          id="exampleTestCaseOutput"
          name="exampleTestCaseOutput"
          value={formData.exampleTestCaseOutput}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="testCaseInput">Test Case Input(enter in array)</label>
        <input
          type="text"
          id="testCaseInput"
          name="testCaseInput"
          value={formData.testCaseInput}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="testCaseOutput">Test Case Output(enter in array)</label>
        <input
          type="text"
          id="testCaseOutput"
          name="testCaseOutput"
          value={formData.testCaseOutput}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddProb;
