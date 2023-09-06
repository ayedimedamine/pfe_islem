import React, { useState, useEffect } from "react";
import "./Home.scss";
import Logo from "../../assets/logo.png";
import { RxCountdownTimer } from "react-icons/rx";
import { BsFolder2Open } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import UploadImg from "../../assets/upload.png";
import s3 from "../../utils/aws-config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [title, setTitle] = useState("");
  const [mpro, setMpro] = useState(false);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);
  useEffect(() => {
    const newSocket = new WebSocket(`ws://${import.meta.env.VITE_BACKEND_URL}/ws`);

    newSocket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    newSocket.onmessage = (event) => {
      console.log("Received message:", event.data);
      let x = event.data.replace(/'/g, '"');
      setMessages((prev) => [...prev, JSON.parse(x)]);
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(newSocket);

    // Clean up the socket connection when the component unmounts
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []);

  const fetchProjects = async () => {
    try {
      const result = await axios.get(`http://${import.meta.env.VITE_BACKEND_URL}/project_names`);
      console.log(result);
      setProjects(result.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleProjectName = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setTitle(e.target.value);
  };
  const handleProjectFile = (e) => {
    e.preventDefault();
    console.log(typeof e.target.files);
    console.log(e.target.files[0]);
    setFile(e.target.files);
    setFileName(e.target.files[0].name);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(file, "ss", title);
    if (!file) return;

    const params = {
      Bucket: "code-sources",
      Key: `${title}/${file[0].name}`,
      Body: file[0],
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading file:", err);
      } else {
        console.log("File uploaded successfully:", data.Location);
      }
    });
  };
  return (
    <div className="filesWrapper">
      {modal && (
        <div className="uploadWrapper">
          <div className="parent">
            <div className="file-upload">
              <AiOutlineClose
                className="iconC"
                onClick={() => setModal(false)}
              />
              <img src={UploadImg} alt="upload" />
              <h3> {fileName || "Click box to upload"}</h3>
              <p>Maximun file size 10mb</p>
              <input type="file" onChange={(e) => handleProjectFile(e)} />
            </div>
          </div>
        </div>
      )}
      {mpro && (
        <div className="uploadWrapper">
          <div className="parents">
            <table>
              <AiOutlineClose
                className="iconCs"
                onClick={() => setMpro(false)}
              />
              <tr>
                <th
                  colSpan={2}
                  style={{
                    textAlign: "left",
                    borderRight: "1px solid #b5b5b5",
                  }}
                >
                  Recent Documents
                </th>
              </tr>
              {projects.map((e, i) => (
                <tr
                  onClick={() => navigate(`${e}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{i + 1}</td>
                  <td>{e}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}
      <div className="leftBox">
        <div className="LtopLevel">
          <img src={Logo} alt="logo" />
          <h3>Fraud Detection Logiciel</h3>
        </div>
        <div className="LbottomLevel">
          <div className="btnPro" onClick={() => setMpro(true)}>
            Projects <RxCountdownTimer className="iconBtn" />
          </div>
        </div>
      </div>
      <div className="rightBox">
        <div className="RtopLevel">
          <div className="inputWrapper">
            <label>Project Name : </label>
            <div className="inputF">
              <input type="text" onChange={(e) => handleProjectName(e)} />
              <BsFolder2Open className="iconF" />
            </div>
          </div>
          {fileName && (
            <p
              style={{
                marginBottom: "20px",
                marginLeft: "20px",
                fontWeight: "700",
              }}
            >
              {fileName}
            </p>
          )}
          <div className="btnWrapper">
            <div className="btnUpload" onClick={() => setModal(true)}>
              Upload
            </div>
            <div className="btnConfirm" onClick={(e) => submitForm(e)}>
              Confirm
            </div>
          </div>
        </div>
        <div className="RbottomLevel">
          <table>
            <tr>
              <th>ID</th>
              <th>Project Name</th>
              <th>File Name</th>
              <th>Result</th>
            </tr>
            {messages.map((e) => (
              <tr>
                <td>{e.id}</td>
                <td>{e.project_name}</td>
                <td>{e.filename}</td>
                {e.CLASS === "NON FRAUD" ? (
                  <td style={{ color: "green" }}>{e.CLASS}</td>
                ) : (
                  <td style={{ color: "red" }}>{e.CLASS}</td>
                )}
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
