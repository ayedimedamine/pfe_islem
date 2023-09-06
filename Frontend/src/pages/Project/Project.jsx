import React, { useState, useEffect } from "react";
import "./Project.scss";
import Logo from "../../assets/logo.png";
import { RxCountdownTimer } from "react-icons/rx";
import { BsFolder2Open } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import UploadImg from "../../assets/upload.png";
import s3 from "../../utils/aws-config";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Project = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchProject();
  }, [name]);
  const fetchProject = async () => {
    const result = await axios.get(`http://${import.meta.env.VITE_BACKEND_URL}/project/${name}`);
    setData(result.data);
    console.log(result.data);
  };
  return (
    <div className="filesWrapper">
      <div className="leftBox">
        <div className="LtopLevel">
          <img src={Logo} alt="logo" />
          <h3>Fraud Detection Logiciel</h3>
        </div>
        <div className="LbottomLevel">
          <div className="btnPro" onClick={() => navigate("/")}>
            Retour
          </div>
        </div>
      </div>
      <div className="rightBox">
        <div className="RbottomLevel">
          <table>
            <tr>
              <th>ID</th>
              <th>Project Name</th>
              <th>File Name</th>
              <th>Result</th>
              <th>BRANCH_COUNT</th>
              <th>CALL_PAIRS</th>
              <th>CONDITION_COUNT</th>
              <th>CYCLOMATIC_COMPLEXITY</th>
              <th>CYCLOMATIC_DENSITY</th>
              <th>DECISION_COUNT</th>
              <th>DECISION_DENSITY</th>
              <th>DESIGN_COMPLEXITY</th>
              <th>DESIGN_DENSITY</th>
              <th>EDGE_COUNT</th>
              <th>ESSENTIAL_COMPLEXITY</th>
              <th>ESSENTIAL_DENSITY</th>
              <th>HALSTEAD_CONTENT</th>
              <th>HALSTEAD_DIFFICULTY</th>
              <th>HALSTEAD_EFFORT</th>
              <th>HALSTEAD_ERROR_EST</th>
              <th>HALSTEAD_LENGTH</th>
              <th>HALSTEAD_LEVEL</th>
              <th>HALSTEAD_PROG_TIME</th>
              <th>HALSTEAD_VOLUME</th>
              <th>LOC_BLANK</th>
              <th>LOC_CODE_AND_COMMENT</th>
              <th>LOC_COMMENTS</th>
              <th>LOC_EXECUTABLE</th>
              <th>LOC_TOTAL</th>
              <th>MAINTENANCE_SEVERITY</th>
              <th>MODIFIED_CONDITION_COUNT</th>
              <th>MULTIPLE_CONDITION_COUNT</th>
              <th>NODE_COUNT</th>
              <th>NORMALIZED_CYCLOMATIC_COMPLEXITY</th>
              <th>NUMBER_OF_LINES</th>
              <th>NUM_OPERANDS</th>
              <th>NUM_OPERATORS</th>
              <th>NUM_UNIQUE_OPERANDS</th>
              <th>NUM_UNIQUE_OPERATORS</th>
              <th>PARAMETER_COUNT</th>
              <th>PERCENT_COMMENTS</th>
            </tr>
            {data &&
              data.map((e) => (
                <tr>
                  <td>{e.id}</td>
                  <td>{e.project_name}</td>
                  <td>{e.filename}</td>
                  {e.CLASS === "NON FRAUD" ? (
                    <td style={{ color: "green" }}>{e.CLASS}</td>
                  ) : (
                    <td style={{ color: "red" }}>{e.CLASS}</td>
                  )}
                  <td>{e.BRANCH_COUNT}</td>
                  <td>{e.CALL_PAIRS}</td>

                  <td>{e.CONDITION_COUNT}</td>
                  <td>{e.CYCLOMATIC_COMPLEXITY}</td>
                  <td>{e.CYCLOMATIC_DENSITY}</td>
                  <td>{e.DECISION_COUNT}</td>
                  <td>{e.DECISION_DENSITY}</td>
                  <td>{e.DESIGN_COMPLEXITY}</td>
                  <td>{e.DESIGN_DENSITY}</td>
                  <td>{e.EDGE_COUNT}</td>
                  <td>{e.ESSENTIAL_COMPLEXITY}</td>
                  <td>{e.ESSENTIAL_DENSITY}</td>
                  <td>{e.HALSTEAD_CONTENT}</td>
                  <td>{e.HALSTEAD_DIFFICULTY}</td>
                  <td>{e.HALSTEAD_EFFORT}</td>
                  <td>{e.HALSTEAD_ERROR_EST}</td>
                  <td>{e.HALSTEAD_LENGTH}</td>
                  <td>{e.HALSTEAD_LEVEL}</td>
                  <td>{e.HALSTEAD_PROG_TIME}</td>
                  <td>{e.HALSTEAD_VOLUME}</td>
                  <td>{e.LOC_BLANK}</td>
                  <td>{e.LOC_CODE_AND_COMMENT}</td>
                  <td>{e.LOC_COMMENTS}</td>
                  <td>{e.LOC_EXECUTABLE}</td>
                  <td>{e.LOC_TOTAL}</td>
                  <td>{e.MAINTENANCE_SEVERITY}</td>
                  <td>{e.MODIFIED_CONDITION_COUNT}</td>
                  <td>{e.MULTIPLE_CONDITION_COUNT}</td>
                  <td>{e.NODE_COUNT}</td>
                  <td>{e.NORMALIZED_CYLOMATIC_COMPLEXITY}</td>
                  <td>{e.NUMBER_OF_LINES}</td>
                  <td>{e.NUM_OPERANDS}</td>
                  <td>{e.NUM_OPERATORS}</td>
                  <td>{e.NUM_UNIQUE_OPERANDS}</td>
                  <td>{e.NUM_UNIQUE_OPERATORS}</td>
                  <td>{e.PARAMETER_COUNT}</td>
                  <td>{e.PERCENT_COMMENTS}</td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Project;
